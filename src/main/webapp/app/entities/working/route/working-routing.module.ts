import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { WorkingComponent } from '../list/working.component';
import { WorkingDetailComponent } from '../detail/working-detail.component';
import { WorkingUpdateComponent } from '../update/working-update.component';
import { WorkingRoutingResolveService } from './working-routing-resolve.service';

const workingRoute: Routes = [
  {
    path: '',
    component: WorkingComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WorkingDetailComponent,
    resolve: {
      working: WorkingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WorkingUpdateComponent,
    resolve: {
      working: WorkingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WorkingUpdateComponent,
    resolve: {
      working: WorkingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(workingRoute)],
  exports: [RouterModule],
})
export class WorkingRoutingModule {}
