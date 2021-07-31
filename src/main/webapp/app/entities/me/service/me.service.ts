import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
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
    return this.http.post<IMe>(this.resourceUrl, me, { observe: 'response' });
  }

  update(me: IMe): Observable<EntityResponseType> {
    return this.http.put<IMe>(`${this.resourceUrl}/${getMeIdentifier(me) as string}`, me, { observe: 'response' });
  }

  partialUpdate(me: IMe): Observable<EntityResponseType> {
    return this.http.patch<IMe>(`${this.resourceUrl}/${getMeIdentifier(me) as string}`, me, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IMe>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMe[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
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
}
