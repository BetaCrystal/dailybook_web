import { User } from "@/types/user";
import { UserPicture } from "@/types/user_picture";
import { Link } from "lucide-react";
import { Button } from "../ui";

type ProfileDisplayProps = {
    user: User | undefined;
    /*userPicture: UserPicture;*/
}

/*Ici le component du profil avec la photo, le nom et le statut (premium ou basique)*/

export function ProfileDisplay({
    /*userPicture,*/
    user,
}: ProfileDisplayProps){
    return (
        <div>
            {/*Photo et bouton de modification*/}
            <p>Informations</p>
            <div>
                {/*<image href={(userPicture.filename)}></image>
                <Button>
                    <image></image>
                </Button>*/}
            </div>
            <h1>
                {(user?.name)}
            </h1>
            <p>
                {(user?.email)}
            </p>
            <span>
                {(user?.isPremium) /*Trouver comment faire une condition pour afficher Premium ou Basique*/
                }
            </span>
        </div>

    );
}