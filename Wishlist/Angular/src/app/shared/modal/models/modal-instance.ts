import {signal, Type, WritableSignal} from "@angular/core";
import {ModalBase} from "./modal-base";
import {ModalInstanceParameters} from "./modal-instance-parameters";

export class ModalInstance {
    
    componentType!: Type<ModalBase<any>>;
    parameters!: ModalInstanceParameters;
    isVisible!: WritableSignal<boolean>;
}
