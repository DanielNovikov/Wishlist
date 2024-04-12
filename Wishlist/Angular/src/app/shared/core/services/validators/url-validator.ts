import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function urlValidator(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {

        const value = control.value;
        if (!value) return null;
        if (value.length > 300) return { maxLength: true }

        const urlRegex = new RegExp(/(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/i);
        const valid = urlRegex.test(control.value);

        return valid ? null : { url: true };
    }
}