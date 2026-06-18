"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n";
import {
  adminBtnGhostClass,
  adminBtnPrimaryClass,
  adminCardClass,
} from "@/components/admin/AdminShell";

function CardIcon({ children, className = "" }) {
  return (
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-inner ${className}`}
      aria-hidden
    >
      {children}
    </div>
  );
}

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const adminToken = sessionStorage.getItem("adminToken");
    if (adminToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "einarisacuteboy") {
      sessionStorage.setItem("adminToken", "authenticated");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError(t("admin.login.error"));
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-4 py-12">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-200/80 via-slate-100 to-slate-100"
          aria-hidden
        />
        <div className={`relative w-full max-w-md ${adminCardClass} p-8 shadow-xl sm:p-10`}>
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {t("nav.brand")}
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              {t("admin.login.title")}
            </h1>
            <p className="mt-2 text-sm text-slate-600">{t("admin.login.subtitle")}</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                {error}
              </div>
            )}
            <div>
              <label htmlFor="admin-password" className="mb-1.5 block text-sm font-medium text-slate-700">
                {t("admin.login.password")}
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm shadow-sm transition-colors focus:border-[#1e3a8a] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20"
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>
            <button type="submit" className={`${adminBtnPrimaryClass} w-full py-3 text-base`}>
              {t("admin.login.submit")}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const sections = [
    {
      heading: t("admin.dashboard.section.content"),
      items: [
        {
          href: "/admin/categories",
          title: t("admin.categories.title"),
          desc: t("admin.categories.desc"),
          icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
          ),
          iconBg: "bg-[#1e3a8a]",
        },
        {
          href: "/admin/people",
          title: t("admin.people.title"),
          desc: t("admin.people.desc"),
          icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          ),
          iconBg: "bg-slate-700",
        },
        {
          href: "/admin/articles",
          title: t("admin.articles.title"),
          desc: t("admin.articles.desc"),
          icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          ),
          iconBg: "bg-indigo-600",
        },
      ],
    },
    {
      heading: t("admin.dashboard.section.structure"),
      items: [
        {
          href: "/admin/tags",
          title: t("admin.tags.title"),
          desc: t("admin.tags.desc"),
          icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
          ),
          iconBg: "bg-emerald-600",
        },
        {
          href: "/admin/requests",
          title: t("admin.requests.title"),
          desc: t("admin.requests.desc"),
          icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          ),
          iconBg: "bg-amber-600",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {t("nav.brand")}
            </p>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {t("admin.header.title")}
            </h1>
            <p className="mt-0.5 text-sm text-slate-600">{t("admin.dashboard.tagline")}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className={adminBtnGhostClass}
            >
              {t("admin.viewSite")}
            </a>
            <button type="button" onClick={handleLogout} className={adminBtnGhostClass}>
              {t("admin.header.logout")}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-900">{t("admin.dashboard")}</h2>
          <p className="mt-1 text-sm text-slate-600">{t("admin.dashboard.intro")}</p>
        </div>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                {section.heading}
              </h3>
              <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={`group flex gap-4 p-5 transition-all hover:border-[#1e3a8a]/40 hover:shadow-md ${adminCardClass}`}
                    >
                      <CardIcon className={item.iconBg}>{item.icon}</CardIcon>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-slate-900 group-hover:text-[#1e3a8a]">
                            {item.title}
                          </h4>
                          <svg
                            className="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[#1e3a8a]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            aria-hidden
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
