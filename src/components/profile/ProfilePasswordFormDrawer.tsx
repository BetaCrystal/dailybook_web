import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRef } from "react";
import { User } from "@/types/user";
import { X } from "lucide-react";
import { useProfilePasswordForm } from "@/hooks/useProfilePasswordForm";

type ProfilePasswordFormDrawerProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<User>, imageFile?: File) => void;
    isSubmitting?: boolean;
};

export function ProfilePasswordFormDrawer({ open, onClose, onSubmit, isSubmitting = false, initialUser }: ProfilePasswordFormDrawerProps & { initialUser?: Partial<User> }){
    const {
        values,
        handleChange,
        handleSubmit,
        resetForm,
    } = useProfilePasswordForm(initialUser);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleClose = () => {
        resetForm();
        if (inputRef.current) inputRef.current.value = "";
        onClose();
    };

    return(
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent showCloseButton={false} className="max-w-[900px] w-[70vw] h-[40vh] rounded-2xl p-0 overflow-hidden flex flex-col">
                <DialogHeader className="px-6 py-4 flex flex-row items-center justify-between">
                    <DialogTitle>Modifier le mot de passe</DialogTitle>
                    <Button
                        onClick={onClose}
                        className="p-2 rounded hover:bg-white/20 text-white"
                        variant="ghost"
                        type="button"
                        tabIndex={0}
                        aria-label="Fermer"
                    >
                        <X size={20} />
                    </Button>
                </DialogHeader>
                <form className="flex-1 overflow-y-auto p-6 flex flex-col gap-6" onSubmit={handleSubmit(async (vals) => {
                    onSubmit(vals);
                })}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                            <label className="block text-sm font-medium mb-1">Ancien mot de passe</label>
                            <Input
                                type="text"
                                name="expotoken"
                                value={values.expotoken || ""}
                                onChange={handleChange}
                                placeholder="Ancien mot de passe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Nouveau mot de passe</label>
                            <Input
                                type="text"
                                name="expotoken"
                                value={values.expotoken || ""}
                                onChange={handleChange}
                                placeholder="Nouveau mot de passe"
                            />
                        </div>

                    </div>

                    <DialogFooter className="mt-auto flex justify-end gap-2">
                        <Button type="button" variant="ghost" onClick={handleClose} disabled={isSubmitting}>
                            Annuler
                        </Button>
                        <Button type="submit" variant="outline" disabled={isSubmitting}>
                            {isSubmitting ? "Modification..." : "Modifier"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )


}