import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-gradient-button',
  standalone: true,
  imports: [],
  templateUrl: './gradient-button.component.html',
  styleUrl: './gradient-button.component.scss'
})
export class GradientButtonComponent {

  @Input() text!: string;
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
  
  click() {
    this.onClick.emit();
  }
  
}
