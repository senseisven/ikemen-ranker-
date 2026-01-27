"use client";

import { useState, useEffect } from "react";
import { adminGetTags, adminCreateTag, adminUpdateTag, adminDeleteTag } from "@/lib/supabase";

export default function AdminTags() {
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
      alert("保存に失敗しました: " + error.message);
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
    if (!confirm("本当に削除しますか？")) return;
    try {
      await adminDeleteTag(id);
      await loadTags();
    } catch (error) {
      console.error("Failed to delete tag:", error);
      alert("削除に失敗しました: " + error.message);
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
            <h1 className="text-xl font-bold">タグ管理</h1>
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
            <div className="bg-white p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-6">
                {editingId ? "タグ編集" : "新規タグ"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">タグ名</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-[#e5e5e5] px-3 py-2"
                    placeholder="爽やか"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">表示順</label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                    className="w-full border border-[#e5e5e5] px-3 py-2"
                  />
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

        {/* Tags List */}
        <div className="bg-white border border-[#e5e5e5]">
          <table className="w-full">
            <thead className="bg-[#fafafa] border-b border-[#e5e5e5]">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium">順序</th>
                <th className="text-left px-4 py-3 text-sm font-medium">タグ名</th>
                <th className="text-right px-4 py-3 text-sm font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag) => (
                <tr key={tag.id} className="border-b border-[#e5e5e5] last:border-b-0">
                  <td className="px-4 py-3 text-sm">{tag.display_order}</td>
                  <td className="px-4 py-3">{tag.name}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleEdit(tag)}
                      className="text-sm text-[#1e3a8a] hover:underline mr-4"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDelete(tag.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
              {tags.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-[#666]">
                    タグがありません
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
