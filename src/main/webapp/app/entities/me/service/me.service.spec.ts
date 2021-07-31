import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMe, Me } from '../me.model';

import { MeService } from './me.service';

describe('Service Tests', () => {
  describe('Me Service', () => {
    let service: MeService;
    let httpMock: HttpTestingController;
    let elemDefault: IMe;
    let expectedResult: IMe | IMe[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(MeService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 'AAAAAAA',
        formalName: 'AAAAAAA',
        legalName: 'AAAAAAA',
        email: 'AAAAAAA',
        linkedin: 'AAAAAAA',
        facebook: 'AAAAAAA',
        instagram: 'AAAAAAA',
        github: 'AAAAAAA',
        resume: 'AAAAAAA',
        aboutMe: 'AAAAAAA',
        aboutMeShort: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find('ABC').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Me', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Me()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Me', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            formalName: 'BBBBBB',
            legalName: 'BBBBBB',
            email: 'BBBBBB',
            linkedin: 'BBBBBB',
            facebook: 'BBBBBB',
            instagram: 'BBBBBB',
            github: 'BBBBBB',
            resume: 'BBBBBB',
            aboutMe: 'BBBBBB',
            aboutMeShort: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Me', () => {
        const patchObject = Object.assign(
          {
            formalName: 'BBBBBB',
            legalName: 'BBBBBB',
            linkedin: 'BBBBBB',
          },
          new Me()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Me', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            formalName: 'BBBBBB',
            legalName: 'BBBBBB',
            email: 'BBBBBB',
            linkedin: 'BBBBBB',
            facebook: 'BBBBBB',
            instagram: 'BBBBBB',
            github: 'BBBBBB',
            resume: 'BBBBBB',
            aboutMe: 'BBBBBB',
            aboutMeShort: 'BBBBBB',
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

      it('should delete a Me', () => {
        service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addMeToCollectionIfMissing', () => {
        it('should add a Me to an empty array', () => {
          const me: IMe = { id: 'ABC' };
          expectedResult = service.addMeToCollectionIfMissing([], me);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(me);
        });

        it('should not add a Me to an array that contains it', () => {
          const me: IMe = { id: 'ABC' };
          const meCollection: IMe[] = [
            {
              ...me,
            },
            { id: 'CBA' },
          ];
          expectedResult = service.addMeToCollectionIfMissing(meCollection, me);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Me to an array that doesn't contain it", () => {
          const me: IMe = { id: 'ABC' };
          const meCollection: IMe[] = [{ id: 'CBA' }];
          expectedResult = service.addMeToCollectionIfMissing(meCollection, me);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(me);
        });

        it('should add only unique Me to an array', () => {
          const meArray: IMe[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'Buckinghamshire' }];
          const meCollection: IMe[] = [{ id: 'ABC' }];
          expectedResult = service.addMeToCollectionIfMissing(meCollection, ...meArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const me: IMe = { id: 'ABC' };
          const me2: IMe = { id: 'CBA' };
          expectedResult = service.addMeToCollectionIfMissing([], me, me2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(me);
          expect(expectedResult).toContain(me2);
        });

        it('should accept null and undefined values', () => {
          const me: IMe = { id: 'ABC' };
          expectedResult = service.addMeToCollectionIfMissing([], null, me, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(me);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
