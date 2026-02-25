import * as React from "react"
import { Button } from "./button"

function ProfileSetting({ className, ...props }: React.ComponentProps<"button">){
    return(
        <Button
        className={" bg-rouan rounded-lg text-bai-brun text-base"

        }
        {...props}
        />
    )
}

export { ProfileSetting }