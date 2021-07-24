import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMe, Me } from '../me.model';
import { MeService } from '../service/me.service';

@Injectable({ providedIn: 'root' })
export class MeRoutingResolveService implements Resolve<IMe> {
  constructor(protected service: MeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMe> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((me: HttpResponse<Me>) => {
          if (me.body) {
            return of(me.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Me());
  }
}
