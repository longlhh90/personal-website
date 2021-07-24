import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IWorking, Working } from '../working.model';
import { WorkingService } from '../service/working.service';

@Injectable({ providedIn: 'root' })
export class WorkingRoutingResolveService implements Resolve<IWorking> {
  constructor(protected service: WorkingService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWorking> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((working: HttpResponse<Working>) => {
          if (working.body) {
            return of(working.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Working());
  }
}
