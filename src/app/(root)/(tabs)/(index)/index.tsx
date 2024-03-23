import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SafeAreaView } from '@components/core/SafeAreaView/SafeAreaView';
import { useAuth } from 'src/store/authStore/auth.store';
import { Carousel } from '@components/ui/Carousel/Carousel';
import { ExternalLink as Link } from '@components/core/Link/ExternalLink';
import { Header } from '@components/ui/Header/Header';
import feed from '@assets/data/feed.json';
import { viewportWidth, spacing } from '@lib/viewport';

export default function Index() {
  const { isGuestMode } = useAuth();
  return (
    <>
      <Header />
      <SafeAreaView>
        {!isGuestMode ? (
          <Text className="text-blue-500 text-xl px-8 pt-5 pb-10">
            Welcome, registered user!
          </Text>
        ) : (
          <Text className="text-blue-500 text-xl px-8 pt-5 pb-10">
            Welcome, guest!
          </Text>
        )}

        <Text className="text-blue-500 text-xl px-8 pt-5 pb-10">
          This is an example of using Material Top Tabs with Bottom navigation
          in expo-router
        </Text>

        <View className="w-screen">
          {feed?.length ? (
            <Carousel
              data={feed.slice(0, 10) ?? []}
              showPagination={true}
              renderItem={({ item }) => (
                <Link
                  href={JSON.stringify({
                    pathname: '/banner/[id]',
                    params: {
                      id: item.id,
                      title: item.title,
                      description: item.content,
                    },
                  })}
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
                    <Text>{item.content}</Text>
                  </View>
                </Link>
              )}
            />
          ) : (
            <Text>Loading</Text>
          )}
        </View>

        <StatusBar style="auto" />
      </SafeAreaView>
    </>
  );
}
