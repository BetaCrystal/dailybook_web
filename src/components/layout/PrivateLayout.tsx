"use client";

import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import { FloatingActions } from "@/components/ui/FloatingActions";
import { usePathname } from "next/navigation";
import { EventFormDrawerProvider } from "@/context/EventFormDrawerContext";
import { EventFormDrawerWrapper } from "@/components/events/EventFormDrawerWrapper";
import { EventDrawerProvider } from "@/context/EventDrawerContext";
import { EventDrawerWrapper } from "../events/EventDrawerWrapper";
import { EventDeleteProvider } from "@/context/EventDeleteContext";
import { AnimalFormDrawerProvider } from "@/context/AnimalFormDrawerContext";
import { AnimalFormDrawerWrapper } from "../animals/AnimalFormDrawerWrapper";
import { AnimalDeleteProvider } from "@/context/AnimalDeleteContext";
import { ObjectiveFormDrawerWrapper } from "../objectives/ObjectiveFormDrawerWrapper";
import { ObjectiveFormDrawerProvider } from "@/context/ObjectiveFormDrawerContext";
import { ObjectiveDeleteProvider } from "@/context/ObjectiveDeleteContext";
import { ProfileNameFormDrawerProvider } from "@/context/ProfileNameFormDrawerContext";
import { ProfileNameFormDrawerWrapper } from "../profile/ProfileNameDrawerWrapper";
import { ProfilePasswordFormDrawerProvider } from "@/context/ProfilePasswordFormDrawerContext";
import { ProfilePasswordFormDrawerWrapper } from "../profile/ProfilePasswordDrawerWrapper";

export function PrivateLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Pages où le FAB est caché
  const hideFabOnPaths = ["/account", "/settings", "/login", "/register"];

  return (
    <AnimalFormDrawerProvider>
      <AnimalDeleteProvider>
        <EventFormDrawerProvider>
          <EventDeleteProvider>
            <EventDrawerProvider>
              <ObjectiveFormDrawerProvider>
                <ObjectiveDeleteProvider>
                  <ProfileNameFormDrawerProvider>
                    <ProfilePasswordFormDrawerProvider>
                      <ResponsiveAppBar />
                      {children}
                      <EventFormDrawerWrapper />
                      <EventDrawerWrapper />
                      <AnimalFormDrawerWrapper />
                      <ObjectiveFormDrawerWrapper />
                      <ProfileNameFormDrawerWrapper />
                      <ProfilePasswordFormDrawerWrapper />
                      {/* Affiche le FAB sauf sur certaines pages */}
                      {!hideFabOnPaths.some((path) => pathname.startsWith(path)) && (
                        <FloatingActions
                          currentPath={pathname}
                          hideOnPaths={hideFabOnPaths}
                        />
                      )}
                    </ProfilePasswordFormDrawerProvider>
                  </ProfileNameFormDrawerProvider>
                </ObjectiveDeleteProvider>
              </ObjectiveFormDrawerProvider>
            </EventDrawerProvider>
          </EventDeleteProvider>
        </EventFormDrawerProvider>
      </AnimalDeleteProvider>
    </AnimalFormDrawerProvider>
  );
}
