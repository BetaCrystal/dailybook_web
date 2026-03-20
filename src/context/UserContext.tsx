'use client';

import { createContext, useContext } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { User } from "@/types/user";
import * as userService from "@/services/user";
import * as Sentry from "@sentry/react";

type UserContextType = {
  user: User | undefined;
  isLoading: boolean;
  isError: any;
  updateUser: (id: string, user: Partial<User>) => Promise<void>;
  refresh: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isError, mutate } = useCurrentUser();

  const updateUser = async (id: string, user: Partial<User>) => {
      try {
        await userService.updateUser(id, user);
        await mutate();
      } catch (err: any) {
        Sentry.captureException(err);
        throw new Error(err?.message || "Erreur lors de la modification de l'utilisateur");
      }
    };

    const refresh = () => mutate();

  return (
    <UserContext.Provider value={{ user, isLoading, isError, updateUser, refresh, }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUserContext must be used within UserProvider");
  return ctx;
}