import { Route } from '@angular/router';

import { AdminHomeComponent } from './adminhome.component';

export const HOME_ROUTE: Route = {
  path: '',
  component: AdminHomeComponent,
  data: {
    pageTitle: 'home.title',
  },
};
