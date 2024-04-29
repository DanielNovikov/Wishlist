import {ChangeDetectionStrategy, Component, computed, Input, OnInit, signal, WritableSignal} from '@angular/core';
import { DeviceService } from "../../../../shared/core/services/device.service";
import { WishlistApiService } from "../../../services/wishlist-api.service";
import { Router } from "@angular/router";
import { Destroyable } from "../../../../shared/core/models/destroyable";
import { takeUntil } from "rxjs";
import { WishlistResponse } from "../../../models/wishlist-response";
import { TextComponent } from "../../../../shared/core/components/text/text.component";
import {WishlistItemsCardComponent} from "../../cards/wishlist-items-card/wishlist-items-card.component";
import {ModalService} from "../../../../shared/modal/services/modal.service";
import {WishlistMutateDialogComponent} from "../../dialogs/wishlist-mutate-dialog/wishlist-mutate-dialog.component";
import {CurrentUserService} from "../../../../shared/current-user/services/current-user.service";
import {Meta, Title} from "@angular/platform-browser";

@Component({
    selector: 'app-wishlist',
    standalone: true,
    imports: [
        TextComponent,
        WishlistItemsCardComponent
    ],
    templateUrl: './wishlist.component.html',
    styleUrl: './wishlist.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistComponent extends Destroyable {
    @Input()
    set wishlistId(publicId: string) {        
        this.wishlistApiService.getByPublicId(publicId)
            .pipe((takeUntil(this.destroy$)))
            .subscribe(response => {
                if (!response) {
                    this.router.navigate(['/']);
                    return;
                }
                
                this.wishlist.set(response);
                this.setMeta(response);
            });
    }
    
    protected wishlist: WritableSignal<WishlistResponse | null> = signal(null);
    protected isEditingAllowed = computed(() =>
        this.wishlist() !== null && this.currentUserService.isAuthorized() && this.currentUserService.user()!.id === this.wishlist()?.userId)
    
    constructor(
        private wishlistApiService: WishlistApiService,
        private router: Router,
        private modalService: ModalService,
        private currentUserService: CurrentUserService,
        private title: Title,
        private meta: Meta) {
        
        super();
    }

    onEditClicked() {
        this.modalService.open(WishlistMutateDialogComponent, this.wishlist()).subscribe(output => {
            if (output.hasResult) {
                this.wishlist.set(output.result);
            }
        });
    }
    
    async onShareClicked() {
        if (navigator && this.wishlist()) { // you can also use navigator.canShare here
            await navigator.share({
                text: `"${this.wishlist()!.name}" - список побажань`,
                url: location.href
            })
        }
    }

    setMeta(wishlist: WishlistResponse): void {
        const title = `${wishlist.name} - писок побажань`;
        
        this.title.setTitle(title);
        
        const description = `Ласкаво просимо до мого вішліста '${wishlist.name}'! Це місце, де я зібрав усі свої побажання та мрії на майбутнє святкування. Тут ви знайдете список подарунків, які я б хотів отримати. Ви можете переглядати список і, якщо забажаєте, зарезервувати певний подарунок, щоб підтримати мої мрії та зробити цей день особливим для мене. Дякую за вашу участь і любов!`;
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ name: 'og:description', content: description });
    }
}
