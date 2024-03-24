import { useAuth as useClerkAuth } from '@clerk/clerk-expo';
import { useAuth as useZustandAuth } from 'src/store/authStore/auth.store';

export const useLogout = () => {
  const { signOut, isLoaded } = useClerkAuth();
  const { logout: zustandLogout } = useZustandAuth();

  const handleLogout = () => {
    if (isLoaded) {
      signOut()
        .then(() => {
          zustandLogout();
        })
        .catch((error) => {
          console.error('Error logging out with Clerk: ', error);
        });
    }
  };

  return handleLogout;
};
