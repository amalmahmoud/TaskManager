export interface MenuItemModel {
  id: string;
  label: string;
  icon: string;
}

export const MenuItem: MenuItemModel[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'assets/icons/dashboard.png' },
  { id: 'tasks', label: 'Tasks', icon: 'assets/icons/check.png' },
  { id: 'calendar', label: 'Calendar', icon: 'assets/icons/calendar.png' },
  { id: 'analytics', label: 'Analytics', icon: 'assets/icons/analytics.png' },
  { id: 'team', label: 'Team', icon: 'assets/icons/team.png' },
  { id: 'settings', label: 'Settings', icon: 'assets/icons/settings.png' },
];
