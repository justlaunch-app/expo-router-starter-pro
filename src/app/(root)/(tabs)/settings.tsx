import { SafeAreaView } from '@components/core/safe-area-view';
import { Text, View } from 'react-native';
import { DeviceInfo } from '@components/ui/device/device-info';
import { AppVersion } from '@components/ui/device/app-version';
import { Divider } from '@components/core/divider';
import { useColorScheme } from 'nativewind';
import LanguagePicker from '@components/ui/picker/language-picker';
import { useLogout } from '@hooks/auth/useLogout';
import { router } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';

export default function Settings() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const logOut = useLogout();
  const user = useUser();

  return (
    <SafeAreaView>
      <View className="flex justify-between h-full max-w-sm mx-auto">
        <View className="my-5 mx-auto">
          <Text
            onPress={() =>
              setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
            }
            className="text-black dark:text-white text-2xl font-semibold"
          >
            {`The color scheme is ${colorScheme}`}
          </Text>
        </View>
        <View className="pb-40">
          <LanguagePicker className="mx-auto" />
        </View>

        {user !== null && (
          <Text
            onPress={() => {
              logOut();
              router.replace('/');
            }}
            className="text-black dark:text-white text-xl font-semibold text-center uppercase "
          >
            Log Out
          </Text>
        )}

        {/* Device Info Section */}
        <View>
          <Text className="text-lg font-bold">Device Info</Text>
          <DeviceInfo />
          <Divider />
          <AppVersion />
        </View>
      </View>
    </SafeAreaView>
  );
}
