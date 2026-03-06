import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CmsService } from '../../../core/cms-service';
import { take } from 'rxjs';
import { CmsExperienceComponentsData } from '../../../models/about/cms-experience-component.model';
import { LoaderComponent } from '../../shared/loader-component/loader-component';

@Component({
  selector: 'app-experience-component',
  imports: [
    CommonModule,
    LoaderComponent
  ],
  templateUrl: './experience-component.html',
  styleUrl: './experience-component.scss',
})
export class ExperienceComponent implements OnInit {

  public isLoading: boolean = false;
  public shouldShowSupplierOffer: boolean = true;
  public cmsData: CmsExperienceComponentsData | null = null;

  constructor (
    private readonly router: Router,
    private readonly cmsService: CmsService
  ) {}

  ngOnInit(): void {
    this.showSupplierOffer();
    this.initializeCmsData();
  }

  /**
   * The function `initializeCmsData` sets the `cmsData` property by fetching data from a CMS service
   * if it is not already initialized.
   */
  private initializeCmsData(): void {
    this.cmsData = this.cmsService.experienceCms()?.data ?? null;
    if (this.cmsData === null) {
      this.isLoading = true;
      this.cmsService
        .getCmsExperienceComponents()
        .pipe(take(1))
        .subscribe(response => {
          if (response) {
            this.isLoading = false;
            this.cmsService.experienceCms.set(response);
            this.cmsData = response.data;
          }
        });
    }
  }

  /**
   * The function `showSupplierOffer` sets a boolean flag based on the current path in a TypeScript
   * class.
   */
  private showSupplierOffer(): void {
    const path = globalThis.location.pathname;
    this.shouldShowSupplierOffer = path.includes('/about-expo');
  }

  /**
   * The function `navigateSupplierPage` in TypeScript navigates to the suppliers page using the
   * Angular router.
   */
  public navigateSupplierPage(): void {
    this.router.navigate(['/suppliers']);
  }
}
