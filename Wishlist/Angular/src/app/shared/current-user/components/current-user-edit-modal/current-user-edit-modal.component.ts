import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ModalBase } from "../../../modal/models/modal-base";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CurrentUserEditResponse } from "../../models/current-user-edit-response";
import { UserSource } from "../../models/enums/user-source";
import { FormComponent } from "../../../core/components/form/form.component";
import { NgIf, NgOptimizedImage } from "@angular/common";
import { TextErrorComponent } from "../../../core/components/text-error/text-error.component";
import { nameValidator } from "../../../core/services/validators/name-validator";
import { emailValidator } from "../../../core/services/validators/email-validator";
import { passwordValidator } from "../../../core/services/validators/password-validator";
import { CurrentUserEditRequest } from "../../models/current-user-edit-request";
import { CurrentUserApiService } from "../../services/current-user-api.service";
import { switchMap, takeUntil } from "rxjs";
import { FileApiService } from "../../../core/services/file-api.service";
import { ImageBrowsingService } from "../../../core/services/image-browsing.service";
import { InputImageComponent } from "../../../core/components/input-image/input-image.component";

@Component({
    selector: 'app-current-user-edit-modal',
    standalone: true,
    imports: [
        FormComponent,
        NgIf,
        ReactiveFormsModule,
        TextErrorComponent,
        NgOptimizedImage,
        InputImageComponent
    ],
    templateUrl: './current-user-edit-modal.component.html',
    styleUrl: './current-user-edit-modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentUserEditModalComponent extends ModalBase<CurrentUserEditResponse> implements OnInit {

    form: FormGroup | undefined;
    submitFailureMessage = signal('');
    
    constructor(
        private currentUserApiService: CurrentUserApiService,
        private fileApiService: FileApiService,
        private imageBrowsingService: ImageBrowsingService) {
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
        
        if (this.input?.avatarPath) 
            this.avatarSrc.set(this.input.avatarPath);
        
        this.form = new FormGroup(controls);
    }

    get name() { return this.form?.get('name'); }
    get email() { return this.form?.get('email'); }
    get password() { return this.form?.get('password'); }
    avatarSrc: WritableSignal<string | undefined> = signal(undefined);
    
    selectAvatar() {
        this.imageBrowsingService.browse()
            .pipe(
                takeUntil(this.destroy$),
                switchMap(file => this.fileApiService.upload(file)),
                takeUntil(this.destroy$),
            )
            .subscribe(src => {
                if (src) this.avatarSrc.set(src);
            })
    }
    
    onSubmit() {
        const request = this.form!.value as CurrentUserEditRequest;
        request.avatarPath = this.avatarSrc();
        
        this.currentUserApiService.edit(request)
            .pipe(takeUntil(this.destroy$))
            .subscribe(response => {
                if (!response) {
                    this.submitFailureMessage.set('Користувач з такою електронною адресою вже зареєстрований');
                } else {
                    this.output(response);
                }
            })
    }

    protected readonly UserSource = UserSource;
}
