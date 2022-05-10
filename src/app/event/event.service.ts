import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment-timezone';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _path: string = environment.teamBaseUrl + '/events/api/v1/event-schedules';

  constructor(
    private http: HttpClient,
  ) { }

  getEvents(params: any): Observable<PaginationParams<Event[]>> {
    const newParams: any = {
      page: params.page + 1,
      size: params.size,
      sort: params.sortName + ',' + params.sortOrder,
    }

    if (params.keyword) {
      newParams.q = params.filterOption + "," + params.keyword;
    }

    return this.http.get<PaginationParamsModel<EventModel[]>>(this._path, { params: newParams })
      .pipe(map(d => {
        return {
          pageIndex: d.number - 1,
          pageSize: d.size,
          totalElements: d.total_elements,
          totalPages: d.total_pages,
          data: d.data.map(r => new Event(r)),
        }
      }))
  }

  registerEvent(eventId: number, offset: number): Observable<{ code: number, message: string, error: string, data: string }> {
    const payload = {
      id: eventId,
      offset,
    };
    return this.http.post<{ code: number, message: string, error: string, data: string }>(this._path + '/' + eventId + '/register', payload);
  }

  unregisterEvent(eventId: number, reason: string): Observable<{ code: number, message: string, error: string, data: string }> {
    const payload = {
      id: eventId,
      reason
    };
    return this.http.post<{ code: number, message: string, error: string, data: string }>(this._path + '/' + eventId + '/unregister', payload);
  }
}

export interface EventModel {
  description: string;
  end_date: string;
  event_status: EventStatusModel;
  tenant: ClientModel;
  event_id: number;
  id: number;
  location: LocationModel;
  recurrence: string;
  schedule_status: string;
  start_date: string;
  title: string;
  total_participant: number;
  max_participant: number;
  visibilities: ClientModel[];
}

export class Event {
  description: string;
  endDate: moment.Moment;
  startDate: moment.Moment;
  eventStatus: EventStatus;
  tenant: Client;
  id: number;
  eventId: number;
  location: Location;
  maxParticipant: number;
  recurrence: string;
  scheduleStatus: string;
  title: string;
  totalParticipant: number;
  visibilities: Client[];
  timeZone: string;

  constructor(model: EventModel) {
    this.description = model.description;
    this.startDate = model.start_date ? moment.utc(model.start_date) : null;
    this.endDate = model.end_date ? moment.utc(model.end_date) : null;
    this.tenant = model.tenant ? new Client(model.tenant) : null;
    this.id = model.id;
    this.location = model.location ? new Location(model.location) : null;
    this.maxParticipant = model.max_participant;
    this.recurrence = model.recurrence;
    this.scheduleStatus = model.schedule_status;
    this.title = model.title;
    this.totalParticipant = model.total_participant;
    this.visibilities = model.visibilities ? model.visibilities.map(d => new Client(d)) : null;

    if (model.event_status == EventStatusModel.registered) {

      if (this.scheduleStatus === ScheduleStatus.startingNow && this.location.type === LocationType.managed) {
        this.eventStatus = EventStatus.startingNow;
      }
      else {
        this.eventStatus = EventStatus.registered;
      }
    }
    else if (model.event_status == EventStatusModel.available && model.schedule_status == ScheduleStatus.scheduled) {
      this.eventStatus = EventStatus.eventCanBook;
    }
    else if (model.schedule_status == ScheduleStatus.full) {
      this.eventStatus = EventStatus.full;
    }
  }
}

export enum EventStatusModel {
  available = 'AVAILABLE',
  ended = 'ENDED',
  registered = 'REGISTERED',
  unregistered = 'UNREGISTERED',
}

export enum EventStatus {
  registered = "REGISTERED",
  startingNow = "STARTING_NOW",
  eventCanBook = "EVENTCANBOOK",
  full = 'FULL'
}

export enum ScheduleStatus {
  scheduled = 'SCHEDULED',
  startingNow = "STARTING_NOW",
  canceled = 'CANCELED',
  full = 'FULL'
}

export interface ClientModel {
  client_id: number;
  name: string;
}

export class Client {
  clientId: number;
  name: string;

  constructor(model: ClientModel) {
    this.clientId = model.client_id;
    this.name = model.name;
  }
}

export interface LocationModel {
  join_url: string;
  secret_key: string;
  type: LocationType;
}

export class Location {
  joinUrl: string;
  secretKey: string;
  type: LocationType;

  constructor(model: LocationModel) {
    this.joinUrl = model.join_url ? model.join_url.startsWith("https://") ? model.join_url : "https://" + model.join_url : null;
    this.secretKey = model.secret_key;
    this.type = model.type;
  }
}

export enum LocationType {
  managed = "MANAGED",
  unmanaged = "UNMANAGED"
}

export class PaginationParams<T> {
  data?: T;
  pageIndex: number;
  pageSize: number;
  totalElements?: number;
  totalPages: number;
}

export interface PaginationParamsModel<T> {
  size: number;
  number: number;
  total_elements: number;
  total_pages: number;
  data: T
}
