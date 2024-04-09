import { Injectable } from '@angular/core';
import { AuthComponent } from "../components/auth/auth.component";
import { CurrentUserService } from "../../current-user/services/current-user.service";
import { ModalService } from "../../modal/services/modal.service";

@Injectable({
  providedIn: 'root'
})
export class AuthDialogService {

  constructor(private currentUserService: CurrentUserService, private modalService: ModalService) { }

  executeIfAuthenticated(action: (wasAuthorized: boolean) => void) {
    if (this.currentUserService.isAuthorized()) {
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
