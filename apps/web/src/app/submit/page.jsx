"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n";

export default function SubmitPage() {
  const { t } = useTranslation();
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
      <h1 className="text-3xl font-bold tracking-tight mb-4">{t("submit.title")}</h1>
      <p className="text-[#666] leading-relaxed mb-12">
        {t("submit.description")}
      </p>

      {submitted && (
        <div className="bg-[#f0f9ff] border border-[#bae6fd] text-[#0c4a6e] px-6 py-4 mb-8">
          {t("submit.success")}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-bold mb-2 text-sm">
            {t("submit.name.label")} <span className="text-[#dc2626]">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-[#e5e5e5] px-4 py-3 focus:outline-none focus:border-[#1e3a8a] transition-colors"
            placeholder={t("submit.name.placeholder")}
          />
        </div>

        <div>
          <label htmlFor="category" className="block font-bold mb-2 text-sm">
            {t("submit.category.label")} <span className="text-[#dc2626]">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border border-[#e5e5e5] px-4 py-3 focus:outline-none focus:border-[#1e3a8a] transition-colors bg-white"
          >
            <option value="">{t("submit.category.placeholder")}</option>
            <option value="startup">{t("submit.category.startup")}</option>
            <option value="actor">{t("submit.category.actor")}</option>
            <option value="athlete">{t("submit.category.athlete")}</option>
            <option value="model">{t("submit.category.model")}</option>
            <option value="youtuber">{t("submit.category.youtuber")}</option>
            <option value="musician">{t("submit.category.musician")}</option>
            <option value="other">{t("submit.category.other")}</option>
          </select>
        </div>

        <div>
          <label htmlFor="links" className="block font-bold mb-2 text-sm">
            {t("submit.links.label")}
          </label>
          <textarea
            id="links"
            name="links"
            value={formData.links}
            onChange={handleChange}
            rows={3}
            className="w-full border border-[#e5e5e5] px-4 py-3 focus:outline-none focus:border-[#1e3a8a] transition-colors resize-none"
            placeholder={t("submit.links.placeholder")}
          />
          <p className="text-xs text-[#999] mt-1">
            {t("submit.links.hint")}
          </p>
        </div>

        <div>
          <label htmlFor="reason" className="block font-bold mb-2 text-sm">
            {t("submit.reason.label")} <span className="text-[#dc2626]">*</span>
          </label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            rows={5}
            className="w-full border border-[#e5e5e5] px-4 py-3 focus:outline-none focus:border-[#1e3a8a] transition-colors resize-none"
            placeholder={t("submit.reason.placeholder")}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#1e3a8a] text-white px-6 py-4 hover:bg-[#1e40af] transition-colors font-bold"
        >
          {t("submit.button")}
        </button>

        <p className="text-xs text-[#999] leading-relaxed">
          {t("submit.disclaimer")}
        </p>
      </form>
    </div>
  );
}
