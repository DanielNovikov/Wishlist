import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {GradientButtonComponent} from "../../../shared/components/gradient-button/gradient-button.component";
import {ModalEmpty} from "../../../shared/models/modal-empty";
import {WishlistCreateDialogComponent} from "../wishlist-create-dialog/wishlist-create-dialog.component";
import {ModalService} from "../../../shared/services/modal.service";

@Component({
  selector: 'app-test-dialog',
  standalone: true,
  imports: [
    GradientButtonComponent
  ],
  templateUrl: './test-dialog.component.html',
  styleUrl: './test-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestDialogComponent extends ModalEmpty implements OnDestroy {

  constructor(private modalService: ModalService) {
    super();
  }

  ngOnDestroy(): void {
    console.log('destroying test');
  }

  openCreateModal() {
    this.close();
  }
  
}
