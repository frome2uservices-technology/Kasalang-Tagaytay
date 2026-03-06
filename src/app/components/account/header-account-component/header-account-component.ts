import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RegisterFormComponent } from '../register-form-component/register-form-component';
import { MatDialog } from '@angular/material/dialog';
import { CmsHeaderComponentsData } from '../../../models/header/cms-header-components.model';

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

  constructor (
    private readonly dialog: MatDialog
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
}
