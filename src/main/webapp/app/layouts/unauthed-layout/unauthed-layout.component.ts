import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-unauthed-layout',
  templateUrl: './unauthed-layout.component.html',
  styleUrls: ['./unauthed-layout.component.scss'],
})
export class UnauthedLayoutComponent implements OnDestroy {
  isLoginUrl = false;
  private routeUrlSubscription: Subscription;

  constructor(private router: Router) {
    this.routeUrlSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.isLoginUrl = this.router.url === '/login';
      }
    });
  }

  ngOnDestroy() {
    this.routeUrlSubscription.unsubscribe();
  }
}
