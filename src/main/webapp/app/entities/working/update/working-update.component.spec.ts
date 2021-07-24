jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { WorkingService } from '../service/working.service';
import { IWorking, Working } from '../working.model';

import { WorkingUpdateComponent } from './working-update.component';

describe('Component Tests', () => {
  describe('Working Management Update Component', () => {
    let comp: WorkingUpdateComponent;
    let fixture: ComponentFixture<WorkingUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let workingService: WorkingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [WorkingUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(WorkingUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WorkingUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      workingService = TestBed.inject(WorkingService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const working: IWorking = { id: 456 };

        activatedRoute.data = of({ working });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(working));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const working = { id: 123 };
        spyOn(workingService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ working });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: working }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(workingService.update).toHaveBeenCalledWith(working);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const working = new Working();
        spyOn(workingService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ working });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: working }));
        saveSubject.complete();

        // THEN
        expect(workingService.create).toHaveBeenCalledWith(working);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const working = { id: 123 };
        spyOn(workingService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ working });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(workingService.update).toHaveBeenCalledWith(working);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
