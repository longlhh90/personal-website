import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IWorking, Working } from '../working.model';
import { WorkingService } from '../service/working.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-working-update',
  templateUrl: './working-update.component.html',
})
export class WorkingUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    position: [null, [Validators.required]],
    company: [null, [Validators.required]],
    countryName: [null, [Validators.required]],
    startMonth: [null, [Validators.required]],
    startYear: [null, [Validators.required]],
    endMonth: [],
    endYear: [],
    isPresent: [null, [Validators.required]],
    workDuty: [null, [Validators.required]],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected workingService: WorkingService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ working }) => {
      this.updateForm(working);
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
    const working = this.createFromForm();
    if (working.id !== undefined) {
      this.subscribeToSaveResponse(this.workingService.update(working));
    } else {
      this.subscribeToSaveResponse(this.workingService.create(working));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWorking>>): void {
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

  protected updateForm(working: IWorking): void {
    this.editForm.patchValue({
      id: working.id,
      position: working.position,
      company: working.company,
      countryName: working.countryName,
      startMonth: working.startMonth,
      startYear: working.startYear,
      endMonth: working.endMonth,
      endYear: working.endYear,
      isPresent: working.isPresent,
      workDuty: working.workDuty,
    });
  }

  protected createFromForm(): IWorking {
    return {
      ...new Working(),
      id: this.editForm.get(['id'])!.value,
      position: this.editForm.get(['position'])!.value,
      company: this.editForm.get(['company'])!.value,
      countryName: this.editForm.get(['countryName'])!.value,
      startMonth: this.editForm.get(['startMonth'])!.value,
      startYear: this.editForm.get(['startYear'])!.value,
      endMonth: this.editForm.get(['endMonth'])!.value,
      endYear: this.editForm.get(['endYear'])!.value,
      isPresent: this.editForm.get(['isPresent'])!.value,
      workDuty: this.editForm.get(['workDuty'])!.value,
    };
  }
}
