import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { EducationService } from '../service/education.service';

import { EducationComponent } from './education.component';

describe('Component Tests', () => {
  describe('Education Management Component', () => {
    let comp: EducationComponent;
    let fixture: ComponentFixture<EducationComponent>;
    let service: EducationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EducationComponent],
      })
        .overrideTemplate(EducationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EducationComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(EducationService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.educations?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
