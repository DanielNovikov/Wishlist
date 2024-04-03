import {ChangeDetectionStrategy, Component, EventEmitter, Output, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {GradientButtonComponent} from "../../../shared/components/gradient-button/gradient-button.component";
import {NgIf} from "@angular/common";
import {TextComponent} from "../../../shared/components/text/text.component";
import {TextErrorComponent} from "../../../shared/components/text-error/text-error.component";
import {Subscription} from "rxjs";
import {AuthApiService} from "../../services/auth-api.service";
import {AuthSignUpByEmailRequest} from "../../models/auth-sign-up-by-email-request";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-sign-up',
  standalone: true,
    imports: [
        FormsModule,
        GradientButtonComponent,
        NgIf,
        ReactiveFormsModule,
        TextComponent,
        TextErrorComponent
    ],
  templateUrl: './auth-sign-up.component.html',
  styleUrl: './auth-sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthSignUpComponent {
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

    private valueChangesSubscription: Subscription | undefined;
    constructor(private authService: AuthService) {
        this.valueChangesSubscription = this.authForm.valueChanges.subscribe(() => {
            this.submitFailureMessage.set('');
        });
    }

    ngOnDestroy(): void {
        this.valueChangesSubscription?.unsubscribe();
    }

    submitAttempted = signal(false);
    submitFailureMessage = signal('');
    onSubmit() {
        this.submitAttempted.set(true);
        if (this.authForm.valid) {
            const request = this.authForm.value as AuthSignUpByEmailRequest;
            this.authService.signUpByEmail(request).subscribe(success => {
                if (!success) {
                    this.submitFailureMessage.set('Користувач з такою електронною адресою вже зареєстрований');
                } else {
                    this.onAuthenticated.emit();
                }
            });
        }
    }
}
