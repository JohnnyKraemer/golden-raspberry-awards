import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static yearValidator(currentYear: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (
        control.value === null ||
        control.value === '' ||
        control.value === undefined
      ) {
        return null;
      }

      const year = Number(control.value);

      if (isNaN(year)) {
        return { invalidYear: true };
      }

      if (!Number.isInteger(year)) {
        return { notInteger: true };
      }

      if (year < 1900 || year > currentYear) {
        return { invalidRange: true };
      }
      return null;
    };
  }
}
