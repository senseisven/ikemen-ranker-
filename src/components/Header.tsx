import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { href: '/', label: 'トップ' },
    { href: '/about', label: '編集方針' },
    { href: '/submit', label: '掲載依頼' },
  ];

  return (
    <header className="border-b border-border bg-background">
      <div className="container-editorial">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="text-xl font-heading font-bold tracking-tight text-foreground">
              イケメン名鑑
            </span>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              IKEMEN MEIKAN
            </span>
          </Link>
          
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm transition-colors hover:text-foreground ${
                  location.pathname === item.href
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
