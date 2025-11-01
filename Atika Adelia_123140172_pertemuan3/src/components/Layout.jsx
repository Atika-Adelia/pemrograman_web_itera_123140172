import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaBookOpen, FaUserCircle } from 'react-icons/fa';

const Layout = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <Link to="/" className="logo-link">
          <div className="logo">
            <FaBookOpen size={28} />
            <div className="logo-text">
              <h1>📝 MANAJEMEN BUKU PRIBADI</h1>
            </div>
          </div>
        </Link>
        <nav className="main-nav">
        </nav>
      </header>
      <main className="app-main">
        <Outlet /> 
      </main>
    </div>
  );
};

export default Layout;