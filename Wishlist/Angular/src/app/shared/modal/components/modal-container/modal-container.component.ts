import {
    Component,
    EventEmitter,
    Output,
    ViewChild,
    ViewContainerRef,
    AfterViewInit, OnInit, effect, Renderer2
} from '@angular/core';
import {ModalBase} from "../../models/modal-base";
import {NgClass, NgComponentOutlet} from "@angular/common";
import {ModalService} from "../../services/modal.service";
import {ModalInstance} from "../../models/modal-instance";
import {ModalOutput} from "../../models/modal-output";

@Component({
    selector: 'app-modal-container',
    standalone: true,
    imports: [
        NgClass,
        NgComponentOutlet
    ],
    templateUrl: './modal-container.component.html',
    styleUrl: './modal-container.component.scss'
})
export class ModalContainerComponent {
    constructor(protected modalService: ModalService, private renderer: Renderer2) {
        // disabling scrolling of body when at least one modal is opened
        effect(() => {
            const instances = modalService.instances();
            if (instances.length > 0) {
                this.renderer.setStyle(document.body, 'overflow', 'hidden');
            } else {
                this.renderer.removeStyle(document.body, 'overflow');
            }
        })
    }

    close(instance: ModalInstance) {
        instance.parameters.onCallback.next(new ModalOutput());
        instance.parameters.onCallback.complete();
    }
}
