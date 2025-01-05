import { Input } from "@/components/ui/input";
import { ControllerRenderProps } from "react-hook-form";

interface Props {
    field?: ControllerRenderProps<any, string>;  // Accepting the field props from React Hook Form
    placeholder?: string;
    type?: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
}
// From Controller
export const CustomInput: React.FC<Props> = ({field,placeholder, type = "text",className,disabled,required,}) => {
    return (
        <Input
            {...field}  // Spread the field props here so the input is correctly controlled
            placeholder={placeholder}
            type={type}
            disabled={disabled}
            required={required}
            aria-required={required ? "true" : "false"}  // Accessibility: add aria-required when input is required
            className={`w-full outline-none border-none focus-visible:ring-offset-0 rounded-sm ring-1 ring-gray-300 focus-visible:ring-purple-400 ${className}`}
        />
    );
};
