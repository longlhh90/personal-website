import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IWorking, getWorkingIdentifier } from '../working.model';

export type EntityResponseType = HttpResponse<IWorking>;
export type EntityArrayResponseType = HttpResponse<IWorking[]>;

@Injectable({ providedIn: 'root' })
export class WorkingService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/workings');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(working: IWorking): Observable<EntityResponseType> {
    return this.http.post<IWorking>(this.resourceUrl, working, { observe: 'response' });
  }

  update(working: IWorking): Observable<EntityResponseType> {
    return this.http.put<IWorking>(`${this.resourceUrl}/${getWorkingIdentifier(working) as number}`, working, { observe: 'response' });
  }

  partialUpdate(working: IWorking): Observable<EntityResponseType> {
    return this.http.patch<IWorking>(`${this.resourceUrl}/${getWorkingIdentifier(working) as number}`, working, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWorking>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWorking[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addWorkingToCollectionIfMissing(workingCollection: IWorking[], ...workingsToCheck: (IWorking | null | undefined)[]): IWorking[] {
    const workings: IWorking[] = workingsToCheck.filter(isPresent);
    if (workings.length > 0) {
      const workingCollectionIdentifiers = workingCollection.map(workingItem => getWorkingIdentifier(workingItem)!);
      const workingsToAdd = workings.filter(workingItem => {
        const workingIdentifier = getWorkingIdentifier(workingItem);
        if (workingIdentifier == null || workingCollectionIdentifiers.includes(workingIdentifier)) {
          return false;
        }
        workingCollectionIdentifiers.push(workingIdentifier);
        return true;
      });
      return [...workingsToAdd, ...workingCollection];
    }
    return workingCollection;
  }
}
