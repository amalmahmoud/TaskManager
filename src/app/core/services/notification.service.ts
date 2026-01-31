import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root' 
})
export class NotificationService {
  private messageService = inject(MessageService);
  notify(severity: 'success' | 'info' | 'warn' | 'error', summary: string, detail?: string) {
    this.messageService.add({ 
      severity, 
      summary, 
      detail,
      life: 3000 
    });
  }

  success(detail?: string, summary: string = 'Success') {
    this.notify('success', summary, detail);
  }

  error(detail?: string, summary: string = 'Error') {
    this.notify('error', summary, detail);
  }

  clear() {
    this.messageService.clear();
  }
}