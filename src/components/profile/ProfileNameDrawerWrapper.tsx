import { useProfileNameFormDrawer } from "@/context/ProfileNameFormDrawerContext";
import { ProfileNameFormDrawer } from "./ProfileNameFormDrawer";
import { useUserContext } from "@/context/UserContext";
import { toast } from "sonner";
import * as Sentry from "@sentry/react";
import { User } from "@/types/user";

export function ProfileNameFormDrawerWrapper() {
  const { drawer, closeNameDrawer } = useProfileNameFormDrawer();
  const { updateUser, refresh } = useUserContext();

  async function handleSubmit(data: Partial<User>) {
    try {
      // Création ou modification
      if (drawer.initialUser?.uid) {
        await updateUser(drawer.initialUser?.uid, { ...data});
        toast.success("Nom d'utilisateur modifié avec succès.");
      }
      refresh();
      closeNameDrawer();
    } catch (e) {
      Sentry.captureException(e, {
        extra: { data, isEdit: drawer.isEdit },
      });
      console.error(e);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  }

  return (
    <ProfileNameFormDrawer
      open={drawer.open}
      onClose={closeNameDrawer}
      onSubmit={handleSubmit}
      isSubmitting={false}
      initialUser={drawer.initialUser}
    />
  );
}