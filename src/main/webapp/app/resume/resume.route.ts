import { Route } from '@angular/router';
import { ResumeComponent } from './resume.component';

export const RESUME_ROUTE: Route = {
  path: '',
  component: ResumeComponent,
  data: {
    pageTitle: '',
  },
};
