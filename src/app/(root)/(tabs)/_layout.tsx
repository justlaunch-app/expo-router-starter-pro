import { Link, Tabs, useSegments } from 'expo-router';
import { Icon } from '@components/core/Icon/LucideIcon';
import { Pressable } from 'react-native';
import { useColorScheme } from 'nativewind';
import { useTranslation } from 'react-i18next';
import colors from 'tailwindcss/colors';

const HeaderRight = () => {
  const { colorScheme } = useColorScheme();

  return (
    <Link href="/modal" asChild>
      <Pressable>
        {() => (
          <Icon
            name="Badge"
            color={colorScheme === 'dark' ? 'white' : 'black'}
            className="mr-3"
          />
        )}
      </Pressable>
    </Link>
  );
};

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const pathname = useSegments();
  const iconColor =
    colorScheme === 'dark' ? colors.blue[500] : colors.green[500];
  const { t } = useTranslation();

  console.log('pathname', pathname);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: iconColor,
      }}
    >
      <Tabs.Screen
        name="(index)"
        options={{
          title: t('tabs.one'),
          tabBarIcon: () => <Icon name="Hotel" color={iconColor} />,
          headerRight: HeaderRight,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: t('tabs.two'),
          tabBarIcon: () => <Icon name="Map" color={iconColor} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('tabs.settings'),
          tabBarIcon: () => <Icon name="Cog" color={iconColor} />,
        }}
      />
    </Tabs>
  );
}
