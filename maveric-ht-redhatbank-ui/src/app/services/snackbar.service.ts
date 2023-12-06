import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(message: string, config?: Partial<MatSnackBarConfig>): void {
    const defaultConfig: MatSnackBarConfig = {
      duration: 3000,
      verticalPosition: 'bottom', // Show at the bottom
      panelClass: ['custom-snackbar'], // Add custom class for additional styling
      ...config, // Merge with custom config if provided
    };

    // Use a type assertion to tell TypeScript that the string format is compatible with MatSnackBarVerticalPosition
    defaultConfig.verticalPosition = 'bottom' as MatSnackBarVerticalPosition;
    console.log('Showing Snack Bar');

    this.snackBar.open(message, 'Close', defaultConfig);
  }
}
