import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useAsyncError,
  useLoaderData,
  useLocation,
  useRouteError,
} from 'react-router';

import { useButton } from '@react-aria/button';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type FC,
  Component,
} from 'react';
import './global.css';

import { toPng } from 'html-to-image';
import fetch from '@/__create/fetch';
import { SessionProvider } from '@auth/create/react';
import { useNavigate } from 'react-router';
import { serializeError } from 'serialize-error';
import { Toaster } from 'sonner';
import { HotReloadIndicator } from '../__create/HotReload';
import { useSandboxStore } from '../__create/hmr-sandbox-store';
import type { Route } from './+types/root';
import { useDevServerHeartbeat } from '../__create/useDevServerHeartbeat';
import { getCategories } from '@/lib/supabase';
import { LanguageProvider, useTranslation, localizeCategory } from '@/lib/i18n';
import LanguageToggle from '@/components/LanguageToggle';

type CategoryNav = {
  id: string;
  slug: string;
  name_ja: string;
};

export const links = () => [];

export async function loader() {
  try {
    const categories = await getCategories();
    return { categories };
  } catch (error) {
    console.error('Root loader failed to fetch categories:', error);
    return { categories: [] };
  }
}

if (globalThis.window && globalThis.window !== undefined) {
  globalThis.window.fetch = fetch;
}

if (import.meta.hot) {
  import.meta.hot.on('update-font-links', (urls: string[]) => {
    // remove old font links
    for (const link of document.querySelectorAll('link[data-auto-font]')) {
      link.remove();
    }

    // add new ones
    for (const url of urls) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.dataset.autoFont = 'true';
      document.head.appendChild(link);
    }
  });
}

function SharedErrorBoundary({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children?: ReactNode;
}): React.ReactElement {
  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="bg-[#18191B] text-[#F2F2F2] rounded-lg p-4 max-w-md w-full mx-4 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-[#F2F2F2] rounded-full flex items-center justify-center">
              <span className="text-black text-[1.125rem] leading-none">!</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <div className="flex flex-col gap-1">
              <p className="font-light text-[#F2F2F2] text-sm">App Error Detected</p>
              <p className="text-[#959697] text-sm font-light">
                It looks like an error occurred while trying to use your app.
              </p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * NOTE: we have a shared error boundary for the app, but then we also expose
 * this in case something goes wrong outside of the normal user's app flow.
 * React-router will mount this one
 */
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return <SharedErrorBoundary isOpen={true} />;
}

function InternalErrorBoundary({ error: errorArg }: Route.ErrorBoundaryProps) {
  const routeError = useRouteError();
  const asyncError = useAsyncError();
  const error = errorArg ?? asyncError ?? routeError;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const animateTimer = setTimeout(() => setIsOpen(true), 100);
    return () => clearTimeout(animateTimer);
  }, []);
  const { buttonProps: showLogsButtonProps } = useButton(
    {
      onPress: useCallback(() => {
        window.parent.postMessage(
          {
            type: 'sandbox:web:show-logs',
          },
          '*'
        );
      }, []),
    },
    useRef<HTMLButtonElement>(null)
  );
  const { buttonProps: fixButtonProps } = useButton(
    {
      onPress: useCallback(() => {
        window.parent.postMessage(
          {
            type: 'sandbox:web:fix',
            error: serializeError(error),
          },
          '*'
        );
        setIsOpen(false);
      }, [error]),
      isDisabled: !error,
    },
    useRef<HTMLButtonElement>(null)
  );
  const { buttonProps: copyButtonProps } = useButton(
    {
      onPress: useCallback(() => {
        navigator.clipboard.writeText(JSON.stringify(serializeError(error)));
      }, [error]),
    },
    useRef<HTMLButtonElement>(null)
  );

  function isInIframe() {
    try {
      return window.parent !== window;
    } catch {
      return true;
    }
  }
  return (
    <SharedErrorBoundary isOpen={isOpen}>
      {isInIframe() ? (
        <div className="flex gap-2">
          {!!error && (
            <button
              className="flex flex-row items-center justify-center gap-[4px] outline-none transition-colors rounded-[8px] border-[1px] bg-[#f9f9f9] hover:bg-[#dbdbdb] active:bg-[#c4c4c4] border-[#c4c4c4] text-[#18191B] text-sm px-[8px] py-[4px] cursor-pointer"
              type="button"
              {...fixButtonProps}
            >
              Try to fix
            </button>
          )}

          <button
            className="flex flex-row items-center justify-center gap-[4px] outline-none transition-colors rounded-[8px] border-[1px] bg-[#2C2D2F] hover:bg-[#414243] active:bg-[#555658] border-[#414243] text-white text-sm px-[8px] py-[4px]"
            type="button"
            {...showLogsButtonProps}
          >
            Show logs
          </button>
        </div>
      ) : (
        <button
          className="flex flex-row items-center justify-center gap-[4px] outline-none transition-colors rounded-[8px] border-[1px] bg-[#2C2D2F] hover:bg-[#414243] active:bg-[#555658] border-[#414243] text-white text-sm px-[8px] py-[4px] w-fit"
          type="button"
          {...copyButtonProps}
        >
          Copy error
        </button>
      )}
    </SharedErrorBoundary>
  );
}

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = { hasError: boolean; error: unknown | null };

