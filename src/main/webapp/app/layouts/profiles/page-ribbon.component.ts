import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileService } from './profile.service';

@Component({
  selector: 'jhi-page-ribbon',
  template: `
    <div *ngIf="ribbonEnv$ | async as ribbonEnv">
      <div class="ribbon" *ngIf="ribbonEnv === 'dev'">
        <a href="" jhiTranslate="global.ribbon.{{ ribbonEnv }}">{{ ribbonEnv }}</a>
      </div>
    </div>
  `,
  styleUrls: ['./page-ribbon.component.scss'],
})
export class PageRibbonComponent implements OnInit {
  ribbonEnv$?: Observable<string | undefined>;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.ribbonEnv$ = this.profileService.getProfileInfo().pipe(map(profileInfo => profileInfo.ribbonEnv));
  }
}
