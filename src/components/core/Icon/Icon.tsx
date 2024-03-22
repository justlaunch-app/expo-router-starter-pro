/**
 * Icon component with FontAwesome
 * @param className - optional class name
 * @param size - optional size
 * @param name - icon name
 * @param color - optional color
 * @returns React.ReactNode
 *
 * @example
 * <Icon name="home" size={24} color="black" />
 * <Icon name="home" size={24} color="black" className="text-white" />
 *
 * @see https://icons.expo.fyi/
 * @see https://icons.expo.fyi/FontAwesome
 *
 * If you want to use a different icon library, you can replace FontAwesome with your desired library BUT be CAUTIOUS -> Some Icon libraries are not supported yet with expo-router. fx. Lucide React :(
 */

import { FontAwesome } from '@expo/vector-icons';
import { IconProps } from '@srcTypes/Icon';

export const Icon = (props: IconProps) => {
  return (
    <FontAwesome className={props.className} size={props.size} {...props} />
  );
};
