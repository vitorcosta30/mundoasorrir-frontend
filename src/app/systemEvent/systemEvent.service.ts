import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SystemEvent } from './systemEvent.class';

@Injectable({
  providedIn: 'root',
})
export class SystemEventService {
  private subject$ = new Subject<SystemEvent>();

  emit(event: SystemEvent) {
    this.subject$.next(event);
  }

  on(eventName: string, action: any): Subscription {
    return this.subject$.pipe(
      filter((e: SystemEvent) => e.name === eventName),
      map((e: SystemEvent) => e["value"])).subscribe(action);
  }
}