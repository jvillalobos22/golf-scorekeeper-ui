import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <header className="app_header">
    <div className="pg_width">
      <Link to="/">
        <h1 className="app_title">Juan's Caddy</h1>
      </Link>
    </div>
  </header>
);

export default Header;
