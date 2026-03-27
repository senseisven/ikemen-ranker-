"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n";

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
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
    if (email === "admin@ikemen.jp" && password === "admin123") {
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
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="bg-white p-8 border border-[#e5e5e5] w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">{t("admin.login.title")}</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1">{t("admin.login.email")}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#e5e5e5] px-4 py-2 focus:outline-none focus:border-[#1e3a8a]"
                placeholder="admin@ikemen.jp"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t("admin.login.password")}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-[#e5e5e5] px-4 py-2 focus:outline-none focus:border-[#1e3a8a]"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#1e3a8a] text-white py-2 hover:bg-[#15296b] transition-colors"
            >
              {t("admin.login.submit")}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-white border-b border-[#e5e5e5]">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">{t("admin.header.title")}</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-[#666] hover:text-[#1e3a8a]"
          >
            {t("admin.header.logout")}
          </button>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-8">{t("admin.dashboard")}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <a
            href="/admin/categories"
            className="bg-white border border-[#e5e5e5] p-6 hover:border-[#1e3a8a] transition-colors"
          >
            <h3 className="font-bold text-lg mb-2">{t("admin.categories.title")}</h3>
            <p className="text-sm text-[#666]">{t("admin.categories.desc")}</p>
          </a>

          <a
            href="/admin/people"
            className="bg-white border border-[#e5e5e5] p-6 hover:border-[#1e3a8a] transition-colors"
          >
            <h3 className="font-bold text-lg mb-2">{t("admin.people.title")}</h3>
            <p className="text-sm text-[#666]">{t("admin.people.desc")}</p>
          </a>

          <a
            href="/admin/tags"
            className="bg-white border border-[#e5e5e5] p-6 hover:border-[#1e3a8a] transition-colors"
          >
            <h3 className="font-bold text-lg mb-2">{t("admin.tags.title")}</h3>
            <p className="text-sm text-[#666]">{t("admin.tags.desc")}</p>
          </a>

          <a
            href="/admin/articles"
            className="bg-white border border-[#e5e5e5] p-6 hover:border-[#1e3a8a] transition-colors"
          >
            <h3 className="font-bold text-lg mb-2">{t("admin.articles.title")}</h3>
            <p className="text-sm text-[#666]">{t("admin.articles.desc")}</p>
          </a>

          <a
            href="/admin/requests"
            className="bg-white border border-[#e5e5e5] p-6 hover:border-[#1e3a8a] transition-colors"
          >
            <h3 className="font-bold text-lg mb-2">{t("admin.requests.title")}</h3>
            <p className="text-sm text-[#666]">{t("admin.requests.desc")}</p>
          </a>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-bold mb-4">{t("admin.quickLinks")}</h3>
          <div className="flex gap-4">
            <a
              href="/"
              target="_blank"
              className="text-sm text-[#1e3a8a] hover:underline"
            >
              {t("admin.viewSite")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
