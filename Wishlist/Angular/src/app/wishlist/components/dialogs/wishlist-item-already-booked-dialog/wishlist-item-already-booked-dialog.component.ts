import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TextComponent} from "../../../../shared/core/components/text/text.component";
import {GradientButtonComponent} from "../../../../shared/core/components/gradient-button/gradient-button.component";
import {ModalBase} from "../../../../shared/modal/models/modal-base";

@Component({
    selector: 'app-wishlist-item-already-booked-dialog',
    standalone: true,
    imports: [
        TextComponent,
        GradientButtonComponent
    ],
    templateUrl: './wishlist-item-already-booked-dialog.component.html',
    styleUrl: './wishlist-item-already-booked-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistItemAlreadyBookedDialogComponent extends ModalBase<any> {

    onClicked() {
        this.close();
    }
  
}
