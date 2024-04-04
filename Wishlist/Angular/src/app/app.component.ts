import {AfterViewInit, Component, OnInit, signal, ViewChild, ViewContainerRef, WritableSignal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ModalService} from "./shared/services/modal.service";
import {ThemeService} from "./advert/services/theme.service";
import {NgClass} from "@angular/common";
import {Theme} from "./advert/models/theme";
import {LoaderComponent} from "./shared/components/loader/loader.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('modalContainer', { read: ViewContainerRef }) container!: ViewContainerRef;
  title = 'Angular';

  isInitialized: WritableSignal<boolean> = signal(false);
  
  constructor(
      private modalService: ModalService,
      protected themeService: ThemeService) {
  }

  ngAfterViewInit(): void {
    this.modalService.initializeContainer(this.container);
    
    setTimeout(() => {
      this.isInitialized.set(true);
    }, 200);
  }

  protected readonly Theme = Theme;
}
