import { Text, View } from 'react-native';
import { useAuth } from 'src/store/authStore/auth.store';
import { Carousel } from '@components/ui/Carousel/Carousel';
import { ExternalLink as Link } from '@components/core/Link/ExternalLink';
import { Header } from '@components/ui/Header/Header';
import feed from '@assets/data/feed.json';
import { viewportWidth } from '@lib/viewport';

export default function Index() {
  const { isGuestMode } = useAuth();
  return (
    <>
      <Header />
      <View>
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

        {feed && (
          <Carousel
            data={feed.slice(0, 10) ?? []}
            showPagination={true}
            renderItem={({ item }) => (
              <Link
                style={{
                  width: viewportWidth,
                }}
              >
                <View className={'flex bg-white'}>
                  <Text className="text-xl font-bold">{item.title}</Text>
                  <Text>{item.content}</Text>
                </View>
              </Link>
            )}
          />
        )}
      </View>
    </>
  );
}
