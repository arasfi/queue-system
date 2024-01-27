import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RequestQueueService {
  private queue: Subject<Observable<any>> = new Subject<Observable<any>>();
  private responseSubject: Subject<any> = new Subject<any>(); // New subject for responses/errors

  constructor() {
    this.queue
      .pipe(
        concatMap((request) =>
          request.pipe(
            catchError((error) => {
              // Emit error to responseSubject
              this.responseSubject.next({ error });
              throw error;
            })
          )
        )
      )
      .subscribe((response) => {
        // Emit response to responseSubject
        this.responseSubject.next({ response });
      });
  }

  addToQueue(request: Observable<any>) {
    this.queue.next(request);
  }

  getResponseObservable(): Observable<any> {
    return this.responseSubject.asObservable();
  }
}
