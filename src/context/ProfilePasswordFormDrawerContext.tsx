import { createContext, useContext, useState, ReactNode } from "react";
import type { User } from "@/types/user";

type DrawerState = {
  open: boolean;
  initialUser?: Partial<User>;
  isEdit?: boolean;
};

type ProfilePasswordFormDrawerContextType = {
  drawer: DrawerState;
  openPasswordDrawer: (params?: { initialUser?: Partial<User>; isEdit?: boolean }) => void;
  closePasswordDrawer: () => void;
};

const ProfilePasswordFormDrawerContext = createContext<ProfilePasswordFormDrawerContextType | undefined>(undefined);

export function ProfilePasswordFormDrawerProvider({ children }: { children: ReactNode }) {
  const [drawer, setPasswordDrawer] = useState<DrawerState>({ open: false });

  const openPasswordDrawer = (params?: { initialUser?: Partial<User>; isEdit?: boolean }) => {
    setPasswordDrawer({ open: true, ...params });
  };

  const closePasswordDrawer = () => setPasswordDrawer({ open: false });

  return (
    <ProfilePasswordFormDrawerContext.Provider value={{ drawer, openPasswordDrawer, closePasswordDrawer }}>
      {children}
    </ProfilePasswordFormDrawerContext.Provider>
  );
}

export function useProfilePasswordFormDrawer() {
  const ctx = useContext(ProfilePasswordFormDrawerContext);
  if (!ctx) throw new Error("useProfilePasswordFormDrawer must be used within ProfilePasswordFormDrawerProvider");
  return ctx;
}