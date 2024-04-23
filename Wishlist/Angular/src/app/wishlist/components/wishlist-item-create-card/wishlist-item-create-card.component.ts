import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {GradientButtonComponent} from "../../../shared/core/components/gradient-button/gradient-button.component";
import {WishlistItemMutateComponent} from "../wishlist-item-mutate-dialog/wishlist-item-mutate.component";
import {ModalService} from "../../../shared/modal/services/modal.service";

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
        this.modalService.open(WishlistItemMutateComponent)
            .subscribe(output => {
                if (output.hasResult) {
                    this.onCreated.emit();
                }
            });
    }
}
