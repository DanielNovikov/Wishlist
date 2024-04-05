import { ChangeDetectionStrategy, Component } from '@angular/core';
import {GradientButtonComponent} from "../../../shared/components/gradient-button/gradient-button.component";

@Component({
  selector: 'app-wishlist',
  standalone: true,
    imports: [
        GradientButtonComponent
    ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistComponent {

}
