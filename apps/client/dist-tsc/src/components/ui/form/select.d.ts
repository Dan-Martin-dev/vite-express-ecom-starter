import * as React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FieldWrapperPassThroughProps } from './field-wrapper';
type Option = {
    label: React.ReactNode;
    value: string | number | string[];
};
type SelectFieldProps = FieldWrapperPassThroughProps & {
    options: Option[];
    className?: string;
    defaultValue?: string;
    registration: Partial<UseFormRegisterReturn>;
};
export declare const Select: (props: SelectFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=select.d.ts.map