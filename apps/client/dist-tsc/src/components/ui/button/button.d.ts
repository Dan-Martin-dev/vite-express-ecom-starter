import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
    icon?: React.ReactNode;
};
declare const Button: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<(props?: ({
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string> & {
    asChild?: boolean;
    isLoading?: boolean;
    icon?: React.ReactNode;
} & React.RefAttributes<HTMLButtonElement>>;
export { Button, buttonVariants };
//# sourceMappingURL=button.d.ts.map