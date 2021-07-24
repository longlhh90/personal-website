import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { WorkingComponent } from './list/working.component';
import { WorkingDetailComponent } from './detail/working-detail.component';
import { WorkingUpdateComponent } from './update/working-update.component';
import { WorkingDeleteDialogComponent } from './delete/working-delete-dialog.component';
import { WorkingRoutingModule } from './route/working-routing.module';

@NgModule({
  imports: [SharedModule, WorkingRoutingModule],
  declarations: [WorkingComponent, WorkingDetailComponent, WorkingUpdateComponent, WorkingDeleteDialogComponent],
  entryComponents: [WorkingDeleteDialogComponent],
})
export class WorkingModule {}
