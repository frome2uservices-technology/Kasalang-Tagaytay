import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PreviousEvents } from '../../../models/home/previous-events.model';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CmsRecapComponentsData } from '../../../models/home/cms-recap-components.model';
import { CmsService } from '../../../core/cms-service';
import { take } from 'rxjs/internal/operators/take';
import { MatButtonModule } from '@angular/material/button';
import { LoaderComponent } from '../../shared/loader-component/loader-component';

@Component({
  selector: 'app-recap-component',
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    LoaderComponent
  ],
  templateUrl: './recap-component.html',
  styleUrl: './recap-component.scss',
})
export class RecapComponent implements OnInit, OnDestroy {

  public selectedIndex: number = 0;
  public isLoading: boolean = false;
  private intervalId: number = 0;
  public cmsData: CmsRecapComponentsData | null = null;
  public previousEvents: PreviousEvents[] = [];

  constructor (
    private readonly router: Router,
    private readonly cmsService: CmsService
  ) {}

  ngOnInit(): void {
    this.initializeCmsData();
    this.initializeEventCardInterval();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  /**
   * The `initializeCmsData` function sets the `cmsData` and `previousEvents` properties based on the
   * data from a CMS service, and fetches the data if it is not already available.
   */
  private initializeCmsData(): void {
    this.cmsData = this.cmsService.recapCms()?.data ?? null;
    this.previousEvents = this.cmsData?.RecapPastEvents?.pastEvents ?? [];
    
    if (this.cmsData === null) {
      this.isLoading = true;
      this.cmsService
        .getCmsRecapComponents()
        .pipe(take(1))
        .subscribe(response => {
          if (response) {
            this.isLoading = false;
            this.cmsService.recapCms.set(response);
            this.cmsData = response.data;
            this.previousEvents = response.data.RecapPastEvents.pastEvents;
          }
        })
    }
  }

  /**
   * The function `initializeEventCardInterval` sets up an interval that updates the selected index of
   * previous events every 5 seconds.
   */
  private initializeEventCardInterval(): void {
    this.intervalId = setInterval(() => {
      this.selectedIndex = (this.selectedIndex + 1) % this.previousEvents.length;
    }, 3000);
  }

  /**
   * The function `redirectToSupplierPage` navigates to the suppliers page using the Angular router.
   */
  public redirectToSupplierPage(): void {
    this.router.navigate(['/suppliers']);
  }
}
