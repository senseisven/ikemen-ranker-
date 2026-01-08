"use client";

import { useState } from "react";

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    links: "",
    reason: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const submissions = JSON.parse(localStorage.getItem("submissions") || "[]");
    submissions.push({
      ...formData,
      submittedAt: new Date().toISOString(),
    });
    localStorage.setItem("submissions", JSON.stringify(submissions));

    setSubmitted(true);
    setFormData({ name: "", category: "", links: "", reason: "" });

    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-[700px] mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-4">掲載リクエスト</h1>
      <p className="text-[#666] leading-relaxed mb-12">
        各界で活躍するイケメンの掲載をリクエストできます。編集部で審議の上、掲載可否を判断いたします。
      </p>

      {submitted && (
        <div className="bg-[#f0f9ff] border border-[#bae6fd] text-[#0c4a6e] px-6 py-4 mb-8">
          送信を受け付けました。ご提案ありがとうございます。（デモ環境のため、実際の送信は行われません）
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-bold mb-2 text-sm">
            お名前 <span className="text-[#dc2626]">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-[#e5e5e5] px-4 py-3 focus:outline-none focus:border-[#1e3a8a] transition-colors"
            placeholder="山田太郎"
          />
        </div>

        <div>
          <label htmlFor="category" className="block font-bold mb-2 text-sm">
            カテゴリ <span className="text-[#dc2626]">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border border-[#e5e5e5] px-4 py-3 focus:outline-none focus:border-[#1e3a8a] transition-colors bg-white"
          >
            <option value="">選択してください</option>
            <option value="startup">スタートアップ</option>
            <option value="actor">俳優</option>
            <option value="athlete">アスリート</option>
            <option value="model">モデル</option>
            <option value="youtuber">YouTuber</option>
            <option value="musician">ミュージシャン</option>
            <option value="other">その他</option>
          </select>
        </div>

        <div>
          <label htmlFor="links" className="block font-bold mb-2 text-sm">
            関連リンク
          </label>
          <textarea
            id="links"
            name="links"
            value={formData.links}
            onChange={handleChange}
            rows={3}
            className="w-full border border-[#e5e5e5] px-4 py-3 focus:outline-none focus:border-[#1e3a8a] transition-colors resize-none"
            placeholder="公式サイト、SNS、Wikipediaなど（複数可）"
          />
          <p className="text-xs text-[#999] mt-1">
            1行に1つずつ入力してください
          </p>
        </div>

        <div>
          <label htmlFor="reason" className="block font-bold mb-2 text-sm">
            推薦理由 <span className="text-[#dc2626]">*</span>
          </label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            rows={5}
            className="w-full border border-[#e5e5e5] px-4 py-3 focus:outline-none focus:border-[#1e3a8a] transition-colors resize-none"
            placeholder="なぜこの人物を掲載すべきか、理由をお書きください"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#1e3a8a] text-white px-6 py-4 hover:bg-[#1e40af] transition-colors font-bold"
        >
          送信する
        </button>

        <p className="text-xs text-[#999] leading-relaxed">
          送信いただいた情報は編集部で確認し、掲載可否を判断いたします。すべてのリクエストに対応できるわけではありませんので、予めご了承ください。なお、本サイトはデモ環境のため、送信された情報はブラウザのローカルストレージに保存され、実際の送信は行われません。
        </p>
      </form>
    </div>
  );
}
