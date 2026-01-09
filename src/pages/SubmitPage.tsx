'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/categories';
import { addSubmission } from '@/lib/submissions';
import { useToast } from '@/hooks/use-toast';

const SubmitPage = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    links: '',
    reason: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.reason) {
      toast({
        title: '入力エラー',
        description: '必須項目を入力してください',
        variant: 'destructive',
      });
      return;
    }

    addSubmission(formData);
    setIsSubmitted(true);
    toast({
      title: '送信完了',
      description: '掲載依頼を受け付けました',
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <section className="border-b border-border">
          <div className="container-editorial py-4">
            <nav className="text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                トップ
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">掲載依頼</span>
            </nav>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-editorial max-w-xl text-center">
            <h1 className="font-heading text-2xl font-bold text-foreground mb-4">
              送信を受け付けました
            </h1>
            <p className="text-muted-foreground mb-6">
              掲載依頼をありがとうございます。内容を確認の上、掲載を検討いたします。
            </p>
            <p className="text-xs text-muted-foreground mb-8">
              ※デモ版のため、実際には送信されていません
            </p>
            <Link
              to="/"
              className="inline-block px-4 py-2 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors text-sm"
            >
              トップへ戻る
            </Link>
          </div>
        </section>
      </div>
    );
  }

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
            <span className="text-foreground">掲載依頼</span>
          </nav>
        </div>
      </section>

      {/* Form */}
      <section className="section-spacing">
        <div className="container-editorial max-w-xl">
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-4">
            掲載依頼
          </h1>
          <p className="text-muted-foreground mb-8">
            イケメン名鑑に掲載してほしい人物がいましたら、以下のフォームからご推薦ください。
            編集部で検討の上、掲載を決定いたします。
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-2"
              >
                氏名 <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="山田 太郎"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-foreground mb-2"
              >
                カテゴリー <span className="text-destructive">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="">選択してください</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.nameJa}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="links"
                className="block text-sm font-medium text-foreground mb-2"
              >
                関連リンク
              </label>
              <input
                type="text"
                id="links"
                name="links"
                value={formData.links}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="公式サイト、SNSなどのURL"
              />
              <p className="text-xs text-muted-foreground mt-1">
                複数ある場合はカンマ区切りで入力してください
              </p>
            </div>

            <div>
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-foreground mb-2"
              >
                推薦理由 <span className="text-destructive">*</span>
              </label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-3 py-2 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                placeholder="この人物をイケメン名鑑に掲載すべき理由を教えてください"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
              >
                送信する
              </button>
            </div>
          </form>

          <p className="text-xs text-muted-foreground mt-8">
            ※デモ版のため、送信された情報はローカルストレージに保存されるのみで、
            実際には送信されません。
          </p>
        </div>
      </section>
    </div>
  );
};

export default SubmitPage;
