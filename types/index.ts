export type Theme = 'light' | 'dark';
export type ViewMode = 'grid' | 'list';

export interface UserPreferences {
  theme: Theme;
  viewMode: ViewMode;
}
