export const metadata = {
  title: "イケメン名鑑 | 各界で活躍するイケメンランキング",
  description:
    "スタートアップ、俳優、アスリート、モデル、YouTuber、ミュージシャンなど、各界で活躍するイケメンを厳選して掲載。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="antialiased bg-white text-[#1a1a1a]"
        style={{
          fontFamily: '"Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif',
        }}
      >
        <header className="border-b border-[#e5e5e5]">
          <div className="max-w-[1200px] mx-auto px-6 py-4">
            <nav className="flex items-center justify-between">
              <a href="/" className="text-xl font-bold tracking-tight">
                イケメン名鑑
              </a>
              <div className="flex gap-8 text-sm">
                <a
                  href="/c/startup"
                  className="hover:text-[#1e3a8a] transition-colors"
                >
                  スタートアップ
                </a>
                <a
                  href="/c/actor"
                  className="hover:text-[#1e3a8a] transition-colors"
                >
                  俳優
                </a>
                <a
                  href="/c/athlete"
                  className="hover:text-[#1e3a8a] transition-colors"
                >
                  アスリート
                </a>
                <a
                  href="/c/model"
                  className="hover:text-[#1e3a8a] transition-colors"
                >
                  モデル
                </a>
                <a
                  href="/c/youtuber"
                  className="hover:text-[#1e3a8a] transition-colors"
                >
                  YouTuber
                </a>
                <a
                  href="/c/musician"
                  className="hover:text-[#1e3a8a] transition-colors"
                >
                  ミュージシャン
                </a>
                <a
                  href="/about"
                  className="hover:text-[#1e3a8a] transition-colors"
                >
                  編集方針
                </a>
              </div>
            </nav>
          </div>
        </header>

        <main className="min-h-screen">{children}</main>

        <footer className="border-t border-[#e5e5e5] mt-24 bg-[#fafafa]">
          <div className="max-w-[1200px] mx-auto px-6 py-12">
            <div className="grid grid-cols-3 gap-12 mb-8">
              <div>
                <h3 className="font-bold mb-4">イケメン名鑑について</h3>
                <p className="text-sm text-[#666] leading-relaxed">
                  各界で活躍するイケメンを編集部が厳選して掲載。主観的な評価に基づくランキングです。
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-4">カテゴリ</h3>
                <div className="flex flex-col gap-2 text-sm">
                  <a
                    href="/c/startup"
                    className="text-[#666] hover:text-[#1e3a8a]"
                  >
                    スタートアップ
                  </a>
                  <a
                    href="/c/actor"
                    className="text-[#666] hover:text-[#1e3a8a]"
                  >
                    俳優
                  </a>
                  <a
                    href="/c/athlete"
                    className="text-[#666] hover:text-[#1e3a8a]"
                  >
                    アスリート
                  </a>
                  <a
                    href="/c/model"
                    className="text-[#666] hover:text-[#1e3a8a]"
                  >
                    モデル
                  </a>
                  <a
                    href="/c/youtuber"
                    className="text-[#666] hover:text-[#1e3a8a]"
                  >
                    YouTuber
                  </a>
                  <a
                    href="/c/musician"
                    className="text-[#666] hover:text-[#1e3a8a]"
                  >
                    ミュージシャン
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-4">サイト情報</h3>
                <div className="flex flex-col gap-2 text-sm">
                  <a href="/about" className="text-[#666] hover:text-[#1e3a8a]">
                    編集方針
                  </a>
                  <a
                    href="/submit"
                    className="text-[#666] hover:text-[#1e3a8a]"
                  >
                    掲載リクエスト
                  </a>
                </div>
              </div>
            </div>
            <div className="text-xs text-[#999] pt-8 border-t border-[#e5e5e5]">
              © 2026 イケメン名鑑. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
