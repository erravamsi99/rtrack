export type ChartDataProps = {
  data: LineChartData;
  type: 'Line' | 'Radar',
  style?: any
}
export type LineChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
};

export type RadarChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    border: number;
  }[];
};
