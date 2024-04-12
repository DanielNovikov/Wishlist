import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WishlistResponse } from "../../models/wishlist-response";
import { GradientButtonComponent } from "../../../shared/core/components/gradient-button/gradient-button.component";
import { ModalService } from "../../../shared/modal/services/modal.service";
import {
  WishlistItemsCreateDialogComponent
} from "../wishlist-items-create-dialog/wishlist-items-create-dialog.component";

@Component({
  selector: 'app-wishlist-items',
  standalone: true,
  imports: [
    GradientButtonComponent
  ],
  templateUrl: './wishlist-items.component.html',
  styleUrl: './wishlist-items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistItemsComponent {
  @Input({required: true}) wishlist!: WishlistResponse;
  
  constructor(private modalService: ModalService) {
    setTimeout(() => this.onAddClicked(), 1000);
  }
  
  onAddClicked() {
    this.modalService.open(WishlistItemsCreateDialogComponent)
        .subscribe(output => {
          
        });
  }
  
}
