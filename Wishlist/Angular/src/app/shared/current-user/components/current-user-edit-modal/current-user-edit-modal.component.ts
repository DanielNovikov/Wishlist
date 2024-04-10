import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ModalBase } from "../../../modal/models/modal-base";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CurrentUserEditResponse } from "../../models/current-user-edit-response";
import { UserSource } from "../../models/enums/user-source";
import { FormComponent } from "../../../core/components/form/form.component";
import { NgIf } from "@angular/common";
import { TextErrorComponent } from "../../../core/components/text-error/text-error.component";
import { nameValidator } from "../../../core/services/validators/name-validator";
import { emailValidator } from "../../../core/services/validators/email-validator";
import { passwordValidator } from "../../../core/services/validators/password-validator";
import { CurrentUserEditRequest } from "../../models/current-user-edit-request";
import { CurrentUserApiService } from "../../services/current-user-api.service";
import { takeUntil } from "rxjs";

@Component({
    selector: 'app-current-user-edit-modal',
    standalone: true,
    imports: [
        FormComponent,
        NgIf,
        ReactiveFormsModule,
        TextErrorComponent
    ],
    templateUrl: './current-user-edit-modal.component.html',
    styleUrl: './current-user-edit-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentUserEditModalComponent extends ModalBase<CurrentUserEditResponse> implements OnInit {

    form: FormGroup | undefined;
    submitFailureMessage = signal('');
    
    constructor(private currentUserApiService: CurrentUserApiService) {
        super();
    }

    ngOnInit(): void {
        let controls: { [key: string]: FormControl } = {
            name: new FormControl(this.input?.name, [nameValidator])
        };
        
        if (this.input?.source == UserSource.Email) {
            controls['email'] = new FormControl(this.input?.email, [emailValidator()]); 
            controls['password'] = new FormControl('', [passwordValidator(false)]); 
        }
        
        this.form = new FormGroup(controls);
    }

    get name() { return this.form?.get('name'); }
    get email() { return this.form?.get('email'); }
    get password() { return this.form?.get('password'); }
    
    
    onSubmit() {
        const request = this.form!.value as CurrentUserEditRequest;
        
        this.currentUserApiService.edit(request)
            .pipe(takeUntil(this.destroy$))
            .subscribe(response => {
                if (!response) {
                    this.submitFailureMessage.set('Користувач вже зареєстрований за');
                } else {
                    this.output(response);
                }
            })
    }

    protected readonly UserSource = UserSource;
}
