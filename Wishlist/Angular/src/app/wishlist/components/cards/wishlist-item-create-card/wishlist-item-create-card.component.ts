import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {GradientButtonComponent} from "../../../../shared/core/components/gradient-button/gradient-button.component";
import {ModalService} from "../../../../shared/modal/services/modal.service";
import {WishlistItemMutateDialogComponent} from "../../dialogs/wishlist-item-mutate-dialog/wishlist-item-mutate-dialog.component";

@Component({
    selector: 'app-wishlist-item-create-card',
    standalone: true,
    imports: [
        GradientButtonComponent
    ],
    templateUrl: './wishlist-item-create-card.component.html',
    styleUrl: './wishlist-item-create-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistItemCreateCardComponent {

    @Output() onCreated: EventEmitter<void> = new EventEmitter<void>();
    
    constructor(private modalService: ModalService) {
    }
    
    onAddClicked() {
        this.modalService.open(WishlistItemMutateDialogComponent)
            .subscribe(output => {
                if (output.hasResult) {
                    this.onCreated.emit();
                }
            });
    }
}
