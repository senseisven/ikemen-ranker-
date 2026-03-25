import * as babel from '@babel/core';
import type { PluginOption } from 'vite';
import type { NodePath, PluginObj } from '@babel/core';
import type { JSXElement } from '@babel/types';
import type * as t from '@babel/types';

import { createHash } from 'node:crypto';

/** Same logical file must hash the same on SSR, client, and HMR (ignore ?t= / ?noLayout). */
function stableModuleKey(viteId: string): string {
  const pathOnly = viteId.split('?')[0].replace(/\\/g, '/');
  const idx = pathOnly.indexOf('/src/');
  return idx >= 0 ? pathOnly.slice(idx + 1) : pathOnly;
}

function genId(stableKey: string, loc: { line: number; col: number }, syntheticOrdinal?: number) {
  const basis =
    syntheticOrdinal != null
      ? `${stableKey}:synthetic:${syntheticOrdinal}`
      : `${stableKey}:${loc.line}:${loc.col}`;
  return `render-${createHash('sha1').update(basis).digest('hex').slice(0, 8)}`;
}

export interface BabelAPI {
  types: typeof t;
}
const idToJsx = { current: {} as Record<string, { code: string }> };

const getRenderIdVisitor =
  ({
    stableKey,
    nextSynthetic,
  }: {
    stableKey: string;
    nextSynthetic: () => number;
  }) =>
  (api: BabelAPI): PluginObj => {
    const { types: t } = api;

    return {
      visitor: {
        JSXElement(path: NodePath<JSXElement>) {
          const opening = path.node.openingElement;

          // We only care about <tag> where tag is lowercase (HTML intrinsic)
          if (!t.isJSXIdentifier(opening.name)) return;
          const tagName = opening.name.name;
          if (tagName !== tagName.toLowerCase()) return; // skip components
          if (
            [
              'html',
              'head',
              'body',
              'title',
              'meta',
              'link',
              'script',
              'style',
              'noscript',
              'base',
              'template',
              'iframe',
              'svg',
              'math',
              'slot',
              'picture',
              'source',
              'canvas',
              'video',
              'audio',
              'object',
              'embed',
              'param',
              'track',
            ].includes(tagName)
          )
            return; // skip html elements that do not render to the DOM

          // If it already has a renderId prop, leave it alone
          const hasRenderId = opening.attributes.some(
            (attr) =>
              t.isJSXAttribute(attr) &&
              t.isJSXIdentifier(attr.name) &&
              attr.name.name === 'renderId'
          );
          if (hasRenderId) return;

          const locStart = path.node.loc?.start;
          const renderId = locStart
            ? genId(stableKey, { line: locStart.line, col: locStart.column })
            : genId(stableKey, { line: 0, col: 0 }, nextSynthetic());

          // Ensure PolymorphicComponent import exists at top‑level
          const program = path.findParent((p) => p.isProgram());
          if (!program) {
            console.warn(
              `No program found for ${filename} so unable to add CreatePolymorphicComponent import`
            );
            return;
          }
          idToJsx.current[renderId] = { code: path.getSource() };

          const body = program.get('body');
          const alreadyImported =
            Array.isArray(body) &&
            body.some(
              (p) =>
                t.isImportDeclaration(p.node) &&
                p.node.source.value === '@/__create/PolymorphicComponent'
            );
          if (!alreadyImported) {
            const importDecl = t.importDeclaration(
              [t.importDefaultSpecifier(t.identifier('CreatePolymorphicComponent'))],
              t.stringLiteral('@/__create/PolymorphicComponent')
            );
            const firstImport = Array.isArray(body)
              ? body.findIndex((p) => p.isImportDeclaration())
              : -1;
            if (firstImport === -1) {
              program.unshiftContainer('body', importDecl);
            } else {
              body[firstImport].insertBefore(importDecl);
            }
          }

          // Clone existing attributes and add our own
          const newAttributes = [
            ...opening.attributes,
            t.jsxAttribute(t.jsxIdentifier('renderId'), t.stringLiteral(renderId)),
            t.jsxAttribute(t.jsxIdentifier('as'), t.stringLiteral(tagName)),
          ];

          const newOpening = t.jsxOpeningElement(
            t.jsxIdentifier('CreatePolymorphicComponent'),
            newAttributes,
            opening.selfClosing
          );
          const newClosing = opening.selfClosing
            ? null
            : t.jsxClosingElement(t.jsxIdentifier('CreatePolymorphicComponent'));

          const wrapped = t.jsxElement(
            newOpening,
            newClosing,
            path.node.children,
            opening.selfClosing
          );

          path.replaceWith(wrapped);
        },
      },
    };
  };

export function addRenderIds(): PluginOption {
  return {
    name: 'add-render-ids',
    enforce: 'pre',
    async transform(code, id) {
      // Strip query (?t= HMR, ?noLayout.jsx) so we always transform the module.
      const pathOnly = id.split('?')[0];
      if (!/\.([cm]?[jt]sx)$/.test(pathOnly)) {
        return null;
      }
      if (!id.includes('apps/web/src/') && !pathOnly.includes('/src/')) {
        return null;
      }

      let syntheticOrdinal = 0;
      const stableKey = stableModuleKey(id);

      const result = await babel.transformAsync(code, {
        filename: id,
        sourceMaps: true,
        babelrc: false,
        configFile: false,
        presets: [['@babel/preset-react', { runtime: 'automatic' }], '@babel/preset-typescript'],
        plugins: [
          getRenderIdVisitor({
            stableKey,
            nextSynthetic: () => syntheticOrdinal++,
          }),
        ],
      });

      if (!result) return null;
      return { code: result.code ?? code, map: result.map };
    },

    api: {
      getRenderIdMap() {
        return idToJsx.current;
      },
    },
  };
}
