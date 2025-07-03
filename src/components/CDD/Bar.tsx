import { useState } from "react"
import ReactApexChart from "react-apexcharts"
import type { ApexChartState } from "../../types/types"
import { dataGroupedByMonthYear, xAxisFormatter } from "../../helpers/dataHandlers"
import { VariantBar } from "../VariantBar"
import { Button } from "../Custom/Button"

const initialState: ApexChartState = {
  options: {
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
        columnWidth: '50%',
        borderRadius: 0,
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
    colors: ['#848'],
    states: {
      hover: {
        filter: {
          type: 'none'
        }
      },
      active: {
        filter: {
          type: 'none'
        }
      }
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      },
      padding: {
        top: 0,
        bottom: 0
      }
    },
    xaxis: {
      categories: dataGroupedByMonthYear.map(i => xAxisFormatter(i.dateRange)).map(i => i.split(', ')),
      labels: {
        style: {
          colors: '#848',
        }
      },
      crosshairs: {
        show: true,
        width: 40,
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
  },
  series: [{
    name: "Shipments",
    data: dataGroupedByMonthYear.map(i => i.shipments)
  }]
}

export const CDDBar = () => {

  const [state, setState] = useState<ApexChartState>(initialState)
  const [custom, setCustom] = useState(false)

  const resetChart = () => {
    setCustom(prev => !prev)
    setState(initialState)
  }

  const cornerChart = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        plotOptions: {
          bar: {
            borderRadius: 8,
            borderRadiusApplication: 'end'
          }
        }
      }
    })
  }

  const barWidthChart = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        plotOptions: {
          bar: {
            columnWidth: '100%'
          }
        }
      }
    })
  }

  const paddingChart = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        grid: {
          padding: {
            top: 10,
            bottom: 10
          }
        }
      }
    })
  }

  const colorChart = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        colors: ['#f00', '#0f0', '#00f']
      }
    })
  }

  const hoverLighten = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        states: {
          ...state.options.states,
          hover: {
            filter: {
              type: 'lighten'
            }
          },
          active: {
            filter: {
              type: 'lighten'
            }
          }
        },
      }
    })
  }

  const hoverDarken = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        states: {
          ...state.options.states,
          hover: {
            filter: {
              type: 'darken'
            }
          },
          active: {
            filter: {
              type: 'darken'
            }
          }
        },
      }
    })
  }

  const hoverNone = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        states: {
          ...state.options.states,
          hover: {
            filter: {
              type: 'none'
            }
          },
          active: {
            filter: {
              type: 'none'
            }
          }
        },
      }
    })
  }

  const crosshairLineDashed = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        xaxis: {
          ...state.options.xaxis,
          crosshairs: {
            ...state.options.xaxis?.crosshairs,
            show: true,
            width: 40,
            position: 'back',
            opacity: 0.1,
            stroke: {
              color: '#f00',
              width: 1,
              dashArray: 10,
            },
          },
        }
      }
    })
  }

  const crosshairLineSolid = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        xaxis: {
          ...state.options.xaxis,
          crosshairs: {
            ...state.options.xaxis?.crosshairs,
            show: true,
            width: 40,
            position: 'back',
            opacity: 0.1,
            stroke: {
              color: '#f00',
              width: 1,
              dashArray: 0,
            },
          },
        }
      }
    })
  }

  const crosshairLineColor = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        xaxis: {
          ...state.options.xaxis,
          crosshairs: {
            ...state.options.xaxis?.crosshairs,
            show: true,
            width: 35,
            position: 'back',
            opacity: 0.2,
            stroke: {
              width: 0,
            },
            fill: {
              type: 'dashed',
              color: '#66c',
            }
          },
        }
      }
    })
  }

  const crosshairLineOpacity = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        xaxis: {
          ...state.options.xaxis,
          crosshairs: {
            ...state.options.xaxis?.crosshairs,
            opacity: 0.75,
          },
        }
      }
    })
  }

  const exampleAnim1 = () => {
    setCustom(prev => !prev)
    //Duration, easing function
    setState({
      ...state,
      options: {
        ...state.options,
        chart: {
          ...state.options.chart,
          animations: {
            enabled: true,
            speed: 300,
            animateGradually: {
              enabled: true,
              delay: 150
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350
            }
          }
        }
      }
    })
  }

  const exampleAnim2 = () => {
    setCustom(prev => !prev)

    setState({
      ...state,
      options: {
        ...state.options,
        chart: {
          ...state.options.chart,
          animations: {
            enabled: true,
            speed: 500,
            animateGradually: {
              enabled: false,
            },
            dynamicAnimation: {
              enabled: false,
            }
          }
        }
      }
    })
  }

  const hoverCursor1 = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        chart: {
          ...state.options.chart,
          events: {
            dataPointMouseEnter: function (event) {
              event.target.style.cursor = 'pointer'
            },

          },
        }
      }
    })
  }

  const hoverCursor2 = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        chart: {
          ...state.options.chart,
          events: {
            dataPointMouseEnter: function (event) {
              event.target.style.cursor = 'crosshair'
            },
          },
        }
      }
    })
  }


  return (
    <div className="my-5 p-2 flex items-center gap-4 rounded">
      <div style={{ color: "black" }} className="my-4">
        <VariantBar variant="Chart Options">
          <Button onClick={cornerChart}>Corner</Button>
          <Button onClick={barWidthChart}>Bar width</Button>
          <Button onClick={paddingChart}>Padding</Button>
          <Button onClick={colorChart}>Color</Button>
        </VariantBar>
        <VariantBar variant="Hover filter">
          <Button onClick={hoverLighten}>Lighten</Button>
          <Button onClick={hoverDarken}>Darken</Button>
          <Button onClick={hoverNone}>None</Button>
        </VariantBar>
        <VariantBar variant="Crosshair (Hover)">
          <Button onClick={crosshairLineDashed}>Stroke Dashed</Button>
          <Button onClick={crosshairLineSolid}>Stroke Solid</Button>
          <Button onClick={crosshairLineColor}>Color</Button>
          <Button onClick={crosshairLineOpacity}>Opacity</Button>
        </VariantBar>
        <VariantBar variant="Load Animation">
          <Button onClick={exampleAnim1}>Example 1</Button>
          <Button onClick={exampleAnim2}>Example 2</Button>
        </VariantBar>
        <VariantBar variant="Cursor">
          <Button onClick={hoverCursor1}>Example 1</Button>
          <Button onClick={hoverCursor2}>Example 2</Button>
        </VariantBar>
        <div className="my-4">
          <Button onClick={resetChart} style={{ backgroundColor: 'white', border: '1px solid black', color: 'black' }}>Reset chart styles</Button>
        </div>
      </div>
      <div id="chart" style={{ width: '700px', color: 'black' }}>
        <ReactApexChart
          key={custom ? 'cst' : 'def'}
          options={state.options}
          series={state.series}
          type="bar"
          height={300}
        />
        <div className="text-black">
          <p className="text-xs">*Most of the line charts customizations are also available here</p>
        </div>
      </div>
    </div>

  )
}