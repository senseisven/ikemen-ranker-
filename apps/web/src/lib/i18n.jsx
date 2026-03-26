import { createContext, useCallback, useContext, useEffect, useState } from "react";

const translations = {
  ja: {
    // Nav & Footer
    "nav.brand": "イケメン名鑑",
    "nav.editorial": "編集方針",
    "nav.admin": "管理",
    "nav.ariaLabel": "メインナビゲーション",
    "footer.about.title": "イケメン名鑑について",
    "footer.about.description": "各界で活躍するイケメンを編集部が厳選して掲載。主観的な評価に基づくランキングです。",
    "footer.categories.title": "カテゴリ",
    "footer.categories.ariaLabel": "カテゴリナビゲーション",
    "footer.siteInfo.title": "サイト情報",
    "footer.siteInfo.ariaLabel": "サイト情報",
    "footer.siteInfo.editorial": "編集方針",
    "footer.siteInfo.request": "掲載リクエスト",
    "footer.copyright": "© 2026 イケメン名鑑. All rights reserved.",
    "lang.toggle": "EN",
    "lang.ariaLabel": "Switch to English",

    // Home page
    "home.hero.title": "イケメン名鑑",
    "home.hero.description": "各界で活躍するイケメンを編集部が厳選。スタートアップ、エンターテイメント、スポーツなど、多彩なカテゴリから注目の人物を掲載しています。",
    "home.error.supabase": "Supabase接続エラー",
    "home.error.rlsHint": "Supabaseダッシュボードで RLS ポリシーを確認するか、",
    "home.error.envHint": "を設定してください。",
    "home.noData.banner": "ランキングデータがありません。管理画面からカテゴリと人物を追加してください。",
    "home.noData.link": "管理画面へ →",
    "home.noData.title": "ランキングデータがありません",
    "home.noData.description": "カテゴリと人物を追加すると、ランキングが表示されます。",
    "home.noData.adminLink": "管理画面",
    "home.noData.instructions": "からログインしてデータを登録してください。（ログイン: admin@ikemen.jp / admin123）",
    "home.noData.tableHint": "Supabaseの",
    "home.noData.activeHint": "テーブルにデータがあるか確認してください。people は",
    "home.noData.activeCondition": "である必要があります。",
    "home.ranking.label": "Ranking",
    "home.seeAll": "すべて見る →",
    "home.noEntries": "このカテゴリにはまだ登録がありません。",
    "home.weeklyPicks": "— 今週の注目 —",
    "home.latest.label": "新着",
    "home.latest.title": "— 新着掲載 —",
    "home.latest.description": "編集部が新たに追加した注目の人物。最新 {count} 名を掲載中",
    "home.about.title": "イケメン名鑑について",
    "home.about.p1": "イケメン名鑑は、各界で活躍するイケメンを編集部が厳選して掲載するランキングサイトです。スタートアップ経営者、俳優、アスリート、モデル、YouTuber、ミュージシャンなど、様々な分野で活躍する魅力的な人物を紹介しています。",
    "home.about.p2": "当サイトでは、清潔感、顔立ち、雰囲気、ファッション、カリスマ性の5つの評価軸でスコアリングを行い、総合的な魅力を数値化しています。各人物のプロフィール、編集部コメント、関連情報も掲載しています。",

    // Category page
    "category.notFound.title": "カテゴリが見つかりません",
    "category.notFound.description": "お探しのカテゴリは存在しないか、削除された可能性があります。",
    "category.goHome": "ホームに戻る",
    "category.filterByTag": "タグで絞り込み",
    "category.all": "すべて",
    "category.filterActive": "タグ「{tag}」で表示中",
    "category.clearFilter": "フィルタを解除",
    "category.ranking": "— {name}ランキング（{count}{suffix}） —",
    "category.rankingSuffix.all": "名",
    "category.rankingSuffix.filtered": "名 / 全{total}名中",
    "category.noMatch": "このタグに該当する人物はいません。",
    "category.showAll": "すべて表示",
    "category.relatedArticles": "— {name}関連記事 —",
    "category.detailedInfo": "— {name}詳細情報 —",
    "category.editorialComment": "編集部コメント:",
    "category.score": "スコア:",
    "category.points": "点",
    "category.tags": "タグ:",
    "category.totalScore": "Total Score",
    "category.rankLabel": "ランキング{n}位",

    // Person page
    "person.notFound.title": "ページが見つかりません",
    "person.notFound.description": "お探しの人物は存在しないか、削除された可能性があります。",
    "person.goHome": "ホームに戻る",
    "person.breadcrumb.home": "ホーム",
    "person.breadcrumb.ariaLabel": "パンくずリスト",
    "person.tags.srOnly": "タグ",
    "person.profile": "プロフィール",
    "person.editorialComment": "編集部コメント",
    "person.links": "リンク",
    "person.officialSite": "公式サイト",
    "person.scoreBreakdown": "スコア内訳",
    "person.overallScore": "総合スコア",
    "person.relatedType": "似ているタイプ",
    "person.topRanking": "{name}の上位ランキング",
    "person.relatedArticles": "関連記事",

    // Article page
    "article.notFound.title": "記事が見つかりません",
    "article.notFound.description": "お探しの記事は存在しないか、削除された可能性があります。",
    "article.goHome": "ホームに戻る",
    "article.breadcrumb.home": "ホーム",
    "article.breadcrumb.ariaLabel": "パンくずリスト",
    "article.breadcrumb.article": "記事",
    "article.relatedPerson": "関連人物",
    "article.viewProfile": "→ プロフィールを見る",
    "article.relatedArticles": "関連記事",

    // About page
    "about.meta.title": "編集方針 | イケメン名鑑",
    "about.meta.description": "イケメン名鑑の編集方針、評価基準、掲載・削除申請について。",
    "about.title": "編集方針",
    "about.section1.title": "イケメン名鑑について",
    "about.section1.p1": "イケメン名鑑は、各界で活躍する男性を編集部が独自の基準で評価し、掲載するサイトです。スタートアップ、エンターテイメント、スポーツなど、多彩なカテゴリから注目の人物を厳選しています。",
    "about.section1.p2": "本サイトの評価は編集部による主観的な判断に基づいており、個人の容姿だけでなく、実績、影響力、雰囲気、ファッションセンスなど、総合的な魅力を考慮しています。",
    "about.section2.title": "評価基準",
    "about.section2.intro": "各人物は以下の5つの観点から評価されます。各項目0〜20点の配点で、合計100点満点としています。",
    "about.criteria.cleanliness": "清潔感",
    "about.criteria.cleanliness.desc": "身だしなみ、肌質、ヘアスタイルなどの清潔感",
    "about.criteria.facial": "顔立ち",
    "about.criteria.facial.desc": "顔のバランス、パーツの整い方",
    "about.criteria.vibe": "雰囲気",
    "about.criteria.vibe.desc": "佇まい、オーラ、表情などから醸し出される雰囲気",
    "about.criteria.fashion": "ファッション",
    "about.criteria.fashion.desc": "服装のセンス、着こなし、スタイリング",
    "about.criteria.charisma": "カリスマ",
    "about.criteria.charisma.desc": "実績、影響力、人間性から感じられる魅力",
    "about.section3.title": "掲載リクエスト",
    "about.section3.description": "各界で活躍する男性の掲載をリクエストできます。編集部で審議の上、掲載可否を判断いたします。",
    "about.section3.link": "掲載リクエストフォームへ",
    "about.section4.title": "掲載情報の訂正・削除申請",
    "about.section4.description": "掲載情報に誤りがある場合、または掲載の削除を希望される場合は、以下の情報を明記の上、編集部までご連絡ください。",
    "about.section4.item1": "掲載されている名前とページURL",
    "about.section4.item2": "訂正・削除を希望する理由",
    "about.section4.item3": "ご本人確認が可能な情報（削除申請の場合）",
    "about.section4.contact": "連絡先: info@ikemen-meikan.jp（デモサイトのため、実際のメールアドレスではありません）",
    "about.section5.title": "プライバシーポリシー",
    "about.section5.p1": "本サイトは、公開情報に基づいて編集・掲載を行っています。個人のプライバシーに配慮し、センシティブな情報の掲載は行いません。",
    "about.section5.p2": "ユーザーの投票情報は、ブラウザのローカルストレージに保存され、サーバーには送信されません。",
    "about.section6.title": "免責事項",
    "about.section6.p1": "本サイトの情報は、編集部の調査に基づいて掲載していますが、正確性を保証するものではありません。掲載情報の利用により生じたいかなる損害についても、当サイトは責任を負いません。",
    "about.section6.p2": "評価は編集部の主観的な判断に基づくものであり、個人の価値を決定づけるものではありません。",

    // Submit page
    "submit.title": "掲載リクエスト",
    "submit.description": "各界で活躍するイケメンの掲載をリクエストできます。編集部で審議の上、掲載可否を判断いたします。",
    "submit.success": "送信を受け付けました。ご提案ありがとうございます。（デモ環境のため、実際の送信は行われません）",
    "submit.name.label": "お名前",
    "submit.name.placeholder": "山田太郎",
    "submit.category.label": "カテゴリ",
    "submit.category.placeholder": "選択してください",
    "submit.category.startup": "スタートアップ",
    "submit.category.actor": "俳優",
    "submit.category.athlete": "アスリート",
    "submit.category.model": "モデル",
    "submit.category.youtuber": "YouTuber",
    "submit.category.musician": "ミュージシャン",
    "submit.category.other": "その他",
    "submit.links.label": "関連リンク",
    "submit.links.placeholder": "公式サイト、SNS、Wikipediaなど（複数可）",
    "submit.links.hint": "1行に1つずつ入力してください",
    "submit.reason.label": "推薦理由",
    "submit.reason.placeholder": "なぜこの人物を掲載すべきか、理由をお書きください",
    "submit.button": "送信する",
    "submit.disclaimer": "送信いただいた情報は編集部で確認し、掲載可否を判断いたします。すべてのリクエストに対応できるわけではありませんので、予めご了承ください。なお、本サイトはデモ環境のため、送信された情報はブラウザのローカルストレージに保存され、実際の送信は行われません。",

    // Score labels
    "score.cleanliness": "清潔感",
    "score.facial": "顔立ち",
    "score.vibe": "雰囲気",
    "score.fashion": "ファッション",
    "score.charisma": "カリスマ性",
    "score.overall": "総合スコア",

    // Vote button
    "vote.voted": "投票済み",
    "vote.action": "投票する",
    "vote.count": "{count}票獲得",
    "vote.toast": "投票しました",

    // Category filters
    "filters.sortBy": "並び替え",
    "filters.byScore": "スコア順",
    "filters.byRecent": "新着順",
    "filters.filterByTag": "タグで絞り込み",
    "filters.count": "{count}件の掲載",

    // Shared
    "common.dateLocale": "ja-JP",
    "common.tagSeparator": "、",
    "common.loading": "読み込み中...",
    "common.save": "保存",
    "common.cancel": "キャンセル",
    "common.edit": "編集",
    "common.delete": "削除",
    "common.create": "新規作成",
    "common.back": "← 戻る",
    "common.published": "公開中",
    "common.unpublished": "非公開",
    "common.publish": "公開する",
    "common.displayOrder": "表示順",
    "common.slug": "スラッグ (URL用)",
    "common.metaTitle": "メタタイトル",
    "common.metaDescription": "メタディスクリプション",
    "common.select": "選択してください",
    "common.none": "なし",
    "common.saveFailed": "保存に失敗しました: ",
    "common.deleteFailed": "削除に失敗しました: ",
    "common.confirmDelete": "本当に削除しますか？",
    "common.saving": "保存中...",
    "common.seo": "SEO",
    "common.seoSettings": "SEO設定",

    // Admin - Login / Dashboard
    "admin.login.title": "管理者ログイン",
    "admin.login.email": "メールアドレス",
    "admin.login.password": "パスワード",
    "admin.login.submit": "ログイン",
    "admin.login.error": "メールアドレスまたはパスワードが間違っています",
    "admin.header.title": "イケメン名鑑 管理画面",
    "admin.header.logout": "ログアウト",
    "admin.dashboard": "ダッシュボード",
    "admin.categories.title": "カテゴリ管理",
    "admin.categories.desc": "ハブページ（カテゴリ）の作成・編集・削除",
    "admin.people.title": "人物管理",
    "admin.people.desc": "イケメン人物の登録・編集・削除",
    "admin.tags.title": "タグ管理",
    "admin.tags.desc": "絞り込みタグの作成・編集・削除",
    "admin.articles.title": "記事管理",
    "admin.articles.desc": "関連記事の作成・編集（TinyMCE）",
    "admin.quickLinks": "クイックリンク",
    "admin.viewSite": "サイトを表示 →",

    // Admin - Categories
    "admin.cat.editTitle": "カテゴリ編集",
    "admin.cat.newTitle": "新規カテゴリ",
    "admin.cat.name": "カテゴリ名（日本語）",
    "admin.cat.description": "説明",
    "admin.cat.descPlaceholder": "カテゴリの説明文...",
    "admin.cat.metaTitlePlaceholder": "スタートアップイケメン | イケメン名鑑",
    "admin.cat.metaDescPlaceholder": "検索エンジン向けの説明文...",
    "admin.cat.confirmDelete": "本当に削除しますか？関連する人物も削除されます。",
    "admin.cat.table.order": "順序",
    "admin.cat.table.slug": "スラッグ",
    "admin.cat.table.name": "カテゴリ名",
    "admin.cat.table.status": "ステータス",
    "admin.cat.table.actions": "操作",
    "admin.cat.empty": "カテゴリがありません",

    // Admin - People
    "admin.ppl.editTitle": "人物編集",
    "admin.ppl.newTitle": "新規人物",
    "admin.ppl.basicInfo": "基本情報",
    "admin.ppl.category": "カテゴリ",
    "admin.ppl.nameJa": "名前（日本語）",
    "admin.ppl.nameKana": "名前（カナ）",
    "admin.ppl.jobTitle": "肩書き",
    "admin.ppl.tags": "タグ",
    "admin.ppl.scores": "スコア（各0-20点、合計: {total}点）",
    "admin.ppl.content": "コンテンツ",
    "admin.ppl.profile": "プロフィール",
    "admin.ppl.profilePlaceholder": "プロフィール文...",
    "admin.ppl.editorial": "編集部コメント",
    "admin.ppl.editorialPlaceholder": "編集部のコメント...",
    "admin.ppl.image": "画像",
    "admin.ppl.imageDrop": "画像をドラッグ＆ドロップ、またはクリックして選択",
    "admin.ppl.imageFormats": "JPEG / PNG / WebP / GIF（最大5MB）",
    "admin.ppl.imageSelected": "選択中: {name}",
    "admin.ppl.imageUrlLabel": "または画像URLを直接入力",
    "admin.ppl.imageAlt": "画像Alt",
    "admin.ppl.preview": "プレビュー",
    "admin.ppl.links": "リンク",
    "admin.ppl.officialSite": "公式サイト",
    "admin.ppl.settings": "設定",
    "admin.ppl.weeklyPick": "今週の注目",
    "admin.ppl.table.name": "名前",
    "admin.ppl.table.category": "カテゴリ",
    "admin.ppl.table.score": "スコア",
    "admin.ppl.table.status": "ステータス",
    "admin.ppl.table.actions": "操作",
    "admin.ppl.featured": "注目",
    "admin.ppl.empty": "人物がありません",

    // Admin - Tags
    "admin.tag.editTitle": "タグ編集",
    "admin.tag.newTitle": "新規タグ",
    "admin.tag.name": "タグ名",
    "admin.tag.table.order": "順序",
    "admin.tag.table.name": "タグ名",
    "admin.tag.table.actions": "操作",
    "admin.tag.empty": "タグがありません",

    // Admin - Articles
    "admin.art.editTitle": "記事編集",
    "admin.art.newTitle": "新規記事",
    "admin.art.title": "タイトル",
    "admin.art.titlePlaceholder": "記事タイトル",
    "admin.art.relatedCategory": "関連カテゴリ",
    "admin.art.relatedPerson": "関連人物",
    "admin.art.excerpt": "抜粋",
    "admin.art.excerptPlaceholder": "記事の抜粋...",
    "admin.art.body": "本文",
    "admin.art.featuredImage": "アイキャッチ画像URL",
    "admin.art.metaTitlePlaceholder": "記事タイトル | イケメン名鑑",
    "admin.art.metaDescPlaceholder": "検索エンジン向けの説明文...",
    "admin.art.table.title": "タイトル",
    "admin.art.table.category": "カテゴリ",
    "admin.art.table.status": "ステータス",
    "admin.art.table.created": "作成日",
    "admin.art.table.actions": "操作",
    "admin.art.published": "公開中",
    "admin.art.draft": "下書き",
    "admin.art.empty": "記事がありません",
  },

  en: {
    // Nav & Footer
    "nav.brand": "イケメン名鑑",
    "nav.editorial": "Editorial Policy",
    "nav.admin": "Admin",
    "nav.ariaLabel": "Main Navigation",
    "footer.about.title": "About Ikemen Directory",
    "footer.about.description": "A curated ranking of the most handsome men in various industries, selected by our editorial team based on subjective evaluation.",
    "footer.categories.title": "Categories",
    "footer.categories.ariaLabel": "Category Navigation",
    "footer.siteInfo.title": "Site Info",
    "footer.siteInfo.ariaLabel": "Site Information",
    "footer.siteInfo.editorial": "Editorial Policy",
    "footer.siteInfo.request": "Listing Request",
    "footer.copyright": "© 2026 Ikemen Directory. All rights reserved.",
    "lang.toggle": "JP",
    "lang.ariaLabel": "日本語に切り替え",

    // Home page
    "home.hero.title": "イケメン名鑑",
    "home.hero.description": "Handsome men handpicked by our editorial team from various fields. Featuring notable figures across startups, entertainment, sports, and more.",
    "home.error.supabase": "Supabase Connection Error",
    "home.error.rlsHint": "Check RLS policies in the Supabase dashboard, or set",
    "home.error.envHint": "in your environment.",
    "home.noData.banner": "No ranking data available. Add categories and people from the admin panel.",
    "home.noData.link": "Go to Admin →",
    "home.noData.title": "No Ranking Data",
    "home.noData.description": "Rankings will appear once you add categories and people.",
    "home.noData.adminLink": "Admin Panel",
    "home.noData.instructions": " — log in and register data. (Login: admin@ikemen.jp / admin123)",
    "home.noData.tableHint": "Check that the Supabase",
    "home.noData.activeHint": "tables have data. People must have",
    "home.noData.activeCondition": ".",
    "home.ranking.label": "Ranking",
    "home.seeAll": "See All →",
    "home.noEntries": "No entries in this category yet.",
    "home.weeklyPicks": "— Weekly Picks —",
    "home.latest.label": "Latest",
    "home.latest.title": "— Newly Featured —",
    "home.latest.description": "Notable figures recently added by our editors. Showing the latest {count}",
    "home.about.title": "About Ikemen Directory",
    "home.about.p1": "Ikemen Directory is a ranking site where our editorial team carefully selects and features the most handsome men across various fields — startup founders, actors, athletes, models, YouTubers, musicians, and more.",
    "home.about.p2": "We score each person across five criteria — grooming, facial features, aura, fashion sense, and charisma — to quantify overall attractiveness. Profiles, editorial comments, and related information are also included.",

    // Category page
    "category.notFound.title": "Category Not Found",
    "category.notFound.description": "The category you're looking for doesn't exist or has been removed.",
    "category.goHome": "Back to Home",
    "category.filterByTag": "Filter by Tag",
    "category.all": "All",
    "category.filterActive": "Showing tag \"{tag}\"",
    "category.clearFilter": "Clear Filter",
    "category.ranking": "— {name} Ranking ({count}{suffix}) —",
    "category.rankingSuffix.all": "",
    "category.rankingSuffix.filtered": " / {total} total",
    "category.noMatch": "No people match this tag.",
    "category.showAll": "Show All",
    "category.relatedArticles": "— {name} Related Articles —",
    "category.detailedInfo": "— {name} Detailed Info —",
    "category.editorialComment": "Editorial Comment:",
    "category.score": "Score:",
    "category.points": "pts",
    "category.tags": "Tags:",
    "category.totalScore": "Total Score",
    "category.rankLabel": "Rank #{n}",

    // Person page
    "person.notFound.title": "Page Not Found",
    "person.notFound.description": "The person you're looking for doesn't exist or has been removed.",
    "person.goHome": "Back to Home",
    "person.breadcrumb.home": "Home",
    "person.breadcrumb.ariaLabel": "Breadcrumb",
    "person.tags.srOnly": "Tags",
    "person.profile": "Profile",
    "person.editorialComment": "Editorial Comment",
    "person.links": "Links",
    "person.officialSite": "Official Website",
    "person.scoreBreakdown": "Score Breakdown",
    "person.overallScore": "Overall Score",
    "person.relatedType": "Similar Types",
    "person.topRanking": "Top {name} Rankings",
    "person.relatedArticles": "Related Articles",

    // Article page
    "article.notFound.title": "Article Not Found",
    "article.notFound.description": "The article you're looking for doesn't exist or has been removed.",
    "article.goHome": "Back to Home",
    "article.breadcrumb.home": "Home",
    "article.breadcrumb.ariaLabel": "Breadcrumb",
    "article.breadcrumb.article": "Article",
    "article.relatedPerson": "Related Person",
    "article.viewProfile": "→ View Profile",
    "article.relatedArticles": "Related Articles",

    // About page
    "about.meta.title": "Editorial Policy | Ikemen Directory",
    "about.meta.description": "About Ikemen Directory's editorial policy, scoring criteria, and listing/removal requests.",
    "about.title": "Editorial Policy",
    "about.section1.title": "About Ikemen Directory",
    "about.section1.p1": "Ikemen Directory is a site where our editorial team evaluates and features men from various industries using our original criteria. We carefully select notable figures across startups, entertainment, sports, and more.",
    "about.section1.p2": "Our evaluations are based on subjective editorial judgment, taking into account not just physical appearance but also achievements, influence, presence, fashion sense, and overall appeal.",
    "about.section2.title": "Scoring Criteria",
    "about.section2.intro": "Each person is evaluated across 5 criteria. Each item is scored 0–20 points, for a total of 100 points maximum.",
    "about.criteria.cleanliness": "Grooming",
    "about.criteria.cleanliness.desc": "Personal hygiene, skin quality, hairstyle, and overall neatness",
    "about.criteria.facial": "Facial Features",
    "about.criteria.facial.desc": "Facial balance and symmetry of features",
    "about.criteria.vibe": "Aura",
    "about.criteria.vibe.desc": "Presence, charisma, and the atmosphere conveyed through expressions",
    "about.criteria.fashion": "Fashion",
    "about.criteria.fashion.desc": "Clothing sense, styling, and overall fashion coordination",
    "about.criteria.charisma": "Charisma",
    "about.criteria.charisma.desc": "Appeal through achievements, influence, and personality",
    "about.section3.title": "Listing Request",
    "about.section3.description": "You can request the listing of men who are active in various fields. Our editorial team will review and decide whether to feature them.",
    "about.section3.link": "Go to Request Form",
    "about.section4.title": "Corrections & Removal Requests",
    "about.section4.description": "If there are errors in the listed information, or if you wish to request removal, please contact our editorial team with the following details.",
    "about.section4.item1": "The listed name and page URL",
    "about.section4.item2": "Reason for correction or removal",
    "about.section4.item3": "Identity verification (for removal requests)",
    "about.section4.contact": "Contact: info@ikemen-meikan.jp (This is a demo site; not a real email address)",
    "about.section5.title": "Privacy Policy",
    "about.section5.p1": "This site edits and publishes content based on publicly available information. We respect individual privacy and do not publish sensitive information.",
    "about.section5.p2": "User voting data is stored in the browser's local storage and is not sent to our servers.",
    "about.section6.title": "Disclaimer",
    "about.section6.p1": "The information on this site is published based on our editorial team's research, but accuracy is not guaranteed. We are not responsible for any damages arising from the use of published information.",
    "about.section6.p2": "Evaluations are based on the editorial team's subjective judgment and do not determine the value of any individual.",

    // Submit page
    "submit.title": "Listing Request",
    "submit.description": "You can request the listing of handsome men who are active in various fields. Our editorial team will review and decide whether to feature them.",
    "submit.success": "Your request has been received. Thank you for your suggestion! (This is a demo — no actual submission is made.)",
    "submit.name.label": "Name",
    "submit.name.placeholder": "John Smith",
    "submit.category.label": "Category",
    "submit.category.placeholder": "Select a category",
    "submit.category.startup": "Startup",
    "submit.category.actor": "Actor",
    "submit.category.athlete": "Athlete",
    "submit.category.model": "Model",
    "submit.category.youtuber": "YouTuber",
    "submit.category.musician": "Musician",
    "submit.category.other": "Other",
    "submit.links.label": "Related Links",
    "submit.links.placeholder": "Official site, social media, Wikipedia, etc.",
    "submit.links.hint": "Enter one link per line",
    "submit.reason.label": "Reason for Recommendation",
    "submit.reason.placeholder": "Please explain why this person should be featured",
    "submit.button": "Submit",
    "submit.disclaimer": "The information you submit will be reviewed by our editorial team. Please note that we may not be able to accommodate all requests. As this is a demo site, submitted information is stored only in your browser's local storage.",

    // Score labels
    "score.cleanliness": "Grooming",
    "score.facial": "Facial Features",
    "score.vibe": "Aura",
    "score.fashion": "Fashion",
    "score.charisma": "Charisma",
    "score.overall": "Overall Score",

    // Vote button
    "vote.voted": "Voted",
    "vote.action": "Vote",
    "vote.count": "{count} votes",
    "vote.toast": "Vote submitted!",

    // Category filters
    "filters.sortBy": "Sort By",
    "filters.byScore": "By Score",
    "filters.byRecent": "By Recent",
    "filters.filterByTag": "Filter by Tag",
    "filters.count": "{count} listings",

    // Shared
    "common.dateLocale": "en-US",
    "common.tagSeparator": ", ",
    "common.loading": "Loading...",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.create": "Create New",
    "common.back": "← Back",
    "common.published": "Published",
    "common.unpublished": "Unpublished",
    "common.publish": "Publish",
    "common.displayOrder": "Display Order",
    "common.slug": "Slug (for URL)",
    "common.metaTitle": "Meta Title",
    "common.metaDescription": "Meta Description",
    "common.select": "Please select",
    "common.none": "None",
    "common.saveFailed": "Failed to save: ",
    "common.deleteFailed": "Failed to delete: ",
    "common.confirmDelete": "Are you sure you want to delete this?",
    "common.saving": "Saving...",
    "common.seo": "SEO",
    "common.seoSettings": "SEO Settings",

    // Admin - Login / Dashboard
    "admin.login.title": "Admin Login",
    "admin.login.email": "Email Address",
    "admin.login.password": "Password",
    "admin.login.submit": "Log In",
    "admin.login.error": "Incorrect email or password",
    "admin.header.title": "Ikemen Directory Admin",
    "admin.header.logout": "Log Out",
    "admin.dashboard": "Dashboard",
    "admin.categories.title": "Category Management",
    "admin.categories.desc": "Create, edit, and delete hub pages (categories)",
    "admin.people.title": "People Management",
    "admin.people.desc": "Register, edit, and delete people entries",
    "admin.tags.title": "Tag Management",
    "admin.tags.desc": "Create, edit, and delete filter tags",
    "admin.articles.title": "Article Management",
    "admin.articles.desc": "Create and edit related articles (TinyMCE)",
    "admin.quickLinks": "Quick Links",
    "admin.viewSite": "View Site →",

    // Admin - Categories
    "admin.cat.editTitle": "Edit Category",
    "admin.cat.newTitle": "New Category",
    "admin.cat.name": "Category Name (Japanese)",
    "admin.cat.description": "Description",
    "admin.cat.descPlaceholder": "Category description...",
    "admin.cat.metaTitlePlaceholder": "Startup Ikemen | Ikemen Directory",
    "admin.cat.metaDescPlaceholder": "Description for search engines...",
    "admin.cat.confirmDelete": "Are you sure? Related people will also be deleted.",
    "admin.cat.table.order": "Order",
    "admin.cat.table.slug": "Slug",
    "admin.cat.table.name": "Category Name",
    "admin.cat.table.status": "Status",
    "admin.cat.table.actions": "Actions",
    "admin.cat.empty": "No categories found",

    // Admin - People
    "admin.ppl.editTitle": "Edit Person",
    "admin.ppl.newTitle": "New Person",
    "admin.ppl.basicInfo": "Basic Info",
    "admin.ppl.category": "Category",
    "admin.ppl.nameJa": "Name (Japanese)",
    "admin.ppl.nameKana": "Name (Kana)",
    "admin.ppl.jobTitle": "Title / Role",
    "admin.ppl.tags": "Tags",
    "admin.ppl.scores": "Scores (0-20 each, Total: {total} pts)",
    "admin.ppl.content": "Content",
    "admin.ppl.profile": "Profile",
    "admin.ppl.profilePlaceholder": "Profile text...",
    "admin.ppl.editorial": "Editorial Comment",
    "admin.ppl.editorialPlaceholder": "Editorial comment...",
    "admin.ppl.image": "Image",
    "admin.ppl.imageDrop": "Drag & drop an image, or click to select",
    "admin.ppl.imageFormats": "JPEG / PNG / WebP / GIF (max 5MB)",
    "admin.ppl.imageSelected": "Selected: {name}",
    "admin.ppl.imageUrlLabel": "Or enter image URL directly",
    "admin.ppl.imageAlt": "Image Alt Text",
    "admin.ppl.preview": "Preview",
    "admin.ppl.links": "Links",
    "admin.ppl.officialSite": "Official Website",
    "admin.ppl.settings": "Settings",
    "admin.ppl.weeklyPick": "Weekly Pick",
    "admin.ppl.table.name": "Name",
    "admin.ppl.table.category": "Category",
    "admin.ppl.table.score": "Score",
    "admin.ppl.table.status": "Status",
    "admin.ppl.table.actions": "Actions",
    "admin.ppl.featured": "Featured",
    "admin.ppl.empty": "No people found",

    // Admin - Tags
    "admin.tag.editTitle": "Edit Tag",
    "admin.tag.newTitle": "New Tag",
    "admin.tag.name": "Tag Name",
    "admin.tag.table.order": "Order",
    "admin.tag.table.name": "Tag Name",
    "admin.tag.table.actions": "Actions",
    "admin.tag.empty": "No tags found",

    // Admin - Articles
    "admin.art.editTitle": "Edit Article",
    "admin.art.newTitle": "New Article",
    "admin.art.title": "Title",
    "admin.art.titlePlaceholder": "Article title",
    "admin.art.relatedCategory": "Related Category",
    "admin.art.relatedPerson": "Related Person",
    "admin.art.excerpt": "Excerpt",
    "admin.art.excerptPlaceholder": "Article excerpt...",
    "admin.art.body": "Body",
    "admin.art.featuredImage": "Featured Image URL",
    "admin.art.metaTitlePlaceholder": "Article Title | Ikemen Directory",
    "admin.art.metaDescPlaceholder": "Description for search engines...",
    "admin.art.table.title": "Title",
    "admin.art.table.category": "Category",
    "admin.art.table.status": "Status",
    "admin.art.table.created": "Created",
    "admin.art.table.actions": "Actions",
    "admin.art.published": "Published",
    "admin.art.draft": "Draft",
    "admin.art.empty": "No articles found",
  },
};

