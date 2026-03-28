"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "@/lib/i18n";
import {
  AdminShell,
  adminBtnSecondaryClass,
  adminTableWrapClass,
} from "@/components/admin/AdminShell";

function adminHeaders() {
  return { "X-Admin-Session": sessionStorage.getItem("adminToken") || "" };
}

function categoryLabel(t, slug) {
  const key = `submit.category.${slug}`;
  const label = t(key);
  return label === key ? slug : label;
}

export default function AdminListingRequests() {
  const { t, lang } = useTranslation();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setError("");
    const res = await fetch("/api/admin/listing-requests", { headers: adminHeaders() });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || res.statusText);
      setRequests([]);
      return;
    }
    setRequests(data.requests ?? []);
  }, []);

  useEffect(() => {
    const adminToken = sessionStorage.getItem("adminToken");
    if (!adminToken) {
      window.location.href = "/admin";
      return;
    }
    (async () => {
      try {
        await load();
      } finally {
        setLoading(false);
      }
    })();
  }, [load]);

  const dateLocale = lang === "ja" ? "ja-JP" : "en-US";

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#1e3a8a] border-t-transparent" aria-hidden />
        <p className="text-sm text-slate-600">{t("common.loading")}</p>
      </div>
    );
  }

  return (
    <AdminShell
      title={t("admin.requests.title")}
      breadcrumbLabel={t("admin.dashboard")}
      actions={
        <button type="button" onClick={() => load()} className={adminBtnSecondaryClass}>
          {t("admin.requests.refresh")}
        </button>
      }
    >
      {error ? (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </div>
      ) : null}

      {requests.length === 0 && !error ? (
        <div
          className={`${adminTableWrapClass} px-6 py-16 text-center text-sm text-slate-500`}
        >
          {t("admin.requests.empty")}
        </div>
      ) : null}

      {requests.length > 0 ? (
        <div className={adminTableWrapClass}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t("admin.requests.table.submitted")}
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t("submit.name.label")}
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t("submit.category.label")}
                  </th>
                  <th className="min-w-[200px] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t("submit.links.label")}
                  </th>
                  <th className="min-w-[280px] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t("submit.reason.label")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {requests.map((row) => (
                  <tr key={row.id} className="align-top transition-colors hover:bg-slate-50/80">
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums text-slate-600">
                      {row.created_at ? new Date(row.created_at).toLocaleString(dateLocale) : "—"}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">{row.name}</td>
                    <td className="px-4 py-3 text-slate-700">{categoryLabel(t, row.category)}</td>
                    <td className="max-w-md break-words px-4 py-3 whitespace-pre-wrap text-slate-600">
                      {row.links || "—"}
                    </td>
                    <td className="max-w-xl break-words px-4 py-3 whitespace-pre-wrap text-slate-700">
                      {row.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </AdminShell>
  );
}
