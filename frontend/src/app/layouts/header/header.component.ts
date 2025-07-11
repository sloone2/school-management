import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/shared/service/common/common.service';
import { DataService } from 'src/app/shared/service/data/data.service';
import { SidebarService } from 'src/app/shared/service/sidebar/sidebar.service';
import { routes } from 'src/app/shared/service/routes/routes';
import { SidebarItem } from 'src/app/models/model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent {
  public routes = routes;
  @ViewChild('stickyMenu')
  menuElement!: ElementRef;
  headerpage = false;
  sticky = false;
  elementPosition!: number;
  public headerClass = true;
  isHovered=false;
  isFixed = false;
  isOpened = false;
  isDropdownOpen=false;
  isDropdownOpen1: number | null = null;
  base = '';
  page = '';
  last = '';
  headerMenuactive = '';
  openDropdownIndex: number | null = null;
  themeColor = 'light-mode';
  islight=true;
  isdark=false;
  public showDark = false;

  public white_bg = false;

  sidebar: SidebarItem[];
  constructor(
    private common: CommonService,
    private data: DataService,
    public sidebarService: SidebarService,
    private renderer: Renderer2, private el: ElementRef
  ) {
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });
    this.sidebar = this.data.sideBar;

    this.sidebarService.themeColors.subscribe((res: string) => {
      this.themeColor = res;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Add a fixed class when the scroll position is greater than 50px
    this.isFixed = window.pageYOffset > 40;
  }
   htmlElement = this.el.nativeElement.ownerDocument.documentElement;
  public toggleSidebar(): void {
    this.sidebarService.openSidebar();
    this.isOpened=!this.isOpened; 
    if(this.isOpened===true){
    this.renderer.addClass(this.htmlElement,'menu-opened')
    }
    else{
      this.renderer.removeClass(this.htmlElement,'menu-opened')
    }
  }
  public hideSidebar(): void {
    this.sidebarService.closeSidebar();
    this.isOpened=false;
    this.renderer.removeClass(this.htmlElement,'menu-opened')
  }
  themeMode: string = 'light_mode';
  isDarkMode: boolean = false;
  // toggleMode(isDark: boolean) {
  //   this.isDarkMode = isDark;
  //   this.applyTheme();
  // }
  openSubMenu():void{
    this.isDropdownOpen=!this.isDropdownOpen;
    this.openDropdownIndex=null;
  }
  openSubMenu1(index: number):void{
    this.isDropdownOpen1=this.isDropdownOpen1 === index? null :index;
  }
  toggleSubMenu(index: number): void {
    // If the clicked menu is already open, close it
    this.openDropdownIndex = this.openDropdownIndex === index ? null : index;
    this.isDropdownOpen=false;
  }
  switchTheme():void{
    this.isdark=!this.isdark;
    this.islight=!this.islight;
  }
 ngOnInit(): void {
  const themeColor = localStorage.getItem('themeColor') || 'light-mode';
  this.sidebarService.changeThemeColor(themeColor);
}
 
}
