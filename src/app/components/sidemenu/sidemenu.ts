import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, output, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-side-menu',
  templateUrl: './sidemenu.html',
  standalone: true,
  imports: [MenuModule,Button,CommonModule],
})
export class SideMenuComponent implements OnInit {
  private router = inject(Router);
  menuItems: any[] = [];
  activeTab = signal('dashboard');

  ngOnInit() {
    this.menuItems = [
      { id: 'dashboard', label: 'Dashboard', icon: 'assets/icons/dashboard.png' },
      { id: 'tasks', label: 'Tasks', icon: 'assets/icons/check.png' },
      { id: 'calendar', label: 'Calendar', icon: 'assets/icons/calender.png' },
      { id: 'analytics', label: 'Analytics', icon: 'assets/icons/analytics.png' },
      { id: 'team', label: 'Team', icon: 'assets/icons/team.png' },
      { id: 'settings', label: 'Settings', icon: 'assets/icons/settings.png' },
    ];
  }

 selectTab(id: string) {
    this.activeTab.set(id);
    this.router.navigate([`/${id}`]);
  }
}