class ErrorBoundaryWrapper extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <InternalErrorBoundary error={this.state.error} params={{}} />;
    }
    return this.props.children;
  }
}

function LoaderWrapper({ loader }: { loader: () => React.ReactNode }) {
  return <>{loader()}</>;
}

type ClientOnlyProps = {
  loader: () => React.ReactNode;
};

const ClientOnly: React.FC<ClientOnlyProps> = ({ loader }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <ErrorBoundaryWrapper>
      <LoaderWrapper loader={loader} />
    </ErrorBoundaryWrapper>
  );
};

/** Vite HMR WebSocket is up; updated from module‑level listeners (no React state). */
let hmrSocketHealthy = true;
const healthyResponseType = 'sandbox:web:healthcheck:response';

function postSandboxHealthToParent() {
  if (typeof window === 'undefined') return;
  try {
    window.parent?.postMessage(
      { type: healthyResponseType, healthy: hmrSocketHealthy },
      '*'
    );
  } catch {
    /* ignore */
  }
}

if (import.meta.hot) {
  import.meta.hot.on('vite:ws:disconnect', () => {
    hmrSocketHealthy = false;
    postSandboxHealthToParent();
  });
  import.meta.hot.on('vite:ws:connect', () => {
    hmrSocketHealthy = true;
    postSandboxHealthToParent();
  });
  import.meta.hot.on('vite:beforeFullReload', () => {
    hmrSocketHealthy = false;
    postSandboxHealthToParent();
  });
}

const useHandshakeParent = () => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'sandbox:web:healthcheck') {
        window.parent.postMessage(
          { type: healthyResponseType, healthy: hmrSocketHealthy },
          '*'
        );
      }
    };
    window.addEventListener('message', handleMessage);
    postSandboxHealthToParent();
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
};

const useCodeGen = () => {
  const { startCodeGen, setCodeGenGenerating, completeCodeGen, errorCodeGen, stopCodeGen } =
    useSandboxStore();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { type } = event.data;

      switch (type) {
        case 'sandbox:web:codegen:started':
          startCodeGen();
          break;
        case 'sandbox:web:codegen:generating':
          setCodeGenGenerating();
          break;
        case 'sandbox:web:codegen:complete':
          completeCodeGen();
          break;
        case 'sandbox:web:codegen:error':
          errorCodeGen();
          break;
        case 'sandbox:web:codegen:stopped':
          stopCodeGen();
          break;
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [startCodeGen, setCodeGenGenerating, completeCodeGen, errorCodeGen, stopCodeGen]);
};

const useRefresh = () => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'sandbox:web:refresh:request') {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        window.parent.postMessage({ type: 'sandbox:web:refresh:complete' }, '*');
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
};

const waitForScreenshotReady = async () => {
  const images = Array.from(document.images);

  await Promise.all([
    // make sure custom fonts are loaded
    'fonts' in document ? document.fonts.ready : Promise.resolve(),
    ...images.map(
      (img) =>
        new Promise((resolve) => {
          img.crossOrigin = 'anonymous';
          if (img.complete) {
            resolve(true);
            return;
          }
          img.onload = () => resolve(true);
          img.onerror = () => resolve(true);
        })
    ),
  ]);

  // small buffer to ensure rendering is stable
  await new Promise((resolve) => setTimeout(resolve, 250));
};

