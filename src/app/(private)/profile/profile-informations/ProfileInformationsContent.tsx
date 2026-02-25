'use client';

import { ProfileDisplay } from "@/components/profile/ProfileDisplay";
import { Link } from "lucide-react";
import { ProfileSetting } from "@/components/ui/profile-setting";
import { Button } from "@/components/ui";

export default function ProfileInformationsContent(){
    return(
        <div>
            <ProfileDisplay>

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