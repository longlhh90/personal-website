import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeService } from 'app/entities/me/service/me.service';

@Component({
  selector: 'jhi-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  constructor(private meService: MeService, private router: Router) {}

  ngOnInit(): void {
    const test = null;
  }
}
