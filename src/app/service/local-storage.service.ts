import { Injectable } from '@angular/core';

export interface Event {
  id: number;
  title: string;
  start: string;
  end: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getEventList(): Event[] {
    return localStorage.getItem('events')
      ? JSON.parse(localStorage.getItem('events') as string)
      : [];
  }

  addEvent(event: Omit<Event, 'id'>): any[] {
    const events: Event[] = this.getEventList();
    let id: number;
    if (events && events.length) {
      const lastEvent = events.pop() as Event;
      id = lastEvent.id + 1;
      events.push(lastEvent);
    } else {
      id = 1;
    }
    events.push({ ...event, id });
    localStorage.setItem('events', JSON.stringify(events));
    return events;
  }

  getEventById(id: number): Event | undefined {
    const events: Event[] = this.getEventList();
    return events.find((event) => event.id === id);
  }

  deleteEventById(id: number) {
    const events: Event[] = this.getEventList();
    let event = this.getEventById(id)!;
    const index = events.indexOf(event);
    events.splice(index, 1);
    localStorage.setItem('events', JSON.stringify(events));
    console.log(events);
  }

  editEventTitle(id: number, title: string) {
    const events: Event[] = this.getEventList();
    let event: Event = this.getEventById(id)!;
    event.title = title;
    return event.title;
  }
}
