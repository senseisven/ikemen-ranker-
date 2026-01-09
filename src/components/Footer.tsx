import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/30 mt-auto">
      <div className="container-editorial py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading font-bold text-foreground mb-3">
              イケメン名鑑
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              各界で活躍するイケメンを独自の視点で紹介。
              ランキングは編集部による主観的評価です。
            </p>
          </div>
          
          <div>
            <h4 className="font-heading font-medium text-foreground mb-3 text-sm">
              サイト情報
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  編集方針
                </Link>
              </li>
              <li>
                <Link to="/submit" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  掲載依頼
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-medium text-foreground mb-3 text-sm">
              お問い合わせ
            </h4>
            <p className="text-sm text-muted-foreground">
              info@ikemen-meikan.example.com
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              ※架空のサイトです
            </p>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            イケメン名鑑 編集部
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
