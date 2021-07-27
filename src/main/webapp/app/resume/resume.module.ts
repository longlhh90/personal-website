import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { RESUME_ROUTE } from './resume.route';
import { ResumeComponent } from './resume.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([RESUME_ROUTE])],
  declarations: [ResumeComponent],
})
export class ResumeModule {}
