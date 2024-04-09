import { ChangeDetectionStrategy, Component, effect, signal, WritableSignal } from '@angular/core';
import { GradientButtonComponent } from "../../../shared/components/gradient-button/gradient-button.component";
import { DeviceService } from "../../../shared/services/device.service";
import { WishlistResponse } from "../../models/wishlist-response";
import { WishlistApiService } from "../../services/wishlist-api.service";
import { finalize, takeUntil } from "rxjs";
import { WishlistCreateComponent } from "../wishlist-create/wishlist-create.component";
import { AuthService } from "../../../auth/services/auth.service";
import { Destroyable } from "../../../shared/models/destroyable";

@Component({
    selector: 'app-wishlist',
    standalone: true,
    imports: [
        GradientButtonComponent,
        WishlistCreateComponent
    ],
    templateUrl: './wishlist.component.html',
    styleUrl: './wishlist.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistComponent extends Destroyable {

    protected isLoaded: WritableSignal<boolean> = signal(false);
    protected wishlist: WritableSignal<WishlistResponse | null> = signal(null);

    constructor(
        private deviceService: DeviceService,
        private wishlistApiService: WishlistApiService,
        private authService: AuthService) {
        super();

        if (this.deviceService.isBrowser()) {
            effect(() => {
                if (!this.authService.isAuthorized()) {
                    this.isLoaded.set(true);
                    return;
                }
                
                this.wishlistApiService.get()
                    .pipe(
                        finalize(() => this.isLoaded.set(true)),
                        takeUntil(this.destroy$))
                    .subscribe(response => {
                        this.wishlist.set(response);
                    });
            }, {allowSignalWrites: true});
        }
    }

    onWishlistCreated(wishlist: WishlistResponse) {
        this.wishlist.set(wishlist);
    }
}
