import { useProfilePictureFormDrawer } from "@/context/ProfilePictureFormDrawerContext";
import { ProfilePictureFormDrawer } from "./ProfilePictureFormDrawer";
import { useUserContext } from "@/context/UserContext";
import { toast } from "sonner";
import * as Sentry from "@sentry/react";
import { User } from "@/types/user";

export function ProfilePictureFormDrawerWrapper() {
  const { drawer, closePictureDrawer } = useProfilePictureFormDrawer();
  const { updateUser, refresh } = useUserContext();

  async function handleSubmit(data: Partial<User>) {
    try {
      // Création ou modification
      if (drawer.initialUser?.uid) {
        await updateUser(drawer.initialUser?.uid, { ...data});
        toast.success("Photo de profil modifiée avec succès.");
      }
      refresh();
      closePictureDrawer();
    } catch (e) {
      Sentry.captureException(e, {
        extra: { data, isEdit: drawer.isEdit },
      });
      console.error(e);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  }

  return (
    <ProfilePictureFormDrawer
      open={drawer.open}
      onClose={closePictureDrawer}
      onSubmit={handleSubmit}
      isSubmitting={false}
      initialUser={drawer.initialUser}
    />
  );
}