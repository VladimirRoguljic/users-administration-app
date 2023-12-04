import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'users-administration-app';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const isDashboardRoute = this.router.url.endsWith('/dashboard');
        this.updateBackgroundColor(isDashboardRoute);
      });
  }

  private updateBackgroundColor(isDashboardRoute: boolean): void {
    if (isDashboardRoute) {
      document.body.style.backgroundColor = '#ECECEC';
    } else {
      document.body.style.backgroundColor = '';
    }
  }
}
