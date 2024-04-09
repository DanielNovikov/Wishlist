import {Component, OnDestroy, signal, WritableSignal} from '@angular/core';
import {AuthSignInComponent} from "../auth-sign-in/auth-sign-in.component";
import {AuthSignUpComponent} from "../auth-sign-up/auth-sign-up.component";
import {Router} from "@angular/router";
import {AuthExternalComponent} from "../auth-external/auth-external.component";
import { ModalBase } from "../../../modal/models/modal-base";

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
export class AuthComponent extends ModalBase {
    protected authType: WritableSignal<'sign-in' | 'sign-up'> = signal('sign-in');
        
    onAuthTypeChanged(authType: 'sign-in' | 'sign-up') {
        this.authType.set(authType);
    }
    
    onAuthenticated() {
        this.output(true);
    }
}
