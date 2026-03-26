import { useTranslation } from "@/lib/i18n";

export default function LanguageToggle() {
  const { lang, setLang, t, mounted } = useTranslation();

  return (
    <button
      onClick={() => setLang(lang === "ja" ? "en" : "ja")}
      className="ml-4 px-3 py-1 text-xs font-bold border border-slate-300 rounded-sm bg-white text-slate-700 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-200 tracking-wider"
      aria-label={t("lang.ariaLabel")}
      suppressHydrationWarning
    >
      {t("lang.toggle")}
    </button>
  );
}
