import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidationMessagesService {
  getErrorMessage(control: AbstractControl | null, label: string = 'Field'): string | null {
    if (!control || !control.errors) return null;

    const errors: ValidationErrors = control.errors;

    if (errors['required']) return `${label} is required`;
    if (errors['maxlength'])
      return `${label} cannot exceed ${errors['maxlength'].requiredLength} characters`;
    if (errors['minlength'])
      return `${label} must be at least ${errors['minlength'].requiredLength} characters`;
    if (errors['pattern']) return `Invalid ${label} format`;
    if (errors['englishOnly']) return `${label} must contain English letters only`;
    return null;
  }
}
