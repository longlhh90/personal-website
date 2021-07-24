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
        path: 'education',
        data: { pageTitle: 'personalWebsiteApp.education.home.title' },
        loadChildren: () => import('./education/education.module').then(m => m.EducationModule),
      },
      {
        path: 'working',
        data: { pageTitle: 'personalWebsiteApp.working.home.title' },
        loadChildren: () => import('./working/working.module').then(m => m.WorkingModule),
      },
      {
        path: 'project',
        data: { pageTitle: 'personalWebsiteApp.project.home.title' },
        loadChildren: () => import('./project/project.module').then(m => m.ProjectModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
