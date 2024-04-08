import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {GradientButtonComponent} from "../../../shared/components/gradient-button/gradient-button.component";
import {ModalService} from "../../../shared/services/modal.service";
import {ModalBase} from "../../../shared/models/modal-base";

@Component({
  selector: 'app-test-dialog',
  standalone: true,
  imports: [
    GradientButtonComponent
  ],
  templateUrl: './test-dialog.component.html',
  styleUrl: './test-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestDialogComponent extends ModalBase implements OnDestroy {

  constructor(private modalService: ModalService) {
    super();
  }

  ngOnDestroy(): void {
    console.log('destroying test');
  }

  openCreateModal() {
    this.close();
  }
  
}
