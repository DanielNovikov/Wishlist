import {ChangeDetectionStrategy, Component, signal, WritableSignal} from '@angular/core';
import {GradientButtonComponent} from "../../../shared/components/gradient-button/gradient-button.component";
import {DeviceService} from "../../../shared/services/device.service";
import {WishlistResponse} from "../../models/wishlist-response";
import {WishlistApiService} from "../../services/wishlist-api.service";
import {finalize} from "rxjs";
import {WishlistCreateComponent} from "../wishlist-create/wishlist-create.component";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [
    GradientButtonComponent,
    WishlistCreateComponent
  ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistComponent {

  protected isLoaded: WritableSignal<boolean> = signal(false);
  protected wishlist: WritableSignal<WishlistResponse | null> = signal(null);
  
  constructor(
      private deviceService: DeviceService,
      private wishlistApiService: WishlistApiService,
      private authService: AuthService) {
  }
  
  ngOnInit() {
    if (this.deviceService.isBrowser()) {
      if (!this.authService.isAuthorized()) {
        this.isLoaded.set(true);
        return;
      }
      
      this.wishlistApiService.get()
        .pipe(finalize(() => this.isLoaded.set(true)))
        .subscribe(response => {
          this.wishlist.set(response);
        });
    }
  }
}
