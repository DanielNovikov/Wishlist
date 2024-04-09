import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { ModalService } from "../../shared/services/modal.service";
import { AuthComponent } from "../components/auth/auth.component";

@Injectable({
  providedIn: 'root'
})
export class AuthDialogService {

  constructor(private authService: AuthService, private modalService: ModalService) { }

  executeIfAuthenticated(action: (wasAuthorized: boolean) => void) {
    if (this.authService.isAuthorized()) {
      action(true);
    } else {
      this.modalService.open(AuthComponent).subscribe((output) => {
        if (output.hasResult) {
          action(false);
        }
      })
    }
  }
}
