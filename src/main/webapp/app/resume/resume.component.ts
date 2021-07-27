import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMe } from 'app/entities/me/me.model';
import { MeService } from 'app/entities/me/service/me.service';
import { Observable } from 'rxjs';

interface Resume {
  title?: string;
  major?: string;
  startTime: string;
  endTime: string;
  organization: string;
  location: string;
  details: string[];
}

@Component({
  selector: 'jhi-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent implements OnInit {
  meInfo$: Observable<IMe[] | null> | undefined;
  list_experience: Resume[] = [];
  list_education: Resume[] = [];
  list_certificate: Resume[] = [];

  constructor(private meService: MeService, private router: Router) {
    this.list_experience = [
      {
        title: 'Software Developer',
        startTime: 'Jul 2020',
        endTime: 'Jul 2021',
        organization: 'SalonScale Technology Inc.',
        location: 'Saskatoon, SK, Canada',
        details: [
          'Cooperated with another one in backend site to improve the server in term of security and performance.',
          'Re-designed and polished APIs to make them more flexible with the business requirements.',
          'Contributed to the success of integration with other third-party payment Chargebee and boosted the sale of the company to more 50% than before',
          'Improved and built features on Admin Web App. This helped to reduce the manual, time consuming tasks for Admin when supporting customers',
        ],
      },
      {
        title: 'Fullstack Developer',
        startTime: 'Jan 2020',
        endTime: 'Jul 2020',
        organization: 'BlueApp Studio',
        location: 'Saskatoon, SK, Canada',
        details: [
          'Side project in which I worked with another developer to build services for restaurant in Saskatoon.',
          'Successfully building Order/Booking services for Red Pepper restaurant in down town of Saskatoon.',
        ],
      },
      {
        title: 'IT Business Analyst',
        startTime: 'May 2019',
        endTime: 'Oct 2019',
        organization: 'Vietnam Payment Solution Company (VNPAY), Vietnam',
        location: 'Hanoi, Vietnam',
        details: [
          'Worked on-site with client to analyze needs across sales, customer service, administrative, and IT departments.',
          'Wrote clear requirement documents for Development team to resolve issues quickly and effectively.',
          'Worked as Project manager to ensure the project finished on time.',
        ],
      },
      {
        title: 'Product Owner',
        startTime: 'May 2018',
        endTime: 'Apr 2019',
        organization: 'TrueMoney, Vietnam',
        location: 'Hanoi, Vietnam',
        details: [
          'Analyzed data reports based on event tracking and data collected from Business Intelligent team to find out the critical issue of both system and business procedures. After that, propose detail actions to improve the Product',
          'Developed own ideas or re of Business and Sales Teams to write Product Requirement Document (PRD)',
        ],
      },
      {
        title: 'IT Business Analyst',
        startTime: 'Mar 2015',
        endTime: 'Feb 2018',
        organization: 'Synergix Technologies Pte Ltd, Vietnam',
        location: 'Hanoi, Vietnam',
        details: [
          'Coordinated with a 5-person team and successfully redesigned a Cost Project Management module in an ERP product used by one of the top 10 construction companies in Singapore',
        ],
      },
    ];

    this.list_education = [
      {
        major: 'Bachelor of Management Information Systems',
        startTime: '2008',
        endTime: '2012',
        organization: 'Academy of Finance',
        location: 'Vietnam',
        details: ['Evaluated by World Education Services (WES), as equivalent to a four-year Canadian bachelor’s degree'],
      },
      {
        major: 'Master of International Business',
        startTime: '2012',
        endTime: '2014',
        organization: 'Latrobe University',
        location: 'Melbourne Australia',
        details: ['Evaluated by World Education Services (WES), as equivalent to a Canadian master’s degree'],
      },
    ];
  }

  ngOnInit(): void {
    this.meInfo$ = this.meService.query();
  }
}
