import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IExperience } from '../experience.model';
import { ExperienceService } from '../service/experience.service';
import { ExperienceDeleteDialogComponent } from '../delete/experience-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-experience',
  templateUrl: './experience.component.html',
})
export class ExperienceComponent implements OnInit {
  experiences?: IExperience[];
  isLoading = false;

  constructor(protected experienceService: ExperienceService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.experienceService.query().subscribe(
      (res: HttpResponse<IExperience[]>) => {
        this.isLoading = false;
        this.experiences = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IExperience): string {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(experience: IExperience): void {
    const modalRef = this.modalService.open(ExperienceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.experience = experience;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
