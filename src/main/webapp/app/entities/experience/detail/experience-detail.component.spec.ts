import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DataUtils } from 'app/core/util/data-util.service';

import { ExperienceDetailComponent } from './experience-detail.component';

describe('Component Tests', () => {
  describe('Experience Management Detail Component', () => {
    let comp: ExperienceDetailComponent;
    let fixture: ComponentFixture<ExperienceDetailComponent>;
    let dataUtils: DataUtils;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ExperienceDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ experience: { id: 'ABC' } }) },
          },
        ],
      })
        .overrideTemplate(ExperienceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExperienceDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = TestBed.inject(DataUtils);
    });

    describe('OnInit', () => {
      it('Should load experience on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.experience).toEqual(jasmine.objectContaining({ id: 'ABC' }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from DataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from DataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeBase64, fakeContentType);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeBase64, fakeContentType);
      });
    });
  });
});
