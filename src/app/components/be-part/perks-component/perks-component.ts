import { Component, OnDestroy, OnInit } from '@angular/core';
import { CmsService } from '../../../core/cms-service';
import { CmsPerksComponentsData, PerkInfo } from '../../../models/be-part/cms-perks-component.model';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from '../../shared/loader-component/loader-component';

@Component({
  selector: 'app-perks-component',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    LoaderComponent
  ],
  templateUrl: './perks-component.html',
  styleUrl: './perks-component.scss',
})
export class PerksComponent implements OnInit, OnDestroy {

  public isLoading: boolean = false;
  public cmsData: CmsPerksComponentsData | null = null;
  public perks: PerkInfo[] = [];
  public perksFeaturedImages: string[] = [];
  public currentImageIndex: number = 0;
  private switchInterval: number = 0;

  constructor(
    private readonly cmsService: CmsService
  ) {}

  ngOnInit(): void {
    this.intializeCmsData();
  }

  ngOnDestroy(): void {
    clearInterval(this.switchInterval);
  }

  private intializeCmsData(): void {
    this.cmsData = this.cmsService.perksComponent()?.data ?? null;
    this.populatePerksData(this.cmsData);

    if (this.cmsData === null) {
      this.isLoading = true;
      this.cmsService
        .getCmsPerksComponents()
        .pipe(take(1))
        .subscribe(response => {
          if (response) {
            this.isLoading = false;
            this.cmsData = response.data;
            this.cmsService.perksComponent.set(response);
            this.populatePerksData(response.data);
          }
        });
    }
  }

  private populatePerksData(cmsData: CmsPerksComponentsData | null): void {
    this.perks = cmsData?.PerkPerkList?.perks ?? [];
    this.perksFeaturedImages = cmsData?.PerkFeaturedImages?.perkFeaturedImages ?? [];
    this.initializeImageSwitch();
  }

  private initializeImageSwitch(): void {
    if (this.perksFeaturedImages.length > 0) {
      this.switchInterval = setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.perksFeaturedImages.length;
      }, 6000);
    }
  }
}
