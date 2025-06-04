import * as DrawerPrimitive from '@radix-ui/react-dialog';
import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
declare const Drawer: React.FC<DrawerPrimitive.DialogProps>;
declare const DrawerTrigger: React.ForwardRefExoticComponent<DrawerPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DrawerClose: React.ForwardRefExoticComponent<DrawerPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const DrawerPortal: React.FC<DrawerPrimitive.DialogPortalProps>;
declare const DrawerOverlay: React.ForwardRefExoticComponent<Omit<DrawerPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DrawerContent: React.ForwardRefExoticComponent<Omit<DrawerPrimitive.DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & VariantProps<(props?: ({
    side?: "top" | "bottom" | "left" | "right" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string> & React.RefAttributes<HTMLDivElement>>;
declare const DrawerHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const DrawerFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const DrawerTitle: React.ForwardRefExoticComponent<Omit<DrawerPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const DrawerDescription: React.ForwardRefExoticComponent<Omit<DrawerPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
export { Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, };
//# sourceMappingURL=drawer.d.ts.map