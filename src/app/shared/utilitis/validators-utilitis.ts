import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(value);
    return selectedDate < today ? { pastDate: true } : null;
  };
}

export function englishOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const regex = /^[A-Za-z0-9\s!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|`~-]*$/;
    return regex.test(control.value) ? null : { englishOnly: true };
  };
}
