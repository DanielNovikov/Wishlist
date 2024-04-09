import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { TextComponent } from "../../../shared/components/text/text.component";
import { GradientButtonComponent } from "../../../shared/components/gradient-button/gradient-button.component";
import { AuthService } from "../../../auth/services/auth.service";
import { WishlistApiService } from "../../services/wishlist-api.service";
import { AuthComponent } from "../../../auth/components/auth/auth.component";
import { ModalService } from "../../../shared/services/modal.service";
import { Subscription, takeUntil } from "rxjs";
import { WishlistCreateDialogComponent } from "../wishlist-create-dialog/wishlist-create-dialog.component";
import { WishlistResponse } from "../../models/wishlist-response";
import { Destroyable } from "../../../shared/models/destroyable";
import { AuthDialogService } from "../../../auth/services/auth-dialog.service";

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
export class WishlistCreateComponent extends Destroyable {

    @Output() onCreated: EventEmitter<WishlistResponse> = new EventEmitter<WishlistResponse>();

    constructor(
        private authDialogService: AuthDialogService,
        private modalService: ModalService,
        private wishlistApiService: WishlistApiService) {
        super();
    }

    create() {
        this.authDialogService.executeIfAuthenticated((wasAuthorized) => {
            if (wasAuthorized) {
                this.openCreateModal();
                return;
            }
                
            this.wishlistApiService.get()
                .pipe(takeUntil(this.destroy$))
                .subscribe(response => {
                    if (!response) {
                        this.openCreateModal();
                    }
                });
        });
    }

    openCreateModal() {
        this.modalService.open(WishlistCreateDialogComponent).subscribe(output => {
            if (output.hasResult) {
                this.onCreated.emit(output.result);
            }
        });
    }
}
