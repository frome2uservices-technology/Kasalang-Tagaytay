import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationTab } from '../../../models/header/navigation-tab.model';
import { filter, Subscription } from 'rxjs';
import { CmsHeaderComponentsData } from '../../../models/header/cms-header-components.model';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderAccountComponent } from '../../account/header-account-component/header-account-component';

@Component({
  selector: 'app-navigation-component',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    HeaderAccountComponent
  ],
  templateUrl: './navigation-component.html',
  styleUrl: './navigation-component.scss',
})
export class NavigationComponent implements OnDestroy, OnChanges {

  @Input() public cmsData: CmsHeaderComponentsData | null = null;
  @Input() public countdownNotice: string = '';

  // SUBSCRIPTIONS
  private pathObserveSubs: Subscription = new Subscription();
  
  public selectedTab: string = '';
  public navigationTabs: NavigationTab[] = [];
  public showMenu: boolean = false;

  constructor (
    private readonly router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.cmsData) {
      this.navigationTabs = this.cmsData.HeaderNavigationTabs.navigationTabs;
      this.loadCurrentSelectedTabOnRefresh();
      this.loadSelectedTab();
    }
  }

  ngOnDestroy(): void {
    this.pathObserveSubs.unsubscribe();
  }

  public selectTab(tab: NavigationTab): void {
    this.selectedTab = tab.tabName;
    this.navigatePage(tab);
  }

  private navigatePage(tab: NavigationTab): void {
    this.router.navigate([tab.tabPathUrl]);
  }

  private loadSelectedTab(): void {
    this.pathObserveSubs = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const currentTabSelected: NavigationTab | null = this.navigationTabs?.find(option => option.tabPathUrl.includes(event.url)) ?? null;
        if (currentTabSelected) {
          this.selectTab(currentTabSelected);
        }
        else {
          this.selectTab(this.navigationTabs[0]);
        }
      });
  }

  private loadCurrentSelectedTabOnRefresh(): void {
    const currentTabUrl: string = globalThis.location.pathname;
    const currentTabName: string = this.navigationTabs.find(tab => {
      const currentTabPath: string = tab.tabPathUrl.split("/")[1];
      return currentTabUrl.includes(currentTabPath) && currentTabPath !== '';
    })?.tabName ?? '';
    
    if (currentTabName === '') {
      this.navigatePage(this.navigationTabs[0]);
      this.selectedTab = this.navigationTabs[0].tabName;
    } else {
      this.selectedTab = currentTabName;
    }
  }
}
