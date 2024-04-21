import { Link, Tabs, usePathname } from 'expo-router';
import { Icon } from '@components/core/icon/lucide';
import { Pressable } from 'react-native';
import { useColorScheme } from 'nativewind';
import { useTranslation } from 'react-i18next';
import { DefaultTheme, DarkTheme } from '@utils/theme';

const HeaderRight = () => {
  const { colorScheme } = useColorScheme();

  return (
    <Link href="/notification-modal" asChild className="pr-3">
      <Pressable>
        {() => (
          <Icon
            name="Bell"
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

  // i18n
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:
          colorScheme === 'dark'
            ? DarkTheme.colors.navigation
            : DefaultTheme.colors.navigation,
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
              color={
                pathname === '/'
                  ? DarkTheme.colors.navigationActive
                  : DefaultTheme.colors.navigationActive
              }
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
              color={
                pathname === '/two'
                  ? DarkTheme.colors.navigationActive
                  : DefaultTheme.colors.navigationActive
              }
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
              color={
                pathname === '/settings'
                  ? DarkTheme.colors.navigationActive
                  : DefaultTheme.colors.navigationActive
              }
              strokeWidth={pathname === '/settings' ? 2 : 1}
            />
          ),
        }}
      />
    </Tabs>
  );
}
