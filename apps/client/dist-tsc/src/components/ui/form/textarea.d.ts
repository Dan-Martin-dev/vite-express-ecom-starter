import * as React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FieldWrapperPassThroughProps } from './field-wrapper';
export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & FieldWrapperPassThroughProps & {
    className?: string;
    registration: Partial<UseFormRegisterReturn>;
};
declare const Textarea: React.ForwardRefExoticComponent<React.TextareaHTMLAttributes<HTMLTextAreaElement> & FieldWrapperPassThroughProps & {
    className?: string;
    registration: Partial<UseFormRegisterReturn>;
} & React.RefAttributes<HTMLTextAreaElement>>;
export { Textarea };
//# sourceMappingURL=textarea.d.ts.map