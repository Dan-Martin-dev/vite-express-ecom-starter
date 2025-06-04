import * as React from 'react';
import { type FieldError } from 'react-hook-form';
type FieldWrapperProps = {
    label?: string;
    className?: string;
    children: React.ReactNode;
    error?: FieldError | undefined;
};
export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, 'className' | 'children'>;
export declare const FieldWrapper: (props: FieldWrapperProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=field-wrapper.d.ts.map