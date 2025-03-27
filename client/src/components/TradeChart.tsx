import React, { useEffect, useRef } from "react";
import { createChart, IChartApi, CandlestickData, UTCTimestamp } from "lightweight-charts";

const TradeChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create Chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: { background: { color: "#ffffff" }, textColor: "#000" },
      grid: { vertLines: { color: "#e1e1e1" }, horzLines: { color: "#e1e1e1" } },
    });

     // ✅ Correct Method for Candlestick Series
     const candleSeries = chart.addSeries({
        type: "Candlestick",
        isBuiltIn: true,
        defaultOptions: {
          upColor: "#26a69a",
          downColor: "#ef5350",
          borderVisible: true,
          wickVisible: true,
          borderColor: "#000000",
          borderUpColor: "#26a69a",
          borderDownColor: "#ef5350",
          wickColor: "#000000",
          wickUpColor: "#26a69a",
          wickDownColor: "#ef5350",
        },
      });

    // Dummy Forex Data (Replace with API Call)
    const dummyData: CandlestickData[] = [
      { time: 1711234560 as UTCTimestamp, open: 1.1, high: 1.15, low: 1.08, close: 1.12 },
      { time: 1711234620 as UTCTimestamp, open: 1.12, high: 1.18, low: 1.1, close: 1.16 },
      { time: 1711234680 as UTCTimestamp, open: 1.16, high: 1.2, low: 1.14, close: 1.18 },
    ];
    
    candleSeries.setData(dummyData);

    chartRef.current = chart;

    return () => chart.remove();
  }, []);

  return <div ref={chartContainerRef} className="w-full h-96 border border-gray-300 rounded-lg shadow-lg"></div>;
};

export default TradeChart;
