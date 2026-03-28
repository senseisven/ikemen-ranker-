"use client";

import { useState, useEffect } from "react";
import { adminGetTags, adminCreateTag, adminUpdateTag, adminDeleteTag } from "@/lib/supabase";
import { useTranslation } from "@/lib/i18n";
import {
  AdminShell,
  adminBtnPrimaryClass,
  adminBtnSecondaryClass,
  adminInputClass,
  adminTableWrapClass,
} from "@/components/admin/AdminShell";

export default function AdminTags() {
  const { t } = useTranslation();
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    display_order: 0,
  });

  useEffect(() => {
    const adminToken = sessionStorage.getItem("adminToken");
    if (!adminToken) {
      window.location.href = "/admin";
      return;
    }
    loadTags();
  }, []);

  const loadTags = async () => {
    try {
      const data = await adminGetTags();
      setTags(data);
    } catch (error) {
      console.error("Failed to load tags:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await adminUpdateTag(editingId, formData);
      } else {
        await adminCreateTag(formData);
      }
      await loadTags();
      resetForm();
    } catch (error) {
      console.error("Failed to save tag:", error);
      alert(t("common.saveFailed") + error.message);
    }
  };

  const handleEdit = (tag) => {
    setFormData({
      name: tag.name,
      display_order: tag.display_order || 0,
    });
    setEditingId(tag.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm(t("common.confirmDelete"))) return;
    try {
      await adminDeleteTag(id);
      await loadTags();
    } catch (error) {
      console.error("Failed to delete tag:", error);
      alert(t("common.deleteFailed") + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      display_order: 0,
    });
    setEditingId(null);
    setShowForm(false);
  };

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
      title={t("admin.tags.title")}
      breadcrumbLabel={t("admin.dashboard")}
      actions={
        <button type="button" onClick={() => setShowForm(true)} className={adminBtnPrimaryClass}>
          {t("common.create")}
        </button>
      }
    >
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
            <h2 className="mb-6 text-lg font-bold text-slate-900">
              {editingId ? t("admin.tag.editTitle") : t("admin.tag.newTitle")}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">{t("admin.tag.name")}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={adminInputClass}
                  placeholder="爽やか"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">{t("common.displayOrder")}</label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  className={adminInputClass}
                />
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
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {t("admin.tag.table.order")}
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {t("admin.tag.table.name")}
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {t("admin.tag.table.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {tags.map((tag) => (
                <tr key={tag.id} className="transition-colors hover:bg-slate-50/80">
                  <td className="px-4 py-3 tabular-nums text-slate-600">{tag.display_order}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{tag.name}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleEdit(tag)}
                      className="mr-3 text-sm font-medium text-[#1e3a8a] hover:underline"
                    >
                      {t("common.edit")}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(tag.id)}
                      className="text-sm font-medium text-red-600 hover:underline"
                    >
                      {t("common.delete")}
                    </button>
                  </td>
                </tr>
              ))}
              {tags.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-14 text-center text-sm text-slate-500">
                    {t("admin.tag.empty")}
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
