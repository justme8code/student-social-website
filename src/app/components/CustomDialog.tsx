import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export interface CustomDialogProps {
    open: boolean;
    onClose: () => void;
    className?: string;
    children?: React.ReactNode;
}

export const CustomDialog:React.FC<CustomDialogProps> = ({ open, onClose, className,children }) => {
    return (
        <>
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent className={`w-full h-full   p-4 overflow-auto ${className}`}>
                    {children}
                </DialogContent>
            </Dialog>
        </>
    );
};
