import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWorking } from '../working.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-working-detail',
  templateUrl: './working-detail.component.html',
})
export class WorkingDetailComponent implements OnInit {
  working: IWorking | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ working }) => {
      this.working = working;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
