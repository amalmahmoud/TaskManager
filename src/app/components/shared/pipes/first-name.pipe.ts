import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'firstName' })
export class FirstNamePipe implements PipeTransform {
  transform(fullName: string): string {
    if (!fullName) return '';
    const firstName = fullName.split(' ')[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  }
}
