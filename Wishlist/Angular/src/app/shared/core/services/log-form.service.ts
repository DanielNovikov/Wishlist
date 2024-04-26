import {Injectable} from '@angular/core';
import {AbstractControl, FormGroup, ValidationErrors} from "@angular/forms";
import {LogFormPropertyRequest} from "../models/log-form-property-request";
import {LogFormPropertyErrorRequest} from "../models/log-form-property-error-request";
import {LogFormRequest} from "../models/log-form-request";
import {LogApiService} from "./log-api.service";

export interface FormGroupControls {
    [key: string]: AbstractControl;
}

@Injectable({
    providedIn: 'root'
})
export class LogFormService {

    constructor(private logApiService: LogApiService) {
    }

    log(form: FormGroup) {
        const request : LogFormRequest = {
            properties: this.getFormProperties(form.controls)
        };
        
        this.logApiService.logForm(request).subscribe();
    }

    private getFormProperties(controls: FormGroupControls) : LogFormPropertyRequest[] {
        let properties: LogFormPropertyRequest[] = [];
        
        Object.keys(controls).forEach(key => {
            const control = controls[key];
            
            if (control instanceof FormGroup) {
                properties = properties.concat(this.getFormProperties(control.controls));
            } else {
                let propertyErrors: LogFormPropertyErrorRequest[] = [];
                
                const controlErrors = control.errors;
                if (controlErrors !== null) {
                    Object.keys(controlErrors).forEach(keyError => {
                        propertyErrors.push({
                            name: keyError,
                            value: controlErrors[keyError]?.toString()
                        });
                    });
                }
                
                properties.push({
                    name: key,
                    value: control.value,
                    errors: propertyErrors
                });
            }
        });
        
        return properties;
    }
}
