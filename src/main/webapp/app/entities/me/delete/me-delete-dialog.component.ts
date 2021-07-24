import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMe } from '../me.model';
import { MeService } from '../service/me.service';

@Component({
  templateUrl: './me-delete-dialog.component.html',
})
export class MeDeleteDialogComponent {
  me?: IMe;

  constructor(protected meService: MeService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.meService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
