import { Component, OnInit, OnDestroy, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { IMe } from 'app/entities/me/me.model';
import { MeService } from 'app/entities/me/service/me.service';
import { Observable, Subscription } from 'rxjs';

interface Abilities {
  name: string;
  value: number;
  icon?: string;
}

interface Interest {
  name: string;
  icon?: string;
  style: string;
}

@Component({
  selector: 'jhi-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.scss'],
})
export class AboutMeComponent implements OnInit {
  meInfo$: Observable<IMe[] | null> | undefined;
  list_highlights: Abilities[] = [];
  list_skills_fe: Abilities[] = [];
  list_skills_be: Abilities[] = [];
  list_interests: Interest[] = [];
  duration = 1000;
  time = 0;

  @ViewChildren('highlights') highlights: QueryList<ElementRef> | undefined;
  @ViewChildren('skillsfe') skillsfe: QueryList<ElementRef> | undefined;
  @ViewChildren('skillsbe') skillsbe: QueryList<ElementRef> | undefined;

  constructor(private meService: MeService, private router: Router) {
    const date2 = new Date(2015, 1, 1);
    const date1 = new Date();
    this.time = Math.floor(Math.abs(date1.getTime() - date2.getTime()) / (36e5 * 24 * 365));

    //the css is handling 4 items highlight only
    this.list_highlights = [
      { name: 'Great Attitude', value: 10, icon: 'bi bi-emoji-smile' },
      { name: 'Languagues', value: 2, icon: 'bi bi-translate' },
      { name: 'Years of Working', value: this.time, icon: 'bi bi-briefcase' },
      { name: 'Big Achievements', value: 2, icon: 'bi bi-award' },
    ];

    //the css is handling 6 items skill only
    this.list_skills_fe = [
      { name: 'Javascript', value: 90, icon: 'fab fa-js-square' },
      { name: 'HTML', value: 80, icon: 'fab fa-html5' },
      { name: 'CSS', value: 75, icon: 'fab fa-css3-alt' },
    ];

    this.list_skills_be = [
      { name: 'Python', value: 95, icon: 'fab fa-python' },
      { name: 'Docker', value: 60, icon: 'fab fa-docker' },
      { name: 'Cloud Platform', value: 45, icon: 'fab fa-aws' },
    ];

    this.list_interests = [
      { name: 'Coding', icon: 'fas fa-code', style: 'color: #ffbb2c;' },
      { name: 'Playing with Data', icon: 'fas fa-chart-line', style: 'color: #5578ff;' },
      { name: 'Working Out', icon: 'fas fa-dumbbell', style: 'color: #e80368;' },
      { name: 'Travelling', icon: 'fas fa-plane', style: 'color: #e361ff;' },
      { name: 'Soccer', icon: 'fas fa-futbol', style: 'color: #47aeff;' },
      { name: 'BBQ', icon: 'fas fa-drumstick-bite', style: 'color: #ffa76e;' },
      { name: 'Meetup', icon: 'fab fa-meetup', style: 'color: #11dbcf;' },
      { name: 'Bitcoin', icon: 'fab fa-bitcoin', style: 'color: #ffc933;' },
    ];
  }

  ngAfterViewInit() {
    if (this.highlights) {
      this.highlights.forEach(item => {
        const target_obj = item.nativeElement.children[0].children[1];
        this.animateValue(target_obj, 0, Number(target_obj.innerHTML), this.duration);
      });
    }

    if (this.skillsfe) {
      this.skillsfe.forEach(item => {
        const value = parseInt(item.nativeElement.children[0].children[1].innerHTML, 10);
        const target_obj = item.nativeElement.children[1].children[0];
        this.animateValueProgressBar(target_obj, 0, value, this.duration);
      });
    }

    if (this.skillsbe) {
      this.skillsbe.forEach(item => {
        const value = parseInt(item.nativeElement.children[0].children[1].innerHTML, 10);
        const target_obj = item.nativeElement.children[1].children[0];
        this.animateValueProgressBar(target_obj, 0, value, this.duration);
      });
    }
  }

  ngOnInit(): void {
    this.meInfo$ = this.meService.query();
  }

  animateValueProgressBar(obj: any, start: number, end: number, duration: number): void {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) {
        startTimestamp = timestamp;
      }
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.setAttribute('style', `width: ${Math.floor(progress * (end - start) + start)}%;`);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  animateValue(obj: any, start: number, end: number, duration: number): void {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) {
        startTimestamp = timestamp;
      }
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
}
