import ReactApexChart from "react-apexcharts";
import { dataGroupedByMonthYear } from "../helpers/dataHandlers";
import type { ApexOptions } from "apexcharts";
import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { VariantBar } from "../components/VariantBar";

const xFormatter = (data: string) => {
  const [year, month] = data.split('-').map(Number);
  const date = new Date(year, month - 1, 1);
  const yearString = date.getFullYear();
  const monthString = date.toLocaleString('en-US', { month: 'short' });

  return `${yearString}, ${monthString}`;
}

const generateRandomNumber = (range: number[]) => {
  return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
}

interface TState {
  options: ApexOptions;
  series: ApexOptions["series"];
}

const initialState: TState = {
  options: {
    chart: {
      id: 'line-1',
      height: 300,
      type: 'line',
      zoom: {
        enabled: true
      },
      background: 'transparent'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'monotoneCubic'
    },
    title: {
      text: 'Number of shipments per month',
      align: 'left'
    },
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
        offsetY: 10,
        style: {
          fontSize: '12px',
          colors: '#000'
        }
      },
      categories: dataGroupedByMonthYear.map(i => xFormatter(i.dateRange)),
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          colors: '#000'
        }
      }
    },
    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return '<div class="arrow_box" style="padding: 10px;">' +
          '<span>Shipments: ' + series[seriesIndex][dataPointIndex] + '</span>' +
          '</div>'
      }
    },
    theme: {
      mode: 'light',
    }
  },
  series: [{
    name: "Shipments",
    data: dataGroupedByMonthYear.map(i => i.shipments)
  }]
}


export default function CDD() {

  const [state, setState] = useState<TState>(initialState)
  const lastFontSizeRef = useRef<number>(12);
  const lastRotationAngleRef = useRef<number>(-80);

  const solidBackground = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        chart: {
          ...state.options.chart,
          background: '#d19511'
        }
      }
    })
  }

  const transparentBackground = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        chart: {
          ...state.options.chart,
          background: 'transparent'
        }
      }
    })
  }

  const gradientBackground = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        chart: {
          ...state.options.chart,
          background: 'linear-gradient(#e66465, #9198e5)'
        }
      }
    })
  }

  const themeLight = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        theme: {
          mode: 'light'
        },
        chart: {
          ...state.options.chart,
          background: 'transparent'
        }
      }
    })
  }

  const themeDark = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        theme: {
          mode: 'dark'
        },
        chart: {
          ...state.options.chart,
          background: '#707070'
        }
      }
    })
  }

  const changeFontFamily = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        xaxis: {
          ...state.options.xaxis,
          labels: {
            ...state.options.xaxis!.labels,
            style: {
              fontFamily: 'sans-serif'
            }
          }
        },
        yaxis: {
          ...state.options.yaxis,
          labels: {
            ...(state.options.yaxis as ApexYAxis)!.labels,
            style: {
              ...(state.options.yaxis as ApexYAxis)!.labels?.style,
              fontFamily: 'sans-serif'
            }
          }
        }
      }
    })
  }


  const changeFontSize = () => {
    let newFontSize;
    do {
      newFontSize = generateRandomNumber([8, 14])
    } while (newFontSize === lastFontSizeRef.current);

    lastFontSizeRef.current = newFontSize;

    setState({
      ...state,
      options: {
        ...state.options,
        xaxis: {
          ...state.options.xaxis,
          labels: {
            ...state.options.xaxis!.labels,
            style: {
              fontSize: `${newFontSize}px`
            }
          }
        },
        yaxis: {
          ...state.options.yaxis,
          labels: {
            ...(state.options.yaxis as ApexYAxis)!.labels,
            style: {
              ...(state.options.yaxis as ApexYAxis)!.labels?.style,
              fontSize: `${newFontSize}px`
            }
          }
        }
      }
    })
  }

  const changeFontColor = () => {

    setState({
      ...state,
      options: {
        ...state.options,
        xaxis: {
          ...state.options.xaxis,
          labels: {
            ...state.options.xaxis!.labels,
            style: {
              ...state.options.xaxis!.labels?.style,
              colors: '#b22'
            }
          }
        },
        yaxis: {
          ...state.options.yaxis,
          labels: {
            ...(state.options.yaxis as ApexYAxis)!.labels,
            style: {
              ...(state.options.yaxis as ApexYAxis)!.labels?.style,
              colors: '#b22'
            }
          }
        }
      }
    })

  }

  const changeFontRotation = () => {
    let newAngle;
    do {
      newAngle = generateRandomNumber([-80, 0])
    } while (newAngle === lastRotationAngleRef.current);

    lastRotationAngleRef.current = newAngle;

    setState({
      ...state,
      options: {
        ...state.options,
        xaxis: {
          ...state.options.xaxis,
          labels: {
            ...state.options.xaxis!.labels,
            rotate: newAngle
          }
        }
      }
    })
  }

  const changeFontPosition = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        xaxis: {
          ...state.options.xaxis,
          labels: {
            ...state.options.xaxis!.labels,
            offsetY: generateRandomNumber([-5,5]),
            offsetX: generateRandomNumber([-5,5]),
          }
        },
        yaxis: {
          ...state.options.yaxis,
          labels: {
            ...(state.options.yaxis as ApexYAxis)!.labels,
            offsetY: generateRandomNumber([-5,5]),
            offsetX: generateRandomNumber([-5,5]),
          }
        }
      }
    })
  }


  return (
    <div style={{ margin: '60px' }}>
      <div id="chart" style={{ width: '700px', color: 'black' }}>
        <ReactApexChart options={state.options} series={state.series} type="line" height={300} />
      </div>
      <div style={{ color: "black" }} className="my-4">
        <VariantBar variant="Background">
          <Button onClick={solidBackground}>Solid</Button>
          <Button onClick={transparentBackground}>Transparent</Button>
          <Button onClick={gradientBackground}>Gradient</Button>
        </VariantBar>
        {/* only for bar charts
        <VariantBar variant="Color themes">
          <Button onClick={() => { console.log('click') }}>Solid</Button>
          <Button onClick={() => { console.log('click') }}>Transparent</Button>
        </VariantBar> 
        */}
        <VariantBar variant="Dark mode">
          <Button onClick={themeDark}>Dark</Button>
          <Button onClick={themeLight}>Light</Button>
        </VariantBar>
        <VariantBar variant="Axis labels">
          <Button onClick={changeFontFamily}>Change font family</Button>
          <Button onClick={changeFontSize}>Change size</Button>
          <Button onClick={changeFontColor}>Change color</Button>
          <Button onClick={changeFontRotation}>Change rotation</Button>
          <Button onClick={changeFontPosition}>Change position</Button>
        </VariantBar>
      </div>
      <Button onClick={() => setState(initialState)}>Reset chart styles</Button>
    </div>
  )
}