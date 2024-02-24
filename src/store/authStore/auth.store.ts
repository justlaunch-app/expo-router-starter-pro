import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

type Credentials = {
  email: string;
  password: string;
};

type User = Credentials & {
  nickname?: string;
};

type AuthError = {
  error: string;
};

interface AuthState {
  user: User | null;
  users: User[];
  tutorialCompleted: boolean;
  login: (credentials: Credentials) => undefined | AuthError;
  register: (user: User) => undefined | AuthError;
  logout: () => void;
  resetPassword: (email: string) => string | AuthError;
  completeTutorial: () => void;
  setUser: (user: User | null) => void;
  isGuestMode: boolean;
  enableGuestMode: () => void;
  disableGuestMode: () => void;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  users: [],
  tutorialCompleted: false,
  isGuestMode: false,
  login(credentials) {
    const user = get().users.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );
    if (!user) {
      return { error: 'auth.errors.user-does-not-exist' };
    }
    set({ user });
    set({ isGuestMode: false });
    SecureStore.setItemAsync('user', JSON.stringify(user));
  },

  register(newUser) {
    const userExists = get().users.some((user) => user.email === newUser.email);
    if (userExists) {
      return { error: 'auth.errors.already-registered' };
    }
    set((state) => ({ users: [...state.users, newUser] }));
    SecureStore.setItemAsync(
      'users',
      JSON.stringify([...get().users, newUser])
    );
  },

  logout() {
    set({ user: null });
    set({ isGuestMode: true });
    SecureStore.deleteItemAsync('user');
  },

  resetPassword(email) {
    const users = get().users;
    const userIndex = users.findIndex((user) => user.email === email);
    if (userIndex === -1) {
      return { error: 'auth.errors.user-does-not-exist' };
    }
    const newPassword = Math.random().toString(36).slice(-8);
    users[userIndex] = { ...users[userIndex], password: newPassword };
    set({ users });
    SecureStore.setItemAsync('users', JSON.stringify(users));
    return newPassword;
  },

  completeTutorial() {
    set({ tutorialCompleted: true });
    SecureStore.setItemAsync('tutorialCompleted', 'true');
  },

  setUser(user) {
    set({ user });
    if (user) {
      SecureStore.setItemAsync('user', JSON.stringify(user));
    } else {
      SecureStore.deleteItemAsync('user');
    }
  },
  enableGuestMode: () => set({ user: null, isGuestMode: true }),

  disableGuestMode() {
    set({ isGuestMode: false });
  },
}));
