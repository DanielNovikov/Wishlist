import {Directive, EventEmitter, Input, Output} from "@angular/core";
import {Subject} from "rxjs";
import {ModalOutput} from "./modal-output";
import { Destroyable } from "./destroyable";

@Directive()
export abstract class ModalBase extends Destroyable {
    
    @Input() onCallback!: Subject<ModalOutput>;
    protected output(result: any) {
        const output = { hasResult: true, result: result } as ModalOutput;
        this.onCallback.next(output);
        this.onCallback.complete();
    }

    protected close() {
        this.onCallback.next(new ModalOutput());
        this.onCallback.complete();
    }
    
    @Input() input: any | undefined;
}
