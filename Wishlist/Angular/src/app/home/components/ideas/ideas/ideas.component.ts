import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-ideas',
  standalone: true,
  imports: [],
  templateUrl: './ideas.component.html',
  styleUrl: './ideas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdeasComponent {

}
