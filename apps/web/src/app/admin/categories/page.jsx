"use client";

import { useState, useEffect } from "react";
import { adminGetCategories, adminCreateCategory, adminUpdateCategory, adminDeleteCategory } from "@/lib/supabase";
import { useTranslation } from "@/lib/i18n";
import {
  AdminShell,
  adminBtnPrimaryClass,
  adminBtnSecondaryClass,
  adminInputClass,
  adminTableWrapClass,
} from "@/components/admin/AdminShell";

export default function AdminCategories() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    name_ja: "",
    description: "",
    meta_title: "",
    meta_description: "",
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    const adminToken = sessionStorage.getItem("adminToken");
    if (!adminToken) {
      window.location.href = "/admin";
      return;
    }
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await adminGetCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await adminUpdateCategory(editingId, formData);
      } else {
        await adminCreateCategory(formData);
      }
      await loadCategories();
      resetForm();
    } catch (error) {
      console.error("Failed to save category:", error);
      alert(t("common.saveFailed") + error.message);
    }
  };

  const handleEdit = (category) => {
    setFormData({
      slug: category.slug,
      name_ja: category.name_ja,
      description: category.description || "",
      meta_title: category.meta_title || "",
      meta_description: category.meta_description || "",
      display_order: category.display_order || 0,
      is_active: category.is_active,
    });
    setEditingId(category.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm(t("admin.cat.confirmDelete"))) return;
    try {
      await adminDeleteCategory(id);
      await loadCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
      alert(t("common.deleteFailed") + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      slug: "",
      name_ja: "",
      description: "",
      meta_title: "",
      meta_description: "",
      display_order: 0,
      is_active: true,
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50">
        <div
          className="h-9 w-9 animate-spin rounded-full border-2 border-[#1e3a8a] border-t-transparent"
          aria-hidden
        />
        <p className="text-sm text-slate-600">{t("common.loading")}</p>
      </div>
    );
  }

  return (
    <AdminShell
      title={t("admin.categories.title")}
      breadcrumbLabel={t("admin.dashboard")}
      actions={
        <button type="button" onClick={() => setShowForm(true)} className={adminBtnPrimaryClass}>
          {t("common.create")}
        </button>
      }
    >
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
            <h2 className="mb-6 text-lg font-bold text-slate-900">
              {editingId ? t("admin.cat.editTitle") : t("admin.cat.newTitle")}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">{t("common.slug")}</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className={adminInputClass}
                    placeholder="startup"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">{t("admin.cat.name")}</label>
                  <input
                    type="text"
                    value={formData.name_ja}
                    onChange={(e) => setFormData({ ...formData, name_ja: e.target.value })}
                    className={adminInputClass}
                    placeholder="スタートアップ"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">{t("admin.cat.description")}</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`${adminInputClass} h-24 resize-y`}
                  placeholder={t("admin.cat.descPlaceholder")}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">{t("common.metaTitle")} (SEO)</label>
                <input
                  type="text"
                  value={formData.meta_title}
                  onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                  className={adminInputClass}
                  placeholder={t("admin.cat.metaTitlePlaceholder")}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">{t("common.metaDescription")} (SEO)</label>
                <textarea
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  className={`${adminInputClass} h-20 resize-y`}
                  placeholder={t("admin.cat.metaDescPlaceholder")}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">{t("common.displayOrder")}</label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                    className={adminInputClass}
                  />
                </div>
                <div className="flex items-center pt-6 sm:pt-0">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="h-4 w-4 rounded border-slate-300 text-[#1e3a8a] focus:ring-[#1e3a8a]"
                    />
                    <span className="text-sm text-slate-700">{t("common.publish")}</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-6">
                <button type="submit" className={adminBtnPrimaryClass}>
                  {t("common.save")}
                </button>
                <button type="button" onClick={resetForm} className={adminBtnSecondaryClass}>
                  {t("common.cancel")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={adminTableWrapClass}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {t("admin.cat.table.order")}
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {t("admin.cat.table.slug")}
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {t("admin.cat.table.name")}
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {t("admin.cat.table.status")}
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {t("admin.cat.table.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {categories.map((category) => (
                <tr key={category.id} className="transition-colors hover:bg-slate-50/80">
                  <td className="px-4 py-3 tabular-nums text-slate-600">{category.display_order}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-800">{category.slug}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{category.name_ja}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        category.is_active
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {category.is_active ? t("common.published") : t("common.unpublished")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleEdit(category)}
                      className="mr-3 text-sm font-medium text-[#1e3a8a] hover:underline"
                    >
                      {t("common.edit")}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(category.id)}
                      className="text-sm font-medium text-red-600 hover:underline"
                    >
                      {t("common.delete")}
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-14 text-center text-sm text-slate-500">
                    {t("admin.cat.empty")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
