// @ts-nocheck - Only for chart demo deploy, remove it later and fix all the type errors
// WON'T BE USED

import { ColorType, createChart, createTextWatermark, HistogramSeries, LineSeries } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { dataGroupedByMonthYear } from "../helpers/dataHandlers";

//Parsed data for lightweight charts
const parsedData = dataGroupedByMonthYear.map(({ dateRange, shipments }) => ({ time: `${dateRange}-01`, value: shipments }))

const ChartComponent = (props: any) => {
  const {
    data,
    colors: {
      backgroundColor = 'white',
      lineColor = '#2962FF',
      textColor = 'black',
      areaTopColor = '#2962FF',
      areaBottomColor = 'rgba(41, 98, 255, 0.28)',
    } = {},
  } = props;

  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(
    () => {
      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
      };

      const chart = createChart(chartContainerRef.current!, {
        layout: {
          background: { type: ColorType.Solid, color: backgroundColor },
          textColor,
          attributionLogo: false
        },
        width: chartContainerRef.current!.clientWidth,
        height: 300,
      });
      chart.timeScale().fitContent();

      const newSeries = chart.addSeries(LineSeries, { color: '#2962FF' });
      newSeries.setData(data);

      window.addEventListener('resize', handleResize);

      const toolTipWidth = 80;
      const toolTipHeight = 80;
      const toolTipMargin = 15;

      // Create and style the tooltip html element
      const toolTip = document.createElement('div');
      toolTip.style = `width: 96px; height: 80px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
      toolTip.style.background = 'white';
      toolTip.style.color = 'black';
      toolTip.style.borderColor = 'rgba( 38, 166, 154, 1)';
      chartContainerRef.current!.appendChild(toolTip);

      // update tooltip
      chart.subscribeCrosshairMove(param => {
        if (
          param.point === undefined ||
          !param.time ||
          param.point.x < 0 ||
          param.point.x > chartContainerRef.current!.clientWidth ||
          param.point.y < 0 ||
          param.point.y > chartContainerRef.current!.clientHeight
        ) {
          toolTip.style.display = 'none';
        } else {
          // time will be in the same format that we supplied to setData.
          // thus it will be YYYY-MM-DD
          const dateStr = param.time;
          toolTip.style.display = 'block';
          const data = param.seriesData.get(newSeries);
          const price = data.value !== undefined ? data.value : data.close;
          toolTip.innerHTML = `<div style="color: ${'rgba( 38, 166, 154, 1)'}; font-size:12px;"># Shipments</div><div style="font-size: 20px; color: ${'black'}">
            ${Math.round(100 * price) / 100}
            </div><div style="color: ${'black'}">
            ${dateStr}
            </div>`;

          const y = param.point.y;
          let left = param.point.x + toolTipMargin;
          if (left > chartContainerRef.current.clientWidth - toolTipWidth) {
            left = param.point.x - toolTipMargin - toolTipWidth;
          }

          let top = y + toolTipMargin;
          if (top > chartContainerRef.current.clientHeight - toolTipHeight) {
            top = y - toolTipHeight - toolTipMargin;
          }
          toolTip.style.left = left + 'px';
          toolTip.style.top = top + 'px';
        }
      });

      return () => {
        window.removeEventListener('resize', handleResize);

        chart.remove();
      };
    },
    [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
  );

  return (
    <div style={{ position: 'relative' }}
      ref={chartContainerRef}
    />
  );
};

const Histogram = ({ data }: { data: any }) => {

  const dataForHistogram = parsedData.map(({ time, value }, i) => ({ value, time, color: i - 1 >= 0 ? parsedData[i - 1].value > value ? 'red' : '#26a69a' : '#26a69a' }))

  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
    };

    const chartOptions = {
      layout: { textColor: 'black', background: { type: ColorType.Solid , color: 'white' }, attributionLogo: false }, width: chartContainerRef.current!.clientWidth,
      height: 300
    };
    const chart = createChart(chartContainerRef.current!, chartOptions);
    const histogramSeries = chart.addSeries(HistogramSeries, { color: '#26a69a' });

    createTextWatermark(chart.panes()[0], {
      horzAlign: 'center',
      vertAlign: 'center',
      lines: [
        {
          text: 'BookAirFreight',
          color: 'rgba(10, 10, 247, 0.3)',
          fontSize: 24,
        },
      ],
    });

    histogramSeries.setData(dataForHistogram);

    chart.timeScale().fitContent();

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, [data])

  return (
    <div style={{ position: 'relative' }}
      ref={chartContainerRef}
    />
  );
}


export const LightweightCharts = () => {

  const titleStyles = { color: 'black' }

  return (
    <div>
      <h1 style={titleStyles}>Lightweight charts</h1>
      <h2 style={titleStyles}>Number of shipments per month</h2>
      <div style={{ width: '700px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <ChartComponent data={parsedData}></ChartComponent>
        <Histogram data={parsedData} />
      </div>
      <h2 style={titleStyles}>Shipments by country</h2>
      <h3 style={titleStyles}>Lightweight charts doesn't support pie charts</h3>
    </div>
  )
}