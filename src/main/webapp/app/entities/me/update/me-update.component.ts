import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IMe, Me } from '../me.model';
import { MeService } from '../service/me.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-me-update',
  templateUrl: './me-update.component.html',
})
export class MeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    formalName: [null, [Validators.required]],
    legalName: [null, [Validators.required]],
    email: [null, [Validators.required]],
    linkedin: [],
    facebook: [],
    instagram: [],
    github: [],
    resume: [],
    aboutMe: [null, [Validators.required]],
    aboutMeShort: [null, [Validators.required]],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected meService: MeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ me }) => {
      this.updateForm(me);
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
    const me = this.createFromForm();
    if (me.id !== undefined) {
      this.subscribeToSaveResponse(this.meService.update(me));
    } else {
      this.subscribeToSaveResponse(this.meService.create(me));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMe>>): void {
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

  protected updateForm(me: IMe): void {
    this.editForm.patchValue({
      id: me.id,
      formalName: me.formalName,
      legalName: me.legalName,
      email: me.email,
      linkedin: me.linkedin,
      facebook: me.facebook,
      instagram: me.instagram,
      github: me.github,
      resume: me.resume,
      aboutMe: me.aboutMe,
      aboutMeShort: me.aboutMeShort,
    });
  }

  protected createFromForm(): IMe {
    return {
      ...new Me(),
      id: this.editForm.get(['id'])!.value,
      formalName: this.editForm.get(['formalName'])!.value,
      legalName: this.editForm.get(['legalName'])!.value,
      email: this.editForm.get(['email'])!.value,
      linkedin: this.editForm.get(['linkedin'])!.value,
      facebook: this.editForm.get(['facebook'])!.value,
      instagram: this.editForm.get(['instagram'])!.value,
      github: this.editForm.get(['github'])!.value,
      resume: this.editForm.get(['resume'])!.value,
      aboutMe: this.editForm.get(['aboutMe'])!.value,
      aboutMeShort: this.editForm.get(['aboutMeShort'])!.value,
    };
  }
}
