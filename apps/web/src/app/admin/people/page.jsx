"use client";

import { useState, useEffect } from "react";
import {
  adminGetPeople,
  adminGetCategories,
  adminGetTags,
  uploadPersonImage,
} from "@/lib/supabase";
import { useTranslation } from "@/lib/i18n";
import {
  AdminShell,
  adminBtnPrimaryClass,
  adminBtnSecondaryClass,
  adminTableWrapClass,
} from "@/components/admin/AdminShell";

function adminHeaders() {
  return {
    "Content-Type": "application/json",
    "X-Admin-Session": sessionStorage.getItem("adminToken") || "",
  };
}

async function adminSavePerson(editingId, dataToSave, selectedTags) {
  if (editingId) {
    const res = await fetch("/api/admin/people/save", {
      method: "PUT",
      headers: adminHeaders(),
      body: JSON.stringify({
        id: editingId,
        person: dataToSave,
        tagIds: selectedTags,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || res.statusText);
    return data.person;
  }
  const res = await fetch("/api/admin/people/save", {
    method: "POST",
    headers: adminHeaders(),
    body: JSON.stringify({ person: dataToSave, tagIds: selectedTags }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || res.statusText);
  return data.person;
}

async function adminDeletePersonApi(id) {
  const res = await fetch("/api/admin/people/save", {
    method: "DELETE",
    headers: adminHeaders(),
    body: JSON.stringify({ id }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || res.statusText);
}

export default function AdminPeople() {
  const { t } = useTranslation();
  const [people, setPeople] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    category_id: "",
    name_ja: "",
    name_kana: "",
    title: "",
    bio_short: "",
    editorial: "",
    image_url: "",
    image_alt: "",
    score_total: 0,
    score_cleanliness: 0,
    score_facial: 0,
    score_vibe: 0,
    score_fashion: 0,
    score_charisma: 0,
    link_x: "",
    link_instagram: "",
    link_official: "",
    is_weekly_pick: false,
    is_active: true,
    display_order: 0,
    meta_title: "",
    meta_description: "",
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
      const [peopleData, categoriesData, tagsData] = await Promise.all([
        adminGetPeople(),
        adminGetCategories(),
        adminGetTags(),
      ]);
      setPeople(peopleData);
      setCategories(categoriesData);
      setTags(tagsData);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return (
      (parseInt(formData.score_cleanliness) || 0) +
      (parseInt(formData.score_facial) || 0) +
      (parseInt(formData.score_vibe) || 0) +
      (parseInt(formData.score_fashion) || 0) +
      (parseInt(formData.score_charisma) || 0)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      let imageUrl = formData.image_url;

      if (imageFile) {
        const slug = formData.slug || `person-${Date.now()}`;
        imageUrl = await uploadPersonImage(imageFile, slug);
      }

      const dataToSave = {
        ...formData,
        image_url: imageUrl,
        score_total: calculateTotal(),
      };

      await adminSavePerson(editingId, dataToSave, selectedTags);
      await loadData();
      resetForm();
    } catch (error) {
      console.error("Failed to save person:", error);
      alert(t("common.saveFailed") + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (person) => {
    setFormData({
      slug: person.slug,
      category_id: person.category_id,
      name_ja: person.name_ja,
      name_kana: person.name_kana || "",
      title: person.title,
      bio_short: person.bio_short || "",
      editorial: person.editorial || "",
      image_url: person.image_url || "",
      image_alt: person.image_alt || "",
      score_total: person.score_total || 0,
      score_cleanliness: person.score_cleanliness || 0,
      score_facial: person.score_facial || 0,
      score_vibe: person.score_vibe || 0,
      score_fashion: person.score_fashion || 0,
      score_charisma: person.score_charisma || 0,
      link_x: person.link_x || "",
      link_instagram: person.link_instagram || "",
      link_official: person.link_official || "",
      is_weekly_pick: person.is_weekly_pick || false,
      is_active: person.is_active,
      display_order: person.display_order || 0,
      meta_title: person.meta_title || "",
      meta_description: person.meta_description || "",
    });
    
    const personTagNames = person.tags || [];
    const tagIds = tags
      .filter((tg) => personTagNames.includes(tg.name))
      .map((tg) => tg.id);
    setSelectedTags(tagIds);
    
    setImageFile(null);
    setImagePreview(person.image_url || null);
    setEditingId(person.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm(t("common.confirmDelete"))) return;
    try {
      await adminDeletePersonApi(id);
      await loadData();
    } catch (error) {
      console.error("Failed to delete person:", error);
      alert(t("common.deleteFailed") + error.message);
    }
  };

  const toggleTag = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const resetForm = () => {
    setFormData({
      slug: "",
      category_id: "",
      name_ja: "",
      name_kana: "",
      title: "",
      bio_short: "",
      editorial: "",
      image_url: "",
      image_alt: "",
      score_total: 0,
      score_cleanliness: 0,
      score_facial: 0,
      score_vibe: 0,
      score_fashion: 0,
      score_charisma: 0,
      link_x: "",
      link_instagram: "",
      link_official: "",
      is_weekly_pick: false,
      is_active: true,
      display_order: 0,
      meta_title: "",
      meta_description: "",
    });
    setSelectedTags([]);
    setImageFile(null);
    setImagePreview(null);
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
      title={t("admin.people.title")}
      breadcrumbLabel={t("admin.dashboard")}
      actions={
        <button type="button" onClick={() => setShowForm(true)} className={adminBtnPrimaryClass}>
          {t("common.create")}
        </button>
      }
    >
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
            <h2 className="mb-6 text-lg font-bold text-slate-900">
              {editingId ? t("admin.ppl.editTitle") : t("admin.ppl.newTitle")}
            </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-[#666] border-b pb-2">{t("admin.ppl.basicInfo")}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">{t("common.slug")}*</label>
                      <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2" placeholder="takeshi-yamamoto" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{t("admin.ppl.category")}*</label>
                      <select value={formData.category_id} onChange={(e) => setFormData({ ...formData, category_id: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2" required>
                        <option value="">{t("common.select")}</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.name_ja}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">{t("admin.ppl.nameJa")}*</label>
                      <input type="text" value={formData.name_ja} onChange={(e) => setFormData({ ...formData, name_ja: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2" placeholder="山本剛志" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{t("admin.ppl.nameKana")}</label>
                      <input type="text" value={formData.name_kana} onChange={(e) => setFormData({ ...formData, name_kana: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2" placeholder="ヤマモトタケシ" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("admin.ppl.jobTitle")}*</label>
                    <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2" placeholder="AI×医療スタートアップCEO" required />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-[#666] border-b pb-2">{t("admin.ppl.tags")}</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <button key={tag.id} type="button" onClick={() => toggleTag(tag.id)} className={`px-3 py-1 text-sm border transition-colors ${selectedTags.includes(tag.id) ? "bg-[#1e3a8a] text-white border-[#1e3a8a]" : "border-[#e5e5e5] hover:border-[#1e3a8a]"}`}>
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-[#666] border-b pb-2">
                    {t("admin.ppl.scores", { total: calculateTotal() })}
                  </h3>
                  <div className="grid grid-cols-5 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">{t("score.cleanliness")}</label>
                      <input type="number" min="0" max="20" value={formData.score_cleanliness} onChange={(e) => setFormData({ ...formData, score_cleanliness: parseInt(e.target.value) || 0 })} className="w-full border border-[#e5e5e5] px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{t("score.facial")}</label>
                      <input type="number" min="0" max="20" value={formData.score_facial} onChange={(e) => setFormData({ ...formData, score_facial: parseInt(e.target.value) || 0 })} className="w-full border border-[#e5e5e5] px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{t("score.vibe")}</label>
                      <input type="number" min="0" max="20" value={formData.score_vibe} onChange={(e) => setFormData({ ...formData, score_vibe: parseInt(e.target.value) || 0 })} className="w-full border border-[#e5e5e5] px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{t("score.fashion")}</label>
                      <input type="number" min="0" max="20" value={formData.score_fashion} onChange={(e) => setFormData({ ...formData, score_fashion: parseInt(e.target.value) || 0 })} className="w-full border border-[#e5e5e5] px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{t("score.charisma")}</label>
                      <input type="number" min="0" max="20" value={formData.score_charisma} onChange={(e) => setFormData({ ...formData, score_charisma: parseInt(e.target.value) || 0 })} className="w-full border border-[#e5e5e5] px-3 py-2" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-[#666] border-b pb-2">{t("admin.ppl.content")}</h3>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("admin.ppl.profile")}</label>
                    <textarea value={formData.bio_short} onChange={(e) => setFormData({ ...formData, bio_short: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2 h-24" placeholder={t("admin.ppl.profilePlaceholder")} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("admin.ppl.editorial")}</label>
                    <textarea value={formData.editorial} onChange={(e) => setFormData({ ...formData, editorial: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2 h-32" placeholder={t("admin.ppl.editorialPlaceholder")} />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-[#666] border-b pb-2">{t("admin.ppl.image")}</h3>
                  <div className="grid grid-cols-[1fr_200px] gap-6">
                    <div className="space-y-4">
                      <div
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragOver(false);
                          const file = e.dataTransfer.files?.[0];
                          if (file && file.type.startsWith('image/')) {
                            setImageFile(file);
                            setImagePreview(URL.createObjectURL(file));
                          }
                        }}
                        onClick={() => document.getElementById('person-image-input')?.click()}
                        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${dragOver ? 'border-[#1e3a8a] bg-blue-50' : 'border-[#d1d5db] hover:border-[#1e3a8a] hover:bg-[#fafafa]'}`}
                      >
                        <input id="person-image-input" type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); } }} />
                        <div className="text-[#666] text-sm">
                          <p className="font-medium mb-1">{t("admin.ppl.imageDrop")}</p>
                          <p className="text-xs text-[#999]">{t("admin.ppl.imageFormats")}</p>
                        </div>
                        {imageFile && (
                          <p className="mt-2 text-xs text-[#1e3a8a] font-medium">
                            {t("admin.ppl.imageSelected", { name: imageFile.name })}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">{t("admin.ppl.imageUrlLabel")}</label>
                        <input type="url" value={formData.image_url} onChange={(e) => { setFormData({ ...formData, image_url: e.target.value }); if (e.target.value) { setImagePreview(e.target.value); setImageFile(null); } }} className="w-full border border-[#e5e5e5] px-3 py-2" placeholder="https://..." disabled={!!imageFile} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">{t("admin.ppl.imageAlt")}</label>
                        <input type="text" value={formData.image_alt} onChange={(e) => setFormData({ ...formData, image_alt: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2" placeholder="山本剛志" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs text-[#666] font-medium">{t("admin.ppl.preview")}</span>
                      {imagePreview ? (
                        <div className="relative">
                          <img src={imagePreview} alt={t("admin.ppl.preview")} className="w-[180px] h-[180px] object-cover rounded-lg border border-[#e5e5e5]" onError={(e) => { e.target.style.display = 'none'; }} />
                          <button type="button" onClick={() => { setImageFile(null); setImagePreview(null); setFormData({ ...formData, image_url: '' }); }} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600">×</button>
                        </div>
                      ) : (
                        <div className="w-[180px] h-[180px] bg-[#f5f5f5] border border-[#e5e5e5] rounded-lg flex items-center justify-center">
                          <span className="text-[#ccc] text-3xl">📷</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-[#666] border-b pb-2">{t("admin.ppl.links")}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">X (Twitter)</label>
                      <input type="url" value={formData.link_x} onChange={(e) => setFormData({ ...formData, link_x: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2" placeholder="https://x.com/..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Instagram</label>
                      <input type="url" value={formData.link_instagram} onChange={(e) => setFormData({ ...formData, link_instagram: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2" placeholder="https://instagram.com/..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{t("admin.ppl.officialSite")}</label>
                      <input type="url" value={formData.link_official} onChange={(e) => setFormData({ ...formData, link_official: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2" placeholder="https://..." />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-[#666] border-b pb-2">{t("common.seo")}</h3>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("common.metaTitle")}</label>
                    <input type="text" value={formData.meta_title} onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2" placeholder="山本剛志 | スタートアップ | イケメン名鑑" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("common.metaDescription")}</label>
                    <textarea value={formData.meta_description} onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2 h-20" placeholder={t("admin.cat.metaDescPlaceholder")} />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-[#666] border-b pb-2">{t("admin.ppl.settings")}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">{t("common.displayOrder")}</label>
                      <input type="number" value={formData.display_order} onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })} className="w-full border border-[#e5e5e5] px-3 py-2" />
                    </div>
                    <div className="flex items-center">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={formData.is_weekly_pick} onChange={(e) => setFormData({ ...formData, is_weekly_pick: e.target.checked })} className="w-4 h-4" />
                        <span className="text-sm">{t("admin.ppl.weeklyPick")}</span>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} className="w-4 h-4" />
                        <span className="text-sm">{t("common.publish")}</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-6">
                  <button
                    type="submit"
                    disabled={uploading}
                    className={`${adminBtnPrimaryClass} disabled:pointer-events-none disabled:opacity-50`}
                  >
                    {uploading ? t("common.saving") : t("common.save")}
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
                    {t("admin.ppl.table.name")}
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t("admin.ppl.table.category")}
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t("admin.ppl.table.score")}
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t("admin.ppl.table.status")}
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {t("admin.ppl.table.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {people.map((person) => (
                  <tr key={person.id} className="transition-colors hover:bg-slate-50/80">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {person.image_url ? (
                          <img
                            src={person.image_url}
                            alt={person.name_ja}
                            className="h-10 w-10 shrink-0 rounded-full border border-slate-200 object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100">
                            <span className="text-sm text-slate-400">👤</span>
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-slate-900">{person.name_ja}</div>
                          <div className="text-xs text-slate-600">{person.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{person.category?.name_ja}</td>
                    <td className="px-4 py-3 tabular-nums font-bold text-slate-900">{person.score_total}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          person.is_active
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {person.is_active ? t("common.published") : t("common.unpublished")}
                      </span>
                      {person.is_weekly_pick ? (
                        <span className="ml-2 inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                          {t("admin.ppl.featured")}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleEdit(person)}
                        className="mr-3 text-sm font-medium text-[#1e3a8a] hover:underline"
                      >
                        {t("common.edit")}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(person.id)}
                        className="text-sm font-medium text-red-600 hover:underline"
                      >
                        {t("common.delete")}
                      </button>
                    </td>
                  </tr>
                ))}
                {people.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-14 text-center text-sm text-slate-500">
                      {t("admin.ppl.empty")}
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
