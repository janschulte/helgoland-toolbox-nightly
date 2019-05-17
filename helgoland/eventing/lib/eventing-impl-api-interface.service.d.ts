import { HttpParams } from '@angular/common/http';
import { HttpRequestOptions, HttpService } from '@helgoland/core';
import { Observable } from 'rxjs';
import { EventingApiService } from './eventing-api.service';
import { EventingFilter } from './model/request/common';
import { EventFilter } from './model/request/events';
import { NotificationFilter } from './model/request/notifications';
import { PublicationFilter } from './model/request/publications';
import { SubscriptionFilter } from './model/request/subscriptions';
import { Event, EventResults } from './model/response/events';
import { Notification, NotificationResults } from './model/response/notifications';
import { Publication, PublicationResults } from './model/response/publications';
import { Subscription, SubscriptionResults } from './model/response/subscriptions';
export declare class EventingImplApiInterface extends EventingApiService {
    private httpService;
    constructor(httpService: HttpService);
    getEvents(apiUrl: string, filterParameter?: EventFilter, options?: HttpRequestOptions): Observable<EventResults>;
    getEvent(id: string, apiUrl: string, options?: HttpRequestOptions): Observable<Event>;
    getSubscriptions(apiUrl: string, filterParameter?: SubscriptionFilter, options?: HttpRequestOptions): Observable<SubscriptionResults>;
    getSubscription(id: string, apiUrl: string, options?: HttpRequestOptions): Observable<Subscription>;
    getPublications(apiUrl: string, filterParameter?: PublicationFilter, options?: HttpRequestOptions): Observable<PublicationResults>;
    getPublication(id: string, apiUrl: string, options?: HttpRequestOptions): Observable<Publication>;
    getNotifications(apiUrl: string, filterParameter?: NotificationFilter, options?: HttpRequestOptions): Observable<NotificationResults>;
    getNotification(id: string, apiUrl: string, options?: HttpRequestOptions): Observable<Notification>;
    protected requestApi<T>(url: string, params?: HttpParams, options?: HttpRequestOptions): Observable<T>;
    protected prepareFilterParams(params: EventingFilter): HttpParams;
    private addTimespan(timespan, httpParams);
    private addParameterFilter(params, key, httpParams);
}
