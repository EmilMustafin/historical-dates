export interface Episode {
  date: string;
  description: string;
}

export interface HistoricalDates {
  title: string;
  episodes: Episode[];
}
