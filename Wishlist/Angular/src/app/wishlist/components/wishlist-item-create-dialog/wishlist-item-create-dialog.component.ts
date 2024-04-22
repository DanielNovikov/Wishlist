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
import {InputImageComponent} from "../../../shared/core/components/input-image/input-image.component";
import {WishlistItemCreateRequest} from "../../models/wishlist-item-create-request";

@Component({
    selector: 'app-wishlist-items-create-dialog',
    standalone: true,
    imports: [
        TextComponent,
        FormComponent,
        NgIf,
        ReactiveFormsModule,
        TextErrorComponent,
        InputImageComponent
    ],
    templateUrl: './wishlist-item-create-dialog.component.html',
    styleUrl: './wishlist-item-create-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistItemCreateDialogComponent extends ModalBase<any> implements OnInit {
    form = new FormGroup({
        link: new FormControl('', [urlValidator()]),
        title: new FormControl('', [Validators.required, Validators.maxLength(300)]),
        description: new FormControl('', [Validators.maxLength(500)]),
        price: new FormControl<number | undefined>(undefined)
    });

    get title() { return this.form.get('title'); }
    get description() { return this.form.get('description'); }
    get link() { return this.form.get('link'); }
    get price() { return this.form.get('price'); }

    constructor(private wishlistItemApiService: WishlistItemApiService) {
        super();
    }

    imageSrc: WritableSignal<string | undefined> = signal(undefined);
    ngOnInit(): void {
        this.link?.valueChanges
            .pipe(
                takeUntil(this.destroy$),
                switchMap(url => {
                    if (this.link?.invalid || !this.link?.value) return EMPTY;
                    
                    let request = { url: url } as WishlistItemScrapRequest;
                    return this.wishlistItemApiService.scrap(request);
                }))
            .subscribe(response => {
                if (!response) return;
                
                if (!this.title?.value && response.title) {
                    this.title?.setValue(response.title);
                    this.title?.updateValueAndValidity();
                }
                
                if (response.imagePath) {+
                    this.imageSrc.set(response.imagePath);
                }
            });
    }

    onSubmit() {
        let request = this.form.value as WishlistItemCreateRequest;
        request.imageSrc = this.imageSrc();
        
        this.wishlistItemApiService.create(request)
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
                if (result) {
                    this.output(true);
                }
            });
    }
}
