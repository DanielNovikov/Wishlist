import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordValidator(required: boolean = true): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {

        const value = control.value;
        if (!value) return required ? { required: true } : null;
        if (value.length > 50) return { maxLength: true }

        return null;
    }
}