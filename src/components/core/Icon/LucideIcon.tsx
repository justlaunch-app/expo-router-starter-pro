/**
 * LucideIcon component
 * @description
 * A component that renders a Lucide icon.
 * @module Icon
 * @param {string} name - The name of the icon to render.
 * @param {string} color - The color of the icon.
 * @param {number} size - The size of the icon.
 * @param {string} className - The class name of the icon.
 * @param {number} strokeWidth - The stroke width of the icon. (default: 2 in Lucide)
 * @return {React.FC<LucideIconProps>}
 * @example
 * import Icon from '@components/core/Icon/LucideIcon';
 *
 * const MyComponent = () => {
 *  return <Icon name="activity" color="black" size={24} />;
 * };
 *
 * export default MyComponent;
 * @see
 *
 * - [Lucide](https://lucide.dev/)
 */

import React from 'react';
import { icons, LucideProps } from 'lucide-react-native';
import { ColorValue } from 'react-native';
import { LucideIconProps } from '@srcTypes/Icon';

export const Icon: React.FC<LucideIconProps> = ({
  name,
  color,
  size,
  className,
  strokeWidth = 1,
}) => {
  const LucideIcon: React.FC<LucideProps & { color?: ColorValue }> =
    icons[name];

  return (
    <LucideIcon
      strokeWidth={strokeWidth}
      className={className}
      color={color}
      size={size}
    />
  );
};
