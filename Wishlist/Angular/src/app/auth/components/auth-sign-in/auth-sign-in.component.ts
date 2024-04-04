import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {GradientButtonComponent} from "../../../shared/components/gradient-button/gradient-button.component";
import {NgIf} from "@angular/common";
import {TextComponent} from "../../../shared/components/text/text.component";
import {TextErrorComponent} from "../../../shared/components/text-error/text-error.component";
import {finalize, Subscription} from "rxjs";
import {AuthApiService} from "../../services/auth-api.service";
import {AuthSignInByEmailRequest} from "../../models/auth-sign-in-by-email-request";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormComponent} from "../../../shared/components/form/form.component";
import {LoaderService} from "../../../shared/services/loader.service";

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
export class AuthSignInComponent {
    @Output() onSignUpClicked: EventEmitter<void> = new EventEmitter<void>();
    @Output() onAuthenticated: EventEmitter<void> = new EventEmitter<void>();
    
    authForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.email]),
        password: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });

    get email() { return this.authForm.get('email'); }
    get password() { return this.authForm.get('password'); }

    constructor(private authService: AuthService, private loaderService: LoaderService) {}

    submitFailureMessage = signal('');
    onSubmit() {
        this.loaderService.show();
        
        const request = this.authForm.value as AuthSignInByEmailRequest;
        this.authService.signInByEmail(request)
            .pipe(finalize(() => this.loaderService.hide()))
            .subscribe(success => {
                if (!success) {
                    this.submitFailureMessage.set('Невірна електронна пошта або пароль');
                } else {
                    this.onAuthenticated.emit();
                }
            });
    }
}
