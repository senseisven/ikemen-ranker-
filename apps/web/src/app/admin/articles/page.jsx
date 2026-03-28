"use client";

import { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  adminGetArticles,
  adminGetCategories,
  adminGetPeople,
  adminCreateArticle,
  adminUpdateArticle,
  adminDeleteArticle,
} from "@/lib/supabase";
import { useTranslation } from "@/lib/i18n";
import {
  AdminShell,
  adminBtnPrimaryClass,
  adminBtnSecondaryClass,
  adminInputClass,
  adminTableWrapClass,
} from "@/components/admin/AdminShell";

export default function AdminArticles() {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const editorRef = useRef(null);
  const [formData, setFormData] = useState({
    slug: "",
    category_id: "",
    person_id: "",
    title: "",
    excerpt: "",
    content: "",
    featured_image_url: "",
    is_published: false,
    meta_title: "",
    meta_description: "",
    display_order: 0,
  });

  useEffect(() => {
    const adminToken = sessionStorage.getItem("adminToken");
    if (!adminToken) {
      window.location.href = "/admin";
      return;
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [articlesData, categoriesData, peopleData] = await Promise.all([
        adminGetArticles(),
        adminGetCategories(),
        adminGetPeople(),
      ]);
      setArticles(articlesData);
      setCategories(categoriesData);
      setPeople(peopleData);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const content = editorRef.current ? editorRef.current.getContent() : formData.content;
      const dataToSave = {
        ...formData,
        content,
        category_id: formData.category_id || null,
        person_id: formData.person_id || null,
        published_at: formData.is_published ? new Date().toISOString() : null,
      };

      if (editingId) {
        await adminUpdateArticle(editingId, dataToSave);
      } else {
        await adminCreateArticle(dataToSave);
      }
      await loadData();
      resetForm();
    } catch (error) {
      console.error("Failed to save article:", error);
      alert(t("common.saveFailed") + error.message);
    }
  };

  const handleEdit = (article) => {
    setFormData({
      slug: article.slug,
      category_id: article.category_id || "",
      person_id: article.person_id || "",
      title: article.title,
      excerpt: article.excerpt || "",
      content: article.content || "",
      featured_image_url: article.featured_image_url || "",
      is_published: article.is_published,
      meta_title: article.meta_title || "",
      meta_description: article.meta_description || "",
      display_order: article.display_order || 0,
    });
    setEditingId(article.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm(t("common.confirmDelete"))) return;
    try {
      await adminDeleteArticle(id);
      await loadData();
    } catch (error) {
      console.error("Failed to delete article:", error);
      alert(t("common.deleteFailed") + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      slug: "",
      category_id: "",
      person_id: "",
      title: "",
      excerpt: "",
      content: "",
      featured_image_url: "",
      is_published: false,
      meta_title: "",
      meta_description: "",
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
      title={t("admin.articles.title")}
      breadcrumbLabel={t("admin.dashboard")}
      actions={
        <button type="button" onClick={() => setShowForm(true)} className={adminBtnPrimaryClass}>
          {t("common.create")}
        </button>
      }
    >
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
            <h2 className="mb-6 text-lg font-bold text-slate-900">
              {editingId ? t("admin.art.editTitle") : t("admin.art.newTitle")}
            </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("common.slug")}*</label>
                    <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2" placeholder="article-title" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("admin.art.title")}*</label>
                    <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2" placeholder={t("admin.art.titlePlaceholder")} required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("admin.art.relatedCategory")}</label>
                    <select value={formData.category_id} onChange={(e) => setFormData({ ...formData, category_id: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2">
                      <option value="">{t("common.none")}</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name_ja}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("admin.art.relatedPerson")}</label>
                    <select value={formData.person_id} onChange={(e) => setFormData({ ...formData, person_id: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2">
                      <option value="">{t("common.none")}</option>
                      {people.map((person) => (
                        <option key={person.id} value={person.id}>{person.name_ja} ({person.category?.name_ja})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t("admin.art.excerpt")}</label>
                  <textarea value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2 h-20" placeholder={t("admin.art.excerptPlaceholder")} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t("admin.art.body")}</label>
                  <Editor
                    apiKey="nn4binis9k4dzuafzo2wvdl6jobzmh8e4g6hfjvs62zroxvd"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue={formData.content}
                    init={{
                      height: 500,
                      menubar: true,
                      plugins: ["advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "help", "wordcount"],
                      toolbar: "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | removeformat | help",
                      content_style: 'body { font-family: "Noto Sans JP", Helvetica, Arial, sans-serif; font-size: 14px; }',
                      language: "ja",
                      language_url: "/tinymce/langs/ja.js",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t("admin.art.featuredImage")}</label>
                  <input type="url" value={formData.featured_image_url} onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2" placeholder="https://..." />
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-[#666] border-b pb-2">{t("common.seoSettings")}</h3>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("common.metaTitle")}</label>
                    <input type="text" value={formData.meta_title} onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2" placeholder={t("admin.art.metaTitlePlaceholder")} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("common.metaDescription")}</label>
                    <textarea value={formData.meta_description} onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2 h-20" placeholder={t("admin.art.metaDescPlaceholder")} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("common.displayOrder")}</label>
                    <input type="number" value={formData.display_order} onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })} className="w-full border border-[#e5e5e5] px-3 py-2" />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={formData.is_published} onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })} className="w-4 h-4" />
                      <span className="text-sm">{t("common.publish")}</span>
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
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t("admin.art.table.title")}
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t("admin.art.table.category")}
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t("admin.art.table.status")}
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t("admin.art.table.created")}
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t("admin.art.table.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {articles.map((article) => (
                  <tr key={article.id} className="transition-colors hover:bg-slate-50/80">
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium text-slate-900">{article.title}</div>
                        <div className="font-mono text-xs text-slate-500">{article.slug}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{article.category?.name_ja || "—"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          article.is_published
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {article.is_published ? t("admin.art.published") : t("admin.art.draft")}
                      </span>
                    </td>
                    <td className="px-4 py-3 tabular-nums text-slate-600">
                      {new Date(article.created_at).toLocaleDateString(t("common.dateLocale"))}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleEdit(article)}
                        className="mr-3 text-sm font-medium text-[#1e3a8a] hover:underline"
                      >
                        {t("common.edit")}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(article.id)}
                        className="text-sm font-medium text-red-600 hover:underline"
                      >
                        {t("common.delete")}
                      </button>
                    </td>
                  </tr>
                ))}
                {articles.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-14 text-center text-sm text-slate-500">
                      {t("admin.art.empty")}
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
