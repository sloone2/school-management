import { Component, HostListener } from '@angular/core';
import { NavigationStart, Router, Event as RouterEvent } from '@angular/router';
import { CommonService } from '../shared/service/common/common.service';
import { SidebarService } from '../shared/service/sidebar/sidebar.service';
import { url } from '../models/model';

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styleUrls: ['./components.component.scss'],
    standalone: false
})
export class ComponentsComponent {
  showMiniSidebar = false;
  base = '';
  page = '';
  last = '';
  public isuserHeader!: boolean;
  public themeMode: string = '';
  public darkTheme = false;
  public isAdminHeader!: boolean;
  public showDark = false;
  public mainFooter!: boolean;
  public routeStatus!: string;
  public routeStatusSub!: string;
  renderer: any;
  showBackToTop: boolean = false;
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Show the button after scrolling 200px down
    this.showBackToTop = window.scrollY > 200;

  }

  // Scroll to the top of the page
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
  }

  constructor(
    private Router: Router,
    private sidebar: SidebarService,
    private common: CommonService,
    public sidebarService: SidebarService,
  ) {
    this.common.base.subscribe((res: string) => {
      this.base = res;
      this.scrollToTop();
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
      this.scrollToTop();
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });

    this.Router.events.subscribe((data: RouterEvent) => {
      if (data instanceof NavigationStart) {
        this.setRouting(data);
      }
    });

    this.setRouting(this.Router);

    this.common.isAdminHeader.subscribe((res: boolean) => {
      this.isAdminHeader = res;
    });
    this.common.isuserHeader.subscribe((res: boolean) => {
      this.isuserHeader = res;
    });
    this.common.mainFooter.subscribe((res: boolean) => {
      this.mainFooter = res;
    });
    this.sidebar.toogleSidebar.subscribe((res: string) => {
      if (res == 'true') {
        this.showMiniSidebar = true;
      } else {
        this.showMiniSidebar = false;
      }
    });
    
  }

  private setRouting(data: url): void {
    this.routeStatus = data.url.split('/')[1];
    this.routeStatusSub = data.url.split('/')[2];

    this.common.base.next(data.url.split('/')[1]);
    this.common.page.next(data.url.split('/')[2]);
    this.common.last.next(data.url.split('/')[3]);

    if (
      this.routeStatus == 'index' ||
      this.routeStatus == 'index-two' ||
      this.routeStatus == 'index-three' ||
      this.routeStatus == 'index-four'||
      this.routeStatus == 'index-five'||
      this.routeStatus == 'index-six'
    ) {
      this.common.isuserHeader.next(true);
      this.common.isAdminHeader.next(false);
      this.common.mainFooter.next(false);
    } else {
      this.common.mainFooter.next(true);
    }
    if (
      this.routeStatus == 'instructor' ||
      this.routeStatus == 'student'
    ) {
      this.common.isuserHeader.next(false);
      this.common.isAdminHeader.next(true);
    }else{
      this.common.isuserHeader.next(true);
      this.common.isAdminHeader.next(false);
    }
  }
  ngOnDestroy(): void {
    this.sidebarService.changeThemeColor('light-mode');
  } 
}
