import { FontAwesome } from '@expo/vector-icons';
import { IconProps } from '@srcTypes/Icon';

export default function Icon(props: IconProps) {
  return (
    <FontAwesome className={props.className} size={props.size} {...props} />
  );
}
