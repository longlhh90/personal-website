jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { EducationService } from '../service/education.service';
import { IEducation, Education } from '../education.model';

import { EducationUpdateComponent } from './education-update.component';

describe('Component Tests', () => {
  describe('Education Management Update Component', () => {
    let comp: EducationUpdateComponent;
    let fixture: ComponentFixture<EducationUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let educationService: EducationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EducationUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(EducationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EducationUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      educationService = TestBed.inject(EducationService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const education: IEducation = { id: 456 };

        activatedRoute.data = of({ education });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(education));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const education = { id: 123 };
        spyOn(educationService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ education });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: education }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(educationService.update).toHaveBeenCalledWith(education);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const education = new Education();
        spyOn(educationService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ education });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: education }));
        saveSubject.complete();

        // THEN
        expect(educationService.create).toHaveBeenCalledWith(education);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const education = { id: 123 };
        spyOn(educationService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ education });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(educationService.update).toHaveBeenCalledWith(education);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
