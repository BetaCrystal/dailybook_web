import * as React from "react"
import { Button } from "./button"

function ProfileSetting({ className, ...props }: React.ComponentProps<"button">){
    return(
        <Button
        className={" bg-rouan rounded-lg text-bai-brun text-base w-64 py-5 hover:text-background my-0.5"

        }
        {...props}
        />
    )
}

export { ProfileSetting }