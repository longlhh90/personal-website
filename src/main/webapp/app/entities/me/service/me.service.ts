import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMe, getMeIdentifier } from '../me.model';

export type EntityResponseType = HttpResponse<IMe>;
export type EntityArrayResponseType = HttpResponse<IMe[]>;

@Injectable({ providedIn: 'root' })
export class MeService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/us');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(me: IMe): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(me);
    return this.http
      .post<IMe>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(me: IMe): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(me);
    return this.http
      .put<IMe>(`${this.resourceUrl}/${getMeIdentifier(me) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(me: IMe): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(me);
    return this.http
      .patch<IMe>(`${this.resourceUrl}/${getMeIdentifier(me) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMe>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<IMe[] | null> {
    const options = createRequestOption(req);
    return this.http
      .get<IMe[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMeToCollectionIfMissing(meCollection: IMe[], ...usToCheck: (IMe | null | undefined)[]): IMe[] {
    const us: IMe[] = usToCheck.filter(isPresent);
    if (us.length > 0) {
      const meCollectionIdentifiers = meCollection.map(meItem => getMeIdentifier(meItem)!);
      const usToAdd = us.filter(meItem => {
        const meIdentifier = getMeIdentifier(meItem);
        if (meIdentifier == null || meCollectionIdentifiers.includes(meIdentifier)) {
          return false;
        }
        meCollectionIdentifiers.push(meIdentifier);
        return true;
      });
      return [...usToAdd, ...meCollection];
    }
    return meCollection;
  }

  protected convertDateFromClient(me: IMe): IMe {
    return Object.assign({}, me, {
      dob: me.dob?.isValid() ? me.dob.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dob = res.body.dob ? dayjs(res.body.dob) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): IMe[] | null {
    if (res.body) {
      res.body.forEach((me: IMe) => {
        me.dob = me.dob ? dayjs(me.dob) : undefined;
      });
    }
    return res.body;
  }
}
