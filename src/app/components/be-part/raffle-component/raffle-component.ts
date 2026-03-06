import { Component, OnDestroy, OnInit } from '@angular/core';
import { CmsService } from '../../../core/cms-service';
import { CmsRaffleComponents, CmsRaffleComponentsData, PrizeInfo } from '../../../models/be-part/cms-raffle-component.model';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-raffle-component',
  imports: [
    CommonModule,
    MatTabsModule
  ],
  templateUrl: './raffle-component.html',
  styleUrl: './raffle-component.scss',
})
export class RaffleComponent implements OnInit, OnDestroy {

  public isLoading: boolean = false;
  public cmsData: CmsRaffleComponentsData | null = null;
  public rafflePrizes: PrizeInfo[] = [];
  public selectedIndex: number = 0;
  private selectedIndexInterval: number = 0;

  constructor(
    private readonly cmsService: CmsService
  ) {}

  ngOnInit(): void {
    this.initializeCmsData();
  }

  ngOnDestroy(): void {
    clearInterval(this.selectedIndexInterval);
  }

  /**
   * The `initializeCmsData` function sets the CMS data for a raffle component, fetching it from the
   * CMS service if not already available.
   */
  private initializeCmsData(): void {
    this.cmsData = this.cmsService.raffleComponent()?.data ?? null;
    this.populatePrizesData(this.cmsData);

    if (this.cmsData === null) {
      this.isLoading = true;
      this.cmsService
        .getCmsRaffleComponents()
        .pipe(take(1))
        .subscribe(response => {
          if (response) {
            this.isLoading = false;
            this.cmsService.raffleComponent.set(response);
            this.cmsData = response.data;
            this.populatePrizesData(response.data);
          }
        });
    }
  }

  private populatePrizesData(cmsData: CmsRaffleComponentsData | null): void {
    if (cmsData) {
      this.rafflePrizes = cmsData.RafflePrizes.prizes;
    }

    this.initializeEventCardInterval();
  }

  private initializeEventCardInterval(): void {
    if (this.rafflePrizes.length > 0) {
      this.selectedIndexInterval = setInterval(() => {
        this.selectedIndex = (this.selectedIndex + 1) % this.rafflePrizes.length;
      }, 6000);
    }
  }
}
