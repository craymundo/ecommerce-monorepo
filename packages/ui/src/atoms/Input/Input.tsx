import { InputHTMLAttributes, forwardRef } from 'react';
import './Input.css';
import React from 'react';

type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
  size?: InputSize;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className,
  required,
  size = 'md',
  ...props
}, ref) => {
  const wrapperClasses = [
    'input-wrapper',
    error && 'has-error',
    className
  ].filter(Boolean).join(' ');

  const fieldClasses = [
    'input-field',
    `input-${size}`,
    leftIcon && 'has-left-icon',
    rightIcon && 'has-right-icon',
    error && 'error'
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'input-container',
    `input-container-${size}`
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}
      <div className={containerClasses}>
        {leftIcon && <span className="input-icon left">{leftIcon}</span>}
        <input
          ref={ref}
          className={fieldClasses}
          required={required}
          {...props}
        />
        {rightIcon && <span className="input-icon right">{rightIcon}</span>}
      </div>
      {(error || helperText) && (
        <p className={`input-message ${error ? 'error' : ''}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';