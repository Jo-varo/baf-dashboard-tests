import { useEffect, useRef, useState } from "react";
import type { ApexChartState } from "../../types/types";
import { HELVETICA_FONT, MONTSERRAT_FONT } from "../../constants/fonts";
import { generateRandomNumber, getRandomDarkColor } from "../../helpers/functions";
import { VariantBar } from "../VariantBar";
import { Button } from "../Button";
import ReactApexChart from "react-apexcharts";
import { dataGroupedByMonthYear, xAxisFormatter } from "../../helpers/dataHandlers";

const initialState: ApexChartState = {
  options: {
    chart: {
      id: 'line-1',
      height: 300,
      type: 'line',
      zoom: {
        enabled: true
      },
      background: 'transparent',
      toolbar: {
        show: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'monotoneCubic'
    },
    title: {
      text: 'Number of shipments per month',
      floating: false,
      align: 'left',
      margin: 0,
      style: {
        fontFamily: HELVETICA_FONT,
        fontWeight: 'bold',
        fontSize: '14px',
        color: '#000'
      }
    },
    subtitle: {
      text: ''
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
          fontFamily: HELVETICA_FONT,
          colors: '#000'
        }
      },
      categories: dataGroupedByMonthYear.map(i => xAxisFormatter(i.dateRange)),
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: HELVETICA_FONT,
          colors: '#000'
        }
      }
    },
    tooltip: {
      enabled: true
    },
    legend: {
      show: false,
      floating: false,
    },
    theme: {
      mode: 'light',
    },
    colors: ['#44c'],
    fill: {
      type: 'solid'
    }
  },
  series: [{
    name: "Shipments",
    data: dataGroupedByMonthYear.map(i => i.shipments)
  }]
}

