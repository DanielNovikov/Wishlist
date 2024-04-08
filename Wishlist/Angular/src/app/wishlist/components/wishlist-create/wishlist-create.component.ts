import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {TextComponent} from "../../../shared/components/text/text.component";
import {GradientButtonComponent} from "../../../shared/components/gradient-button/gradient-button.component";
import {AuthService} from "../../../auth/services/auth.service";
import {WishlistApiService} from "../../services/wishlist-api.service";
import {AuthComponent} from "../../../auth/components/auth/auth.component";
import {ModalService} from "../../../shared/services/modal.service";
import {Subscription} from "rxjs";
import {WishlistCreateDialogComponent} from "../wishlist-create-dialog/wishlist-create-dialog.component";

@Component({
  selector: 'app-wishlist-create',
  standalone: true,
  imports: [
    TextComponent,
    GradientButtonComponent
  ],
  templateUrl: './wishlist-create.component.html',
  styleUrl: './wishlist-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistCreateComponent implements OnDestroy {

  constructor(
      private authService: AuthService,
      private wishlistApiService: WishlistApiService,
      private modalService: ModalService) {
  }

  private openModalSubscription: Subscription | undefined;
  
  create() {
    if (!this.authService.isAuthorized()) {
      this.openModalSubscription = this.modalService.open(AuthComponent).subscribe(() => {
        if (this.authService.isAuthorized()) {
          this.openCreateModal();
        }
      });
    } else {
      this.openCreateModal();
    }
  }
  
  openCreateModal() {
    this.modalService.open(WishlistCreateDialogComponent).subscribe(() => {
    });
  }

  ngOnDestroy(): void {
    this.openModalSubscription?.unsubscribe();
  }
}
