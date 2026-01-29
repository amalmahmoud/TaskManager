import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationMessagesService } from '../../services/validation.service';

@Component({
  selector: 'app-form-error',
  template: `
    @if (control?.touched && control?.invalid) {
      <div class="text-red-500 text-sm">
        {{ validationMessagesService.getErrorMessage(control, label) }}
      </div>
    }
  `,
})
export class FormErrorComponent {
  @Input() control!: AbstractControl | null;
  @Input() label: string = 'Field';

  constructor(public validationMessagesService: ValidationMessagesService) {}
}
