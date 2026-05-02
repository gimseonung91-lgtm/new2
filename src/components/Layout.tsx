import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, Search, Settings, Utensils } from "lucide-react";

const Layout = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <Utensils size={24} className="logo-icon" />
          <h1>급식안내기</h1>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <nav className="bottom-nav">
        <Link to="/" className={isActive("/") ? "active" : ""}>
          <Home size={24} />
          <span>오늘</span>
        </Link>
        <Link to="/search" className={isActive("/search") ? "active" : ""}>
          <Search size={24} />
          <span>검색</span>
        </Link>
        <Link to="/settings" className={isActive("/settings") ? "active" : ""}>
          <Settings size={24} />
          <span>설정</span>
        </Link>
      </nav>
    </div>
  );
};

export default Layout;
