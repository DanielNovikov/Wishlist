import { ChangeDetectionStrategy, Component, effect, Input, signal, WritableSignal } from '@angular/core';
import { HeaderComponent } from "../../../../shared/core/components/header/header.component";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-wishlist',
    standalone: true,
    imports: [
        HeaderComponent,
        RouterOutlet
    ],
    templateUrl: './wishlist-layout.component.html',
    styleUrl: './wishlist-layout.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistLayoutComponent {
    
}
