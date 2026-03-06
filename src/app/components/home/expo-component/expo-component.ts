import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RegisterFormComponent } from '../../account/register-form-component/register-form-component';
import { MatDialog } from '@angular/material/dialog';
import { CmsService } from '../../../core/cms-service';
import { take } from 'rxjs';
import { CmsExpoComponentsData } from '../../../models/home/cms-expo-components.model';
import { LoaderComponent } from '../../shared/loader-component/loader-component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expo-component',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    LoaderComponent
  ],
  templateUrl: './expo-component.html',
  styleUrl: './expo-component.scss',
})
export class ExpoComponent implements OnInit {

  public cmsData: CmsExpoComponentsData | null = null;
  public isLoading: boolean = true;
  
  constructor (
    private readonly dialog: MatDialog,
    private readonly cmsService: CmsService
  ) {} 

  ngOnInit(): void {
    this.initializeCmsData();
  }
  
  /**
   * The function `initializeCmsData` retrieves CMS Expo components data using a service and assigns it
   * to the `cmsData` property.
   */
  private initializeCmsData(): void {
    this.cmsService
      .getCmsExpoComponents()
      .pipe(take(1))
      .subscribe(response => {
        this.cmsData = response.data;
        this.isLoading = false;
      });
  }

  /**
   * The `openForm` function opens a dialog window displaying the `RegisterFormComponent` with
   * specified width and height.
   */
  public openForm(): void {
    this.dialog.open(RegisterFormComponent, {
      width: '800px',
      height: '90%'
    });
  }
}
