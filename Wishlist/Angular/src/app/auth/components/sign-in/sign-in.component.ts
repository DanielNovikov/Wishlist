import { Component } from '@angular/core';
import {ModalEmpty} from "../../../shared/models/modal-empty";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent extends ModalEmpty {

}
