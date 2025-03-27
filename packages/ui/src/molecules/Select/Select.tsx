import { SelectHTMLAttributes, forwardRef } from 'react';

import './Select.css';
import { Label } from '../../atoms/Label/Label';

interface Option {
  value: string;
  label: string;
}
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  options: Option[];
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  options,
  error,
  size = 'md',
  fullWidth,
  className,
  required,
  ...props
}, ref) => {
  return (
    <div className={`select-wrapper ${fullWidth ? 'full-width' : ''}`}>
      {label && (
        <Label required={required}>
          {label}
        </Label>
      )}
      <select
        ref={ref}
        className={`select ${size} ${error ? 'error' : ''} ${className || ''}`}
        required={required}
        {...props}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && <span className="select-error">{error}</span>}
    </div>
  );
}); 