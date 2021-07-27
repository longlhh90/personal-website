import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMe } from 'app/entities/me/me.model';
import { MeService } from 'app/entities/me/service/me.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'jhi-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  meInfo$: Observable<IMe[] | null> | undefined;

  constructor(private meService: MeService, private router: Router) {}

  ngOnInit(): void {
    this.meInfo$ = this.meService.query();
  }
}
