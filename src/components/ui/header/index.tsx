import React from 'react';
import { Text, View } from 'react-native';
import { useUser, useUserIsSignedIn } from '@hooks/auth/useUser';

export const Header = () => {
  const user = useUser();

  if (!useUserIsSignedIn()) {
    return null;
  }

  return (
    <View className="py-4 bg-red-500">
      <Text>
        User Data: {user?.firstName ?? ''} {user?.lastName ?? ''}
      </Text>
      <Text>User Email: {user?.emailAddresses[0]?.emailAddress ?? ''}</Text>
    </View>
  );
};
