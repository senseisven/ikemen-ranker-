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

export default function AdminArticles() {
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
      alert("保存に失敗しました: " + error.message);
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
    if (!confirm("本当に削除しますか？")) return;
    try {
      await adminDeleteArticle(id);
      await loadData();
    } catch (error) {
      console.error("Failed to delete article:", error);
      alert("削除に失敗しました: " + error.message);
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
            <h1 className="text-xl font-bold">記事管理</h1>
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
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 w-full max-w-5xl max-h-[95vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-6">
                {editingId ? "記事編集" : "新規記事"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">スラッグ (URL用)*</label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full border border-[#e5e5e5] px-3 py-2"
                      placeholder="article-title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">タイトル*</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full border border-[#e5e5e5] px-3 py-2"
                      placeholder="記事タイトル"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">関連カテゴリ</label>
                    <select
                      value={formData.category_id}
                      onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                      className="w-full border border-[#e5e5e5] px-3 py-2"
                    >
                      <option value="">なし</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name_ja}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">関連人物</label>
                    <select
                      value={formData.person_id}
                      onChange={(e) => setFormData({ ...formData, person_id: e.target.value })}
                      className="w-full border border-[#e5e5e5] px-3 py-2"
                    >
                      <option value="">なし</option>
                      {people.map((person) => (
                        <option key={person.id} value={person.id}>
                          {person.name_ja} ({person.category?.name_ja})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">抜粋</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full border border-[#e5e5e5] px-3 py-2 h-20"
                    placeholder="記事の抜粋..."
                  />
                </div>

                {/* TinyMCE Editor */}
                <div>
                  <label className="block text-sm font-medium mb-1">本文</label>
                  <Editor
                    apiKey="nn4binis9k4dzuafzo2wvdl6jobzmh8e4g6hfjvs62zroxvd"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue={formData.content}
                    init={{
                      height: 500,
                      menubar: true,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "link image media | removeformat | help",
                      content_style:
                        'body { font-family: "Noto Sans JP", Helvetica, Arial, sans-serif; font-size: 14px; }',
                      language: "ja",
                      language_url: "/tinymce/langs/ja.js",
                    }}
                  />
                </div>

                {/* Image */}
                <div>
                  <label className="block text-sm font-medium mb-1">アイキャッチ画像URL</label>
                  <input
                    type="url"
                    value={formData.featured_image_url}
                    onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
                    className="w-full border border-[#e5e5e5] px-3 py-2"
                    placeholder="https://..."
                  />
                </div>

                {/* SEO */}
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-[#666] border-b pb-2">SEO設定</h3>
                  <div>
                    <label className="block text-sm font-medium mb-1">メタタイトル</label>
                    <input
                      type="text"
                      value={formData.meta_title}
                      onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                      className="w-full border border-[#e5e5e5] px-3 py-2"
                      placeholder="記事タイトル | イケメン名鑑"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">メタディスクリプション</label>
                    <textarea
                      value={formData.meta_description}
                      onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                      className="w-full border border-[#e5e5e5] px-3 py-2 h-20"
                      placeholder="検索エンジン向けの説明文..."
                    />
                  </div>
                </div>

                {/* Settings */}
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
                        checked={formData.is_published}
                        onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">公開する</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t">
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

        {/* Articles List */}
        <div className="bg-white border border-[#e5e5e5]">
          <table className="w-full">
            <thead className="bg-[#fafafa] border-b border-[#e5e5e5]">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium">タイトル</th>
                <th className="text-left px-4 py-3 text-sm font-medium">カテゴリ</th>
                <th className="text-left px-4 py-3 text-sm font-medium">ステータス</th>
                <th className="text-left px-4 py-3 text-sm font-medium">作成日</th>
                <th className="text-right px-4 py-3 text-sm font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-b border-[#e5e5e5] last:border-b-0">
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium">{article.title}</div>
                      <div className="text-xs text-[#666] font-mono">{article.slug}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{article.category?.name_ja || "-"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 ${
                        article.is_published
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {article.is_published ? "公開中" : "下書き"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#666]">
                    {new Date(article.created_at).toLocaleDateString("ja-JP")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleEdit(article)}
                      className="text-sm text-[#1e3a8a] hover:underline mr-4"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
              {articles.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-[#666]">
                    記事がありません
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
