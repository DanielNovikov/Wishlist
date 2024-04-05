import {Component, OnDestroy, signal, WritableSignal} from '@angular/core';
import {ModalEmpty} from "../../../shared/models/modal-empty";
import {GradientButtonComponent} from "../../../shared/components/gradient-button/gradient-button.component";
import {TextComponent} from "../../../shared/components/text/text.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AuthApiService} from "../../services/auth-api.service";
import {AuthSignInByEmailRequest} from "../../models/auth-sign-in-by-email-request";
import {TextErrorComponent} from "../../../shared/components/text-error/text-error.component";
import {Subscription} from "rxjs";
import {AuthSignInComponent} from "../auth-sign-in/auth-sign-in.component";
import {AuthSignUpComponent} from "../auth-sign-up/auth-sign-up.component";
import {Router} from "@angular/router";
import {AuthExternalComponent} from "../auth-external/auth-external.component";

@Component({
  selector: 'app-sign-in',
  standalone: true,
    imports: [
        AuthSignInComponent,
        AuthSignUpComponent,
        AuthExternalComponent
    ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent extends ModalEmpty {
    protected authType: WritableSignal<'sign-in' | 'sign-up'> = signal('sign-in');
    
    constructor(private router: Router) {
        super();
    }
    
    onAuthTypeChanged(authType: 'sign-in' | 'sign-up') {
        this.authType.set(authType);
    }
    
    onAuthenticated() {
        this.close();
        this.router.navigate(['home']);
    }
}
