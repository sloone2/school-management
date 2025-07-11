import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private renderer: Renderer2;
  base = '';
  page = '';
  last = '';
  public toogleSidebar: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('sidebarPosition') === 'true' ? 'true' : 'false'
  );
  public themeColors: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('themeColor') || 'light-mode'
  );
  constructor(rendererFactory: RendererFactory2,private common: CommonService) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });
  }
  public openSidebar(): void {
    // to set sidebar position app component html using "menu-opened" class
    if (localStorage.getItem('sidebarPosition')) {
      localStorage.removeItem('sidebarPosition');
      this.toogleSidebar.next('false');
    } else {
      localStorage.setItem('sidebarPosition', 'true');
      this.toogleSidebar.next('true');
    }
  }

  public closeSidebar(): void {
    // hide sidebar
    this.toogleSidebar.next('false');
    localStorage.removeItem('sidebarPosition');
  }


  public changeThemeColor(themeColors: string): void {
    this.themeColors.next(themeColors);
    localStorage.setItem('themeColor', themeColors);
    this.renderer.setAttribute(
      document.documentElement,
      'class', 
      themeColors === 'light-mode'
        ? 'light-mode'
        : 'dark-mode'
    );
  }
}
