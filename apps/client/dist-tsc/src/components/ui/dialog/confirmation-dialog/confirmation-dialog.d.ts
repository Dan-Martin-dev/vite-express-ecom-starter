import * as React from 'react';
export type ConfirmationDialogProps = {
    triggerButton: React.ReactElement;
    confirmButton: React.ReactElement;
    title: string;
    body?: string;
    cancelButtonText?: string;
    icon?: 'danger' | 'info';
    isDone?: boolean;
};
export declare const ConfirmationDialog: ({ triggerButton, confirmButton, title, body, cancelButtonText, icon, isDone, }: ConfirmationDialogProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=confirmation-dialog.d.ts.map