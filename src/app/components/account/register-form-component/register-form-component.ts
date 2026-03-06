import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register-form-component',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './register-form-component.html',
  styleUrl: './register-form-component.scss',
})
export class RegisterFormComponent implements OnInit {
  public formUrl!: SafeResourceUrl;
  public isLoading: boolean = true;

  constructor (
    private readonly sanitizer: DomSanitizer,
    private readonly dialogRef: MatDialogRef<RegisterFormComponent>
  ) {}

  ngOnInit(): void {
    const url = 'https://docs.google.com/forms/d/1ikt4f7OYs3cRZNIVgxxqBDu2dED0vI80_5pbNWnR_FI/viewform?edit_requested=true';
    this.formUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public close() {
    this.dialogRef.close();
  }

  public onLoad() {
    this.isLoading = false;
  }
}
