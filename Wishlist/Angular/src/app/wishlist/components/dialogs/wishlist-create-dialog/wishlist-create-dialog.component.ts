import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GradientButtonComponent } from "../../../../shared/core/components/gradient-button/gradient-button.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { takeUntil } from "rxjs";
import { WishlistApiService } from "../../../services/wishlist-api.service";
import { WishlistCreateRequest } from "../../../models/wishlist-create-request";
import { NgIf } from "@angular/common";
import { FormComponent } from "../../../../shared/core/components/form/form.component";
import { TextErrorComponent } from "../../../../shared/core/components/text-error/text-error.component";
import { ModalBase } from "../../../../shared/modal/models/modal-base";

@Component({
    selector: 'app-wishlist-create-dialog',
    standalone: true,
    imports: [
        GradientButtonComponent,
        FormComponent,
        NgIf,
        ReactiveFormsModule,
        TextErrorComponent
    ],
    templateUrl: './wishlist-create-dialog.component.html',
    styleUrl: './wishlist-create-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistCreateDialogComponent extends ModalBase<any> {

    form = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });

    get name() { return this.form.get('name'); }

    constructor(private wishlistApiService: WishlistApiService) {
        super();
    }

    onSubmit() {
        const request = this.form.value as WishlistCreateRequest;
        this.wishlistApiService.create(request)
            .pipe(takeUntil(this.destroy$))
            .subscribe(response => {
                this.output(response);
            });
    }
}
