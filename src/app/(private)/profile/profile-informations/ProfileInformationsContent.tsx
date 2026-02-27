'use client';

import { ProfileDisplay, StatusText } from "@/components/profile/ProfileDisplay";
import { ProfileSetting } from "@/components/ui/profile-setting";
import { Button } from "@/components/ui";
import { useUserContext } from "@/context/UserContext";

export default function ProfileInformationsContent(){
    const user = useUserContext();
    return(
        <div>
            <ProfileDisplay
            user={user.user}
            premiumStat={StatusText(user.user?.isPremium)}>

            </ProfileDisplay>
            {/*Liste des paramètres du compte*/}
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