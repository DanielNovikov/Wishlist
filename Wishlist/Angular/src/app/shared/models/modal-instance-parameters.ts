import {Subject} from "rxjs";
import {ModalOutput} from "./modal-output";

export class ModalInstanceParameters {

    onCallback: Subject<ModalOutput> = new Subject<ModalOutput>();
    input: any | undefined;
    
    public getInputs() : Record<string, unknown> {
        return {
            onCallback: this.onCallback,
            input: this.input
        }
    }
}
