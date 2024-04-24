import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ModalBase} from "../../../../shared/modal/models/modal-base";
import {TextComponent} from "../../../../shared/core/components/text/text.component";
import {GradientButtonComponent} from "../../../../shared/core/components/gradient-button/gradient-button.component";

@Component({
    selector: 'app-wishlist-item-delete-dialog',
    standalone: true,
    imports: [
        TextComponent,
        GradientButtonComponent
    ],
    templateUrl: './wishlist-item-delete-dialog.component.html',
    styleUrl: './wishlist-item-delete-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistItemDeleteDialogComponent extends ModalBase<any> {

    onPromptClicked() {
        this.output(true);
    }
    
}
