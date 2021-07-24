import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MeComponent } from '../list/me.component';
import { MeDetailComponent } from '../detail/me-detail.component';
import { MeUpdateComponent } from '../update/me-update.component';
import { MeRoutingResolveService } from './me-routing-resolve.service';

const meRoute: Routes = [
  {
    path: '',
    component: MeComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MeDetailComponent,
    resolve: {
      me: MeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MeUpdateComponent,
    resolve: {
      me: MeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MeUpdateComponent,
    resolve: {
      me: MeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(meRoute)],
  exports: [RouterModule],
})
export class MeRoutingModule {}
