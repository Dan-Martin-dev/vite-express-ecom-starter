export type Notification = {
    id: string;
    type: 'info' | 'warning' | 'success' | 'error';
    title: string;
    message?: string;
};
type NotificationsStore = {
    notifications: Notification[];
    addNotification: (notification: Omit<Notification, 'id'>) => void;
    dismissNotification: (id: string) => void;
};
export declare const useNotifications: import("zustand").UseBoundStore<import("zustand").StoreApi<NotificationsStore>>;
export {};
//# sourceMappingURL=notifications-store.d.ts.map