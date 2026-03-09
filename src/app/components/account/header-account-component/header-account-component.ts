import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RegisterFormComponent } from '../register-form-component/register-form-component';
import { MatDialog } from '@angular/material/dialog';
import { CmsHeaderComponentsData } from '../../../models/header/cms-header-components.model';
import { Router } from '@angular/router';
import { UrlPages } from '../../../shared/constants/page-urls.constants';

@Component({
  selector: 'app-header-account-component',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './header-account-component.html',
  styleUrl: './header-account-component.scss',
})
export class HeaderAccountComponent {

  @Input() public cmsData: CmsHeaderComponentsData | null = null;
  @Output() public toggleDrawer: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor (
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) {}

  /**
   * The `openForm` function opens a dialog window with the `RegisterFormComponent` and passes data
   * including a registration URL.
   */
  public openForm(): void {
    this.dialog.open(RegisterFormComponent, {
      width: '800px',
      height: '90%',
      data: {
        registrarionUrl: this.cmsData?.HeaderRegistrarionLink

      }
    });
  }

  /**
   * The function `navigateToMyReservation` navigates to the "My Reservation" page using the Angular
   * router.
   */
  public navigateToMyReservation(): void {
    this.toggleNavDrawer();
    this.router.navigate([`/${UrlPages.MY_RESERVATION}`]);
  }

  private toggleNavDrawer(): void {
    this.toggleDrawer.emit(true);
  }
}