const useHandleScreenshotRequest = () => {
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.data.type === 'sandbox:web:screenshot:request') {
        try {
          await waitForScreenshotReady();

          const width = window.innerWidth;
          const aspectRatio = 16 / 9;
          const height = Math.floor(width / aspectRatio);

          // html-to-image already handles CORS, fonts, and CSS inlining
          const dataUrl = await toPng(document.body, {
            cacheBust: true,
            skipFonts: false,
            width,
            height,
            style: {
              // force snapshot sizing
              width: `${width}px`,
              height: `${height}px`,
              margin: '0',
            },
          });

          window.parent.postMessage({ type: 'sandbox:web:screenshot:response', dataUrl }, '*');
        } catch (error) {
          window.parent.postMessage(
            {
              type: 'sandbox:web:screenshot:error',
              error: error instanceof Error ? error.message : String(error),
            },
            '*'
          );
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
};
export function Layout({ children }: { children: ReactNode }) {
  useHandshakeParent();
  useCodeGen();
  useRefresh();
  useHandleScreenshotRequest();
  useDevServerHeartbeat();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location?.pathname;
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'sandbox:navigation') {
        navigate(event.data.pathname);
      }
    };
    window.addEventListener('message', handleMessage);
    window.parent.postMessage({ type: 'sandbox:web:ready' }, '*');
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [navigate]);

  useEffect(() => {
    if (pathname) {
      window.parent.postMessage(
        {
          type: 'sandbox:web:navigation',
          pathname,
        },
        '*'
      );
    }
  }, [pathname]);
  return (
    <html lang="ja" className="bg-slate-50">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script type="module" src="/src/__create/dev-error-overlay.js"></script>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-50 text-slate-800 min-h-screen font-sans antialiased">
        {children}
        <HotReloadIndicator />
        <Toaster position="bottom-right" />
        <ScrollRestoration />
        <Scripts />
        <script src="https://kit.fontawesome.com/2c15cc0cc7.js" crossOrigin="anonymous" async />
      </body>
    </html>
  );
}

function AppInner({ categories }: { categories: CategoryNav[] }) {
  const { t, lang } = useTranslation();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 py-4">
          <nav className="flex items-center justify-between" aria-label={t("nav.ariaLabel")}>
            <a href="/" className="font-display text-xl font-bold tracking-widest text-gradient-neon hover:opacity-90 transition-opacity">
              {t("nav.brand")}
            </a>
            <div className="flex items-center gap-6 md:gap-8 text-sm">
              {categories.slice(0, 6).map((cat) => {
                const lc = localizeCategory(cat, lang);
                return (
                <a
                  key={cat.id}
                  href={`/${cat.slug}`}
                  className="text-slate-600 hover:text-indigo-600 transition-colors duration-200"
                >
                  {lc.name_ja}
                </a>
                );
              })}
              <a href="/about" className="text-slate-600 hover:text-indigo-600 transition-colors duration-200">
                {t("nav.editorial")}
              </a>
              <LanguageToggle />
            </div>
          </nav>
        </div>
      </header>

      <main className="min-h-screen pt-16">
        <Outlet />
      </main>

      <footer className="mt-24 border-t border-slate-200 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            <div>
              <h3 className="font-display font-bold mb-4 text-indigo-600">{t("footer.about.title")}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {t("footer.about.description")}
              </p>
            </div>
            <div>
              <h3 className="font-display font-bold mb-4 text-indigo-600">{t("footer.categories.title")}</h3>
              <nav className="flex flex-col gap-2 text-sm" aria-label={t("footer.categories.ariaLabel")}>
                {categories.map((cat) => {
                  const lc = localizeCategory(cat, lang);
                  return (
                  <a
                    key={cat.id}
                    href={`/${cat.slug}`}
                    className="text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    {lc.name_ja}
                  </a>
                  );
                })}
              </nav>
            </div>
            <div>
              <h3 className="font-display font-bold mb-4 text-indigo-600">{t("footer.siteInfo.title")}</h3>
              <nav className="flex flex-col gap-2 text-sm" aria-label={t("footer.siteInfo.ariaLabel")}>
                <a href="/about" className="text-slate-400 hover:text-indigo-600 transition-colors">
                  {t("footer.siteInfo.editorial")}
                </a>
                <a href="/submit" className="text-slate-400 hover:text-indigo-600 transition-colors">
                  {t("footer.siteInfo.request")}
                </a>
              </nav>
            </div>
          </div>
          <div className="text-xs text-slate-600 pt-8 border-t border-slate-200">
            {t("footer.copyright")}
          </div>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const categories: CategoryNav[] = (data?.categories ?? []) as CategoryNav[];

  return (
    <SessionProvider>
      <LanguageProvider>
        <AppInner categories={categories} />
      </LanguageProvider>
    </SessionProvider>
  );
}
