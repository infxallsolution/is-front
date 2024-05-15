import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";

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

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();

    const getChartTypeDefaultOptions = (
      type,
      { lineColor, topColor, bottomColor }
    ) => {
      switch (type) {
        case "bar":
          return chart.addBarSeries({ lineColor, topColor, bottomColor });
        case "line":
          return chart.addLineSeries({
            lineColor,
            topColor,
            bottomColor,
            priceFormat: {
              type: "custom",
              formatter: (price) => (price.toLocaleString()),
            },
            axisLabelVisible: true,
            title: "Kg",
          });
        case "histogram":
          return chart.addHistogramSeries({ lineColor, topColor, bottomColor });
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

    let newSeries = null;

    /* if (series === 0) { */
    newSeries = getChartTypeDefaultOptions(type, {
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });
    newSeries.setData(data);
    /* } else {
      const lineSeriesOne = chart.addLineSeries({ color: generateRandomColor() });
      const lineSeriesTwo = chart.addLineSeries({ color: generateRandomColor() });
      const lineSeriesThree = chart.addLineSeries({
        color: generateRandomColor(),
      });

      const lineSeriesOneData = generateLineData(250);
      const lineSeriesTwoData = generateLineData(250);
      const lineSeriesThreeData = generateLineData(250);

        lineSeriesOne.setData(lineSeriesOneData);
        lineSeriesTwo.setData(lineSeriesTwoData);
        lineSeriesThree.setData(lineSeriesThreeData);

        chart.timeScale().fitContent();
    } */

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

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

  return <div ref={chartContainerRef} />;
};
