import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './adminhome.route';
import { AdminHomeComponent } from './adminhome.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [AdminHomeComponent],
})
export class AdminHomeModule {}
