import ReactApexChart from "react-apexcharts"
import { Button } from "../Custom/Button"
import { VariantBar } from "../VariantBar"
import { useState } from "react"
import type { ApexChartState } from "../../types/types"

const dataSeries = [67, 83, 44]
const average = (dataSeries.reduce((acc, val) => acc + val, 0) / dataSeries.length).toFixed(2)

const initialState: ApexChartState = {
  series: dataSeries,
  options: {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
          },
          total: {
            show: true,
            label: 'Total',
            formatter: function () {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return average + '%'
            }
          }
        }
      }
    },
    labels: ['Shipmment 1', 'Shipmment 2', 'Shipmment 3'],
  },
}

export const CDDRadial = () => {
  const [state, setState] = useState<ApexChartState>(initialState)
  const [custom, setCustom] = useState(false)

  const resetChart = () => {
    setState(initialState)
    setCustom(false)
  }

  const trackBg = () => {
    setCustom(true)

    setState({
      ...state,
      options: {
        ...state.options,
        plotOptions: {
          ...state.options.plotOptions,
          radialBar: {
            ...state.options.plotOptions?.radialBar,
            track: {
              show: false
            }
          }
        }
      }
    })
  }

  const fill = () => {
    setCustom(true)

    setState({
      ...state,
      options: {
        ...state.options,
        fill: {
          colors: ['#ccc', '#876', '#678']
        }
      }
    })
  }

  const strokeWidth = () => {
    setCustom(true)

    setState({
      ...state,
      options: {
        ...state.options,
        plotOptions: {
          ...state.options.plotOptions,
          radialBar: {
            ...state.options.plotOptions?.radialBar,
            hollow: {
              size: '35%'
            },
            track: {
              strokeWidth: '75%',
            }
          }
        },
        stroke: {
          lineCap: 'round',
          dashArray: 4
        }
      }
    })
  }

  const angleRange = () => {
    setCustom(true)

    setState({
      ...state,
      options: {
        ...state.options,
        plotOptions: {
          ...state.options.plotOptions,
          radialBar: {
            ...state.options.plotOptions?.radialBar,
            startAngle: -270,
            endAngle: 0,
          }
        },
        stroke: {
          lineCap: 'round',
          dashArray: 4
        }
      }
    })
  }

  const hollow = () => {
    setCustom(true)

    setState({
      ...state,
      options: {
        ...state.options,
        plotOptions: {
          ...state.options.plotOptions,
          radialBar: {
            ...state.options.plotOptions?.radialBar,
            hollow: {
              size: '60%',         // Controls inner circle size (arc thickness)
              background: '#ccc', // Background color inside the hollow
              margin: 10,           // Space between hollow and arc
              image: undefined,     // You can add an image here
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                blur: 4,
                opacity: 0.1
              },
            },
            dataLabels: {
              ...state.options.plotOptions?.radialBar?.dataLabels,
              name: {
                offsetY: -10,
                color: "#fff",
                fontSize: "13px"
              },
              value: {
                color: "#fff",
                fontSize: "30px",
                show: true
              }
            }
          }
        }
      }
    })
  }

  //Track background, fill, stroke width, angle range, hollow center styling
  return (
    <div className="my-5 p-2 flex items-center gap-4 rounded">
      <div style={{ color: "black" }} className="my-4">
        <VariantBar variant="Chart Options">
          <Button onClick={trackBg}>Track background</Button>
          <Button onClick={fill}>Fill</Button>
          <Button onClick={strokeWidth}>Stroke width</Button>
          <Button onClick={angleRange}>Angle range</Button>
          <Button onClick={hollow}>Hollow center styling</Button>
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
          type="radialBar"
          height={300} />
      </div>
    </div>
  )
}