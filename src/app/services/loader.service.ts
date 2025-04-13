import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private activeRequests = 0;
  private loaderSubject = new BehaviorSubject<boolean>(false);
  loader$ = this.loaderSubject.asObservable();

  show() {
    this.activeRequests++;
    if (this.activeRequests === 1) {
      this.loaderSubject.next(true);
    }
  }

  hide() {
    if (this.activeRequests > 0) {
      this.activeRequests--;
    }
    if (this.activeRequests === 0) {
      this.loaderSubject.next(false);
    }
  }

  reset() {
    this.activeRequests = 0;
    this.loaderSubject.next(false);
  }
}
