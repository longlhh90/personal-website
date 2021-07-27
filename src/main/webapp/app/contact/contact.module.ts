import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { CONTACT_ROUTE } from './contact.route';
import { ContactComponent } from './contact.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([CONTACT_ROUTE])],
  declarations: [ContactComponent],
})
export class ContactModule {}
