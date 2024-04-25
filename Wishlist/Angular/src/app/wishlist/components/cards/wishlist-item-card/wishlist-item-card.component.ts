import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Signal} from '@angular/core';
import {TextComponent} from "../../../../shared/core/components/text/text.component";
import {WishlistItemResponse} from "../../../models/wishlist-item-response";
import {WishlistItemApiService} from "../../../services/wishlist-item-api.service";
import {Destroyable} from "../../../../shared/core/models/destroyable";
import {takeUntil} from "rxjs";
import {ModalService} from "../../../../shared/modal/services/modal.service";
import {
    WishlistItemDeleteDialogComponent
} from "../../dialogs/wishlist-item-delete-dialog/wishlist-item-delete-dialog.component";
import {
    WishlistItemMutateDialogComponent
} from "../../dialogs/wishlist-item-mutate-dialog/wishlist-item-mutate-dialog.component";
import {
    WishlistItemBookDialogComponent
} from "../../dialogs/wishlist-item-book-dialog/wishlist-item-book-dialog.component";
import {
    WishlistItemAlreadyBookedDialogComponent
} from "../../dialogs/wishlist-item-already-booked-dialog/wishlist-item-already-booked-dialog.component";
import {ModalInstanceSize} from "../../../../shared/modal/models/modal-instance-size";

@Component({
    selector: 'app-wishlist-item-card',
    standalone: true,
    imports: [
        TextComponent
    ],
    templateUrl: './wishlist-item-card.component.html',
    styleUrl: './wishlist-item-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistItemCardComponent extends Destroyable {
    
    @Input({required: true}) item!: WishlistItemResponse;
    @Input({required: true}) isEditingAllowed!: Signal<boolean>;
    @Output() onChanged: EventEmitter<void> = new EventEmitter<void>();
    
    constructor(private wishlistItemApiService: WishlistItemApiService, private modalService: ModalService) {
        super();
    }
    
    onDeleteClicked() {
        this.modalService.open(WishlistItemDeleteDialogComponent).subscribe(result => {
            if (result.hasResult) {
                this.wishlistItemApiService.delete(this.item.id)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(() => {
                        this.onChanged.emit();
                    });
            }
        })
    }
    
    onItemClicked() {
        // If user owns wishlist, then editing is allowed
        if (this.isEditingAllowed()) {
            this.modalService.open(WishlistItemMutateDialogComponent, this.item).subscribe(output => {
                if (output.hasResult) {
                    this.onChanged.emit();
                }
            });
        } else {
            // If it is external user, then allow them only booking
            this.modalService.open(WishlistItemBookDialogComponent, this.item, ModalInstanceSize.Big).subscribe(output => {
                if (output.hasResult) {
                    // When booking is successful, just updating data
                    if (output.result) {
                        this.onChanged.emit();
                    } else {
                        // If booking failed, show the appropriate dialog
                        this.modalService.open(WishlistItemAlreadyBookedDialogComponent).subscribe(result => {
                            this.onChanged.emit();
                        });
                    }
                }
            });
        }
    }
}
