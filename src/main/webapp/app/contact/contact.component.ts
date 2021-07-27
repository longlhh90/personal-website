import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IMe } from 'app/entities/me/me.model';
import { MeService } from 'app/entities/me/service/me.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'jhi-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  meInfo$: Observable<IMe[] | null> | undefined;

  constructor(private meService: MeService, private router: Router) {}

  ngOnInit(): void {
    this.meInfo$ = this.meService.query();
  }
}
