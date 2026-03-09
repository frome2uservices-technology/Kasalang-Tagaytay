import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationTab } from '../../../models/header/navigation-tab.model';
import { filter, Subscription } from 'rxjs';
import { CmsHeaderComponentsData } from '../../../models/header/cms-header-components.model';
import { MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderAccountComponent } from '../../account/header-account-component/header-account-component';
import { UrlPages } from '../../../shared/constants/page-urls.constants';

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
export class NavigationComponent implements OnDestroy, OnInit {

  @Input() public cmsData: CmsHeaderComponentsData | null = null;
  @Input() public countdownNotice: string = '';
  @ViewChild('drawer') private readonly navDrawer!: MatDrawer;

  // SUBSCRIPTIONS
  private pathObserveSubs: Subscription = new Subscription();
  
  public selectedTab: string = '';
  public navigationTabs: NavigationTab[] = [];
  public showMenu: boolean = false;

  constructor (
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.navigationTabs = this.cmsData?.HeaderNavigationTabs.navigationTabs ?? [];
    this.loadCurrentSelectedTabOnRefresh();
    this.loadSelectedTab();
  }

  ngOnDestroy(): void {
    this.pathObserveSubs.unsubscribe();
  }

  /**
   * The function `selectTab` sets the selected tab and navigates to the corresponding page in a
   * TypeScript class.
   * @param {NavigationTab} tab - The `tab` parameter in the `selectTab` function is of type
   * `NavigationTab`, which likely contains information about a specific tab in a navigation menu or
   * bar. The function sets the `selectedTab` property to the `tabName` of the provided `NavigationTab`
   * object and then calls
   */
  public selectTab(tab: NavigationTab): void {
    this.selectedTab = tab.tabName;
    this.navigatePage(tab);
  }

  /**
   * The function `navigatePage` navigates to a specified tab using the Angular router.
   * @param {NavigationTab} tab - The `tab` parameter is of type `NavigationTab`, which likely contains
   * information about a specific tab in a navigation menu. It seems to have a property `tabPathUrl`
   * that holds the URL path associated with that tab.
   */
  private navigatePage(tab: NavigationTab): void {
    this.router.navigate([tab.tabPathUrl]);
  }

  /**
   * The `loadSelectedTab` function subscribes to router events and selects the appropriate navigation
   * tab based on the current URL.
   */
  private loadSelectedTab(): void {
    this.pathObserveSubs = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const currentTabSelected: NavigationTab | null = this.navigationTabs?.find(option => option.tabPathUrl.includes(event.url)) ?? null;

        if (currentTabSelected) {
          this.selectTab(currentTabSelected);
        }
        else {
          const isMyReservation: boolean = event.url.includes(UrlPages.MY_RESERVATION);
          if (!isMyReservation) {
            this.selectTab(this.navigationTabs[0]);
          }
        }
      });
  }

  /**
   * The function `loadCurrentSelectedTabOnRefresh` determines the current selected tab based on the
   * URL path and updates the selected tab accordingly.
   */
  private loadCurrentSelectedTabOnRefresh(): void {
    const currentUrl: string = globalThis.location.pathname;
    const currentTabName: string = this.navigationTabs.find(tab => {
      const currentTabPath: string = tab.tabPathUrl.split("/")[1];
      return currentUrl.includes(currentTabPath) && currentTabPath !== '';
    })?.tabName ?? '';

    if (currentUrl.includes('my-reservation')) {
      return;
    }

    if (currentTabName === '') {
      this.navigatePage(this.navigationTabs[0]);
      this.selectedTab = this.navigationTabs[0].tabName;
    } else {
      this.selectedTab = currentTabName;
    }
  }

  /**
   * The function `toggleDrawerFromChild` toggles the visibility of a menu drawer based on a boolean
   * input.
   * @param {boolean} shouldToggleDrawer - The parameter `shouldToggleDrawer` is a boolean value that
   * indicates whether the drawer should be toggled or not. If `shouldToggleDrawer` is `true`, the
   * drawer will be toggled open or closed based on the current state.
   */
  public toggleDrawerFromChild(shouldToggleDrawer: boolean): void {
    if (shouldToggleDrawer) {
      this.selectedTab = this.navigationTabs[0].tabName;
      this.showMenu = !this.showMenu;
      this.navDrawer.toggle();
    }
  }
}
