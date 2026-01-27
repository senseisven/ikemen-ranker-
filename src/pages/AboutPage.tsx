import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <section className="border-b border-border">
        <div className="container-editorial py-4">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              トップ
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">編集方針</span>
          </nav>
        </div>
      </section>

      {/* Content */}
      <article className="section-spacing">
        <div className="container-editorial max-w-3xl">
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-8">
            編集方針
          </h1>

          <div className="prose prose-neutral max-w-none space-y-8">
            <section>
              <h2 className="font-heading text-lg font-bold text-foreground mb-3">
                本サイトについて
              </h2>
              <p className="text-foreground leading-relaxed">
                「イケメン名鑑」は、各界で活躍する男性を独自の視点で紹介するウェブサイトです。
                スタートアップ経営者、俳優、アスリート、モデル、YouTuber、ミュージシャンなど、
                多様なカテゴリーから注目の人物をピックアップし、その魅力を解説します。
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-foreground mb-3">
                ランキング・評価について
              </h2>
              <p className="text-foreground leading-relaxed mb-3">
                本サイトに掲載されているランキングおよびスコアは、すべて編集部による主観的な評価です。
                客観的な指標やデータに基づくものではなく、あくまでエンターテインメントとしてお楽しみください。
              </p>
              <p className="text-foreground leading-relaxed">
                評価項目は「清潔感」「顔立ち」「雰囲気」「ファッション」「カリスマ」の5項目で、
                各20点満点、合計100点満点で採点しています。
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-foreground mb-3">
                掲載情報の正確性
              </h2>
              <p className="text-foreground leading-relaxed">
                掲載情報は公開されている情報を元に編集部が作成していますが、
                内容の正確性を保証するものではありません。
                誤りや最新でない情報が含まれている可能性があります。
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-foreground mb-3">
                情報の修正・削除依頼
              </h2>
              <p className="text-foreground leading-relaxed mb-3">
                掲載情報に誤りがある場合、または掲載の削除を希望される場合は、
                以下の連絡先までご連絡ください。
              </p>
              <p className="text-muted-foreground">
                メール: info@ikemen-meikan.example.com
              </p>
              <p className="text-foreground leading-relaxed mt-3">
                ご本人様または正式な代理人様からのご依頼に限り、確認の上、速やかに対応いたします。
                削除依頼の際は、ご本人確認のための情報をお伝えいただく場合があります。
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-foreground mb-3">
                プライバシーポリシー
              </h2>
              <p className="text-foreground leading-relaxed mb-3">
                本サイトでは、投票機能においてローカルストレージを使用して投票情報を保存しています。
                この情報はお使いのブラウザにのみ保存され、外部サーバーには送信されません。
              </p>
              <p className="text-foreground leading-relaxed">
                掲載依頼フォームから送信された情報は、デモ版のため実際には送信されず、
                ローカルストレージに保存されるのみです。
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-foreground mb-3">
                免責事項
              </h2>
              <p className="text-foreground leading-relaxed">
                本サイトの利用によって生じたいかなる損害についても、
                編集部は責任を負いかねます。
                情報の利用は自己責任でお願いいたします。
              </p>
            </section>

            <section className="border-t border-border pt-8">
              <p className="text-sm text-muted-foreground">
                最終更新: 2024年3月
              </p>
              <p className="text-xs text-muted-foreground mt-2">
              </p>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
};

export default AboutPage;
