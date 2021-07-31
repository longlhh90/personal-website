import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'me',
        data: { pageTitle: 'personalWebsiteApp.me.home.title' },
        loadChildren: () => import('./me/me.module').then(m => m.MeModule),
      },
      {
        path: 'experience',
        data: { pageTitle: 'personalWebsiteApp.experience.home.title' },
        loadChildren: () => import('./experience/experience.module').then(m => m.ExperienceModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
