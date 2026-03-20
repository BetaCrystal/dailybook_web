import { ReactNode } from "react";

type ObjectiveFilterButtonProps = {
    id: number;
    isSelected: boolean;
};

export function ObjectiveFilterButton({id, isSelected, children}: {id, isSelected: ObjectiveFilterButtonProps, children: ReactNode}){
    return (
        <ObjectiveFilterButton
            id={id}
            isSelected={isSelected}
        >
            {children}
        </ObjectiveFilterButton>
    );
}