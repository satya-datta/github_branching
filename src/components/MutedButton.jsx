import React from 'react';
import { Link } from 'react-router-dom';

const MutedButton = ({ 
  children, 
  to, 
  href, 
  onClick, 
  size = 'medium', 
  className = '', 
  disabled = false,
  ...props 
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-xl 
    text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400
    hover:bg-indigo-50 dark:hover:bg-indigo-900/20
    transition-all duration-200 hover:-translate-y-0.5
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2
    dark:focus-visible:ring-offset-gray-900
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
  `;

  const sizes = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const classes = `${baseClasses} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button 
      className={classes} 
      onClick={onClick} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default MutedButton;