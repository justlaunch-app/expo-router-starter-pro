/**
 *
 * SSOButton component
 * @description
 * A component that renders a button for signing in with OAuth.
 *
 * @module Button
 * @param classNames
 * @param icon
 * @param strategy
 * @param textColor
 * @returns
 *
 * @example
 * <SSOButton
 *  classNames="bg-red-500 flex p-4 rounded-2xl gap-3 flex-row items-center m-2"
 * icon={{ name: 'google', color: 'white', size: 20 }}
 * strategy="google_oauth2"
 * textColor="text-white"
 * />
 */

import { Icon } from '@components/core/icon/font-awesome';
import { Text } from 'react-native';
import TouchableOpacity from '@components/core/Button/TouchableOpacity';
import { cn } from '@lib/cn';
import { OAuthSignIn } from '@lib/auth/o-auth-sign-in';
import { OAuthStrategy } from '@srcTypes/OAuth';
import { FontawesomeIconProps } from '@srcTypes/Icon';
import { useOAuth } from '@clerk/clerk-expo';

interface SSOButtonProps {
  classNames?: string;
  icon: FontawesomeIconProps;
  strategy: OAuthStrategy;
  textColor?: string;
}

export const SSOButton = ({
  classNames,
  icon,
  strategy,
  textColor,
}: SSOButtonProps) => {
  const provider = useOAuth({ strategy: strategy });

  return (
    <TouchableOpacity
      className={cn(
        'bg-red-500 flex p-4 rounded-2xl gap-3 flex-row items-center m-2',
        classNames
      )}
      onPress={() => OAuthSignIn(provider)}
    >
      <Icon name={icon.name} color={icon.color} size={icon.size || 20} />
      <Text className={cn('text-white', textColor)}>
        Sign in with{' '}
        {strategy.split('_')[1].charAt(0).toUpperCase() +
          strategy.split('_')[1].slice(1)}
      </Text>
    </TouchableOpacity>
  );
};
