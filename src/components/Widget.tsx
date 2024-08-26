import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Widget as WidgetType } from "../types/types";
import { RxCross2 } from "react-icons/rx";

// Register required elements
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface WidgetProps {
  widget: WidgetType;
  removeWidget: () => void;
}

const Widget: React.FC<WidgetProps> = ({ widget, removeWidget }) => {
  const { chartType, chartData } = widget;

  const isPieChart =
    chartType === "pie" &&
    Array.isArray(chartData) &&
    chartData.length > 0 &&
    typeof chartData[0] === "object" &&
    (chartData[0] as any)?.visitors !== undefined;

  const isStackedBarChart =
    chartType === "stackedBar" &&
    Array.isArray(chartData) &&
    chartData.length > 0 &&
    chartData.every(
      (data) => typeof data === "object" && (data as any).visitors !== undefined
    );

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

  const pieChartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "right" as const,
      },
      datalabels: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  const barChartData = isStackedBarChart
    ? {
        labels: ["Total Vulnerabilities"],
        datasets: (chartData as any).map((data: any) => ({
          label: data.browser,
          data: [data.visitors],
          backgroundColor: data.fill,
          barThickness: 10,
          borderRadius: 10,
        })),
      }
    : null;

  const barChartOptions = {
    indexAxis: "y" as const,
    scales: {
      x: {
        beginAtZero: true,
        stacked: true,
        display: false,
      },
      y: {
        stacked: true,
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "right" as const,
      },
      datalabels: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart - Stacked",
      },
    },
  };

  return (
    <div
      className="border-2 bg-white rounded-xl p-2 flex-col justify-center items-center"
      style={{ height: "300px", width: "100%", maxWidth: "400px", margin: "0 auto" }}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-sm">{widget.name}</h3>
        <button className="hover:bg-blue-200 font-bold" onClick={removeWidget}>
          <RxCross2 />
        </button>
      </div>

      {isPieChart && pieChartData ? (
        <Doughnut
          data={pieChartData}
          options={pieChartOptions}
          plugins={[ChartDataLabels as any]}
          className="w-full h-full sm:w-3/4 sm:h-3/4 md:w-1/2 md:h-1/2" // Adjust size based on screen size
        />
      ) : isStackedBarChart && barChartData ? (
        <>
          <Bar
            data={barChartData}
            options={barChartOptions}
            height={200}
            width={300}
            className="w-full h-full sm:w-3/4 sm:h-3/4 md:w-1/2 md:h-1/2" // Adjust size based on screen size
          />
          <div className="mt-2 flex-col h-full items-center justify-center rounded-xl">
            {chartData.map((data: any, index: number) => (
              <p key={index} className="text-sm">
                <div className="relative -top-20 ">
                  <span
                    className=""
                    style={{
                      backgroundColor: data.fill,
                      padding: "2px 4px",
                      marginRight: "10px",
                      marginBottom: "20px",
                    }}
                  ></span>
                  {data.browser} ({data.visitors})
                </div>
              </p>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <img src="./graph.png" alt="" className="h-20 w-20 mb-2" />
          <p className="text-center">No graph data available</p>
        </div>
      )}
    </div>
  );
};

export default Widget;
