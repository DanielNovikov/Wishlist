import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss'
})
export class TextComponent implements OnChanges {

  @Input() text: string = '';
  @Input() fontWeight?: 'light' | 'regular' | 'medium' | 'semi-bold' | 'bold';
  @Input() fontFamily: 'primary' | 'secondary' = 'primary';
  @Input() fontSize?: 'tiny' | 'very-small' | 'small' | 'normal' | 'big' | 'huge';
  @Input() textAlign: 'left' | 'right' | 'center' = 'left';
  @Input() fontColor: 'primary' | 'secondary' | 'white' | 'error' = 'primary';
  @Input() type: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' = 'h3';
  @Input() inOneLine: boolean = false;
  @Input() underline: boolean = false;

  textClass: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    
    let classes = [
      this.textAlign.toString(),
      this.fontColor.toString(),
      `font-family-${this.fontFamily}`
    ];
    
    let fontWeight = this.fontWeight;
    let fontSize = this.fontSize;

    switch (this.type) {
      case "p":
        fontWeight ??= 'regular';
        fontSize ??= 'normal';
        break;
      case "h1":
        fontWeight ??= 'medium';
        fontSize ??= 'huge';
        break;
      case "h2":
        fontWeight ??= 'medium';
        fontSize ??= 'big';
        break;
      case "h3":
        fontWeight ??= 'regular';
        fontSize ??= 'normal';
        break;
      case "h4":
        fontWeight ??= 'regular';
        fontSize ??= 'small';
        break;
      case "h5":
        fontWeight ??= 'regular';
        fontSize ??= 'very-small';
        break;
      case "h6":
        fontWeight ??= 'regular';
        fontSize ??= 'tiny';
        break;
      case "span":
        fontWeight ??= 'regular';
        fontSize ??= 'normal';
        break;
    }

    classes.push(fontWeight.toString());
    classes.push(fontSize.toString());

    if (this.inOneLine) classes.push('in-one-line');
    else classes.push('break');
    
    if (this.underline) classes.push('underline');

    this.textClass = classes.join(' ');
  }
}
