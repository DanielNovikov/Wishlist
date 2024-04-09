import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-gradient-button',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './gradient-button.component.html',
  styleUrl: './gradient-button.component.scss'
})
export class GradientButtonComponent {
  @Input() text!: string;
  @Input() size: 'normal' | 'big' | 'huge' = 'normal';
  @Input() fullWidth: boolean = false;
  
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
  
  click() {
    this.onClick.emit();
  }

}
