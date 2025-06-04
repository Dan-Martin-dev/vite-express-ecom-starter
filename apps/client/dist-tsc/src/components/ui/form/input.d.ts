import * as React from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';
import { FieldWrapperPassThroughProps } from './field-wrapper';
export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & FieldWrapperPassThroughProps & {
    className?: string;
    registration: Partial<UseFormRegisterReturn>;
};
declare const Input: React.ForwardRefExoticComponent<React.InputHTMLAttributes<HTMLInputElement> & FieldWrapperPassThroughProps & {
    className?: string;
    registration: Partial<UseFormRegisterReturn>;
} & React.RefAttributes<HTMLInputElement>>;
export { Input };
//# sourceMappingURL=input.d.ts.map