import { ChangeDetectionStrategy, Component, Input, signal, WritableSignal } from '@angular/core';
import { DeviceService } from "../../../../shared/core/services/device.service";
import { WishlistApiService } from "../../../services/wishlist-api.service";
import { Router } from "@angular/router";
import { Destroyable } from "../../../../shared/core/models/destroyable";
import { takeUntil } from "rxjs";
import { WishlistResponse } from "../../../models/wishlist-response";
import { TextComponent } from "../../../../shared/core/components/text/text.component";
import {WishlistItemsCardComponent} from "../../cards/wishlist-items-card/wishlist-items-card.component";

@Component({
    selector: 'app-wishlist',
    standalone: true,
    imports: [
        TextComponent,
        WishlistItemsCardComponent
    ],
    templateUrl: './wishlist.component.html',
    styleUrl: './wishlist.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistComponent extends Destroyable {
    @Input()
    set wishlistId(wishlistIdStr: string) {
        const wishlistId = parseInt(wishlistIdStr);
        if (isNaN(wishlistId)) {
            this.router.navigate(['/']);
            return;
        }
        
        this.wishlistApiService.getById(wishlistId)
            .pipe((takeUntil(this.destroy$)))
            .subscribe(response => {
                if (!response) {
                    this.router.navigate(['/']);
                    return;
                }
                
                this.wishlist.set(response);
            });
    }
    
    wishlist: WritableSignal<WishlistResponse | null> = signal(null);
    
    constructor(
        private wishlistApiService: WishlistApiService,
        private router: Router) {
        
        super();
    }

    async onShareClicked() {
        if (navigator && this.wishlist()) {
            await navigator.share({
                text: `"${this.wishlist()!.name}" - список побажань`,
                url: location.href
            })
        }
    }
}
