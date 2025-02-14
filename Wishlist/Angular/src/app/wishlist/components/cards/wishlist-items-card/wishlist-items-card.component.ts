import {
    ChangeDetectionStrategy,
    Component, computed,
    EventEmitter,
    Input,
    OnInit,
    Output, Signal,
    signal,
    WritableSignal
} from '@angular/core';
import {WishlistResponse} from "../../../models/wishlist-response";
import {GradientButtonComponent} from "../../../../shared/core/components/gradient-button/gradient-button.component";
import {WishlistItemResponse} from "../../../models/wishlist-item-response";
import {WishlistApiService} from "../../../services/wishlist-api.service";
import {Destroyable} from "../../../../shared/core/models/destroyable";
import {takeUntil} from "rxjs";
import {CurrentUserService} from "../../../../shared/current-user/services/current-user.service";
import {TextComponent} from "../../../../shared/core/components/text/text.component";
import {WishlistItemCreateCardComponent} from "../wishlist-item-create-card/wishlist-item-create-card.component";
import {WishlistItemCardComponent} from "../wishlist-item-card/wishlist-item-card.component";

@Component({
    selector: 'app-wishlist-items-card',
    standalone: true,
    imports: [
        GradientButtonComponent,
        TextComponent,
        WishlistItemCreateCardComponent,
        WishlistItemCardComponent
    ],
    templateUrl: './wishlist-items-card.component.html',
    styleUrl: './wishlist-items-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistItemsCardComponent extends Destroyable implements OnInit {
    @Input({required: true}) wishlist!: WishlistResponse;
    @Input({required: true}) isEditingAllowed!: Signal<boolean>;

    constructor(private wishlistApiService: WishlistApiService) {
        super();
    }

    protected items: WritableSignal<WishlistItemResponse[]> = signal([]);
    
    ngOnInit(): void {
        this.reload();
    }

    reload() {
        this.wishlistApiService.getItemsByPublicId(this.wishlist.publicId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
                this.items.set(result);
            });
    }
}
