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

  private initializeCmsData(): void {
    this.isLoading = true;
    this.cmsService
      .getCmsExperienceComponents()
      .pipe(take(1))
      .subscribe(response => {
        if (response) {
          this.isLoading = false;
          this.cmsData = response.data;
        }
      });
  }

  private showSupplierOffer(): void {
    const path = globalThis.location.pathname;
    this.shouldShowSupplierOffer = path.includes('/about-expo');
  }

  public navigateSupplierPage(): void {
    this.router.navigate(['/suppliers']);
  }
}
