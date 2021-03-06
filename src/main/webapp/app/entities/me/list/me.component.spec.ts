import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MeService } from '../service/me.service';

import { MeComponent } from './me.component';

describe('Component Tests', () => {
  describe('Me Management Component', () => {
    let comp: MeComponent;
    let fixture: ComponentFixture<MeComponent>;
    let service: MeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MeComponent],
      })
        .overrideTemplate(MeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MeComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(MeService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ id: 'ABC' }],
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
      expect(comp.us?.[0]).toEqual(jasmine.objectContaining({ id: 'ABC' }));
    });
  });
});