const LanguageContext = createContext({
  lang: "ja",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("ja");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ikemen-lang");
    if (saved === "en" || saved === "ja") {
      setLangState(saved);
    }
    setMounted(true);
  }, []);

  const setLang = useCallback((newLang) => {
    setLangState(newLang);
    localStorage.setItem("ikemen-lang", newLang);
  }, []);

  const t = useCallback(
    (key, params) => {
      const dict = translations[lang] ?? translations.ja;
      let str = dict[key] ?? translations.ja[key] ?? key;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          str = str.replace(`{${k}}`, v);
        });
      }
      return str;
    },
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}

const categoryContentEN = {
  startup: {
    name: "Startups",
    description:
      "Handsome startup founders shaping the future with technology and business. Featuring leaders with innovative vision and exceptional leadership.",
  },
  actor: {
    name: "Actors",
    description:
      "Talented actors excelling in film, drama, and stage. A curated selection of skilled performers who captivate audiences with their acting, presence, and visuals.",
  },
  athlete: {
    name: "Athletes",
    description:
      "Top athletes who continue to deliver results in the world of sports. Featuring competitors with sculpted physiques, mental toughness, and passion for their craft.",
  },
  model: {
    name: "Models",
    description:
      "Professional models leading the fashion industry. With refined style and expressiveness, they shine from the runway to advertising campaigns.",
  },
  youtuber: {
    name: "YouTubers",
    description:
      "Creators representing the digital-native generation. With unique content ideas, personality, and good looks, they've amassed large followings.",
  },
  musician: {
    name: "Musicians",
    description:
      "Artists with a unique presence in the music scene. Talented individuals acclaimed not only for the quality of their music but also for their visual appeal.",
  },
};

