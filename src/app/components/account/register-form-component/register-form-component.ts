import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderComponent } from '../../shared/loader-component/loader-component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-form-component',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    LoaderComponent
  ],
  templateUrl: './register-form-component.html',
  styleUrl: './register-form-component.scss',
})
export class RegisterFormComponent implements OnInit {
  public formUrl!: SafeResourceUrl;
  public isLoading: boolean = true;

  constructor (
    @Inject(MAT_DIALOG_DATA) private readonly data: any,
    private readonly sanitizer: DomSanitizer,
    private readonly dialogRef: MatDialogRef<RegisterFormComponent>
  ) {}

  ngOnInit(): void {
    const url = this.data?.registrarionUrl ?? '';
    this.formUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  /**
   * The close function closes the current dialog window.
   */
  public close() {
    this.dialogRef.close();
  }

  /**
   * The `onLoad` function sets the `isLoading` property to false when the component is loaded.
   */
  public onLoad() {
    const interval: number = setInterval(() => {
      this.isLoading = false;
      clearInterval(interval);
    }, 1500);
  }
}
