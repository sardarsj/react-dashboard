export interface ChartData {
  browser: string;
  visitors: number;
  fill: string;
}

export interface Widget {
  id: number;
  name: string;
  chartData: ChartData[];
}

export interface CategoryType {
  id: number;
  name: string;
  widgets: Widget[];
}
