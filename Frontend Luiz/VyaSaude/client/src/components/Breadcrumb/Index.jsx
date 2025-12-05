import React from 'react';
import { Link } from 'react-router-dom';
import './Index.css';

// O componente recebe 'homeIcon' (qualquer elemento React, como um <Icon />)
// e 'items' (um array de objetos, com valor padrão de array vazio)
const Breadcrumb = ({ homeIcon, items = [] }) => {
  return (
    <nav aria-label="breadcrumb" className='breadcrumb-container'>
      <ol className="breadcrumb">
        
        <li className="breadcrumb-item">
          <Link to="/">{homeIcon || 'Home'}</Link>
        </li>

        {/* Itens 2, 3, 4...: O array de links */}
        {items.map((item, index) => {
          // Verifica se é o último item do array
          const isLast = index === items.length - 1;

          return (
            <li 
              key={item.href || index} 
              className={`breadcrumb-item ${isLast ? 'active' : ''}`}
              aria-current={isLast ? 'page' : undefined}
            >
              {/* Se for o último, renderiza como texto. Se não, como Link. */}
              {isLast ? (
                item.label
              ) : (
                <Link to={item.href}>{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
