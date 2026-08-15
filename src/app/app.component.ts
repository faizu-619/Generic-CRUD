import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Generic-CRUD-Example';

  currentMode: 'Default UI' | 'Bootstrap UI' = 'Default UI';

  constructor(private readonly router: Router) {
    this.setCurrentMode(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.setCurrentMode(event.urlAfterRedirects);
      });
  }

  private setCurrentMode(url: string): void {
    this.currentMode = url.startsWith('/bootstrap') ? 'Bootstrap UI' : 'Default UI';
  }
}
