import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IWorking, Working } from '../working.model';

import { WorkingService } from './working.service';

describe('Service Tests', () => {
  describe('Working Service', () => {
    let service: WorkingService;
    let httpMock: HttpTestingController;
    let elemDefault: IWorking;
    let expectedResult: IWorking | IWorking[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(WorkingService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        position: 'AAAAAAA',
        company: 'AAAAAAA',
        countryName: 'AAAAAAA',
        startMonth: 0,
        startYear: 0,
        endMonth: 0,
        endYear: 0,
        isPresent: false,
        workDuty: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Working', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Working()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Working', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            position: 'BBBBBB',
            company: 'BBBBBB',
            countryName: 'BBBBBB',
            startMonth: 1,
            startYear: 1,
            endMonth: 1,
            endYear: 1,
            isPresent: true,
            workDuty: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Working', () => {
        const patchObject = Object.assign(
          {
            position: 'BBBBBB',
            startMonth: 1,
            endMonth: 1,
          },
          new Working()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Working', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            position: 'BBBBBB',
            company: 'BBBBBB',
            countryName: 'BBBBBB',
            startMonth: 1,
            startYear: 1,
            endMonth: 1,
            endYear: 1,
            isPresent: true,
            workDuty: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Working', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addWorkingToCollectionIfMissing', () => {
        it('should add a Working to an empty array', () => {
          const working: IWorking = { id: 123 };
          expectedResult = service.addWorkingToCollectionIfMissing([], working);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(working);
        });

        it('should not add a Working to an array that contains it', () => {
          const working: IWorking = { id: 123 };
          const workingCollection: IWorking[] = [
            {
              ...working,
            },
            { id: 456 },
          ];
          expectedResult = service.addWorkingToCollectionIfMissing(workingCollection, working);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Working to an array that doesn't contain it", () => {
          const working: IWorking = { id: 123 };
          const workingCollection: IWorking[] = [{ id: 456 }];
          expectedResult = service.addWorkingToCollectionIfMissing(workingCollection, working);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(working);
        });

        it('should add only unique Working to an array', () => {
          const workingArray: IWorking[] = [{ id: 123 }, { id: 456 }, { id: 87935 }];
          const workingCollection: IWorking[] = [{ id: 123 }];
          expectedResult = service.addWorkingToCollectionIfMissing(workingCollection, ...workingArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const working: IWorking = { id: 123 };
          const working2: IWorking = { id: 456 };
          expectedResult = service.addWorkingToCollectionIfMissing([], working, working2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(working);
          expect(expectedResult).toContain(working2);
        });

        it('should accept null and undefined values', () => {
          const working: IWorking = { id: 123 };
          expectedResult = service.addWorkingToCollectionIfMissing([], null, working, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(working);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
