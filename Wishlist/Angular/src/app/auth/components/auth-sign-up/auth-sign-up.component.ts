import {ChangeDetectionStrategy, Component, EventEmitter, Output, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {GradientButtonComponent} from "../../../shared/components/gradient-button/gradient-button.component";
import {NgIf} from "@angular/common";
import {TextComponent} from "../../../shared/components/text/text.component";
import {TextErrorComponent} from "../../../shared/components/text-error/text-error.component";
import {finalize, Subscription, takeUntil} from "rxjs";
import {AuthApiService} from "../../services/auth-api.service";
import {AuthSignUpByEmailRequest} from "../../models/auth-sign-up-by-email-request";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormComponent} from "../../../shared/components/form/form.component";
import {LoaderService} from "../../../shared/services/loader.service";
import {Destroyable} from "../../../shared/models/destroyable";

@Component({
  selector: 'app-auth-sign-up',
  standalone: true,
    imports: [
        FormsModule,
        GradientButtonComponent,
        NgIf,
        ReactiveFormsModule,
        TextComponent,
        TextErrorComponent,
        FormComponent
    ],
  templateUrl: './auth-sign-up.component.html',
  styleUrl: './auth-sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthSignUpComponent extends Destroyable {
    @Output() onSignInClicked: EventEmitter<void> = new EventEmitter<void>();
    @Output() onAuthenticated: EventEmitter<void> = new EventEmitter<void>();

    authForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        email: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.email]),
        password: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });

    get name() { return this.authForm.get('name'); }
    get email() { return this.authForm.get('email'); }
    get password() { return this.authForm.get('password'); }

    constructor(private authService: AuthService) {
        super();
    }

    submitFailureMessage = signal('');
    onSubmit() {        
        const request = this.authForm.value as AuthSignUpByEmailRequest;
        this.authService.signUpByEmail(request)
            .pipe(takeUntil(this.destroy$))
            .subscribe(success => {
                if (!success) {
                    this.submitFailureMessage.set('Користувач з такою електронною адресою вже зареєстрований');
                } else {
                    this.onAuthenticated.emit();
                }
            });
    }
}
