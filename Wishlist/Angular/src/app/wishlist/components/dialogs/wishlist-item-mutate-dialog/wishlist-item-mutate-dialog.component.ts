import {
    ChangeDetectionStrategy,
    Component,
    OnChanges,
    OnInit,
    signal,
    SimpleChanges,
    WritableSignal
} from '@angular/core';
import { ModalBase } from "../../../../shared/modal/models/modal-base";
import { TextComponent } from "../../../../shared/core/components/text/text.component";
import { FormComponent } from "../../../../shared/core/components/form/form.component";
import { NgIf } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TextErrorComponent } from "../../../../shared/core/components/text-error/text-error.component";
import { urlValidator } from "../../../../shared/core/services/validators/url-validator";
import {distinctUntilChanged, EMPTY, filter, map, switchMap, takeUntil, tap} from "rxjs";
import { WishlistItemApiService } from "../../../services/wishlist-item-api.service";
import { WishlistItemScrapRequest } from "../../../models/wishlist-item-scrap-request";
import {InputImageComponent} from "../../../../shared/core/components/input-image/input-image.component";
import {WishlistItemResponse} from "../../../models/wishlist-item-response";
import {WishlistItemMutateRequest} from "../../../models/base/wishlist-item-mutate-request";
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-wishlist-items-create-dialog',
    standalone: true,
    imports: [
        TextComponent,
        FormComponent,
        NgIf,
        ReactiveFormsModule,
        TextErrorComponent,
        InputImageComponent,
    ],
    templateUrl: './wishlist-item-mutate-dialog.component.html',
    styleUrl: './wishlist-item-mutate-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistItemMutateDialogComponent extends ModalBase<WishlistItemResponse> implements OnInit, OnChanges {
    form = new FormGroup({
        url: new FormControl('', [urlValidator()]),
        title: new FormControl('', [Validators.required, Validators.maxLength(300)]),
        description: new FormControl('', [Validators.maxLength(500)]),
        price: new FormControl<number | undefined>(undefined)
    });

    // formB = this.formBuilder.group({
    //     url: new FormControl('', [urlValidator()]),
    //     title: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    //     description: new FormControl('', [Validators.maxLength(500)]),
    //     price: new FormControl<number | undefined>(undefined)
    // })
    // And then you can use:
    //  this.formB.controls.description so it's type safe

    get title() { return this.form.get('title'); }
    
    get description() { return this.form.get('description'); }
    get url() { return this.form.get('url'); }
    get price() { return this.form.get('price'); }

    constructor(private wishlistItemApiService: WishlistItemApiService,
        private formBuilder: FormBuilder
    ) {
        super();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.input) {
            this.form.patchValue(this.input);
            
            if (this.input.imageSrc) {
                this.imageSrc.set(this.input.imageSrc);
            }
        }
    }

    imageSrc: WritableSignal<string | undefined> = signal(undefined);
    ngOnInit(): void {        
        this.url?.valueChanges
            .pipe(
                map(value => value?.toLowerCase()),
                takeUntil(this.destroy$),
                distinctUntilChanged(),
                tap(url => {
                    if (this.url?.value !== url) {
                        this.url?.setValue(url!, { emitEvent: false });
                    }
                }),
                filter(() => this.url?.valid === true && !!this.url.value),
                switchMap(url => {                    
                    let request = { url: url } as WishlistItemScrapRequest;
                    return this.wishlistItemApiService.scrap(request);
                    // return this.wishlistItemApiService.scrap({ url: url! }); idk but seems shorter to me
                }))
            .subscribe(response => {
                if (!response) return;
                
                if (!this.title?.value && response.title) {
                    this.title?.setValue(response.title);
                    this.title?.updateValueAndValidity();
                }
                
                if (response.imagePath) {
                    this.imageSrc.set(response.imagePath);
                }
            });
    }

    onSubmit() {
        let request = this.form.value as WishlistItemMutateRequest;
        request.imageSrc = this.imageSrc();
        
        const operation = this.input
            ? this.wishlistItemApiService.update(this.input.id, request)
            : this.wishlistItemApiService.create(request);
        
        operation
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
                if (result) { // another option = filter => result
                            // subscribe => this.output(true)
                    this.output(true);
                }
            });
    }
}
