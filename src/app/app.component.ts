import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Generic-CRUD-Example';

  currentMode: 'Default UI' | 'Bootstrap UI' | 'Ionic UI' = 'Default UI';

  constructor(private readonly router: Router) {
    this.setCurrentMode(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.setCurrentMode(event.urlAfterRedirects);
      });
  }

  private setCurrentMode(url: string): void {
    if (url.startsWith('/bootstrap')) {
      this.currentMode = 'Bootstrap UI';
      return;
    }

    if (url.startsWith('/ionic')) {
      this.currentMode = 'Ionic UI';
      return;
    }

    this.currentMode = 'Default UI';
  }
}
