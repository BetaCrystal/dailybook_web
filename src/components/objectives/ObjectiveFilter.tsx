import { ObjectiveFilterButton } from "./ObjectiveFilterButton";
import { ReactNode } from "react";

export function ObjectiveFilter({ children }: { children: ReactNode }){
    return (
        <ObjectiveFilter>
            <ObjectiveFilterButton
            id={0}
            isSelected={false}
            >
                <p>En cours</p>
            </ObjectiveFilterButton>
            <ObjectiveFilterButton
            id={1}
            isSelected={false}
            >
                <p>Terminé</p>
            </ObjectiveFilterButton>
        </ObjectiveFilter>
    );
}