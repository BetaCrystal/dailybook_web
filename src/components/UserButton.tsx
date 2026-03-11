'use client';

import { useState, useRef, useEffect } from 'react';
import {
        Avatar,
        AvatarFallback,
        AvatarImage,
} from '@/components/ui/avatar';
import {
        Popover,
        PopoverContent,
        PopoverTrigger,
} from '@/components/ui/popover';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { LogOut, Settings, User, ChevronRight, ArrowLeft, Moon, Trash2, LifeBuoy, UserCog, KeyRound, PenLine } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ProfileDisplay, StatusText } from "@/components/profile/ProfileDisplay";
import { useUserContext } from "@/context/UserContext";
import { useProfileNameFormDrawer } from '@/context/ProfileNameFormDrawerContext';
import { useProfilePasswordFormDrawer } from '@/context/ProfilePasswordFormDrawerContext';
import ModeToggleUserButton from '@/components/ModeToggleUserButton';

type Panel = 'main' | 'profil' | 'settings';

export default function UserButton() {
        const pathname = usePathname();
        const user = useUserContext();
        const [open, setOpen] = useState(false);
        const [activePanel, setActivePanel] = useState<Panel>('main');
        const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');
        const containerRef = useRef<HTMLDivElement>(null);

        const { openNameDrawer: openNameDrawerForm } = useProfileNameFormDrawer();
        const { openPasswordDrawer: openPasswordDrawerForm } = useProfilePasswordFormDrawer();

        // Reset to main panel when popover closes
        useEffect(() => {
                if (!open) {
                        // Small delay so the animation isn't visible when closing
                        const timer = setTimeout(() => {
                                setActivePanel('main');
                                setSlideDirection('left');
                        }, 200);
                        return () => clearTimeout(timer);
                }
        }, [open]);

        const handleLogout = async () => {
                try {
                        await signOut(auth);
                        await fetch('/api/session/logout', { method: 'POST' });
                        window.location.href = '/login';
                } catch (error) {
                        console.error('Erreur de déconnexion :', error);
                }
        };

        const navigateTo = (panel: Panel) => {
                setSlideDirection('left');
                setActivePanel(panel);
        };

        const navigateBack = () => {
                setSlideDirection('right');
                setActivePanel('main');
        };

        // Ouvre le drawer pour édition via le context
        const handleEditName = () => {
                openNameDrawerForm({ initialUser: user.user });
        };
        const handleEditPassword = () => {
                openPasswordDrawerForm({ initialUser: user.user });
        };

        return (
                <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                                <Avatar className="h-8 w-8 cursor-pointer">
                                        <AvatarImage src="/user.png" alt="Utilisateur" />
                                        <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                        </PopoverTrigger>
                        <PopoverContent
                                align="end"
                                className="w-72 p-0 overflow-hidden"
                        >
                                <div ref={containerRef} className="relative">
                                        {/* ===== MAIN PANEL ===== */}
                                        <div
                                                className={`transition-all duration-300 ease-in-out ${
                                                        activePanel === 'main'
                                                                ? 'translate-x-0 opacity-100'
                                                                : slideDirection === 'left'
                                                                        ? '-translate-x-full opacity-0 absolute inset-0 pointer-events-none'
                                                                        : 'translate-x-full opacity-0 absolute inset-0 pointer-events-none'
                                                }`}
                                        >
                                                <div className="px-4 py-3 border-b">
                                                        <p className="text-sm font-semibold">Mon compte</p>
                                                </div>

                                                <div className="py-1">
                                                        {/* Profil */}
                                                        <button
                                                                onClick={() => navigateTo('profil')}
                                                                className="flex items-center justify-between w-full px-4 py-2.5 text-sm hover:bg-accent transition-colors cursor-pointer"
                                                        >
                                                                <span className="flex items-center gap-3">
                                                                        <User className="h-4 w-4" />
                                                                        Profil
                                                                </span>
                                                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                                        </button>

                                                        {/* Paramètres */}
                                                        <button
                                                                onClick={() => navigateTo('settings')}
                                                                className="flex items-center justify-between w-full px-4 py-2.5 text-sm hover:bg-accent transition-colors cursor-pointer"
                                                        >
                                                                <span className="flex items-center gap-3">
                                                                        <Settings className="h-4 w-4" />
                                                                        Paramètres
                                                                </span>
                                                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                                        </button>
                                                </div>

                                                <div className="border-t py-1">
                                                        <button
                                                                onClick={handleLogout}
                                                                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-destructive hover:bg-accent transition-colors cursor-pointer"
                                                        >
                                                                <LogOut className="h-4 w-4" />
                                                                Se déconnecter
                                                        </button>
                                                </div>
                                        </div>

                                        {/* ===== PROFIL PANEL ===== */}
                                        <div
                                                className={`transition-all duration-300 ease-in-out ${
                                                        activePanel === 'profil'
                                                                ? 'translate-x-0 opacity-100'
                                                                : slideDirection === 'right'
                                                                        ? 'translate-x-full opacity-0 absolute inset-0 pointer-events-none'
                                                                        : '-translate-x-full opacity-0 absolute inset-0 pointer-events-none'
                                                }`}
                                        >
                                                <div className="flex items-center gap-3 px-4 py-3 border-b">
                                                        <button
                                                                onClick={navigateBack}
                                                                className="p-1 rounded-full hover:bg-accent transition-colors cursor-pointer"
                                                        >
                                                                <ArrowLeft className="h-4 w-4" />
                                                        </button>
                                                        <p className="text-sm font-semibold">Profil</p>
                                                </div>

                                                <div className="px-4 py-4">
                                                        <ProfileDisplay
                                                                user={user.user}
                                                                premiumStat={StatusText(user.user?.isPremium)}
                                                        />
                                                </div>

                                                <div className="border-t py-1">

                                                        <button
                                                                onClick={handleEditName}
                                                                className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-accent transition-colors bg-accent text-primary
                                                                `}
                                                        >
                                                                <PenLine className="h-4 w-4" />
                                                                Changer le nom
                                                        </button>

                                                        <button
                                                                onClick={handleEditPassword}
                                                                className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-accent transition-colorsbg-accent text-primary
                                                                `}
                                                        >
                                                                <KeyRound className="h-4 w-4" />
                                                                Changer le mot de passe
                                                        </button>
                                                </div>
                                        </div>

                                        {/* ===== SETTINGS PANEL ===== */}
                                        <div
                                                className={`transition-all duration-300 ease-in-out ${
                                                        activePanel === 'settings'
                                                                ? 'translate-x-0 opacity-100'
                                                                : slideDirection === 'right'
                                                                        ? 'translate-x-full opacity-0 absolute inset-0 pointer-events-none'
                                                                        : '-translate-x-full opacity-0 absolute inset-0 pointer-events-none'
                                                }`}
                                        >
                                                <div className="flex items-center gap-3 px-4 py-3 border-b">
                                                        <button
                                                                onClick={navigateBack}
                                                                className="p-1 rounded-full hover:bg-accent transition-colors cursor-pointer"
                                                        >
                                                                <ArrowLeft className="h-4 w-4" />
                                                        </button>
                                                        <p className="text-sm font-semibold">Paramètres</p>
                                                </div>

                                                <div className="py-1">
                                                        <Link
                                                                href="/profil/account"
                                                                onClick={() => setOpen(false)}
                                                                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-accent transition-colors"
                                                        >
                                                                <UserCog className="h-4 w-4" />
                                                                Gérer mon compte
                                                        </Link>
                                                        <Link
                                                                href="/profil/support"
                                                                onClick={() => setOpen(false)}
                                                                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-accent transition-colors"
                                                        >
                                                                <LifeBuoy className="h-4 w-4" />
                                                                Support utilisateurs
                                                        </Link>
                                                        <ModeToggleUserButton
                                                                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-accent transition-colors cursor-pointer"
                                                        >
                                                                Passer en mode sombre
                                                        </ModeToggleUserButton>

                                                        <div className="border-t my-1" />

                                                        <button
                                                                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-destructive hover:bg-accent transition-colors cursor-pointer"
                                                        >
                                                                <Trash2 className="h-4 w-4" />
                                                                Supprimer mon compte
                                                        </button>
                                                </div>
                                        </div>
                                </div>
                        </PopoverContent>
                </Popover>
        );
}
