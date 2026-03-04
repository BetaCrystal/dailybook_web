'use client';

import {
        Avatar,
        AvatarFallback,
        AvatarImage,
} from '@/components/ui/avatar';
import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuLabel,
        DropdownMenuSeparator,
        DropdownMenuTrigger,
        DropdownMenuSubTrigger,
        DropdownMenuSubContent,
        DropdownMenuSub,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { LogOut, Settings, User } from 'lucide-react';
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ProfileDisplay, StatusText } from "@/components/profile/ProfileDisplay";
import { useUserContext } from "@/context/UserContext";

export default function UserButton() {
    const pathname = usePathname();
        const user = useUserContext();

        const handleLogout = async () => {
                try {
                        await signOut(auth);
                        await fetch('/api/session/logout', { method: 'POST' });
                        window.location.href = '/login';
                } catch (error) {
                        console.error('Erreur de déconnexion :', error);
                }
        };

        return (
                <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                                <Avatar className="h-8 w-8 cursor-pointer">
                                        <AvatarImage src="/user.png" alt="Utilisateur" />
                                        <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger className={`{'text-sm font-medium text-primary'}`}><User className="mr-2 h-4 w-4" />Profil</DropdownMenuSubTrigger>
                                        <DropdownMenuSubContent className="z-50">
                                            <DropdownMenuItem className="grid gap-2 w-48">
                                                <ProfileDisplay
                                                user={user.user}
                                                premiumStat={StatusText(user.user?.isPremium)}>
                                                </ProfileDisplay>
                                                    <Link
                                                        href="/performances/objectives"
                                                        className={`text-sm rounded-sm px-2 py-1.5 hover:bg-accent hover:text-primary ${pathname === '/performances/objectifs' && 'bg-accent text-primary'}`}
                                                    >
                                                    <DropdownMenuItem>Changer le nom</DropdownMenuItem>
                                                    </Link>
                                                    <Link
                                                        href="/performances/statistiques"
                                                        className={`text-sm rounded-sm px-2 py-1.5 hover:bg-accent hover:text-primary ${pathname === '/performances/statistiques' && 'bg-accent text-primary'}`}
                                                    >
                                                    <DropdownMenuItem>Changer le mot de passe</DropdownMenuItem>
                                                    </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuSub>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger className={`{'text-sm font-medium text-primary'}`}><Settings className="mr-2 h-4 w-4" />Paramètres</DropdownMenuSubTrigger>
                                            <DropdownMenuSubContent className="z-50">
                                                <DropdownMenuItem className="grid gap-2 w-48">
                                                    <Link
                                                        href="/performances/objectives"
                                                        className={`text-sm rounded-sm px-2 py-1.5 hover:bg-accent hover:text-primary ${pathname === '/performances/objectifs' && 'bg-accent text-primary'}`}
                                                    >
                                                    <DropdownMenuItem>Gérer mon compte</DropdownMenuItem>
                                                    </Link>
                                                    <Link
                                                        href="/performances/statistiques"
                                                        className={`text-sm rounded-sm px-2 py-1.5 hover:bg-accent hover:text-primary ${pathname === '/performances/statistiques' && 'bg-accent text-primary'}`}
                                                    >
                                                    <DropdownMenuItem>Support utilisateurs</DropdownMenuItem>
                                                    </Link>
                                                    <Link
                                                        href="/performances/statistiques"
                                                        className={`text-sm rounded-sm px-2 py-1.5 hover:bg-accent hover:text-primary ${pathname === '/performances/statistiques' && 'bg-accent text-primary'}`}
                                                    >
                                                    <DropdownMenuItem>Passer en mode sombre</DropdownMenuItem>
                                                    </Link>
                                                    <Link
                                                        href="/performances/statistiques"
                                                        className={`text-sm rounded-sm px-2 py-1.5 hover:bg-accent hover:text-primary ${pathname === '/performances/statistiques' && 'bg-accent text-primary'}`}
                                                    >
                                                    <DropdownMenuItem>Supprimer mon compte</DropdownMenuItem>
                                                    </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuSub>
                                </DropdownMenuItem>


                                <DropdownMenuSeparator />

                                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Se déconnecter</span>
                                </DropdownMenuItem>
                        </DropdownMenuContent>
                </DropdownMenu>
        )
}
