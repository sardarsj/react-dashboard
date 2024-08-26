// types/types.ts

export interface ChartData {
  browser: string;
  visitors: number;
  fill: string;
}

export interface Widget {
  id: number;
  name: string;
  chartType: 'pie' | 'stackedBar' | 'doughnut'; // Add 'pie' and 'stackedBar' as possible values
  chartData: any[];
}

export interface CategoryType {
  id: number;
  name: string;
  widgets: Widget[];
}
