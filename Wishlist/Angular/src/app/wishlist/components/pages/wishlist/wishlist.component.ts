import {ChangeDetectionStrategy, Component, computed, Input, signal, WritableSignal} from '@angular/core';
import { DeviceService } from "../../../../shared/core/services/device.service";
import { WishlistApiService } from "../../../services/wishlist-api.service";
import { Router } from "@angular/router";
import { Destroyable } from "../../../../shared/core/models/destroyable";
import { takeUntil } from "rxjs";
import { WishlistResponse } from "../../../models/wishlist-response";
import { TextComponent } from "../../../../shared/core/components/text/text.component";
import {WishlistItemsCardComponent} from "../../cards/wishlist-items-card/wishlist-items-card.component";
import {ModalService} from "../../../../shared/modal/services/modal.service";
import {WishlistMutateDialogComponent} from "../../dialogs/wishlist-mutate-dialog/wishlist-mutate-dialog.component";
import {CurrentUserService} from "../../../../shared/current-user/services/current-user.service";

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
    set wishlistId(publicId: string) {
        this.wishlistApiService.getByPublicId(publicId)
            .pipe((takeUntil(this.destroy$)))
            .subscribe(response => {
                if (!response) {
                    this.router.navigate(['/']);
                    return;
                }
                
                this.wishlist.set(response);
            });
    }
    
    protected wishlist: WritableSignal<WishlistResponse | null> = signal(null);
    protected isEditingAllowed = computed(() =>
        this.wishlist() !== null && this.currentUserService.isAuthorized() && this.currentUserService.user()!.id === this.wishlist()?.userId)
    
    constructor(
        private wishlistApiService: WishlistApiService,
        private router: Router,
        private modalService: ModalService,
        private currentUserService: CurrentUserService) {
        
        super();
    }

    onEditClicked() {
        this.modalService.open(WishlistMutateDialogComponent, this.wishlist()).subscribe(output => {
            if (output.hasResult) {
                this.wishlist.set(output.result);
            }
        });
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
