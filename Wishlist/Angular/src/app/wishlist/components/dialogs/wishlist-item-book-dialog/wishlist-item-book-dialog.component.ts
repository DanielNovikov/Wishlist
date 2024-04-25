import {ChangeDetectionStrategy, Component} from '@angular/core';
import {WishlistItemResponse} from "../../../models/wishlist-item-response";
import {ModalBase} from "../../../../shared/modal/models/modal-base";
import {TextComponent} from "../../../../shared/core/components/text/text.component";
import {GradientButtonComponent} from "../../../../shared/core/components/gradient-button/gradient-button.component";
import {WishlistItemApiService} from "../../../services/wishlist-item-api.service";
import {takeUntil} from "rxjs";
import {ModalService} from "../../../../shared/modal/services/modal.service";
import {
    WishlistItemAlreadyBookedDialogComponent
} from "../wishlist-item-already-booked-dialog/wishlist-item-already-booked-dialog.component";

@Component({
    selector: 'app-wishlist-item-book-dialog',
    standalone: true,
    imports: [
        TextComponent,
        GradientButtonComponent
    ],
    templateUrl: './wishlist-item-book-dialog.component.html',
    styleUrl: './wishlist-item-book-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistItemBookDialogComponent extends ModalBase<WishlistItemResponse> {

    constructor(private wishlistItemApiService: WishlistItemApiService) {
        super();
    }


    onBookClicked() {        
        if (!this.input?.isBooked) {
            this.wishlistItemApiService.book(this.input!.id)
                .pipe(takeUntil(this.destroy$))
                .subscribe(result => {
                    this.output(result);
                });
        }
    }
}
