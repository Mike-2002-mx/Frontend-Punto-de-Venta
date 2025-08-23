import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  
  constructor (private snackBar: MatSnackBar){}

  showNotification(message: string, action: string='Close'){
    this.snackBar.open(message, action, {
      duration:3000,
      horizontalPosition:'center',
      verticalPosition:'top'
    })
  }

  showErrorNotification(message: string) {
  this.snackBar.open(message, 'Close', {
    duration: 3000, 
    horizontalPosition:'center',
    verticalPosition:'top',
    panelClass: ['error-snackbar']
  });
}
}
