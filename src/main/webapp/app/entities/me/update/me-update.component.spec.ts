jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { MeService } from '../service/me.service';
import { IMe, Me } from '../me.model';

import { MeUpdateComponent } from './me-update.component';

describe('Component Tests', () => {
  describe('Me Management Update Component', () => {
    let comp: MeUpdateComponent;
    let fixture: ComponentFixture<MeUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let meService: MeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MeUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(MeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MeUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      meService = TestBed.inject(MeService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const me: IMe = { id: 'CBA' };

        activatedRoute.data = of({ me });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(me));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const me = { id: 'ABC' };
        spyOn(meService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ me });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: me }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(meService.update).toHaveBeenCalledWith(me);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const me = new Me();
        spyOn(meService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ me });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: me }));
        saveSubject.complete();

        // THEN
        expect(meService.create).toHaveBeenCalledWith(me);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const me = { id: 'ABC' };
        spyOn(meService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ me });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(meService.update).toHaveBeenCalledWith(me);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
