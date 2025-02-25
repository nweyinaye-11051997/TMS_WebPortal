import { Injectable } from '@angular/core';
import notify from 'devextreme/ui/notify';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }
  showNotification(message: string, type: 'success' | 'info' | 'warning' | 'error' | 'custom', displayTime: number = 2000) {
    notify({
      message,
      type,
      displayTime,
      position: {
        my: "top right",
        at: "top right",
        of: window,
        offset: "-20 -1"
      }
    });
  }
}
