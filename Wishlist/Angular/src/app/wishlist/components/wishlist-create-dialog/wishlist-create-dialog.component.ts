import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GradientButtonComponent } from "../../../shared/components/gradient-button/gradient-button.component";
import { ModalBase } from "../../../shared/models/modal-base";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { finalize, takeUntil } from "rxjs";
import { WishlistApiService } from "../../services/wishlist-api.service";
import { LoaderService } from "../../../shared/services/loader.service";
import { WishlistCreateRequest } from "../../models/wishlist-create-request";
import { FormComponent } from "../../../shared/components/form/form.component";
import { NgIf } from "@angular/common";
import { TextErrorComponent } from "../../../shared/components/text-error/text-error.component";

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
export class WishlistCreateDialogComponent extends ModalBase {

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
