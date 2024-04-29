import {ChangeDetectionStrategy, Component, EventEmitter, Output, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {finalize, Subject, Subscription, takeUntil} from "rxjs";
import {AuthApiService} from "../../services/auth-api.service";
import {AuthSignInByEmailRequest} from "../../models/auth-sign-in-by-email-request";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import { GradientButtonComponent } from "../../../core/components/gradient-button/gradient-button.component";
import { TextComponent } from "../../../core/components/text/text.component";
import { TextErrorComponent } from "../../../core/components/text-error/text-error.component";
import { FormComponent } from "../../../core/components/form/form.component";
import { Destroyable } from "../../../core/models/destroyable";
import { emailValidator } from "../../../core/services/validators/email-validator";
import { passwordValidator } from "../../../core/services/validators/password-validator";
@Component({
  selector: 'app-auth-sign-in',
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
  templateUrl: './auth-sign-in.component.html',
  styleUrl: './auth-sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthSignInComponent extends Destroyable {
    
    @Output() onSignUpClicked: EventEmitter<void> = new EventEmitter<void>();
    @Output() onAuthenticated: EventEmitter<void> = new EventEmitter<void>();
    
    authForm = new FormGroup({
        email: new FormControl('', [emailValidator()]),
        password: new FormControl('', [passwordValidator()]),
    });

    get email() { return this.authForm.get('email'); }
    get password() { return this.authForm.get('password'); }

    constructor(private authService: AuthService) {
        super();
    }

    submitFailureMessage = signal('');
    onSubmit() {        
        const request = this.authForm.value as AuthSignInByEmailRequest;
        this.authService.signInByEmail(request)
            .pipe(takeUntil(this.destroy$))
            .subscribe(success => {
                if (!success) {
                    this.submitFailureMessage.set('Електронна пошта або пароль не вірні');
                } else {
                    this.onAuthenticated.emit();
                }
            });
    }
}
