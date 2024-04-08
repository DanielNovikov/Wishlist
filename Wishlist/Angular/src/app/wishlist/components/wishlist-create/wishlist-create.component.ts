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
        private authService: AuthService,
        private modalService: ModalService,
        private wishlistApiService: WishlistApiService) {
        super();
    }

    create() {
        if (this.authService.isAuthorized()) {
            this.openCreateModal();
            return;
        }

        this.modalService.open(AuthComponent).subscribe((output) => {
            if (!output.hasResult) return;

            this.wishlistApiService.get()
                .pipe(takeUntil(this.destroy$))
                .subscribe(response => {
                    if (response) {
                        this.onCreated.emit(response);
                        return;
                    }
    
                    this.openCreateModal();
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
