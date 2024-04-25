import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { GradientButtonComponent } from "../../../../shared/core/components/gradient-button/gradient-button.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { takeUntil } from "rxjs";
import { WishlistApiService } from "../../../services/wishlist-api.service";
import { WishlistCreateRequest } from "../../../models/wishlist-create-request";
import { NgIf } from "@angular/common";
import { FormComponent } from "../../../../shared/core/components/form/form.component";
import { TextErrorComponent } from "../../../../shared/core/components/text-error/text-error.component";
import { ModalBase } from "../../../../shared/modal/models/modal-base";
import {WishlistResponse} from "../../../models/wishlist-response";
import {WishlistMutateRequest} from "../../../models/base/wishlist-mutate-request";

@Component({
    selector: 'app-wishlist-mutate-dialog',
    standalone: true,
    imports: [
        GradientButtonComponent,
        FormComponent,
        NgIf,
        ReactiveFormsModule,
        TextErrorComponent
    ],
    templateUrl: './wishlist-mutate-dialog.component.html',
    styleUrl: './wishlist-mutate-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistMutateDialogComponent extends ModalBase<WishlistResponse> implements OnInit {

    form = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });

    get name() { return this.form.get('name'); }

    constructor(private wishlistApiService: WishlistApiService) {
        super();
    }

    ngOnInit(): void {
        if (this.input) {
            this.form.patchValue(this.input);
        }
    }

    onSubmit() {
        const request = this.form.value as WishlistMutateRequest;
        
        const operation = this.input
            ? this.wishlistApiService.edit(this.input.id, request)
            : this.wishlistApiService.create(request);
        
        operation
            .pipe(takeUntil(this.destroy$))
            .subscribe(response => {
                this.output(response);
            });
    }
}
