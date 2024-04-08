import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {GradientButtonComponent} from "../../../shared/components/gradient-button/gradient-button.component";
import {ModalService} from "../../../shared/services/modal.service";
import {TestDialogComponent} from "../test-dialog/test-dialog.component";
import {ModalBase} from "../../../shared/models/modal-base";

@Component({
  selector: 'app-wishlist-create-dialog',
  standalone: true,
  imports: [
    GradientButtonComponent
  ],
  templateUrl: './wishlist-create-dialog.component.html',
  styleUrl: './wishlist-create-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistCreateDialogComponent extends ModalBase implements OnDestroy {

  constructor(private modalService: ModalService) {
    super();
  }

  ngOnDestroy(): void {
    console.log('destroying wishlist');
  }
  
  openCreateModal() {
    this.modalService.open(TestDialogComponent).subscribe(() => {
    });
  }
  
}