export function localizeCategory(category, lang) {
  if (!category || lang !== "en") return category;
  const en = categoryContentEN[category.slug];
  if (!en) return category;
  return {
    ...category,
    name_ja: en.name,
    description: en.description,
  };
}

const personTitleEN = {
  "takeshi-yamamoto": "AI × Healthcare Startup CEO",
  "kenji-sato": "Fintech Founder",
  "hiroshi-tanaka": "SaaS Company CTO",
  "akira-ogawa": "E-Commerce & Logistics Startup COO",
  "tsubasa-inoue": "EdTech Startup CEO",
  "ryo-nakamura": "Film Actor",
  "yuki-ishikawa": "TV Drama Actor",
  "tatsuya-kondo": "Stage Actor",
  "sota-nishimura": "Stage & Screen Actor",
  "eiji-mizuno": "Action Film Actor",
  "daichi-matsumoto": "Professional Soccer Player",
  "shun-hayashi": "Professional Tennis Player",
  "kenta-yoshida": "Professional Baseball Player",
  "masato-endo": "MMA Fighter",
  "yuto-sakamoto": "Professional Basketball Player",
  "kaito-suzuki": "Fashion Model",
  "haruto-kimura": "Commercial Model",
  "ren-takahashi": "Street Fashion Model",
  "jun-nakano": "Hair Model",
  "seiya-ueda": "Lifestyle Model",
  "sho-watanabe": "Lifestyle YouTuber",
  "yuta-nakajima": "Business YouTuber",
  "ryota-ito": "Fitness YouTuber",
  "riku-yamada": "Travel YouTuber",
  "naoki-hasegawa": "Tech YouTuber",
  "kazuki-morita": "Singer-Songwriter",
  "takumi-fujiwara": "Rock Band Vocalist",
  "hiroki-saito": "Jazz Pianist",
  "koki-matsuda": "DJ / Producer",
  "ryohei-aoki": "R&B Singer",
};

function nameFromSlug(slug) {
  if (!slug) return null;
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function localizePerson(person, lang) {
  if (!person || lang !== "en") return person;
  return {
    ...person,
    name_ja: nameFromSlug(person.slug) || person.name_ja,
    title: personTitleEN[person.slug] || person.title,
  };
}
