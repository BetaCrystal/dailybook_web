import { User } from "@/types/user";
import { Link } from "lucide-react";
import { Button } from "../ui";

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
    return (
        <div>
            {/*Photo et bouton de modification*/}
            <p>Informations</p>
            <div>
                <image href={(user?.image)}></image>
                {/*<Button>
                    <img src={}/>
                </Button> <- bouton de modification de la photo de profil*/}
            </div>
            <h1>
                {(user?.name)}
            </h1>
            <p>
                {(user?.email)}
            </p>
            <span>
                {(user?.isPremium)}
                {(premiumStat)}
            </span>
        </div>

    );
}