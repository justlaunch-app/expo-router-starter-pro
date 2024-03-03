import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import SafeAreaView from '@components/SafeAreaView/SafeAreaView';
import { useAuth } from 'src/store/authStore/auth.store';
import Header from '@components/Header/Header';

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

        <View className="py-12 px-8">
          <Text className="text-blue-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam,
            eveniet ut unde, nemo minus nisi, ullam iure exercitationem amet
            quia praesentium! Minima non debitis labore, rem odit enim itaque
            qui?
          </Text>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </>
  );
}
