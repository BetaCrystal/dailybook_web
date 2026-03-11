import { useProfilePasswordFormDrawer } from "@/context/ProfilePasswordFormDrawerContext";
import { ProfilePasswordFormDrawer } from "./ProfilePasswordFormDrawer";
import { useUserContext } from "@/context/UserContext";
import { toast } from "sonner";
import * as Sentry from "@sentry/react";
import { User } from "@/types/user";

export function ProfilePasswordFormDrawerWrapper() {
  const { drawer, closePasswordDrawer } = useProfilePasswordFormDrawer();
  const { updateUser, refresh } = useUserContext();

  async function handleSubmit(data: Partial<User>) {
    try {
      // Création ou modification
      if (drawer.initialUser?.uid) {
        await updateUser(drawer.initialUser?.uid, { ...data});
        toast.success("Mot de passe modifié avec succès.");
      }
      refresh();
      closePasswordDrawer();
    } catch (e) {
      Sentry.captureException(e, {
        extra: { data, isEdit: drawer.isEdit },
      });
      console.error(e);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  }

  return (
    <ProfilePasswordFormDrawer
      open={drawer.open}
      onClose={closePasswordDrawer}
      onSubmit={handleSubmit}
      isSubmitting={false}
      initialUser={drawer.initialUser}
    />
  );
}