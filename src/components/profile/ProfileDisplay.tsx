import { User } from "@/types/user";
import { Link } from "lucide-react";
import { Button } from "../ui";
import { ProfilePicture } from "./ProfilePicture";
import { useProfilePictureFormDrawer } from '@/context/ProfilePictureFormDrawerContext';

type ProfileDisplayProps = {
    user: User | undefined;
    premiumStat: string;
}

/*Ici le component du profil avec la photo, le nom et le statut (premium ou basique)*/

/*On affiche un label pour le statut du compte*/
export function StatusText(premium:boolean | undefined){
        var tempStat: string;
        if(premium === true){
            tempStat = "Premium";
        } else {
            tempStat = "Basique";
        }
        const stat = tempStat;
        return stat;
}

export function ProfileDisplay({
    user,
    premiumStat,
}: ProfileDisplayProps){
        const { openPictureDrawer: openPictureDrawerForm } = useProfilePictureFormDrawer();

        const handleEditPicture = () => {
                openPictureDrawerForm({ initialUser: user });
        };

    return (
        <div className="flex flex-col items-center">
            {/*Photo et bouton de modification*/}
            <div className="mb-3 relative">
                <ProfilePicture
                user={user}
                width={120}
                height={120}></ProfilePicture>
                <Button className="px-2.5 z-1 absolute right-0 bottom-0" onClick={handleEditPicture}>
                    <img src="/crayon.svg" className="w-4.5 h-auto"/>
                </Button>
            </div>
            <h1 className="text-muted-foreground text-lg">
                {(user?.name)}
            </h1>
            <p className="text-muted-foreground mb-1">
                {(user?.email)}
            </p>
            <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full transition-all bg-primary shadow-xs h-fit px-4 py-1 text-sm font-medium text-white w-fit">
                {(user?.isPremium)}
                {(premiumStat)}
            </span>
        </div>

    );
}