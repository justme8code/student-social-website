import { useTheme } from "next-themes";
import { IconButton } from "@/app/components/buttons/IconButton";
import { MoonIcon, SunIcon} from "lucide-react";

export const ModeToggle = () => {
    const { theme, setTheme } = useTheme();

    return (
        <>
            <IconButton
                onClick={() => {
                    setTheme(theme === "dark" ? "light" : "dark");
                }}
                text={theme === "dark" ? "Dark" : "Light"} icon={theme === "dark"?<MoonIcon/>:<SunIcon/>}            />
        </>
    );
};
