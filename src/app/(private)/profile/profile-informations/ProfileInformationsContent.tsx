'use client';

import { ProfileDisplay, StatusText } from "@/components/profile/ProfileDisplay";
import { ProfileSetting } from "@/components/ui/profile-setting";
import { Button } from "@/components/ui";
import { useUserContext } from "@/context/UserContext";
import Link from "next/link";

export default function ProfileInformationsContent(){
    const user = useUserContext();
    return(
        <div className="flex justify-center items-center flex-col pt-12">
            <p className="gap-1.5 px-6 text-lg font-semibold mb-1">Informations</p>
            <ProfileDisplay
            user={user.user}
            premiumStat={StatusText(user.user?.isPremium)}>

            </ProfileDisplay>
            {/*Liste des paramètres du compte*/}
            <div className="flex flex-col my-9">
                <ProfileSetting>Gérer mon abonnement</ProfileSetting>
                <ProfileSetting>Support utilisateur</ProfileSetting>
                <ProfileSetting>Passer en mode sombre</ProfileSetting>
                <ProfileSetting>Supprimer mon compte</ProfileSetting>
                <ProfileSetting>Déconnexion</ProfileSetting>

            </div>
            <Button>
                <Link href="/profile/profile-settings">Accéder aux paramètres du compte</Link>
            </Button>
        </div>

    );
}