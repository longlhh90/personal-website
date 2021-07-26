import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { PORTFOLIO_ROUTE } from './portfolio.route';
import { PortfolioComponent } from './portfolio.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([PORTFOLIO_ROUTE])],
  declarations: [PortfolioComponent],
})
export class PortfolioModule {}
