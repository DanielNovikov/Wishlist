import { AfterViewInit, Component, OnInit, signal, ViewChild, ViewContainerRef, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass } from "@angular/common";
import { LoaderComponent } from "./shared/core/components/loader/loader.component";
import { ModalContainerComponent } from "./shared/modal/components/modal-container/modal-container.component";
import {ThemeService} from "./shared/core/services/theme.service";
import { Theme } from './shared/core/models/theme';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NgClass, LoaderComponent, ModalContainerComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
    title = 'Angular';

    isInitialized: WritableSignal<boolean> = signal(false);

    constructor(
        protected themeService: ThemeService) {
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.isInitialized.set(true);
        }, 200);
    }

    protected readonly Theme = Theme;
}
