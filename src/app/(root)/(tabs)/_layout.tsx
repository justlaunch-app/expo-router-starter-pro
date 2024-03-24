import { Link, Tabs, usePathname } from 'expo-router';
import { Icon } from '@components/core/Icon/LucideIcon';
import { Pressable } from 'react-native';
import { useColorScheme } from 'nativewind';
import { useTranslation } from 'react-i18next';
import colors from 'tailwindcss/colors';

const HeaderRight = () => {
  const { colorScheme } = useColorScheme();

  return (
    <Link href="/modal" asChild className="pr-2">
      <Pressable>
        {() => (
          <Icon
            name="Star"
            color={colorScheme === 'dark' ? 'white' : 'black'}
          />
        )}
      </Pressable>
    </Link>
  );
};

export default function TabLayout() {
  const pathname = usePathname();

  const { colorScheme } = useColorScheme();
  const iconColor =
    colorScheme === 'dark' ? colors.blue[500] : colors.green[500];
  const iconActiveColor =
    colorScheme === 'dark' ? colors.red[500] : colors.purple[500];

  // i18n
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
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'blue',
          tabBarIcon: () => (
            <Icon
              name="Hotel"
              color={pathname === '/' ? iconActiveColor : iconColor}
              strokeWidth={pathname === '/' ? 2 : 1}
            />
          ),
          headerRight: HeaderRight,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: t('tabs.two'),
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'blue',
          tabBarIcon: () => (
            <Icon
              name="Map"
              color={pathname === '/two' ? iconActiveColor : iconColor}
              strokeWidth={pathname === '/two' ? 2 : 1}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('tabs.settings'),
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'blue',
          tabBarIcon: () => (
            <Icon
              name="Cog"
              color={pathname === '/settings' ? iconActiveColor : iconColor}
              strokeWidth={pathname === '/settings' ? 2 : 1}
            />
          ),
        }}
      />
    </Tabs>
  );
}
