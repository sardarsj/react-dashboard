// types/types.ts

export interface ChartData {
  browser: string;
  visitors: number;
  fill: string;
}

export interface Widget {
  id: number;
  name: string;
  chartType: 'pie' | 'stackedBar' | ''; // Add 'pie' and 'stackedBar' as possible values
  chartData: ChartData[] | string;
}

export interface CategoryType {
  id: number;
  name: string;
  widgets: Widget[];
}
