import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-unauthed-navbar',
  templateUrl: './unauthed-navbar.component.html',
  styleUrls: ['./unauthed-navbar.component.scss'],
})
export class UnauthedNavbarComponent implements OnDestroy {
  isHomeUrl = false;
  isMobileNavClicked = false;

  private routeUrlSubscription: Subscription;

  constructor(private router: Router) {
    this.routeUrlSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.isHomeUrl = this.router.url === '/';
      }
    });
  }

  ngOnDestroy() {
    this.routeUrlSubscription.unsubscribe();
  }

  onMobileNav() {
    this.isMobileNavClicked = !this.isMobileNavClicked;
  }
}
