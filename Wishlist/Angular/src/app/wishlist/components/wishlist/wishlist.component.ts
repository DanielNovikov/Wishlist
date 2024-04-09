import { ChangeDetectionStrategy, Component, effect, signal, WritableSignal } from '@angular/core';
import { GradientButtonComponent } from "../../../shared/core/components/gradient-button/gradient-button.component";
import { DeviceService } from "../../../shared/core/services/device.service";
import { WishlistResponse } from "../../models/wishlist-response";
import { WishlistApiService } from "../../services/wishlist-api.service";
import { finalize, takeUntil } from "rxjs";
import { WishlistCreateComponent } from "../wishlist-create/wishlist-create.component";
import { Destroyable } from "../../../shared/core/models/destroyable";
import { CurrentUserService } from "../../../shared/current-user/services/current-user.service";
import { HeaderComponent } from "../../../shared/core/components/header/header.component";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-wishlist',
    standalone: true,
    imports: [
        GradientButtonComponent,
        WishlistCreateComponent,
        HeaderComponent,
        RouterOutlet,
        HeaderComponent
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
        private currentUserService: CurrentUserService) {
        super();

        if (this.deviceService.isBrowser()) {
            effect(() => {
                if (!this.currentUserService.isAuthorized()) {
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
