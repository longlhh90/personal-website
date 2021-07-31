import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMe } from '../me.model';
import { MeService } from '../service/me.service';
import { MeDeleteDialogComponent } from '../delete/me-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-me',
  templateUrl: './me.component.html',
})
export class MeComponent implements OnInit {
  us?: IMe[];
  isLoading = false;

  constructor(protected meService: MeService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.meService.query().subscribe(
      (res: HttpResponse<IMe[]>) => {
        this.isLoading = false;
        this.us = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IMe): string {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(me: IMe): void {
    const modalRef = this.modalService.open(MeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.me = me;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
