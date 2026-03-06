import { Component, OnInit, signal } from '@angular/core';
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

  public isLoading: boolean = true;
  public cmsData: CmsFaqComponentsData | null = null;
  public frequentlyAskedQuestions: FaqContent[] = [];
  public step = signal(0);

  constructor(
    private readonly cmsService: CmsService
  ) {}

  ngOnInit(): void {
    this.initializeCmsData();
  }

  private initializeCmsData(): void {
    this.isLoading = true;
    this.cmsService
      .getCmsFaqComponents()
      .pipe(take(1))
      .subscribe(response => {
        if (response) {
          this.isLoading = false;
          this.cmsData = response.data;
          this.frequentlyAskedQuestions = response.data.FaqFrequentlyAskedQuestions.frequentlyAsked;
        }
      });
  }

  public setStep(index: number) {
    this.step.set(index);
  }
}
