import { JSX, ReactNode } from 'react';
import './Typography.css';

type TypographyVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'body1' 
  | 'body2' 
  | 'caption';

export interface TypographyProps {
  variant?: TypographyVariant;
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const Typography = ({
  variant = 'body1',
  children,
  className,
  as,
  ...props
}: TypographyProps) => {
  const Component = as || getDefaultComponent(variant);
  
  return (
    <Component 
      className={`typography ${variant} ${className || ''}`}
      {...props}
    >
      {children}
    </Component>
  );
};

const getDefaultComponent = (variant: TypographyVariant): keyof JSX.IntrinsicElements => {
  switch (variant) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
      return variant;
    default:
      return 'p';
  }
}; 