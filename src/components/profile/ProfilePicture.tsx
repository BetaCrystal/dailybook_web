import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";

export function ProfilePicture({user, width, height, classNames}: {user?: User, width: number, height: number, classNames?: string}){
    const [hasError, setHasError] = useState(false);
    useEffect(() => {
    // Réinitialise l'erreur quand l'URL signée change
    setHasError(false);
  }, [user?.imageSigned?.url]);

  return(
    <>
        {user?.imageSigned && user.image && !hasError ? (
                <Image
                  src={user.imageSigned.url}
                  alt={user.name}
                  className={classNames ? `${classNames}` : `w-full h-full object-cover rounded-full`}
                  width={width}
                  height={height}
                  onError={() => {
                    setHasError(true);
                  }}
                />
              ) : hasError ? (
                <Skeleton className="w-full h-full rounded-full" />
              ) : (
                <div className="w-full h-full rounded-full flex items-center justify-center shadow-sm" style={{ width: `${width}px`, height: `${height}px` }}>
                  <span className="text-5xl font-semibold">{user?.name.charAt(0)}</span>
                </div>
              )}
    </>
  )
}