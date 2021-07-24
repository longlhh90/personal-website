import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { ABOUTME_ROUTE } from './aboutme.route';
import { AboutMeComponent } from './aboutme.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([ABOUTME_ROUTE])],
  declarations: [AboutMeComponent],
})
export class AboutMeModule {}
