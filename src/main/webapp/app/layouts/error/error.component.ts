import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'jhi-error',
  templateUrl: './error.component.html',
  styles: [
    `
      .error {
        display: inline-block;
        width: 500px;
        height: 250px;
        background: url('../../../content/images/emergency.jpg') no-repeat center top;
        background-size: contain;
      }
    `,
  ],
})
export class ErrorComponent implements OnInit, OnDestroy {
  errorMessage?: string;
  errorKey?: string;
  langChangeSubscription?: Subscription;

  constructor(private translateService: TranslateService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      if (routeData.errorMessage) {
        this.errorKey = routeData.errorMessage;
        this.getErrorMessageTranslation();
        this.langChangeSubscription = this.translateService.onLangChange.subscribe(() => this.getErrorMessageTranslation());
      }
    });
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  private getErrorMessageTranslation(): void {
    this.errorMessage = '';
    if (this.errorKey) {
      this.translateService.get(this.errorKey).subscribe(translatedErrorMessage => {
        this.errorMessage = translatedErrorMessage;
      });
    }
  }
}
