import React, { forwardRef } from 'react';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    const btnClasses = [
      'tempo-btn',
      `tempo-btn-${variant}`,
      `tempo-btn-${size}`,
      className
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={btnClasses}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
