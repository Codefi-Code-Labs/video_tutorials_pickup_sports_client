import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../../shared/models/event';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http:HttpClient) { }

  getEvents(page:number){
    return this.http.get<Event[]>(`${environment.apiUrl}/events?page=${page}`)
  }

  getEvent(id:string | number){
    return this.http.get<Event>(`${environment.apiUrl}/events/${id}`)
  }

  createEvent(event:Event){
    return this.http.post(`${environment.apiUrl}/events`, event)
  }

  joinEvent(eventId:number){
    return this.http.post(`${environment.apiUrl}/events/${eventId}/join`, {})
  }

  leaveEvent(eventId:number){
    return this.http.delete(`${environment.apiUrl}/events/${eventId}/leave`)
  }

}
