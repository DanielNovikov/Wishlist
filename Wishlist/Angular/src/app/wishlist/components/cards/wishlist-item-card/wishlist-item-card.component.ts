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
import {WishlistItemMutateDialogComponent} from "../../dialogs/wishlist-item-mutate-dialog/wishlist-item-mutate-dialog.component";

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
        if (this.isEditingAllowed()) {
            this.modalService.open(WishlistItemMutateDialogComponent, this.item).subscribe(result => {
                if (result.hasResult) {
                    this.onChanged.emit();
                }
            });
        }
    }
}
