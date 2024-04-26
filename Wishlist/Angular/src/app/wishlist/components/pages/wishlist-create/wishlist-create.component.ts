import {
    ChangeDetectionStrategy,
    Component, effect,
    EventEmitter,
    OnDestroy, OnInit,
    Output,
    signal,
    WritableSignal
} from '@angular/core';
import { GradientButtonComponent } from "../../../../shared/core/components/gradient-button/gradient-button.component";
import { WishlistApiService } from "../../../services/wishlist-api.service";
import { finalize, Subscription, takeUntil } from "rxjs";
import { WishlistResponse } from "../../../models/wishlist-response";
import { Destroyable } from "../../../../shared/core/models/destroyable";
import { TextComponent } from "../../../../shared/core/components/text/text.component";
import { ModalService } from "../../../../shared/modal/services/modal.service";
import { AuthDialogService } from "../../../../shared/auth/services/auth-dialog.service";
import { DeviceService } from "../../../../shared/core/services/device.service";
import { CurrentUserService } from "../../../../shared/current-user/services/current-user.service";
import { Router } from "@angular/router";
import {WishlistMutateDialogComponent} from "../../dialogs/wishlist-mutate-dialog/wishlist-mutate-dialog.component";
import {Meta, Title} from "@angular/platform-browser";

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
export class WishlistCreateComponent extends Destroyable implements OnInit {

    protected isLoaded: WritableSignal<boolean> = signal(false);
    
    constructor(
        private authDialogService: AuthDialogService,
        private modalService: ModalService,
        private wishlistApiService: WishlistApiService,
        private deviceService: DeviceService,
        private currentUserService: CurrentUserService,
        private router: Router,
        private title: Title,
        private meta: Meta) {
        super();

        if (this.deviceService.isBrowser()) {
            effect(() => {
                if (!this.currentUserService.isAuthorized()) {
                    this.isLoaded.set(true);
                    return;
                }

                this.wishlistApiService.get()
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(response => {
                        if (response) {
                            this.navigateToWishlist(response);
                            return;
                        }

                        this.isLoaded.set(true);
                    });
            }, {allowSignalWrites: true});
        }
    }

    ngOnInit(): void {
        this.title.setTitle('Створення Списку побажань - Wishlist');

        this.meta.updateTag({ name: 'description', content: 'Створіть свій список побажань на сайті Вішліст! Додайте свої мрії, поділіться ними з близькими, і дозвольте іншим користувачам допомогти вам їх здійснити. Це ідеальний спосіб легко організувати подарунки на будь-який випадок!' })
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
        this.modalService.open(WishlistMutateDialogComponent).subscribe(output => {
            if (output.hasResult) {
                this.navigateToWishlist(output.result);
            }
        });
    }

    navigateToWishlist(response: WishlistResponse) {
        this.router.navigate(["/wishlist/" + response.publicId])
    }
}
