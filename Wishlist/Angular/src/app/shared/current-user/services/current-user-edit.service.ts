import { Injectable } from '@angular/core';
import { AuthDialogService } from "../../auth/services/auth-dialog.service";
import { ModalService } from "../../modal/services/modal.service";
import { CurrentUserService } from "./current-user.service";
import { CurrentUserApiService } from "./current-user-api.service";
import { CurrentUserEditModalComponent } from "../components/current-user-edit-modal/current-user-edit-modal.component";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserEditService {

  constructor(
      private authDialogService: AuthDialogService,
      private currentUserApiService: CurrentUserApiService,
      private modalService: ModalService,
      private currentUserService: CurrentUserService) { }
  
  open() {
    this.authDialogService.executeIfAuthenticated((wasAuthorized) => {
      if (!wasAuthorized) return;
      
      this.currentUserApiService.getEdit().subscribe(response => {
        if (!response) return;
        
        this.modalService.open(CurrentUserEditModalComponent, response).subscribe(output => {
          if (output.hasResult) {
            this.currentUserService.user.set(output.result);
          }
        });
      });
    });
  }
  
}
