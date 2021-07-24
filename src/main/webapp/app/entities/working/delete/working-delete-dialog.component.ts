import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IWorking } from '../working.model';
import { WorkingService } from '../service/working.service';

@Component({
  templateUrl: './working-delete-dialog.component.html',
})
export class WorkingDeleteDialogComponent {
  working?: IWorking;

  constructor(protected workingService: WorkingService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.workingService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
