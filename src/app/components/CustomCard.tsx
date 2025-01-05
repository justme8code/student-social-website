import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React from "react";

interface Props {
    title?: string;
    description?: string;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string; // Allow custom classes for styling
}

export const CustomCard: React.FC<Props> = ({ title, description, children, footer, className }) => {
    return (
        <Card className={`w-full  ${className}`}> {/* Apply the custom class here */}
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className={"space-y-5"}>{children}</CardContent>
            <CardFooter>{footer}</CardFooter>
        </Card>
    );
};
