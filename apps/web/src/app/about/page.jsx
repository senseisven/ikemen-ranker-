import { useTranslation } from "@/lib/i18n";

export function meta() {
  return [
    { title: "編集方針 | イケメン名鑑" },
    { name: "description", content: "イケメン名鑑の編集方針、評価基準、掲載・削除申請について。" },
  ];
}

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <div className="fixed inset-0 -z-10 bg-slate-50" aria-hidden="true" />
      <div className="max-w-[800px] mx-auto px-6 py-20">
        <div className="w-12 h-0.5 bg-gradient-to-r from-cyber-cyan to-cyber-purple mb-8" />
        <h1 className="font-display text-4xl font-bold tracking-wide mb-16 text-gradient-neon">{t("about.title")}</h1>

        <section className="mb-12">
          <h2 className="font-display text-xl font-bold mb-4 pb-2 border-b border-slate-200 text-indigo-600">
            {t("about.section1.title")}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            {t("about.section1.p1")}
          </p>
          <p className="text-slate-600 leading-relaxed">
            {t("about.section1.p2")}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b border-slate-200">
            {t("about.section2.title")}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            {t("about.section2.intro")}
          </p>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="font-bold text-sm w-24 flex-shrink-0">{t("about.criteria.cleanliness")}</span>
              <span className="text-sm text-slate-600">{t("about.criteria.cleanliness.desc")}</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-sm w-24 flex-shrink-0">{t("about.criteria.facial")}</span>
              <span className="text-sm text-slate-600">{t("about.criteria.facial.desc")}</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-sm w-24 flex-shrink-0">{t("about.criteria.vibe")}</span>
              <span className="text-sm text-slate-600">{t("about.criteria.vibe.desc")}</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-sm w-24 flex-shrink-0">{t("about.criteria.fashion")}</span>
              <span className="text-sm text-slate-600">{t("about.criteria.fashion.desc")}</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-sm w-24 flex-shrink-0">{t("about.criteria.charisma")}</span>
              <span className="text-sm text-slate-600">{t("about.criteria.charisma.desc")}</span>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b border-slate-200">
            {t("about.section3.title")}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            {t("about.section3.description")}
          </p>
          <a
            href="/submit"
            className="inline-block border border-indigo-600 text-indigo-600 px-6 py-3 hover:bg-indigo-50 transition-colors text-sm"
          >
            {t("about.section3.link")}
          </a>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b border-slate-200">
            {t("about.section4.title")}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            {t("about.section4.description")}
          </p>
          <ul className="space-y-2 text-sm text-slate-600 mb-4">
            <li className="flex gap-2">
              <span className="flex-shrink-0">・</span>
              <span>{t("about.section4.item1")}</span>
            </li>
            <li className="flex gap-2">
              <span className="flex-shrink-0">・</span>
              <span>{t("about.section4.item2")}</span>
            </li>
            <li className="flex gap-2">
              <span className="flex-shrink-0">・</span>
              <span>{t("about.section4.item3")}</span>
            </li>
          </ul>
          <p className="text-sm text-slate-500">
            {t("about.section4.contact")}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b border-slate-200">
            {t("about.section5.title")}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            {t("about.section5.p1")}
          </p>
          <p className="text-slate-600 leading-relaxed">
            {t("about.section5.p2")}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 pb-2 border-b border-slate-200">
            {t("about.section6.title")}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            {t("about.section6.p1")}
          </p>
          <p className="text-slate-600 leading-relaxed">
            {t("about.section6.p2")}
          </p>
        </section>
      </div>
    </div>
  );
}
