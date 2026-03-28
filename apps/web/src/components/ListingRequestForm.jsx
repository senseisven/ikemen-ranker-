"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n";

const inputClass =
  "w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900/10";

/**
 * @param {{ variant?: "standalone" | "embedded" }} props
 */
export function ListingRequestForm({ variant = "standalone" }) {
  const { t } = useTranslation();
  const embedded = variant === "embedded";
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    links: "",
    reason: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/submit-listing-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(data.error || t("submit.errorGeneric"));
        return;
      }
      setSubmitted(true);
      setFormData({ name: "", category: "", links: "", reason: "" });
      setTimeout(() => setSubmitted(false), 8000);
    } catch {
      setSubmitError(t("submit.errorGeneric"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formInner = (
    <>
      {submitError && (
        <div
          role="alert"
          className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
        >
          {submitError}
        </div>
      )}

      {submitted && (
        <div className="mb-4 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800">
          {t("submit.success")}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className=" sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 space-y-4">
          <div>
            <label htmlFor={embedded ? "home-req-name" : "name"} className="mb-1 block text-xs font-medium text-slate-600">
              {t("submit.name.label")} <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id={embedded ? "home-req-name" : "name"}
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder={t("submit.name.placeholder")}
            />
          </div>
          <div>
            <label htmlFor={embedded ? "home-req-category" : "category"} className="mb-1 block text-xs font-medium text-slate-600">
              {t("submit.category.label")} <span className="text-red-600">*</span>
            </label>
            <select
              id={embedded ? "home-req-category" : "category"}
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className={inputClass}
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
        </div>

        <div>
          <label htmlFor={embedded ? "home-req-links" : "links"} className="mb-1 block text-xs font-medium text-slate-600">
            {t("submit.links.label")}
          </label>
          <textarea
            id={embedded ? "home-req-links" : "links"}
            name="links"
            value={formData.links}
            onChange={handleChange}
            rows={embedded ? 2 : 3}
            className={`${inputClass} resize-y`}
            placeholder={t("submit.links.placeholder")}
          />
          <p className="mt-1 text-xs text-slate-400">{t("submit.links.hint")}</p>
        </div>

        <div>
          <label htmlFor={embedded ? "home-req-reason" : "reason"} className="mb-1 block text-xs font-medium text-slate-600">
            {t("submit.reason.label")} <span className="text-red-600">*</span>
          </label>
          <textarea
            id={embedded ? "home-req-reason" : "reason"}
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            rows={embedded ? 3 : 4}
            className={`${inputClass} resize-y`}
            placeholder={t("submit.reason.placeholder")}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? t("submit.sending") : t("submit.button")}
        </button>

        <p className="text-xs leading-relaxed text-slate-400">{t("submit.disclaimer")}</p>
      </form>
    </>
  );

  if (embedded) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-base font-semibold tracking-tight text-slate-900">{t("submit.title")}</h2>
        <p className="mt-1 text-sm text-slate-500">{t("submit.description")}</p>
        <div className="mt-6">{formInner}</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-16">
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900">{t("submit.title")}</h1>
      <p className="mb-10 text-slate-600">{t("submit.description")}</p>
      {formInner}
    </div>
  );
}
