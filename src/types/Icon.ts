import FontAwesome from '@expo/vector-icons/FontAwesome';

export type IconProps = {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  className?: string;
  size?: number;
};
