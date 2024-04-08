import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ViewContainerRef,
  AfterViewInit, OnInit
} from '@angular/core';
import {ModalBase} from "../../models/modal-base";
import {NgClass, NgComponentOutlet} from "@angular/common";
import {ModalService} from "../../services/modal.service";
import {ModalInstance} from "../../models/modal-instance";
import {ModalOutput} from "../../models/modal-output";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgClass,
    NgComponentOutlet
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent{  
  constructor(protected modalService: ModalService) {
  }
  
  close(instance: ModalInstance) {
    instance.parameters.onCallback.next(new ModalOutput());
    instance.parameters.onCallback.complete();
  }
}
