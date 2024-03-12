import { useAuth } from '@clerk/clerk-expo';

export const useLogout = () => {
  const { signOut, isLoaded } = useAuth();

  const handleLogout = () => {
    if (isLoaded) {
      signOut();
    }
  };

  return handleLogout;
};
