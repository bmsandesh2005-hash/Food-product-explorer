import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <header className="site-header">
        <div className="container">
          <Link to="/products" className="logo">
            <span className="brand-mark" aria-hidden="true">F</span>
            <span>Food Product Explorer</span>
          </Link>
          <span className="header-note">THE DAILY MARKET</span>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}
