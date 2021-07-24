import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IEducation, Education } from '../education.model';
import { EducationService } from '../service/education.service';

@Component({
  selector: 'jhi-education-update',
  templateUrl: './education-update.component.html',
})
export class EducationUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    institution: [null, [Validators.required]],
    countryName: [],
    yearGraduate: [null, [Validators.required]],
    major: [null, [Validators.required]],
  });

  constructor(protected educationService: EducationService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ education }) => {
      this.updateForm(education);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const education = this.createFromForm();
    if (education.id !== undefined) {
      this.subscribeToSaveResponse(this.educationService.update(education));
    } else {
      this.subscribeToSaveResponse(this.educationService.create(education));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEducation>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(education: IEducation): void {
    this.editForm.patchValue({
      id: education.id,
      institution: education.institution,
      countryName: education.countryName,
      yearGraduate: education.yearGraduate,
      major: education.major,
    });
  }

  protected createFromForm(): IEducation {
    return {
      ...new Education(),
      id: this.editForm.get(['id'])!.value,
      institution: this.editForm.get(['institution'])!.value,
      countryName: this.editForm.get(['countryName'])!.value,
      yearGraduate: this.editForm.get(['yearGraduate'])!.value,
      major: this.editForm.get(['major'])!.value,
    };
  }
}
