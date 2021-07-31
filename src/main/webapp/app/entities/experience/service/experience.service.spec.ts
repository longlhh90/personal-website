import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IExperience, Experience } from '../experience.model';

import { ExperienceService } from './experience.service';

describe('Service Tests', () => {
  describe('Experience Service', () => {
    let service: ExperienceService;
    let httpMock: HttpTestingController;
    let elemDefault: IExperience;
    let expectedResult: IExperience | IExperience[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ExperienceService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 'AAAAAAA',
        title: 'AAAAAAA',
        major: 'AAAAAAA',
        organization: 'AAAAAAA',
        location: 'AAAAAAA',
        startMonth: 0,
        startYear: 0,
        endMonth: 0,
        endYear: 0,
        isPresent: false,
        details: 'AAAAAAA',
        expType: 'AAAAAAA',
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

      it('should create a Experience', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Experience()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Experience', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            title: 'BBBBBB',
            major: 'BBBBBB',
            organization: 'BBBBBB',
            location: 'BBBBBB',
            startMonth: 1,
            startYear: 1,
            endMonth: 1,
            endYear: 1,
            isPresent: true,
            details: 'BBBBBB',
            expType: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Experience', () => {
        const patchObject = Object.assign(
          {
            location: 'BBBBBB',
            startMonth: 1,
            endMonth: 1,
            endYear: 1,
            expType: 'BBBBBB',
          },
          new Experience()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Experience', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            title: 'BBBBBB',
            major: 'BBBBBB',
            organization: 'BBBBBB',
            location: 'BBBBBB',
            startMonth: 1,
            startYear: 1,
            endMonth: 1,
            endYear: 1,
            isPresent: true,
            details: 'BBBBBB',
            expType: 'BBBBBB',
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

      it('should delete a Experience', () => {
        service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addExperienceToCollectionIfMissing', () => {
        it('should add a Experience to an empty array', () => {
          const experience: IExperience = { id: 'ABC' };
          expectedResult = service.addExperienceToCollectionIfMissing([], experience);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(experience);
        });

        it('should not add a Experience to an array that contains it', () => {
          const experience: IExperience = { id: 'ABC' };
          const experienceCollection: IExperience[] = [
            {
              ...experience,
            },
            { id: 'CBA' },
          ];
          expectedResult = service.addExperienceToCollectionIfMissing(experienceCollection, experience);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Experience to an array that doesn't contain it", () => {
          const experience: IExperience = { id: 'ABC' };
          const experienceCollection: IExperience[] = [{ id: 'CBA' }];
          expectedResult = service.addExperienceToCollectionIfMissing(experienceCollection, experience);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(experience);
        });

        it('should add only unique Experience to an array', () => {
          const experienceArray: IExperience[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'seamless Metal Mauritania' }];
          const experienceCollection: IExperience[] = [{ id: 'ABC' }];
          expectedResult = service.addExperienceToCollectionIfMissing(experienceCollection, ...experienceArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const experience: IExperience = { id: 'ABC' };
          const experience2: IExperience = { id: 'CBA' };
          expectedResult = service.addExperienceToCollectionIfMissing([], experience, experience2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(experience);
          expect(expectedResult).toContain(experience2);
        });

        it('should accept null and undefined values', () => {
          const experience: IExperience = { id: 'ABC' };
          expectedResult = service.addExperienceToCollectionIfMissing([], null, experience, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(experience);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
