import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEducation } from '../education.model';
import { EducationService } from '../service/education.service';
import { EducationDeleteDialogComponent } from '../delete/education-delete-dialog.component';

@Component({
  selector: 'jhi-education',
  templateUrl: './education.component.html',
})
export class EducationComponent implements OnInit {
  educations?: IEducation[];
  isLoading = false;

  constructor(protected educationService: EducationService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.educationService.query().subscribe(
      (res: HttpResponse<IEducation[]>) => {
        this.isLoading = false;
        this.educations = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IEducation): number {
    return item.id!;
  }

  delete(education: IEducation): void {
    const modalRef = this.modalService.open(EducationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.education = education;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
