import {
    ChangeDetectionStrategy,
    Component, computed,
    EventEmitter,
    Input,
    OnInit,
    Output,
    signal,
    WritableSignal
} from '@angular/core';
import {WishlistResponse} from "../../models/wishlist-response";
import {GradientButtonComponent} from "../../../shared/core/components/gradient-button/gradient-button.component";
import {ModalService} from "../../../shared/modal/services/modal.service";
import {
    WishlistItemCreateDialogComponent
} from "../wishlist-item-create-dialog/wishlist-item-create-dialog.component";
import {WishlistItemResponse} from "../../models/wishlist-item-response";
import {WishlistApiService} from "../../services/wishlist-api.service";
import {Destroyable} from "../../../shared/core/models/destroyable";
import {takeUntil} from "rxjs";
import {CurrentUserService} from "../../../shared/current-user/services/current-user.service";
import {TextComponent} from "../../../shared/core/components/text/text.component";
import {WishlistItemCreateCardComponent} from "../wishlist-item-create-card/wishlist-item-create-card.component";
import {WishlistItemCardComponent} from "../wishlist-item-card/wishlist-item-card.component";

@Component({
    selector: 'app-wishlist-items',
    standalone: true,
    imports: [
        GradientButtonComponent,
        TextComponent,
        WishlistItemCreateCardComponent,
        WishlistItemCardComponent
    ],
    templateUrl: './wishlist-items.component.html',
    styleUrl: './wishlist-items.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistItemsComponent extends Destroyable implements OnInit {
    @Input({required: true}) wishlist!: WishlistResponse;

    constructor(private wishlistApiService: WishlistApiService,
                protected currentUserService: CurrentUserService) {
        
        super();
    }

    protected items: WritableSignal<WishlistItemResponse[]> = signal([]);
    
    protected isEditingAllowed = computed(() => 
        this.currentUserService.isAuthorized() && this.currentUserService.user()!.id === this.wishlist.userId)
    
    ngOnInit(): void {
        this.reload();
    }

    reload() {
        this.wishlistApiService.getItemsById(this.wishlist.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
                this.items.set(result);
            });
    }
}
