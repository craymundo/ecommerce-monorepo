import { LabelHTMLAttributes } from 'react';
import './Label.css';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = ({
  children,
  required,
  className,
  ...props
}: LabelProps) => {
  return (
    <label 
      className={`label ${required ? 'required' : ''} ${className || ''}`}
      {...props}
    >
      {children}
    </label>
  );
}; 