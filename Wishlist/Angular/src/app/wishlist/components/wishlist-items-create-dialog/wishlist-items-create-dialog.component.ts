import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ModalBase } from "../../../shared/modal/models/modal-base";
import { TextComponent } from "../../../shared/core/components/text/text.component";
import { FormComponent } from "../../../shared/core/components/form/form.component";
import { NgIf } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TextErrorComponent } from "../../../shared/core/components/text-error/text-error.component";
import { urlValidator } from "../../../shared/core/services/validators/url-validator";
import { debounceTime, distinctUntilChanged, EMPTY, of, switchMap, takeUntil } from "rxjs";
import { WishlistItemApiService } from "../../services/wishlist-item-api.service";
import { WishlistItemScrapRequest } from "../../models/wishlist-item-scrap-request";

@Component({
    selector: 'app-wishlist-items-create-dialog',
    standalone: true,
    imports: [
        TextComponent,
        FormComponent,
        NgIf,
        ReactiveFormsModule,
        TextErrorComponent
    ],
    templateUrl: './wishlist-items-create-dialog.component.html',
    styleUrl: './wishlist-items-create-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistItemsCreateDialogComponent extends ModalBase<any> implements OnInit {
    form = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        description: new FormControl('', [Validators.maxLength(500)]),
        link: new FormControl('', [urlValidator()])
    });

    get title() { return this.form.get('title'); }
    get description() { return this.form.get('description'); }
    get link() { return this.form.get('link'); }

    constructor(private wishlistItemApiService: WishlistItemApiService) {
        super();
    }

    imageSrc: WritableSignal<string | undefined> = signal(undefined);
    ngOnInit(): void {
        this.link?.valueChanges
            .pipe(
                switchMap(url => {
                    if (this.link?.invalid) return EMPTY;
                    
                    let request = { url: url } as WishlistItemScrapRequest;
                    return this.wishlistItemApiService.scrap(request);
                }),
                takeUntil(this.destroy$))
            .subscribe(response => {
                if (!response) return;
                
                if (!this.title?.value && response.title) this.title?.setValue(response.title);
            });
    }

    onSubmit() {
    }
}
