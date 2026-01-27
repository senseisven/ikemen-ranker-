"use client";

import { useState, useEffect } from "react";
import { adminGetCategories, adminCreateCategory, adminUpdateCategory, adminDeleteCategory } from "@/lib/supabase";

export default function AdminCategories() {
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
    // Check auth
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
      alert("保存に失敗しました: " + error.message);
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
    if (!confirm("本当に削除しますか？関連する人物も削除されます。")) return;
    try {
      await adminDeleteCategory(id);
      await loadCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
      alert("削除に失敗しました: " + error.message);
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
      <div className="min-h-screen flex items-center justify-center">
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="bg-white border-b border-[#e5e5e5]">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/admin" className="text-[#666] hover:text-[#1e3a8a]">← 戻る</a>
            <h1 className="text-xl font-bold">カテゴリ管理</h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#1e3a8a] text-white px-4 py-2 text-sm hover:bg-[#15296b]"
          >
            新規作成
          </button>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-6">
                {editingId ? "カテゴリ編集" : "新規カテゴリ"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">スラッグ (URL用)</label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full border border-[#e5e5e5] px-3 py-2"
                      placeholder="startup"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">カテゴリ名（日本語）</label>
                    <input
                      type="text"
                      value={formData.name_ja}
                      onChange={(e) => setFormData({ ...formData, name_ja: e.target.value })}
                      className="w-full border border-[#e5e5e5] px-3 py-2"
                      placeholder="スタートアップ"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">説明</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border border-[#e5e5e5] px-3 py-2 h-24"
                    placeholder="カテゴリの説明文..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">メタタイトル (SEO)</label>
                  <input
                    type="text"
                    value={formData.meta_title}
                    onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                    className="w-full border border-[#e5e5e5] px-3 py-2"
                    placeholder="スタートアップイケメン | イケメン名鑑"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">メタディスクリプション (SEO)</label>
                  <textarea
                    value={formData.meta_description}
                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                    className="w-full border border-[#e5e5e5] px-3 py-2 h-20"
                    placeholder="検索エンジン向けの説明文..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">表示順</label>
                    <input
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                      className="w-full border border-[#e5e5e5] px-3 py-2"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">公開する</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="bg-[#1e3a8a] text-white px-6 py-2 hover:bg-[#15296b]"
                  >
                    保存
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="border border-[#e5e5e5] px-6 py-2 hover:bg-[#f5f5f5]"
                  >
                    キャンセル
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Categories List */}
        <div className="bg-white border border-[#e5e5e5]">
          <table className="w-full">
            <thead className="bg-[#fafafa] border-b border-[#e5e5e5]">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium">順序</th>
                <th className="text-left px-4 py-3 text-sm font-medium">スラッグ</th>
                <th className="text-left px-4 py-3 text-sm font-medium">カテゴリ名</th>
                <th className="text-left px-4 py-3 text-sm font-medium">ステータス</th>
                <th className="text-right px-4 py-3 text-sm font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b border-[#e5e5e5] last:border-b-0">
                  <td className="px-4 py-3 text-sm">{category.display_order}</td>
                  <td className="px-4 py-3 text-sm font-mono">{category.slug}</td>
                  <td className="px-4 py-3">{category.name_ja}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 ${
                        category.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {category.is_active ? "公開中" : "非公開"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleEdit(category)}
                      className="text-sm text-[#1e3a8a] hover:underline mr-4"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-[#666]">
                    カテゴリがありません
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
