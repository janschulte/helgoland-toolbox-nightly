import { Id, EventingEndpoint } from './common';
export interface Notification extends Id {
    label: string;
    publication: Id;
}
export interface NotificationResults extends EventingEndpoint<Notification> {
}
