import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy, OnInit,
  Output,
  signal
} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TextComponent} from "../text/text.component";
import {GradientButtonComponent} from "../gradient-button/gradient-button.component";
import {Subscription} from "rxjs";
import {NgIf, NgTemplateOutlet} from "@angular/common";
import {TextErrorComponent} from "../text-error/text-error.component";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TextComponent,
    GradientButtonComponent,
    NgTemplateOutlet,
    TextErrorComponent,
    NgIf
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnDestroy, OnInit {
  @Input() title!: string;
  @Input() submitButtonText!: string;
  @Input() formGroup!: FormGroup;
  @Input() submitFailureMessage = signal('');
  @Output() onSubmit: EventEmitter<void> = new EventEmitter<void>();
  
  private valueChangesSubscription: Subscription | undefined;
  ngOnInit(): void {
    this.valueChangesSubscription = this.formGroup.valueChanges.subscribe(() => {
      this.submitFailureMessage.set('');
    });
  }
  
  onSubmitClicked() {    
    this.formGroup.markAllAsTouched();
    
    if (this.formGroup.valid) {
      this.onSubmit.emit();
    }
  }

  ngOnDestroy(): void {
    this.valueChangesSubscription?.unsubscribe();
  }
}
