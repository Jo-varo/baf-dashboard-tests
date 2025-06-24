import type { ApexOptions } from "apexcharts"
import { useEffect, useMemo, useState } from "react"
import ReactApexChart from "react-apexcharts"
import { dataAggregationByDestination, dataGroupedByMonthYear } from "../helpers/dataHandlers"

const xFormatter = (data: string) => {
  const [year, month] = data.split('-').map(Number);
  const date = new Date(year, month - 1, 1);
  const yearString = date.getFullYear();
  const monthString = date.toLocaleString('en-US', { month: 'short' });

  return `${yearString}, ${monthString}`;
}

// Sync charts doesn't work
// const syncId = 'social'

const ApexChartsLine = () => {
  const options: ApexOptions = useMemo(() => ({
    chart: {
      id: 'line-1',
      height: 300,
      type: 'line',
      zoom: {
        enabled: true
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'monotoneCubic'
    },
    markers: {
      size: 5,
      colors: ['#0c0','#000']
    },
    title: {
      text: 'Number of shipments per month',
      align: 'left'
    },
    colors: ['#080'],
    grid: {
      show: true,
      strokeDashArray: 6,
      xaxis: {
        lines: {
          show: true
        },
      },
      yaxis: {
        lines: {
          show: true
        }
      },
    },
    xaxis: {
      labels: {
        rotateAlways: true,
        rotate: -80,
        offsetY: 10
      },
      categories: dataGroupedByMonthYear.map(i => xFormatter(i.dateRange)),
    },
    legend:{
      show:true
    },
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        return '<div class="arrow_box" style="padding: 10px;">' +
          '<span>Shipments: ' + series[seriesIndex][dataPointIndex] + '</span>' +
          '</div>'
      }
    },
  }), []);

  const series: ApexOptions["series"] = useMemo(() => [{
    name: "Shipments",
    data: dataGroupedByMonthYear.map(i => i.shipments)
  }], []);

  const [state, setState] = useState({ series, options })

  useEffect(() => {
    setState({ series, options })
  }, [series, options])

  return (
    <div>
      <div id="chart" style={{ width: '700px', color: 'black' }}>
        <ReactApexChart options={state.options} series={state.series} type="line" height={300} />
      </div>
      <div id="html-dist"></div>
    </div>
  )
}


const colors = Array.from({ length: 13 }, (_, i) => {
  const startColor = [136, 68, 136]; // RGB for #848
  const endColor = [255, 204, 255]; // A lighter shade for the end of the gradient
  const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * (i / 12)).toString(16).padStart(2, '0');
  const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * (i / 12)).toString(16).padStart(2, '0');
  const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * (i / 12)).toString(16).padStart(2, '0');

  return `#${r}${g}${b}`;
});

const ApexChartsBar = () => {
  const options: ApexOptions = useMemo(() => ({
    chart: {
      id: 'bar-1',
      height: 300,
      type: 'bar',
      zoom: {
        enabled: true
      },
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        borderRadius: 5,
        borderRadiusApplication: 'end',
        distributed: true
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    legend: {
      show: false
    },
    fill: {
      opacity: 1
    },
    dataLabels: {
      enabled: true,
    },
    colors: colors,
    states: {
      hover: {
        filter: {
          type: 'none'
        }
      },
      active:{
        filter:{
          type:'none'
        }
      }
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      },
    },
    xaxis: {
      categories: dataGroupedByMonthYear.map(i => xFormatter(i.dateRange)).map(i => i.split(', ')),
      labels: {
        style: {
          colors: '#848',
        }
      },
      crosshairs: {
        show: true,
        width: 50,
        position: 'back',
        opacity: 0.1,
        fill: {
          type: 'solid',
          color: '#000',
        }
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#848',
        }
      }
    },
    tooltip: {
      enabled: true,
    }
  }), [dataGroupedByMonthYear]);
  const series: ApexOptions["series"] = useMemo(() => [{
    name: "Shipments",
    data: dataGroupedByMonthYear.map(i => i.shipments)
  }], [dataGroupedByMonthYear]);

  const [state, setState] = useState({ series, options })

  useEffect(() => {
    setState({ series, options })
  }, [series, options])

  return (
    <div>
      <div id="chart" style={{ width: '700px', color: 'black' }}>
        <ReactApexChart options={state.options} series={state.series} type="bar" height={300} />
      </div>
      <div id="html-dist"></div>
    </div>
  )
}

const ApexChartsPie = () => {
  const options: ApexOptions = useMemo(() => ({
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: dataAggregationByDestination.map(i => i.destination),
    dataLabels: {
      formatter(val, opts) {
        const name = opts.w.globals.labels[opts.seriesIndex]
        return [name, Number(val).toFixed(1) + '%']
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -5,
        },
      },
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }
  ), [dataAggregationByDestination]);
  const series: ApexOptions["series"] = useMemo(() => dataAggregationByDestination.map(i => i.shipments), [dataAggregationByDestination]);

  const [state, setState] = useState({ series, options })

  useEffect(() => {
    setState({ series, options })
  }, [series, options])

  return (
    <div>
      <div id="chart" style={{ width: '700px', color: 'black' }}>
        <ReactApexChart options={state.options} series={state.series} type="pie" height={380} />
      </div>
      <div id="html-dist"></div>
    </div>
  )
}

export const ApexCharts = () => {
  const titleStyles = { color: 'black' }

  return (
    <div>
      <h1 style={titleStyles}>Apex charts</h1>
      <h2 style={titleStyles}>Number of shipments per month</h2>
      <div style={{ border: '1px solid black', borderRadius: '10px' }}>
        <ApexChartsLine />
      </div>
      <div style={{ border: '1px solid black', borderRadius: '10px' }}>
        <ApexChartsBar />
      </div>
      <h2 style={titleStyles}>Shipments by country</h2>
      <ApexChartsPie />
    </div>
  )
}