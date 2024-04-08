import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {TextComponent} from "../../../shared/components/text/text.component";
import {GradientButtonComponent} from "../../../shared/components/gradient-button/gradient-button.component";
import {AuthService} from "../../../auth/services/auth.service";
import {WishlistApiService} from "../../services/wishlist-api.service";
import {AuthComponent} from "../../../auth/components/auth/auth.component";
import {ModalService} from "../../../shared/services/modal.service";
import {Subscription} from "rxjs";
import {WishlistCreateDialogComponent} from "../wishlist-create-dialog/wishlist-create-dialog.component";
import {WishlistResponse} from "../../models/wishlist-response";

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

  @Output() onCreated: EventEmitter<WishlistResponse> = new EventEmitter<WishlistResponse>();
  
  constructor(
      private authService: AuthService,
      private modalService: ModalService) {
  }

  private openModalSubscription: Subscription | undefined;
  
  create() {
    if (!this.authService.isAuthorized()) {
      this.openModalSubscription = this.modalService.open(AuthComponent).subscribe((output) => {
        if (output.hasResult) {
          this.openCreateModal();
        }
      });
    } else {
      this.openCreateModal();
    }
  }
  
  openCreateModal() {
    this.modalService.open(WishlistCreateDialogComponent).subscribe(output => {
      if (output.hasResult) {
        this.onCreated.emit(output.result);
      }
    });
  }

  ngOnDestroy(): void {
    this.openModalSubscription?.unsubscribe();
  }
}
