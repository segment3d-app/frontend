import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id?: string | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

interface AuthStore {
  user?: User | null;
  access_token?: string | null;
  expires?: string | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  updateUser: (user: User, data: Partial<User>) => void;
  setAccessToken: (access_token: string, exires: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  clear: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      access_token: null,
      expires: null,
      isAuthenticated: false,
      setUser: (user: User) => set({ user }),
      updateUser: (user: User, data: Partial<User>) =>
        set(() => ({ user: { ...user, ...data } })),
      setAccessToken: (access_token: string, expires: string) =>
        set({ access_token, expires }),
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),
      clear: () =>
        set({
          user: null,
          access_token: null,
          expires: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useAuthStore;
