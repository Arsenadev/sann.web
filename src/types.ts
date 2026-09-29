export interface SocialLink {
  id: string;
  name: string;
  username: string;
  url: string;
  description: string;
  badge: string;
  brandColor: string;
  bgAccent: string;
  textColor: string;
  iconName: 'tiktok' | 'whatsapp' | 'email' | 'saweria' | 'telegram' | 'instagram';
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
  days: ContributionDay[];
}
