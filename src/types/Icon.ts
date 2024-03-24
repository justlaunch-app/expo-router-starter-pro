import FontAwesome from '@expo/vector-icons/FontAwesome';
import { icons, LucideProps } from 'lucide-react-native';
import { ColorValue } from 'react-native';

export type IconProps = {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  className?: string;
  size?: number;
};

export type LucideIconProps = {
  name: keyof typeof icons;
  color?: ColorValue;
  size?: LucideProps['size'];
  className?: string;
  strokeWidth?: LucideProps['strokeWidth'];
};
