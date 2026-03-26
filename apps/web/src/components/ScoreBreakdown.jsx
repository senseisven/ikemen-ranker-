import { useTranslation } from "@/lib/i18n";

export default function ScoreBreakdown({ scores, total }) {
  const { t } = useTranslation();

  const scoreLabels = {
    cleanliness: t("score.cleanliness"),
    facial: t("score.facial"),
    vibe: t("score.vibe"),
    fashion: t("score.fashion"),
    charisma: t("score.charisma"),
  };

  return (
    <div>
      <div className="mb-8 pb-6 border-b border-[#e5e5e5]">
        <div className="text-center">
          <div className="text-sm text-[#999] mb-2">{t("score.overall")}</div>
          <div className="text-5xl font-bold">{total}</div>
          <div className="text-sm text-[#999]">/ 100</div>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(scores).map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between mb-2">
              <span className="font-bold text-sm">{scoreLabels[key]}</span>
              <span className="text-sm">{value} / 20</span>
            </div>
            <div className="h-2 bg-[#f5f5f5] relative overflow-hidden">
              <div
                className="h-full bg-[#1e3a8a]"
                style={{ width: `${(value / 20) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
