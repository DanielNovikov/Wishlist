import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {TextComponent} from "../text/text.component";

@Component({
  selector: 'app-text-error',
  standalone: true,
    imports: [
        NgIf,
        TextComponent
    ],
  templateUrl: './text-error.component.html',
  styleUrl: './text-error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextErrorComponent {

    @Input() textAlign: 'left' | 'right' | 'center' = 'left';
    
}
