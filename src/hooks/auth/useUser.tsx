import { useUser as clerkUseUser } from '@clerk/clerk-expo';
import { UserResource as User } from '@clerk/types';

export const useUser: () => User | null | undefined = () => {
  return clerkUseUser().user;
};

export const useUserIsLoaded: () => boolean = () => {
  return clerkUseUser().isLoaded;
};

export const useUserIsSignedIn: () => boolean | undefined = () => {
  return clerkUseUser().isSignedIn;
};
