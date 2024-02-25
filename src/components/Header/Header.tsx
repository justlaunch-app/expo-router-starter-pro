import React from 'react';
import { Text, View } from 'react-native';
import { useUser } from '@clerk/clerk-expo';

export const Header: React.FC = () => {
  const user = useUser().user;
  if (!user) {
    return null;
  }

  return (
    <View className="py-4 bg-red-500">
      <Text>
        User Data: {user.firstName ?? ''} {user.lastName ?? ''}
      </Text>
      <Text>User Email: {user.emailAddresses[0].emailAddress ?? ''}</Text>
    </View>
  );
};

export default Header;
