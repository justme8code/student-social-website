import { toast } from "@/hooks/use-toast";

export const showToast = (title:string,message: string) => {
    toast({
        title: `${title}`,
        description: `${message}`,
    });
};

