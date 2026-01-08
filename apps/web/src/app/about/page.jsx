export const metadata = {
  title: "編集方針 | イケメン名鑑",
  description: "イケメン名鑑の編集方針、評価基準、掲載・削除申請について。",
};

export default function AboutPage() {
  return (
    <div className="max-w-[800px] mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-12">編集方針</h1>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b border-[#e5e5e5]">
          イケメン名鑑について
        </h2>
        <p className="text-[#666] leading-relaxed mb-4">
          イケメン名鑑は、各界で活躍する男性を編集部が独自の基準で評価し、掲載するサイトです。スタートアップ、エンターテイメント、スポーツなど、多彩なカテゴリから注目の人物を厳選しています。
        </p>
        <p className="text-[#666] leading-relaxed">
          本サイトの評価は編集部による主観的な判断に基づいており、個人の容姿だけでなく、実績、影響力、雰囲気、ファッションセンスなど、総合的な魅力を考慮しています。
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b border-[#e5e5e5]">
          評価基準
        </h2>
        <p className="text-[#666] leading-relaxed mb-4">
          各人物は以下の5つの観点から評価されます。各項目0〜20点の配点で、合計100点満点としています。
        </p>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="font-bold text-sm w-24 flex-shrink-0">清潔感</span>
            <span className="text-sm text-[#666]">
              身だしなみ、肌質、ヘアスタイルなどの清潔感
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-sm w-24 flex-shrink-0">顔立ち</span>
            <span className="text-sm text-[#666]">
              顔のバランス、パーツの整い方
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-sm w-24 flex-shrink-0">雰囲気</span>
            <span className="text-sm text-[#666]">
              佇まい、オーラ、表情などから醸し出される雰囲気
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-sm w-24 flex-shrink-0">
              ファッション
            </span>
            <span className="text-sm text-[#666]">
              服装のセンス、着こなし、スタイリング
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-sm w-24 flex-shrink-0">
              カリスマ
            </span>
            <span className="text-sm text-[#666]">
              実績、影響力、人間性から感じられる魅力
            </span>
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b border-[#e5e5e5]">
          掲載リクエスト
        </h2>
        <p className="text-[#666] leading-relaxed mb-4">
          各界で活躍する男性の掲載をリクエストできます。編集部で審議の上、掲載可否を判断いたします。
        </p>
        <a
          href="/submit"
          className="inline-block border border-[#1e3a8a] text-[#1e3a8a] px-6 py-3 hover:bg-[#1e3a8a] hover:text-white transition-colors text-sm"
        >
          掲載リクエストフォームへ
        </a>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b border-[#e5e5e5]">
          掲載情報の訂正・削除申請
        </h2>
        <p className="text-[#666] leading-relaxed mb-4">
          掲載情報に誤りがある場合、または掲載の削除を希望される場合は、以下の情報を明記の上、編集部までご連絡ください。
        </p>
        <ul className="space-y-2 text-sm text-[#666] mb-4">
          <li className="flex gap-2">
            <span className="flex-shrink-0">・</span>
            <span>掲載されている名前とページURL</span>
          </li>
          <li className="flex gap-2">
            <span className="flex-shrink-0">・</span>
            <span>訂正・削除を希望する理由</span>
          </li>
          <li className="flex gap-2">
            <span className="flex-shrink-0">・</span>
            <span>ご本人確認が可能な情報（削除申請の場合）</span>
          </li>
        </ul>
        <p className="text-sm text-[#999]">
          連絡先:
          info@ikemen-meikan.jp（デモサイトのため、実際のメールアドレスではありません）
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b border-[#e5e5e5]">
          プライバシーポリシー
        </h2>
        <p className="text-[#666] leading-relaxed mb-4">
          本サイトは、公開情報に基づいて編集・掲載を行っています。個人のプライバシーに配慮し、センシティブな情報の掲載は行いません。
        </p>
        <p className="text-[#666] leading-relaxed">
          ユーザーの投票情報は、ブラウザのローカルストレージに保存され、サーバーには送信されません。
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 pb-2 border-b border-[#e5e5e5]">
          免責事項
        </h2>
        <p className="text-[#666] leading-relaxed mb-4">
          本サイトの情報は、編集部の調査に基づいて掲載していますが、正確性を保証するものではありません。掲載情報の利用により生じたいかなる損害についても、当サイトは責任を負いません。
        </p>
        <p className="text-[#666] leading-relaxed">
          評価は編集部の主観的な判断に基づくものであり、個人の価値を決定づけるものではありません。
        </p>
      </section>
    </div>
  );
}
