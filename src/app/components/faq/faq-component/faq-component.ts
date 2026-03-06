import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CmsService } from '../../../core/cms-service';
import { take } from 'rxjs';
import { CmsFaqComponentsData, FaqContent } from '../../../models/faq/cms-faq-component.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { LoaderComponent } from '../../shared/loader-component/loader-component';

@Component({
  selector: 'app-faq-component',
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    LoaderComponent
  ],
  templateUrl: './faq-component.html',
  styleUrl: './faq-component.scss',
})
export class FaqComponent implements OnInit{

  public isLoading: boolean = false;
  public cmsData: CmsFaqComponentsData | null = null;
  public frequentlyAskedQuestions: FaqContent[] = [];
  public step: WritableSignal<number> = signal<number>(0);

  constructor(
    private readonly cmsService: CmsService
  ) {}

  ngOnInit(): void {
    this.initializeCmsData();
  }

  /**
   * The function `initializeCmsData` initializes CMS data for frequently asked questions, handling
   * loading and retrieval from a service if necessary.
   */
  private initializeCmsData(): void {
    this.cmsData = this.cmsService.faqCms()?.data ?? null;
    this.frequentlyAskedQuestions = this.cmsData?.FaqFrequentlyAskedQuestions?.frequentlyAsked ?? [];

    if (this.cmsData === null) {
      this.isLoading = true;
      this.cmsService
        .getCmsFaqComponents()
        .pipe(take(1))
        .subscribe(response => {
          if (response) {
            this.isLoading = false;
            this.cmsService.faqCms.set(response);
            this.cmsData = response.data;
            this.frequentlyAskedQuestions = response.data.FaqFrequentlyAskedQuestions.frequentlyAsked;
          }
        });
    }
  }

  /**
   * The function `setStep` sets the value of a step variable to the provided index.
   * @param {number} index - The `index` parameter in the `setStep` function is a number that
   * represents the step to be set.
   */
  public setStep(index: number) {
    this.step.set(index);
  }
}
