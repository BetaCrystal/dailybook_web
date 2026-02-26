'use client';

import { ProfileDisplay } from "@/components/profile/ProfileDisplay";
import { Link, User } from "lucide-react";
import { ProfileSetting } from "@/components/ui/profile-setting";
import { Button } from "@/components/ui";
import { useUserContext } from "@/context/UserContext";
import { getCurrentUser } from "@/lib/auth/server/getCurrentUser";
import { userInfo } from "os";
import { getUser } from "@/services/user";

export default function ProfileInformationsContent(){
    const user = useUserContext();
    return(
        <div>
            <ProfileDisplay
            user={user.user}>

            </ProfileDisplay>
            {/*Liste des paramètres*/}
            <div>
                <ProfileSetting>Gérer mon abonnement</ProfileSetting>
                <ProfileSetting>Support utilisateur</ProfileSetting>
                <ProfileSetting>Passer en mode sombre</ProfileSetting>
                <ProfileSetting>Supprimer mon compte</ProfileSetting>
                <ProfileSetting>Déconnexion</ProfileSetting>

            </div>
            <Button>
                <a>Accéder aux paramètres du compte</a>
            </Button>
        </div>

    );
}