import {Injectable, signal, Type, WritableSignal} from '@angular/core';
import {finalize, Observable} from "rxjs";
import {ModalBase} from "../models/modal-base";
import {ModalInstance} from "../models/modal-instance";
import {ModalInstanceParameters} from "../models/modal-instance-parameters";
import {ModalOutput} from "../models/modal-output";
import {ModalInstanceSize} from "../models/modal-instance-size";

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    instances: WritableSignal<ModalInstance[]> = signal<ModalInstance[]>([]);

    public open<T extends ModalBase<TInput>, TInput>(
        componentType: Type<T>,
        input: TInput | undefined = undefined,
        size: ModalInstanceSize = ModalInstanceSize.Normal)
        : Observable<ModalOutput> {

        let parameters = new ModalInstanceParameters();
        parameters.input = input;

        let instance = {
            componentType: componentType,
            parameters: parameters,
            isVisible: signal(true),
            size: size
        } as ModalInstance;

        this.instances.update(arr =>  [...arr, instance]);

        return parameters.onCallback.asObservable().pipe(
            finalize(() => this.close(instance))
        );
    }

    public close(instance: ModalInstance) {
        instance.isVisible.set(false);

        setTimeout(() => {
            this.instances.update(arr => arr.filter(x => x != instance));
        }, 300);
    }
}
