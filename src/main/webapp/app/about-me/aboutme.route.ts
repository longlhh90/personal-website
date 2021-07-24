import { Route } from '@angular/router';
import { AboutMeComponent } from './aboutme.component';

export const ABOUTME_ROUTE: Route = {
  path: '',
  component: AboutMeComponent,
  data: {
    pageTitle: '',
  },
};
