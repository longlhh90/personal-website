import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { MeComponent } from './list/me.component';
import { MeDetailComponent } from './detail/me-detail.component';
import { MeUpdateComponent } from './update/me-update.component';
import { MeDeleteDialogComponent } from './delete/me-delete-dialog.component';
import { MeRoutingModule } from './route/me-routing.module';

@NgModule({
  imports: [SharedModule, MeRoutingModule],
  declarations: [MeComponent, MeDetailComponent, MeUpdateComponent, MeDeleteDialogComponent],
  entryComponents: [MeDeleteDialogComponent],
})
export class MeModule {}
