declare const icons: {
    info: import("react/jsx-runtime").JSX.Element;
    success: import("react/jsx-runtime").JSX.Element;
    warning: import("react/jsx-runtime").JSX.Element;
    error: import("react/jsx-runtime").JSX.Element;
};
export type NotificationProps = {
    notification: {
        id: string;
        type: keyof typeof icons;
        title: string;
        message?: string;
    };
    onDismiss: (id: string) => void;
};
export declare const Notification: ({ notification: { id, type, title, message }, onDismiss, }: NotificationProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=notification.d.ts.map