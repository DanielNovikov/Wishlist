import {ComponentRef, Injectable, signal, Type, ViewContainerRef, WritableSignal} from '@angular/core';
import {ModalComponent} from "../components/modal/modal.component";
import {Observable, Subject} from "rxjs";
import {ModalEmpty} from "../models/modal-empty";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private container!: ViewContainerRef;
  
  private componentRef: ComponentRef<ModalComponent> | undefined;
  private componentSubscriber!: Subject<void>;
  public isClosing: WritableSignal<boolean> = signal(false);
  
  initializeContainer(container: ViewContainerRef) {
    this.container = container;
  }

  openModal<T extends ModalEmpty>(componentType: Type<T>) : Observable<void> {
    if (this.componentRef) return this.componentSubscriber.asObservable();
    
    this.componentRef = this.container.createComponent(ModalComponent);
    this.componentRef.instance.onClose.subscribe(() => this.closeModal());
    
    this.componentRef.instance.onViewInitialized.subscribe(() => {
      setTimeout(() => {
        let contentRef = this.componentRef!.instance.content.createComponent(componentType);
        contentRef.instance.onClose.subscribe(() => this.closeModal());
      });
    });
    
    this.componentSubscriber = new Subject<any>();
    return this.componentSubscriber.asObservable();
  }

  closeModal() {
    this.componentSubscriber.next();
    this.componentSubscriber.complete();
    
    this.isClosing.set(true);
    setTimeout(() => {
      this.componentRef?.destroy();
      this.componentRef = undefined;
      this.isClosing.set(false);
    }, 300);
  }
}
