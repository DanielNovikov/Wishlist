import {LogFormPropertyErrorRequest} from "./log-form-property-error-request";

export class LogFormPropertyRequest {
    name!: string;
    value: string | undefined;
    errors!: LogFormPropertyErrorRequest[];
}
