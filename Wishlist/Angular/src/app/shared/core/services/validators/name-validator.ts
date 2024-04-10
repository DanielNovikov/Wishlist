import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function nameValidator(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {

        const value = control.value;
        if (!value) return { required: true }
        if (value.length > 50) return { maxLength: true }
        
        return null;
    }
}