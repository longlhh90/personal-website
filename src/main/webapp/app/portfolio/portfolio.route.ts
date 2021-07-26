import { Route } from '@angular/router';
import { PortfolioComponent } from './portfolio.component';

export const PORTFOLIO_ROUTE: Route = {
  path: '',
  component: PortfolioComponent,
  data: {
    pageTitle: '',
  },
};
