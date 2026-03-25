"use client";

import { useState, useEffect } from "react";
import {
  adminGetPeople,
  adminGetCategories,
  adminGetTags,
  adminCreatePerson,
  adminUpdatePerson,
  adminDeletePerson,
  uploadPersonImage,
} from "@/lib/supabase";

export default function AdminPeople() {
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

      if (editingId) {
        await adminUpdatePerson(editingId, dataToSave, selectedTags);
      } else {
        await adminCreatePerson(dataToSave, selectedTags);
      }
      await loadData();
      resetForm();
    } catch (error) {
      console.error("Failed to save person:", error);
      alert("保存に失敗しました: " + error.message);
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
    
    // Get tag IDs for the person
    const personTagNames = person.tags || [];
    const tagIds = tags
      .filter((t) => personTagNames.includes(t.name))
      .map((t) => t.id);
    setSelectedTags(tagIds);
    
    setImageFile(null);
    setImagePreview(person.image_url || null);
    setEditingId(person.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("本当に削除しますか？")) return;
    try {
      await adminDeletePerson(id);
      await loadData();
    } catch (error) {
      console.error("Failed to delete person:", error);
      alert("削除に失敗しました: " + error.message);
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
            <h1 className="text-xl font-bold">人物管理</h1>
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
            <div className="bg-white p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-6">
                {editingId ? "人物編集" : "新規人物"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-[#666] border-b pb-2">基本情報</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">スラッグ (URL用)*</label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full border border-[#e5e5e5] px-3 py-2"
                        placeholder="takeshi-yamamoto"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">カテゴリ*</label>
                      <select
                        value={formData.category_id}
                        onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                        className="w-full border border-[#e5e5e5] px-3 py-2"
                        required
                      >
                        <option value="">選択してください</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name_ja}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">名前（日本語）*</label>
                      <input
                        type="text"
                        value={formData.name_ja}
                        onChange={(e) => setFormData({ ...formData, name_ja: e.target.value })}
                        className="w-full border border-[#e5e5e5] px-3 py-2"
                        placeholder="山本剛志"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">名前（カナ）</label>
                      <input
                        type="text"
                        value={formData.name_kana}
                        onChange={(e) => setFormData({ ...formData, name_kana: e.target.value })}
                        className="w-full border border-[#e5e5e5] px-3 py-2"
                        placeholder="ヤマモトタケシ"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">肩書き*</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full border border-[#e5e5e5] px-3 py-2"
                      placeholder="AI×医療スタートアップCEO"
                      required
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-[#666] border-b pb-2">タグ</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => toggleTag(tag.id)}
                        className={`px-3 py-1 text-sm border transition-colors ${
                          selectedTags.includes(tag.id)
                            ? "bg-[#1e3a8a] text-white border-[#1e3a8a]"
                            : "border-[#e5e5e5] hover:border-[#1e3a8a]"
                        }`}
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scores */}
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-[#666] border-b pb-2">
                    スコア（各0-20点、合計: {calculateTotal()}点）
                  </h3>
                  <div className="grid grid-cols-5 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">清潔感</label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={formData.score_cleanliness}
                        onChange={(e) => setFormData({ ...formData, score_cleanliness: parseInt(e.target.value) || 0 })}
                        className="w-full border border-[#e5e5e5] px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">顔立ち</label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={formData.score_facial}
                        onChange={(e) => setFormData({ ...formData, score_facial: parseInt(e.target.value) || 0 })}
                        className="w-full border border-[#e5e5e5] px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">雰囲気</label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={formData.score_vibe}
                        onChange={(e) => setFormData({ ...formData, score_vibe: parseInt(e.target.value) || 0 })}
                        className="w-full border border-[#e5e5e5] px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">ファッション</label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={formData.score_fashion}
                        onChange={(e) => setFormData({ ...formData, score_fashion: parseInt(e.target.value) || 0 })}
                        className="w-full border border-[#e5e5e5] px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">カリスマ性</label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={formData.score_charisma}
                        onChange={(e) => setFormData({ ...formData, score_charisma: parseInt(e.target.value) || 0 })}
                        className="w-full border border-[#e5e5e5] px-3 py-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-[#666] border-b pb-2">コンテンツ</h3>
                  <div>
                    <label className="block text-sm font-medium mb-1">プロフィール</label>
                    <textarea
                      value={formData.bio_short}
                      onChange={(e) => setFormData({ ...formData, bio_short: e.target.value })}
                      className="w-full border border-[#e5e5e5] px-3 py-2 h-24"
                      placeholder="プロフィール文..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">編集部コメント</label>
                    <textarea
                      value={formData.editorial}
                      onChange={(e) => setFormData({ ...formData, editorial: e.target.value })}
                      className="w-full border border-[#e5e5e5] px-3 py-2 h-32"
                      placeholder="編集部のコメント..."
                    />
                  </div>
                </div>

                {/* Image */}
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-[#666] border-b pb-2">画像</h3>

                  <div className="grid grid-cols-[1fr_200px] gap-6">
                    <div className="space-y-4">
                      {/* Drop zone */}
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
                        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                          dragOver
                            ? 'border-[#1e3a8a] bg-blue-50'
                            : 'border-[#d1d5db] hover:border-[#1e3a8a] hover:bg-[#fafafa]'
                        }`}
                      >
                        <input
                          id="person-image-input"
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setImageFile(file);
                              setImagePreview(URL.createObjectURL(file));
                            }
                          }}
                        />
                        <div className="text-[#666] text-sm">
                          <p className="font-medium mb-1">
                            画像をドラッグ＆ドロップ、またはクリックして選択
                          </p>
                          <p className="text-xs text-[#999]">
                            JPEG / PNG / WebP / GIF（最大5MB）
                          </p>
                        </div>
                        {imageFile && (
                          <p className="mt-2 text-xs text-[#1e3a8a] font-medium">
                            選択中: {imageFile.name}
                          </p>
                        )}
                      </div>

                      {/* Manual URL fallback */}
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          または画像URLを直接入力
                        </label>
                        <input
                          type="url"
                          value={formData.image_url}
                          onChange={(e) => {
                            setFormData({ ...formData, image_url: e.target.value });
                            if (e.target.value) {
                              setImagePreview(e.target.value);
                              setImageFile(null);
                            }
                          }}
                          className="w-full border border-[#e5e5e5] px-3 py-2"
                          placeholder="https://..."
                          disabled={!!imageFile}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">画像Alt</label>
                        <input
                          type="text"
                          value={formData.image_alt}
                          onChange={(e) => setFormData({ ...formData, image_alt: e.target.value })}
                          className="w-full border border-[#e5e5e5] px-3 py-2"
                          placeholder="山本剛志"
                        />
                      </div>
                    </div>

                    {/* Preview */}
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs text-[#666] font-medium">プレビュー</span>
                      {imagePreview ? (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="プレビュー"
                            className="w-[180px] h-[180px] object-cover rounded-lg border border-[#e5e5e5]"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview(null);
                              setFormData({ ...formData, image_url: '' });
                            }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div className="w-[180px] h-[180px] bg-[#f5f5f5] border border-[#e5e5e5] rounded-lg flex items-center justify-center">
                          <span className="text-[#ccc] text-3xl">📷</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-[#666] border-b pb-2">リンク</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">X (Twitter)</label>
                      <input
                        type="url"
                        value={formData.link_x}
                        onChange={(e) => setFormData({ ...formData, link_x: e.target.value })}
                        className="w-full border border-[#e5e5e5] px-3 py-2"
                        placeholder="https://x.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Instagram</label>
                      <input
                        type="url"
                        value={formData.link_instagram}
                        onChange={(e) => setFormData({ ...formData, link_instagram: e.target.value })}
                        className="w-full border border-[#e5e5e5] px-3 py-2"
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">公式サイト</label>
                      <input
                        type="url"
                        value={formData.link_official}
                        onChange={(e) => setFormData({ ...formData, link_official: e.target.value })}
                        className="w-full border border-[#e5e5e5] px-3 py-2"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>

                {/* SEO */}
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-[#666] border-b pb-2">SEO</h3>
                  <div>
                    <label className="block text-sm font-medium mb-1">メタタイトル</label>
                    <input
                      type="text"
                      value={formData.meta_title}
                      onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                      className="w-full border border-[#e5e5e5] px-3 py-2"
                      placeholder="山本剛志 | スタートアップ | イケメン名鑑"
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
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-[#666] border-b pb-2">設定</h3>
                  <div className="grid grid-cols-3 gap-4">
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
                          checked={formData.is_weekly_pick}
                          onChange={(e) => setFormData({ ...formData, is_weekly_pick: e.target.checked })}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">今週の注目</span>
                      </label>
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
                </div>

                <div className="flex gap-4 pt-4 border-t">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="bg-[#1e3a8a] text-white px-6 py-2 hover:bg-[#15296b] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? '保存中...' : '保存'}
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

        {/* People List */}
        <div className="bg-white border border-[#e5e5e5]">
          <table className="w-full">
            <thead className="bg-[#fafafa] border-b border-[#e5e5e5]">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium">名前</th>
                <th className="text-left px-4 py-3 text-sm font-medium">カテゴリ</th>
                <th className="text-left px-4 py-3 text-sm font-medium">スコア</th>
                <th className="text-left px-4 py-3 text-sm font-medium">ステータス</th>
                <th className="text-right px-4 py-3 text-sm font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {people.map((person) => (
                <tr key={person.id} className="border-b border-[#e5e5e5] last:border-b-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {person.image_url ? (
                        <img
                          src={person.image_url}
                          alt={person.name_ja}
                          className="w-10 h-10 rounded-full object-cover border border-[#e5e5e5] flex-shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#f0f0f0] border border-[#e5e5e5] flex items-center justify-center flex-shrink-0">
                          <span className="text-[#ccc] text-sm">👤</span>
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{person.name_ja}</div>
                        <div className="text-xs text-[#666]">{person.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{person.category?.name_ja}</td>
                  <td className="px-4 py-3 text-sm font-bold">{person.score_total}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 ${
                        person.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {person.is_active ? "公開中" : "非公開"}
                    </span>
                    {person.is_weekly_pick && (
                      <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 ml-2">
                        注目
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleEdit(person)}
                      className="text-sm text-[#1e3a8a] hover:underline mr-4"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDelete(person.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
              {people.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-[#666]">
                    人物がありません
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
