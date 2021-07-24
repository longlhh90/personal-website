import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { WorkingService } from '../service/working.service';

import { WorkingComponent } from './working.component';

describe('Component Tests', () => {
  describe('Working Management Component', () => {
    let comp: WorkingComponent;
    let fixture: ComponentFixture<WorkingComponent>;
    let service: WorkingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [WorkingComponent],
      })
        .overrideTemplate(WorkingComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WorkingComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(WorkingService);

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
      expect(comp.workings?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
