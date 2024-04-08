import {ComponentRef, Injectable, signal, Type, ViewContainerRef, WritableSignal} from '@angular/core';
import {ModalComponent} from "../components/modal/modal.component";
import {Observable, Subject, Subscription} from "rxjs";
import {ModalEmpty} from "../models/modal-empty";
import {ModalBase} from "../models/modal-base";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private container!: ViewContainerRef;
  
  private componentSubscriber: Subject<void> | undefined;
  private contentRef: ComponentRef<ModalBase> | undefined; 
  private contentRefSubscription$: Subscription | undefined;
  
  public isVisible: WritableSignal<boolean | undefined> = signal(undefined);
  
  initializeContainer(container: ViewContainerRef) {
    this.container = container;
  }

  open<T extends ModalEmpty>(componentType: Type<T>) : Observable<void> {    
    if (this.componentSubscriber) {
      this.container.clear();
    }
    
    this.contentRef = this.container.createComponent(componentType);
    this.contentRefSubscription$ = this.contentRef.instance.onClose.subscribe(() => this.componentSubscriber?.next());

    this.isVisible.set(true);
    
    this.componentSubscriber = new Subject<any>();
    return this.componentSubscriber.asObservable();
  }

  close() {
    this.componentSubscriber?.complete();
    this.componentSubscriber = undefined;
    
    this.contentRefSubscription$?.unsubscribe();
    this.contentRefSubscription$ = undefined;
    
    this.isVisible.set(false);
    
    setTimeout(() => {
      this.container.clear();
    }, 300);
  }
}
