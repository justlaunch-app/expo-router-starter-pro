import { Icon } from '@components/core/Icon/Icon';
import { Text } from 'react-native';
import TouchableOpacity from '@components/core/Button/TouchableOpacity';
import { cn } from '@lib/cn';
import { OAuthSignIn } from '@lib/auth/oAuthSignIn';
import { OAuthStrategy } from '@srcTypes/OAuth';
import { IconProps } from '@srcTypes/Icon';
import { useOAuth } from '@clerk/clerk-expo';

interface SSOButtonProps {
  classNames?: string;
  icon: IconProps;
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
