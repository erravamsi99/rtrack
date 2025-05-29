import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, RadialLinearScale, Filler,
} from 'chart.js';
import {Line, Radar} from "react-chartjs-2";
import {ChartDataProps} from "../types/chartTypes";

export const RTChart = (props: ChartDataProps) => {
  const { data, type, style } = props;
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    Filler
  );

  const options: any = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
      }
    }
  };

  return (
    <div style={style}>
      {type === 'Line' && <Line options={options} data={data}/>}
      {type === 'Radar' && <Radar options={options} data={data}/>}
    </div>
  );
}