import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Widget as WidgetType } from "../types/types";

// Register required elements
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface WidgetProps {
  widget: WidgetType;
  removeWidget: () => void;
}

const Widget: React.FC<WidgetProps> = ({ widget, removeWidget }) => {
  const { chartType, chartData } = widget;

  const isPieChart = chartType === 'pie' && Array.isArray(chartData) && chartData.length > 0 && typeof chartData[0] === 'object' && (chartData[0] as any)?.visitors !== undefined;

  const isStackedBarChart = chartType === 'stackedBar' && Array.isArray(chartData) && chartData.length > 0 && chartData.every(data => typeof data === 'object' && (data as any).visitors !== undefined);

  const pieChartData = isPieChart
    ? {
        labels: (chartData as any).map((data: any) => data.browser),
        datasets: [
          {
            data: (chartData as any).map((data: any) => data.visitors),
            backgroundColor: (chartData as any).map((data: any) => data.fill),
          },
        ],
      }
    : null;

  const barChartData = isStackedBarChart
    ? {
        labels: ['Total Vulnerabilities'],
        datasets: (chartData as any).map((data: any) => ({
          label: data.browser,
          data: [data.visitors],
          backgroundColor: data.fill,
        }))
      }
    : null;

  const barChartOptions = {
    indexAxis: 'y' as const, // Horizontal bar chart
    scales: {
      x: {
        beginAtZero: true,
        stacked: true,
        // No axis display
        display: false,
      },
      y: {
        stacked: true,
        // No axis display
        display: false,
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'right' as const,
      },
      datalabels: {
        color: 'black',
        anchor: 'end' as const,
        align: 'right' as const,
        formatter: function(value: any) {
          return value;
        }
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem: any) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          }
        }
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked',
      }
    }
  };

  return (
    <div className="border-2 bg-white rounded-lg p-2" style={{ height: "300px",width: '400px', margin: '0 auto' }}>
      <h3 className="font-semibold text-sm">{widget.name}</h3>

      {isPieChart && pieChartData ? (
        <Pie data={pieChartData} />
      ) : isStackedBarChart && barChartData ? (
        <Bar data={barChartData} options={barChartOptions} plugins={[ChartDataLabels]} />
      ) : (
        <p>No data available</p>
      )}

      <button className="bg-red-500 border-2 mt-2" onClick={removeWidget}>
        Remove Widget
      </button>
      <div>
        
      </div>
    </div>
  );
};

export default Widget;
