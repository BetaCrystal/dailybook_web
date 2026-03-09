import { createContext, useContext, useState, ReactNode } from "react";
import type { User } from "@/types/user";

type DrawerState = {
  open: boolean;
  initialUser?: Partial<User>;
  isEdit?: boolean;
};

type ProfileNameFormDrawerContextType = {
  drawer: DrawerState;
  openNameDrawer: (params?: { initialUser?: Partial<User>; isEdit?: boolean }) => void;
  closeNameDrawer: () => void;
};

const ProfileNameFormDrawerContext = createContext<ProfileNameFormDrawerContextType | undefined>(undefined);

export function ProfileNameFormDrawerProvider({ children }: { children: ReactNode }) {
  const [drawer, setNameDrawer] = useState<DrawerState>({ open: false });

  const openNameDrawer = (params?: { initialUser?: Partial<User>; isEdit?: boolean }) => {
    setNameDrawer({ open: true, ...params });
  };

  const closeNameDrawer = () => setNameDrawer({ open: false });

  return (
    <ProfileNameFormDrawerContext.Provider value={{ drawer, openNameDrawer, closeNameDrawer }}>
      {children}
    </ProfileNameFormDrawerContext.Provider>
  );
}

export function useProfileNameFormDrawer() {
  const ctx = useContext(ProfileNameFormDrawerContext);
  if (!ctx) throw new Error("useProfileNameFormDrawer must be used within AnimalFormDrawerProvider");
  return ctx;
}