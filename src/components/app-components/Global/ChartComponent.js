import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef, useState } from "react";
import { generateRandomColor } from "utils/generateLineData";

export const ChartComponent = (props) => {
  const {
    data,
    type,
    series,
    colors: {
      backgroundColor = "white",
      lineColor = "#2962FF",
      textColor = "black",
      areaTopColor = "#2962FF",
      areaBottomColor = "rgba(41, 98, 255, 0.28)",
    } = {},
  } = props;

  const chartContainerRef = useRef();

  const [legend, setLegend] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      leftPriceScale: {
        visible: true,
      },
      rightPriceScale: {
        visible: false,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();

    const getChartTypeDefaultOptions = (
      type,
      { lineColor, topColor, bottomColor, color }
    ) => {
      switch (type) {
        case "bar":
          return chart.addBarSeries({ lineColor, topColor, bottomColor });
        case "line":
          return chart.addLineSeries({
            lineColor,
            topColor,
            color,
            bottomColor,
            priceFormat: {
              type: "custom",
              formatter: (price) => price.toLocaleString(),
            },
            axisLabelVisible: true,
            title: "TON",
          });
        case "histogram":
          return chart.addHistogramSeries({
            lineColor,
            topColor,
            color,
            bottomColor,
            priceFormat: {
              type: "custom",
              formatter: (price) => price.toLocaleString(),
            },
            axisLabelVisible: true,
            title: "TON",
          });
        case "area":
          return chart.addAreaSeries({ lineColor, topColor, bottomColor });
        case "baseline":
          return chart.addBaselineSeries({ lineColor, topColor, bottomColor });
        case "candlestick":
          return chart.addCandlestickSeries({
            lineColor,
            topColor,
            bottomColor,
          });
        default:
          return chart.addLineSeries({ lineColor, topColor, bottomColor });
      }
    };

    const addSeriesAndLegend = (seriesData, seriesIndex) => {
      const color = generateRandomColor();
      const newSeries = getChartTypeDefaultOptions(type, { color });
      newSeries.setData(seriesData.data);
      setLegend((prevLegends) => [
        ...prevLegends,
        { color, text: seriesData.title },
      ]);
    };

    // eslint-disable-next-line array-callback-return
    data.map((seriesData, index) => {
      addSeriesAndLegend(seriesData, index);
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      setLegend([]);
      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    type,
    series,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return (
    <div>
      <div ref={chartContainerRef} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {legend.map((legend, index) => (
          <div key={index} style={{ color: legend.color, margin: "0 10px" }}>
            <strong>{legend.text}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};
