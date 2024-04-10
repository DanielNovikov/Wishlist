import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
        
        const value = control.value;
        if (!value) return { required: true }
        if (value.length > 100) return { maxLength: true }
        
        const emailRegex = new RegExp('^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|)$');
        const valid = emailRegex.test(control.value);
        
        return valid ? null : { email: true };
    }
}