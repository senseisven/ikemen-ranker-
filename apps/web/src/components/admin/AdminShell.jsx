"use client";

/**
 * Shared chrome for authenticated admin sub-pages (not the login screen).
 */
export function AdminShell({ title, breadcrumbLabel, children, actions = null }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-start justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="min-w-0 flex-1">
            <nav
              aria-label="Breadcrumb"
              className="mb-1 text-xs font-medium text-slate-500"
            >
              <a
                href="/admin"
                className="rounded transition-colors hover:text-[#1e3a8a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a8a] focus-visible:ring-offset-2"
              >
                {breadcrumbLabel}
              </a>
            </nav>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {title}
            </h1>
          </div>
          {actions ? (
            <div className="flex flex-shrink-0 flex-wrap items-center gap-2">{actions}</div>
          ) : null}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}

export const adminCardClass =
  "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm";

export const adminTableWrapClass = `${adminCardClass}`;

export const adminInputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:border-[#1e3a8a] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/25";

export const adminBtnPrimaryClass =
  "inline-flex items-center justify-center rounded-lg bg-[#1e3a8a] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#15296b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a8a] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

export const adminBtnSecondaryClass =
  "inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2";

export const adminBtnGhostClass =
  "inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2";
