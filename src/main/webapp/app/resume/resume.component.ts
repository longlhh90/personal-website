import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IExperience } from 'app/entities/experience/experience.model';
import { ExperienceService } from 'app/entities/experience/service/experience.service';

interface Resume {
  title?: string;
  major?: string;
  startTime?: string;
  endTime?: string;
  organization: string;
  location: string;
  details: string[];
}

const mappingMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

@Component({
  selector: 'jhi-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent implements OnInit {
  experiences?: IExperience[];
  isLoading = false;
  list_experience: Resume[] = [];
  list_education: Resume[] = [];
  list_certificate: Resume[] = [];

  constructor(protected experienceService: ExperienceService, private router: Router) {
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
        organization: 'Vietnam Payment Solution Company (VNPAY)',
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
        organization: 'TrueMoney',
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
        organization: 'Synergix Technologies Pte Ltd',
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

  loadAll(): void {
    this.isLoading = true;

    this.experienceService.query().subscribe(
      (res: HttpResponse<IExperience[]>) => {
        this.isLoading = false;
        this.experiences = res.body ?? [];

        for (const i of this.experiences) {
          if (i.expType === 'work') {
            const startMonth = i.startMonth ? i.startMonth : null;
            const endMonth = i.endMonth ? i.endMonth : null;
            this.list_experience = [
              {
                title: i.title ? i.title : '',
                startTime: `${startMonth ? mappingMonth[startMonth - 1] : ''} ${i.startYear ? i.startYear : ''}`,
                endTime: i.isPresent ? 'Now' : `${endMonth ? mappingMonth[endMonth - 1] : ''} ${i.endYear ? i.endYear : ''}`,
                organization: i.organization ? i.organization : '',
                location: i.location ? i.location : '',
                details: i.details ? i.details.split('|') : [],
              },
              ...this.list_experience,
            ];
          }
        }
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }
}
