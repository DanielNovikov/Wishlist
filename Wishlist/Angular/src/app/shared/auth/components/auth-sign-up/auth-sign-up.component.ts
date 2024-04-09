import {ChangeDetectionStrategy, Component, EventEmitter, Output, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {finalize, Subscription, takeUntil} from "rxjs";
import {AuthSignUpByEmailRequest} from "../../models/auth-sign-up-by-email-request";
import {AuthService} from "../../services/auth.service";
import { TextComponent } from "../../../core/components/text/text.component";
import { TextErrorComponent } from "../../../core/components/text-error/text-error.component";
import { FormComponent } from "../../../core/components/form/form.component";
import { Destroyable } from "../../../core/models/destroyable";
import { GradientButtonComponent } from "../../../core/components/gradient-button/gradient-button.component";

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
