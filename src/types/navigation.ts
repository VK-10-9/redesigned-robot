export interface NavigationSubItem {
  title: string;
  href: string;
}

export interface NavigationItem {
  title: string;
  href?: string;
  description?: string;
  items?: NavigationSubItem[];
}

export interface FeatureCard {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

export interface Stat {
  label: string;
  value: string;
}
