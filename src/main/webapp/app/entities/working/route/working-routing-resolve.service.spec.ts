jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IWorking, Working } from '../working.model';
import { WorkingService } from '../service/working.service';

import { WorkingRoutingResolveService } from './working-routing-resolve.service';

describe('Service Tests', () => {
  describe('Working routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: WorkingRoutingResolveService;
    let service: WorkingService;
    let resultWorking: IWorking | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(WorkingRoutingResolveService);
      service = TestBed.inject(WorkingService);
      resultWorking = undefined;
    });

    describe('resolve', () => {
      it('should return IWorking returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultWorking = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultWorking).toEqual({ id: 123 });
      });

      it('should return new IWorking if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultWorking = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultWorking).toEqual(new Working());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultWorking = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultWorking).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
