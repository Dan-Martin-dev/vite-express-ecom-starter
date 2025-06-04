declare const sizes: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
};
declare const variants: {
    light: string;
    primary: string;
};
export type SpinnerProps = {
    size?: keyof typeof sizes;
    variant?: keyof typeof variants;
    className?: string;
};
export declare const Spinner: ({ size, variant, className, }: SpinnerProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=spinner.d.ts.map