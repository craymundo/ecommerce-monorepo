import { SVGProps } from 'react';
import { icons, IconName } from './icons';
import './Icon.css';

type IconSize = 'sm' | 'md' | 'lg' | 'xl';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  name: IconName;
  size?: IconSize;
  color?: string;
}

export const Icon = ({
  name,
  size = 'md',
  color,
  className,
  ...props
}: IconProps) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <span className={`icon ${size} ${className || ''}`}>
      <IconComponent
        width="100%"
        height="100%"
        style={{ color }}
        {...props}
      />
    </span>
  );
};