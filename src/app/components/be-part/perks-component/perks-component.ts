import { Component, OnDestroy, OnInit } from '@angular/core';
import { CmsService } from '../../../core/services/cms-service/cms-service';
import { CmsPerksComponentsData, PerkInfo } from '../../../models/be-part/cms-perks-component.model';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from '../../shared/loader-component/loader-component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterFormComponent } from '../../account/register-form-component/register-form-component';

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
    private readonly cmsService: CmsService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.intializeCmsData();
  }

  ngOnDestroy(): void {
    clearInterval(this.switchInterval);
  }

  /**
   * The function `initializeCmsData` initializes the CMS data for perks components, populates the
   * perks data, and fetches the data if it is not already available.
   */
  private intializeCmsData(): void {
    this.cmsData = this.cmsService.perksCms()?.data ?? null;
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
            this.cmsService.perksCms.set(response);
            this.populatePerksData(response.data);
          }
        });
    }
  }

  /**
   * The function `populatePerksData` populates perks data and featured images from a CMS data object
   * and initializes an image switch.
   * @param {CmsPerksComponentsData | null} cmsData - The `cmsData` parameter is of type
   * `CmsPerksComponentsData | null`, which means it can either be an object of type
   * `CmsPerksComponentsData` or `null`.
   */
  private populatePerksData(cmsData: CmsPerksComponentsData | null): void {
    this.perks = cmsData?.PerkPerkList?.perks ?? [];
    this.perksFeaturedImages = cmsData?.PerkFeaturedImages?.perkFeaturedImages ?? [];
    this.initializeImageSwitch();
  }

  /**
   * The function `initializeImageSwitch` sets up an interval to switch between featured images at a
   * specified time interval.
   */
  private initializeImageSwitch(): void {
    if (this.perksFeaturedImages.length > 0) {
      this.switchInterval = setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.perksFeaturedImages.length;
      }, 5000);
    }
  }

  public openForm(): void {
    this.dialog.open(RegisterFormComponent, {
      width: '800px',
      height: '90%',
      data: {
        registrarionUrl: this.cmsData?.PerkRegistrationLink ?? ''
      }
    });
  }
}
