import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RecapComponent } from '../../home/recap-component/recap-component';
import { CmsReservationComponentsData } from '../../../models/reservation/cms-reservation-components.model';
import { CmsService } from '../../../core/services/cms-service/cms-service';
import { take } from 'rxjs';
import { LoaderComponent } from '../../shared/loader-component/loader-component';

@Component({
  selector: 'app-reservation-component',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    RecapComponent,
    LoaderComponent
  ],
  templateUrl: './reservation-component.html',
  styleUrl: './reservation-component.scss',
})
export class ReservationComponent implements OnInit{

  @ViewChild('pdfContent') private readonly pdfContent!: ElementRef;

  public myReservationForm!: FormGroup;
  public shouldShowInvoice: boolean = false;
  public cmsData: CmsReservationComponentsData | null = null;
  public isLoading: boolean = false;

  constructor(
    private readonly cmsService: CmsService
  ) {}

  ngOnInit(): void {
    this.initializeFormGroup();
    this.initializeCmsData();
  }

  /**
   * The function `initializeFormGroup` creates a new FormGroup with a FormControl for a reservation
   * field.
   */
  private initializeFormGroup(): void {
    this.myReservationForm = new FormGroup({
      reservation: new FormControl('')
    });
  }

  /**
   * The `initializeCmsData` function sets the `cmsData` property by fetching reservation components
   * data from a CMS service if it is not already available.
   */
  private initializeCmsData(): void {
    this.cmsData = this.cmsService.reservationCms()?.data ?? null;

    if (this.cmsData === null) {
      this.isLoading = true;
      this.cmsService
        .getCmsReservationComponents()
        .pipe(take(1))
        .subscribe(response => {
          if (response) {
            this.isLoading = false;
            this.cmsService.reservationCms.set(response);
            this.cmsData = response.data;
          }
        });
    }
  }

  /**
   * The function submitReservation sets shouldShowInvoice to true if the reservationId is not empty.
   */
  public submitReservation(): void {
    const reservationId: string = this.myReservationForm.value;
    if (reservationId !== '') {
      this.shouldShowInvoice = true;
    }
  }
}
