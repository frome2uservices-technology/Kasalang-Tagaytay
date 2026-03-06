import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './components/header/toolbar-component/toolbar-component';
import { FooterComponent } from './components/footer/footer-component/footer-component';
import { RouteFadeAnimation } from './animations/route-animation';
import { AppConfigService } from './core/config.service';
import { CommonModule } from '@angular/common';
import { MaintenanceComponent } from './components/maintenance-component/maintenance-component';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    ToolbarComponent,
    FooterComponent,
    MaintenanceComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  animations: [
    RouteFadeAnimation
  ]
})
export class App {
  protected readonly title = signal('kt-web');
  public shouldShowMaintenancePage: boolean = false;

  constructor (
    private readonly config: AppConfigService
  ) {
    this.shouldShowMaintenancePage = this.config.webMaintenanceConfig;
  }

  public prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
