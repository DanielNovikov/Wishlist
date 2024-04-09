import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isVisible: WritableSignal<boolean> = signal(false);
  
  constructor() { }
  
  timeout: NodeJS.Timeout | undefined;
  public show() {
    if (this.timeout) return;
    
    this.timeout = setTimeout(() => this.isVisible.set(true), 100);
  }
  
  public hide() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
    
    this.isVisible.set(false);
  }
}
