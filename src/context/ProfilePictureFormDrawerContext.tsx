import { createContext, useContext, useState, ReactNode } from "react";
import type { User } from "@/types/user";

type DrawerState = {
  open: boolean;
  initialUser?: Partial<User>;
  isEdit?: boolean;
};

type ProfilePictureFormDrawerContextType = {
  drawer: DrawerState;
  openPictureDrawer: (params?: { initialUser?: Partial<User>; isEdit?: boolean }) => void;
  closePictureDrawer: () => void;
};

const ProfilePictureFormDrawerContext = createContext<ProfilePictureFormDrawerContextType | undefined>(undefined);

export function ProfilePictureFormDrawerProvider({ children }: { children: ReactNode }) {
  const [drawer, setPictureDrawer] = useState<DrawerState>({ open: false });

  const openPictureDrawer = (params?: { initialUser?: Partial<User>; isEdit?: boolean }) => {
    setPictureDrawer({ open: true, ...params });
  };

  const closePictureDrawer = () => setPictureDrawer({ open: false });

  return (
    <ProfilePictureFormDrawerContext.Provider value={{ drawer, openPictureDrawer, closePictureDrawer }}>
      {children}
    </ProfilePictureFormDrawerContext.Provider>
  );
}

export function useProfilePictureFormDrawer() {
  const ctx = useContext(ProfilePictureFormDrawerContext);
  if (!ctx) throw new Error("useProfilePictureFormDrawer must be used within ProfilePictureFormDrawerProvider");
  return ctx;
}