export const CDDLine = () => {
  const [state, setState] = useState<ApexChartState>(initialState)
  const lastFontSizeRef = useRef<number>(12);
  const lastRotationAngleRef = useRef<number>(-80);
  const [useCustomTooltip, setUseCustomTooltip] = useState(false);
  const [demoTooltipState, setDemoTooltipState] = useState({ border: false, shadow: false })
  const [curve, setCurve] = useState('monotoneCubic')
  const [transparentBg, setTransparentBg] = useState(false);

  const resetChart = () => {
    setUseCustomTooltip(false)
    setDemoTooltipState({ border: false, shadow: false })
    setState(initialState)
    setTransparentBg(false)
  }

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
    setTransparentBg(true)
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
              fontFamily: MONTSERRAT_FONT,
            }
          }
        },
        yaxis: {
          ...state.options.yaxis,
          labels: {
            ...(state.options.yaxis as ApexYAxis)!.labels,
            style: {
              ...(state.options.yaxis as ApexYAxis)!.labels?.style,
              fontFamily: MONTSERRAT_FONT,
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

    const newColor = getRandomDarkColor();

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
              colors: newColor
            }
          }
        },
        yaxis: {
          ...state.options.yaxis,
          labels: {
            ...(state.options.yaxis as ApexYAxis)!.labels,
            style: {
              ...(state.options.yaxis as ApexYAxis)!.labels?.style,
              colors: newColor
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
            offsetY: generateRandomNumber([-5, 5]),
            offsetX: generateRandomNumber([-5, 5]),
          }
        },
        yaxis: {
          ...state.options.yaxis,
          labels: {
            ...(state.options.yaxis as ApexYAxis)!.labels,
            offsetY: generateRandomNumber([-5, 5]),
            offsetX: generateRandomNumber([-5, 5]),
          }
        }
      }
    })
  }

  const dataLabelsVariant1 = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '14px',
            fontFamily: HELVETICA_FONT,
            colors: ['#e36f66']
          },
          background: {
            enabled: true,
            foreColor: '#170da6',
            padding: 4
          },
          offsetX: 0,
          offsetY: 8
        }
      }
    })
  }

  const dataLabelsVariant2 = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '11px',
            fontFamily: HELVETICA_FONT,
            colors: ['#9949e3']
          },
          background: {
            enabled: true,
            foreColor: '#8ced7b',
            padding: 10
          },
          offsetX: 0,
          offsetY: -5
        }
      }
    })
  }

  const legendLabelsVariant1 = () => {
    //    Font, color, spacing between items, icon shape
    setState({
      ...state,
      options: {
        ...state.options,
        legend: {
          show: true,
          showForSingleSeries: true,
          fontSize: '14px',
          fontFamily: MONTSERRAT_FONT,
          labels: {
            colors: ['#e36f66']
          },
          markers: {
            size: 5,
            shape: 'diamond'
          }
        }
      }
    })
  }

  const legendLabelsVariant2 = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        legend: {
          show: true,
          showForSingleSeries: true,
          fontSize: '12px',
          fontFamily: HELVETICA_FONT,
          labels: {
            colors: ['#780101']
          },
          markers: {
            size: 8,
            shape: 'sparkle',
          },
        }
      }
    })
  }

  const chartTitleStyle1 = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        chart: {
          toolbar: {
            show: true
          }
        },
        title: {
          text: 'Another title can be placed here',
          align: 'center',
          margin: 10,
          style: {
            fontFamily: MONTSERRAT_FONT,
            fontWeight: 'regular',
            color: '#000'
          }
        },
        subtitle: {
          text: 'and subtitles, with other font family',
          align: 'center',
          margin: 0,
          style: {
            fontFamily: MONTSERRAT_FONT,
            fontWeight: 'bold',
            color: '#000'
          },
        }
      }
    })
  }

  const chartTitleStyle2 = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        chart: {
          toolbar: {
            show: false
          }
        },
        title: {
          text: 'Colors are also available',
          align: 'right',
          margin: 0,
          style: {
            fontSize: '18px',
            fontFamily: MONTSERRAT_FONT,
            fontWeight: 'regular',
            color: '#0b369c'
          }
        },
        subtitle: {
          text: 'A subtitle',
          align: 'right',
          margin: 20,
          style: {
            fontFamily: HELVETICA_FONT,
            fontWeight: 'bold',
            color: '#0b369c'
          },
        }
      }
    })
  }

  const chartColor1 = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        colors: ['#44c'],
        fill: {
          type: 'gradien',
          gradient: {
            shade: 'dark',
            gradientToColors: ['#FDD835'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          },
        }
      }
    })
  }

  const chartColor2 = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        colors: ['#92fd35'],
        fill: {
          type: 'solid'
        }
      }
    })
  }

  const tooltipSolidBackground = () => {
    setUseCustomTooltip(true)
    setDemoTooltipState({
      border: false,
      shadow: false,
    })

    setState({
      ...state,
      options: {
        ...state.options,
        tooltip: {
          ...state.options.tooltip,
          custom: function ({ series, seriesIndex, dataPointIndex }) {
            return '<div class="arrow_box" style="padding: 5px; background: #a6ccff; color: #000;">' +
              '<span>Shipments: ' + series[seriesIndex][dataPointIndex] + '</span>' +
              '</div>'
          }
        }
      }
    })
  }

  const tooltipRounded = () => {
    setUseCustomTooltip(true)
    setDemoTooltipState({
      border: true,
      shadow: false,
    })

    setState({
      ...state,
      options: {
        ...state.options,
        tooltip: {
          ...state.options.tooltip,
          custom: function ({ series, seriesIndex, dataPointIndex }) {
            return '<div class="arrow_box" style="padding: 10px; color: #000;">' +
              '<span>Shipments: ' + series[seriesIndex][dataPointIndex] + '</span>' +
              '</div>'
          }
        }
      }
    })
  }

  const tooltipShadow = () => {
    setDemoTooltipState({
      border: false,
      shadow: true,
    })
    setUseCustomTooltip(true)

    setState({
      ...state,
      options: {
        ...state.options,
        tooltip: {
          ...state.options.tooltip,
          custom: function ({ series, seriesIndex, dataPointIndex }) {
            return '<div class="arrow_box" style="padding: 5px; color: #000;">' +
              '<span>Shipments: ' + series[seriesIndex][dataPointIndex] + '</span>' +
              '</div>'
          }
        }
      }
    })
  }

  const tooltipText1 = () => {
    setUseCustomTooltip(true)
    setState({
      ...state,
      options: {
        ...state.options,
        tooltip: {
          ...state.options.tooltip,
          custom: function ({ series, seriesIndex, dataPointIndex }) {
            return '<div class="arrow_box" style="width: 150px; font-family: Montserrat, sans-serif; font-size: 14px; color: #005cd6; text-align: center">' +
              '<span>Shipments: ' + series[seriesIndex][dataPointIndex] + '</span>' +
              '</div>'
          }
        }
      }
    })
  }

  const tooltipText2 = () => {
    setUseCustomTooltip(true)
    setState({
      ...state,
      options: {
        ...state.options,
        tooltip: {
          ...state.options.tooltip,
          custom: function ({ series, seriesIndex, dataPointIndex }) {
            return '<div class="arrow_box" style="width: 150px; font-size: 16px; color: #d67200; text-align: right">' +
              '<span>Shipments: ' + series[seriesIndex][dataPointIndex] + '</span>' +
              '</div>'
          }
        }
      }
    })
  }

  const axisLines1 = () => {
    setState({
      ...state,
      options: {
        xaxis: {
          ...state.options.xaxis,
          axisBorder: {
            show: true,
            color: '#213ede',
            // @ts-ignore: types are incorrect
            height: 2,
            offsetX: 0,
            offsetY: 0
          },
        },
        yaxis: {
          ...state.options.yaxis,
          axisBorder: {
            show: true,
            color: '#213ede',
            width: 2,
            offsetX: -2,
            offsetY: 0,
          },
        }
      }
    })

  }

  const axisLines2 = () => {
    setState({
      ...state,
      options: {
        xaxis: {
          ...state.options.xaxis,
          axisBorder: {
            show: false,
          },
        },
        yaxis: {
          ...state.options.yaxis,
          axisBorder: {
            show: false,
          },
        }
      }
    })
  }

  const gridLines1 = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        grid: {
          ...state.options.grid,
          borderColor: '#64047899',
          strokeDashArray: 10,
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: false
            }
          }
        },
      }
    })
  }

  const gridLines2 = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        grid: {
          ...state.options.grid,
          borderColor: '#045b7899',
          strokeDashArray: 10,
          xaxis: {
            lines: {
              show: false
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          }
        },
      }
    })
  }

  const axisTickMarks1 = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        yaxis: {
          ...state.options.yaxis,
          axisTicks: {
            show: true,
            color: '#78909C',
            width: 10,
            offsetX: 0,
            offsetY: 0
          },
        },
        xaxis: {
          ...state.options.xaxis,
          axisTicks: {
            show: true,
            color: '#78909C',
            height: 10,
            offsetX: 0,
            offsetY: 0
          },
        }
      }
    })
  }

  const axisTickMarks2 = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        yaxis: {
          ...state.options.yaxis,
          axisTicks: {
            show: true,
            color: '#f00',
            width: 5,
            offsetX: -4,
            offsetY: 0
          },
        },
        xaxis: {
          ...state.options.xaxis,
          axisTicks: {
            show: true,
            color: '#f00',
            height: 5,
            offsetX: 0,
            offsetY: 4
          },
        }
      }
    })
  }

  const lineSolid = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        colors: [getRandomDarkColor()],
        fill: {
          type: 'solid'
        },
        stroke: {
          ...state.options.stroke,
          dashArray: 0
        }
      }
    })
  }

  const lineDashed = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        fill: {
          type: 'solid'
        },
        stroke: {
          ...state.options.stroke,
          dashArray: 3
        }
      }
    })
  }

  const lineCurve = () => {

    const allCurveOptions = ['smooth', 'linestep', 'monotoneCubic', 'stepline', 'straight']
    const randomIndex = generateRandomNumber([0, allCurveOptions.length - 1])

    const randomCurve = allCurveOptions[randomIndex] as 'smooth' | 'linestep' | 'monotoneCubic' | 'stepline' | 'straight'

    setState({
      ...state,
      options: {
        ...state.options,
        fill: {
          type: 'solid'
        },
        stroke: {
          ...state.options.stroke,
          curve: randomCurve,
        }
      }
    })

    setCurve(randomCurve)
  }

  const lineWidth = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        stroke: {
          ...state.options.stroke,
          width: 2
        }
      }
    })
  }

  const legendTop = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        legend: {
          show: true,
          showForSingleSeries: true,
          position: 'top',
          horizontalAlign: 'center',
        }
      }
    })
  }

  const legendBottom = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        legend: {
          show: true,
          showForSingleSeries: true,
          position: 'bottom',
          horizontalAlign: 'center',
        }
      }
    })
  }

  const legendLeft = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        legend: {
          show: true,
          showForSingleSeries: true,
          position: 'left'
        }
      }
    })
  }

  const legendRight = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        legend: {
          show: true,
          showForSingleSeries: true,
          position: 'right',
        }
      }
    })
  }

  const floatPadd = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        legend: {
          ...state.options.legend,
          show: true,
          floating: true,
          position: 'left',
          offsetY: 25,
          offsetX: 5
        }
      }
    })
  }

  const floatMarg = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        legend: {
          ...state.options.legend,
          show: true,
          floating: false,
          position: 'left',
          offsetY: 0,
          offsetX: 0,
          itemMargin: {
            horizontal: generateRandomNumber([0, 10]),
            vertical: generateRandomNumber([0, 10])
          },
        },
      }
    })
  }

  const dataUpdAnim1 = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        chart: {
          animations: {
            enabled: true,
            speed: 800,
            dynamicAnimation: {
              enabled: true,
              speed: 400
            }
          }
        }
      },
      series: [
        {
          name: 'Shipments',
          data: dataGroupedByMonthYear.map(i => i.shipments + generateRandomNumber([-7, 12]))
        }
      ]
    })
  }

  const dataUpdAnim2 = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        chart: {
          animations: {
            enabled: true,
            speed: 800,
            dynamicAnimation: {
              enabled: true,
              speed: 800
            }
          }
        },
        xaxis: {
          ...state.options.xaxis,
          categories: [...dataGroupedByMonthYear.map(i => xAxisFormatter(i.dateRange)), '2026, Jan', '2026, Feb'],
        },
      },
      series: [
        {
          name: 'Shipments',
          data: [...dataGroupedByMonthYear.map(i => i.shipments), 45, 10]
        }
      ]
    })
  }

  useEffect(() => {
    if (transparentBg) {
      const timeoutId = setTimeout(() => {
        setTransparentBg(false)
      }, 3000)
      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [transparentBg])

  return (
    <div className={`my-5 p-2 flex items-center gap-4 rounded transition-colors duration-300${transparentBg ? ' bg-rose-100' : ' bg-transparent'}`}>
      <div style={{ color: "black" }} className="my-4">
        <VariantBar variant="Background">
          <Button onClick={solidBackground}>Solid</Button>
          <Button onClick={transparentBackground}>Transparent</Button>
          <Button onClick={gradientBackground}>Gradient</Button>
        </VariantBar>
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
        <VariantBar variant="Data labels">
          <Button onClick={dataLabelsVariant1}>Example 1</Button>
          <Button onClick={dataLabelsVariant2}>Example 2</Button>
        </VariantBar>
        <VariantBar variant="Legend labels">
          <Button onClick={legendLabelsVariant1}>Example 1</Button>
          <Button onClick={legendLabelsVariant2}>Example 2</Button>
        </VariantBar>
        <VariantBar variant="Chart titles">
          <Button onClick={chartTitleStyle1}>Example 1</Button>
          <Button onClick={chartTitleStyle2}>Example 2</Button>
        </VariantBar>
        <VariantBar variant="Chart colors">
          <Button onClick={chartColor1}>Example 1</Button>
          <Button onClick={chartColor2}>Example 2</Button>
        </VariantBar>
        {
          (demoTooltipState.border || demoTooltipState.shadow) &&
          <style>
            {`
            .apexcharts-tooltip {
              ${demoTooltipState.border ? 'border-radius: 15px !important;' : ''}
              ${demoTooltipState.shadow ? 'box-shadow: 6px 6px 20px 2px rgba(69,69,69,0.75) !important;' : ''}
            }
            }
          `}
          </style>
        }
        <VariantBar variant="Tooltip background">
          <Button onClick={tooltipSolidBackground}>Solid background</Button>
          <Button onClick={tooltipRounded}>Rounded border</Button>
          <Button onClick={tooltipShadow}>Shadow</Button>
        </VariantBar>
        <VariantBar variant="Tooltip text">
          <Button onClick={tooltipText1}>Example 1</Button>
          <Button onClick={tooltipText2}>Example 2</Button>
        </VariantBar>
        <VariantBar variant="X/Y Axis Lines">
          <Button onClick={axisLines1}>Example 1</Button>
          <Button onClick={axisLines2}>Example 2</Button>
        </VariantBar>
        <VariantBar variant="Grid Lines">
          <Button onClick={gridLines1}>Example 1</Button>
          <Button onClick={gridLines2}>Example 2</Button>
        </VariantBar>
        <VariantBar variant="Axis tick marks">
          <Button onClick={axisTickMarks1}>Example 1</Button>
          <Button onClick={axisTickMarks2}>Example 2</Button>
        </VariantBar>
        <VariantBar variant="Line style">
          <Button onClick={lineSolid}>Solid/Color</Button>
          <Button onClick={lineDashed}>Dashed</Button>
          <Button onClick={lineCurve}>Curve</Button>
          <Button onClick={lineWidth}>Width</Button>
        </VariantBar>
        <VariantBar variant="Legend">
          <Button onClick={legendTop}>Top</Button>
          <Button onClick={legendBottom}>Bottom</Button>
          <Button onClick={legendLeft}>Left</Button>
          <Button onClick={legendRight}>Right</Button>
          <Button onClick={floatPadd}>Floating/Padding</Button>
          <Button onClick={floatMarg}>Floating/Margin</Button>
        </VariantBar>
        <VariantBar variant="Data update animation">
          <Button onClick={dataUpdAnim1}>Example 1</Button>
          <Button onClick={dataUpdAnim2}>Example 2</Button>
        </VariantBar>
        <div className="my-4">
          <Button onClick={resetChart} style={{ backgroundColor: 'white', border: '1px solid black', color: 'black' }}>Reset chart styles</Button>
        </div>
      </div>
      <div id="chart" style={{ width: '700px', color: 'black' }}>
        <ReactApexChart options={state.options} series={state.series} type="line" height={300} key={useCustomTooltip ? 'custom' : 'default'} />
        <div className="text-black">
          Curve: {curve}
          <p className="text-xs">*To see tooltip options <span className={useCustomTooltip ? 'mb-4 mt-[-8px] text-red-700' : ''}>hover the line on the chart</span></p>
        </div>
      </div>
    </div>
  )
}