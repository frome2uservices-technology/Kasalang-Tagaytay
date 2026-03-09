import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../navigation-component/navigation-component';
import { HeaderAccountComponent } from '../../account/header-account-component/header-account-component';
import { Router } from '@angular/router';
import { CmsService } from '../../../core/services/cms-service/cms-service';
import { take } from 'rxjs';
import { CmsHeaderComponentsData } from '../../../models/header/cms-header-components.model';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../shared/loader-component/loader-component';
import { UrlPages } from '../../../shared/constants/page-urls.constants';

@Component({
  selector: 'app-toolbar-component',
  imports: [
    CommonModule,
    NavigationComponent,
    HeaderAccountComponent,
    LoaderComponent
  ],
  templateUrl: './toolbar-component.html',
  styleUrl: './toolbar-component.scss',
})
export class ToolbarComponent implements OnInit {

  public countdownNotice: string = '';
  public cmsData: CmsHeaderComponentsData | null = null;
  public isLoading: boolean = false;

  constructor (
    private readonly router: Router,
    private readonly cmsService: CmsService
  ) {}

  ngOnInit(): void {
    this.initializeCmsData();
  }

  /**
   * The function `initializeCmsData` initializes CMS data by fetching header components and setting
   * them in the application.
   */
  private initializeCmsData(): void {
    this.isLoading = true;
    this.cmsService
    .getCmsHeaderComponents()
    .pipe(take(1))
    .subscribe(response => {
      if (response) {
        this.isLoading = false;
        this.cmsService.headerCms.set(response);
        this.cmsData = response.data;
        this.initializeEventCountdown(response.data.HeaderEventExpoDate);
      }
    });
  }

  /**
   * The function initializes a countdown timer based on a target date and updates the remaining time
   * in days, hours, minutes, and seconds.
   */
  private initializeEventCountdown(expoDate: string): void {
    const targetDate: Date = new Date(expoDate);

    const countdown: number = setInterval(() => {
      const currentTime: number = new Date().getTime();
      const timeDifference: number = targetDate.getTime() - currentTime;

      if (timeDifference <= 0) {
        clearInterval(countdown);
      }

      const remainingDays: string = Math.floor(timeDifference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
      const remainingHours: string = Math.floor((timeDifference / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
      const remainingMinutes: string = Math.floor((timeDifference / (1000 * 60)) % 60).toString().padStart(2, '0');
      const remainingSeconds: string = Math.floor((timeDifference / 1000) % 60).toString().padStart(2, '0');

      this.countdownNotice = `Days: ${remainingDays} | Hours:${remainingHours} | Minutes:${remainingMinutes} | Seconds:${remainingSeconds}`;
    }, 1000);
  }

  /**
   * The navigateHomePage function in TypeScript navigates to the home page using the router.
   */
  public navigateHomePage(): void {
    this.router.navigate([`/${UrlPages.HOME}`]);
  }
}
