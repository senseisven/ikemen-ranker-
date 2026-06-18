import { redirect } from "react-router";
import type { Route } from "./+types/not-found";
import { useLoaderData } from "react-router";
import { useTranslation } from "@/lib/i18n";
import { normalizePath } from "@/lib/slug";

export async function loader({ params }: Route.LoaderArgs) {
  const rawPath = `/${params["*"] ?? ""}`;
  const normalizedPath = normalizePath(rawPath);

  if (normalizedPath !== rawPath) {
    throw redirect(normalizedPath);
  }

  return { path: normalizedPath };
}

export default function NotFoundPage() {
  const { path } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {t("notFound.title")}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        {t("notFound.description")}
      </p>
      {path && path !== "/" && (
        <p className="mt-3 break-all font-mono text-sm text-slate-400">{path}</p>
      )}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <a
          href="/"
          className="inline-flex items-center rounded-lg bg-[#1e3a8a] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1e40af]"
        >
          {t("notFound.home")}
        </a>
        <a
          href="/about"
          className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:text-[#1e3a8a]"
        >
          {t("nav.editorial")}
        </a>
      </div>
    </div>
  );
}
