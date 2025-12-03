import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Index.css';

const NavBar = ({ items = [] }) => {
  const location = useLocation();

  // Função para verificar se a rota atual corresponde ao item
  const isActive = (href) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className={`navbar-item ${isActive(item.href) ? 'active' : ''}`}
            title={item.label}
          >
            {item.icon && <img src={item.icon} alt={item.label} className="navbar-icon" />}
            <span className="navbar-label">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
