import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgClass, NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgTemplateOutlet
  ],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss'
})
export class TextComponent implements OnInit {

  @Input() fontWeight?: 'light' | 'regular' | 'medium' | 'semi-bold' | 'bold';
  @Input() fontFamily: 'primary' | 'secondary' = 'primary';
  @Input() fontSize?: 'tiny' | 'very-small' | 'small' | 'normal' | 'big' | 'huge';
  @Input() textAlign: 'left' | 'right' | 'center' = 'left';
  @Input() fontColor: 'primary' | 'secondary' | 'white' | 'error' = 'primary';
  @Input() type: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' = 'h3';
  @Input() lineHeight?: 'normal' | 'big';
  @Input() inOneLine: boolean = false;
  @Input() underline: boolean = false;

  textClass: string = '';

  ngOnInit() {
    
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
        //uh, I just don't get sense of this component, can't it be achieved using regular tags and styling, there is no logic or specific markup
    }

    classes.push(fontWeight.toString());
    classes.push(fontSize.toString());

    if (this.inOneLine) classes.push('in-one-line');
    else classes.push('break');
    
    if (this.underline) classes.push('underline');
    if (this.lineHeight) classes.push(`line-height-${this.lineHeight}`);

    this.textClass = classes.join(' ');
  }
}
