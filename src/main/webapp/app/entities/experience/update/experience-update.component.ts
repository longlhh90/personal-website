import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IExperience, Experience } from '../experience.model';
import { ExperienceService } from '../service/experience.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-experience-update',
  templateUrl: './experience-update.component.html',
})
export class ExperienceUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    title: [],
    major: [],
    organization: [null, [Validators.required]],
    location: [null, [Validators.required]],
    startMonth: [null, [Validators.required]],
    startYear: [null, [Validators.required]],
    endMonth: [],
    endYear: [],
    isPresent: [null, [Validators.required]],
    details: [null, [Validators.required]],
    expType: [null, [Validators.required]],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected experienceService: ExperienceService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ experience }) => {
      this.updateForm(experience);
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(
          new EventWithContent<AlertError>('personalWebsiteApp.error', { ...err, key: 'error.file.' + err.key })
        ),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const experience = this.createFromForm();
    if (experience.id !== undefined) {
      this.subscribeToSaveResponse(this.experienceService.update(experience));
    } else {
      this.subscribeToSaveResponse(this.experienceService.create(experience));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExperience>>): void {
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

  protected updateForm(experience: IExperience): void {
    this.editForm.patchValue({
      id: experience.id,
      title: experience.title,
      major: experience.major,
      organization: experience.organization,
      location: experience.location,
      startMonth: experience.startMonth,
      startYear: experience.startYear,
      endMonth: experience.endMonth,
      endYear: experience.endYear,
      isPresent: experience.isPresent,
      details: experience.details,
      expType: experience.expType,
    });
  }

  protected createFromForm(): IExperience {
    return {
      ...new Experience(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      major: this.editForm.get(['major'])!.value,
      organization: this.editForm.get(['organization'])!.value,
      location: this.editForm.get(['location'])!.value,
      startMonth: this.editForm.get(['startMonth'])!.value,
      startYear: this.editForm.get(['startYear'])!.value,
      endMonth: this.editForm.get(['endMonth'])!.value,
      endYear: this.editForm.get(['endYear'])!.value,
      isPresent: this.editForm.get(['isPresent'])!.value,
      details: this.editForm.get(['details'])!.value,
      expType: this.editForm.get(['expType'])!.value,
    };
  }
}
