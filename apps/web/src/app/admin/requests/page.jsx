"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "@/lib/i18n";

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

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-white border-b border-[#e5e5e5]">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="/admin" className="text-sm text-[#1e3a8a] hover:underline">
              {t("admin.dashboard")}
            </a>
            <h1 className="text-xl font-bold">{t("admin.requests.title")}</h1>
          </div>
          <button
            type="button"
            onClick={() => load()}
            className="text-sm text-[#666] hover:text-[#1e3a8a]"
          >
            {t("admin.requests.refresh")}
          </button>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {loading ? (
          <p className="text-[#666]">{t("common.loading")}</p>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
            {error}
          </div>
        ) : requests.length === 0 ? (
          <p className="text-[#666]">{t("admin.requests.empty")}</p>
        ) : (
          <div className="bg-white border border-[#e5e5e5] overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e5e5e5] bg-[#fafafa] text-left">
                  <th className="px-4 py-3 font-bold whitespace-nowrap">
                    {t("admin.requests.table.submitted")}
                  </th>
                  <th className="px-4 py-3 font-bold whitespace-nowrap">
                    {t("submit.name.label")}
                  </th>
                  <th className="px-4 py-3 font-bold whitespace-nowrap">
                    {t("submit.category.label")}
                  </th>
                  <th className="px-4 py-3 font-bold min-w-[200px]">
                    {t("submit.links.label")}
                  </th>
                  <th className="px-4 py-3 font-bold min-w-[280px]">
                    {t("submit.reason.label")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests.map((row) => (
                  <tr key={row.id} className="border-b border-[#eee] align-top">
                    <td className="px-4 py-3 text-[#666] whitespace-nowrap">
                      {row.created_at
                        ? new Date(row.created_at).toLocaleString(dateLocale)
                        : "—"}
                    </td>
                    <td className="px-4 py-3 font-medium">{row.name}</td>
                    <td className="px-4 py-3">{categoryLabel(t, row.category)}</td>
                    <td className="px-4 py-3 text-[#444] whitespace-pre-wrap break-words max-w-md">
                      {row.links || "—"}
                    </td>
                    <td className="px-4 py-3 text-[#444] whitespace-pre-wrap break-words max-w-xl">
                      {row.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
