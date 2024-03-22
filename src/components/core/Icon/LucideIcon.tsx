import React from 'react';
import { icons, LucideProps } from 'lucide-react-native';
import { ColorValue } from 'react-native';
import { LucideIconProps } from '@srcTypes/Icon';

const Icon: React.FC<LucideIconProps> = ({ name, color, size }) => {
  const LucideIcon: React.FC<LucideProps & { color?: ColorValue }> =
    icons[name];

  return <LucideIcon color={color} size={size} />;
};

export default Icon;
