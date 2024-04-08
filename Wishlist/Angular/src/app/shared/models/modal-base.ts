import {Directive, EventEmitter, Output} from "@angular/core";

@Directive()
export abstract class ModalBase {
    
    @Output() onClose = new EventEmitter();
    
    protected close = () => this.onClose.emit();
}
