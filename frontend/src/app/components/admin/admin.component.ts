import { Component } from '@angular/core';
import { NavigationStart, Router, Event as RouterEvent } from '@angular/router';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    standalone: false
})
export class AdminComponent {
  public routes = routes;
  last = '';




  constructor(private router: Router) {
    this.updateLastFromUrl(this.router.url);
    this.router.events.subscribe((data: RouterEvent) => {
      if (data instanceof NavigationStart) {
        this.updateLastFromUrl(data.url);
      }
    });
  }

  private updateLastFromUrl(url: string): void {
    const parts = url.split('/');
    const lastPart = parts[2]?.replace('instructor-', '').trim();

    if (lastPart === 'profile') {
      this.last = 'My Profile';
    } else if (lastPart === 'course') {
      this.last = 'My Courses';
    } else if (lastPart === 'chat') {
      this.last = 'Messages';
    } else if (lastPart === 'quiz-attempts'){
      this.last = 'My Quiz Attempts';
    }
    else if (lastPart === 'qa'){
      this.last = 'Question & Answer';
    }
    else if (lastPart === 'quiz-results'){
      this.last = 'Quiz Results';
    }
    else if (lastPart === 'students-grid'){
      this.last = 'Students Grid';
    }
    else if (lastPart === 'students-list'){
      this.last = 'Students List';
    }
    else if (lastPart === 'quiz-questions'){
      this.last = 'Quiz Questions';
    }


    else {
      this.last = lastPart;
    }
  }
  }
