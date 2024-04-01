import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ViewContainerRef,
  AfterViewInit
} from '@angular/core';
import {ModalBase} from "../../models/modal-base";
import {NgClass} from "@angular/common";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent extends ModalBase implements AfterViewInit {
  @ViewChild('content', { read: ViewContainerRef }) public content!: ViewContainerRef;
  
  constructor(protected modalService: ModalService) {
    super();
  }
  
  @Output() onViewInitialized = new EventEmitter();
  ngAfterViewInit() {
    console.log(this.content);
    this.onViewInitialized.emit();
  }
}
