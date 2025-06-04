import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';
import { ControllerProps, FieldPath, FieldValues, FormProvider, SubmitHandler, UseFormProps, UseFormReturn } from 'react-hook-form';
import { ZodType, z } from 'zod';
declare const FormField: <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ ...props }: ControllerProps<TFieldValues, TName>) => import("react/jsx-runtime").JSX.Element;
declare const useFormField: () => {
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isValidating: boolean;
    error?: import("react-hook-form").FieldError;
    id: string;
    name: string;
    formItemId: string;
    formDescriptionId: string;
    formMessageId: string;
};
declare const FormItem: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const FormLabel: React.ForwardRefExoticComponent<Omit<LabelPrimitive.LabelProps & React.RefAttributes<HTMLLabelElement>, "ref"> & React.RefAttributes<HTMLLabelElement>>;
declare const FormControl: React.ForwardRefExoticComponent<Omit<import("@radix-ui/react-slot").SlotProps & React.RefAttributes<HTMLElement>, "ref"> & React.RefAttributes<HTMLElement>>;
declare const FormDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const FormMessage: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
type FormProps<TFormValues extends FieldValues, Schema> = {
    onSubmit: SubmitHandler<TFormValues>;
    schema: Schema;
    className?: string;
    children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
    options?: UseFormProps<TFormValues>;
    id?: string;
};
declare const Form: <Schema extends ZodType<any, any, any>, TFormValues extends FieldValues = z.infer<Schema>>({ onSubmit, children, className, options, id, schema, }: FormProps<TFormValues, Schema>) => import("react/jsx-runtime").JSX.Element;
export { useFormField, Form, FormProvider, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField, };
//# sourceMappingURL=form.d.ts.map