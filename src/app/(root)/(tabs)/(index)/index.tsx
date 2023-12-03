import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { viewportWidth, spacing } from '_utils/viewport';
import { Link } from 'expo-router';
import analytics from '_utils/analytics/segment';

//i18n
import { useTranslation } from 'react-i18next';

//Components
import { Carousel } from '_components/Carousel/Carousel';

//Data
import homeData from '_assets/data/home.json';
import { classNames } from '_utils/classNames';
import { useColorScheme } from 'nativewind';
import { usePosts } from '_utils/queries/usePosts';
import { Post } from '_types/Post';

export default function Index() {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const { data: posts } = usePosts();

  analytics.trackScreen('Home');

  return (
    <SafeAreaView
      className={classNames({
        'flex flex-1 items-center justify-start': true,
        'bg-white': colorScheme === 'light',
        'bg-black': colorScheme === 'dark',
      })}
    >
      <Text className="text-blue-500 pt-2 text-2xl text-bold">
        {t('greeting')}
      </Text>
      <Text className="text-blue-500 text-xl px-8 pt-5 pb-10">
        This is an example of using Material Top Tabs with Bottom navigation in
        expo-router
      </Text>

      <View className="w-screen">
        {posts?.length ? (
          <Carousel
            data={posts.slice(0, 10) ?? []}
            showPagination={true}
            renderItem={({ item }: { item: Post }) => (
              <Link
                onPress={() => {
                  analytics.trackEvent('Banner Pressed', {
                    bannerId: item.id,
                  });
                }}
                href={{
                  pathname: '/banner/[id]',
                  params: {
                    id: item.id,
                    title: item.title,
                    description: item.body,
                  },
                }}
                style={{
                  width: viewportWidth - spacing,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 5 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  elevation: 1,
                }}
                className="justify-center items-center bg-white rounded-2xl p-4"
              >
                <View className={'gap-4'}>
                  <Text className="text-xl font-bold" numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text>{item.body}</Text>
                </View>
              </Link>
            )}
          />
        ) : (
          <Text>{t('loading')}</Text>
        )}
      </View>

      <View className="py-12 px-8">
        <Text className="text-blue-500">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam,
          eveniet ut unde, nemo minus nisi, ullam iure exercitationem amet quia
          praesentium! Minima non debitis labore, rem odit enim itaque qui?
        </Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
