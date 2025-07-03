import ReactApexChart from "react-apexcharts"
import type { ApexChartState } from "../../types/types"
import { dataAggregationByDestination } from "../../helpers/dataHandlers"
import { useRef, useState } from "react"
import { VariantBar } from "../VariantBar"
import { Button } from "../Custom/Button"

const initialState: ApexChartState = {
  options: {
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
  },
  series: dataAggregationByDestination.map(i => i.shipments)
}

export const CDDPie = () => {
  const [state, setState] = useState<ApexChartState>(initialState)
  const [custom,setCustom] = useState(false)
  const palettes = ['palette1', 'palette2', 'palette3','palette4','palette5','palette6','palette7','palette8','palette9','palette10']

  const currentPalette = useRef<number>(1)

  //Color, segment border, hover highlight, explode/offset on hover

  const color = () => {
    //setCustom(true)
    const selPalette = currentPalette.current === palettes.length ? palettes[0] : palettes[currentPalette.current]
    currentPalette.current++
    if(currentPalette.current === palettes.length){
      currentPalette.current = 0
    }

    setState({
      ...state,
      options: {
        ...state.options,
        //colors: ['#0f0', '#00f', '#f00'],
        theme:{
          palette: selPalette
        }
      }
    })
  }
  

  const segmentBorder = () => {
    setCustom(true)

    setState({
      ...state,
      options: {
        ...state.options,
        stroke:{
          colors: ['#ccc'],
          width: 2,
        }
      }
    })
  }

  const hover = () => {
    setState({
      ...state,
      options: {
        ...state.options,
        states: {
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

  const explode = () => {

  }

  const resetChart = () => {
    setCustom(false)
    setState(initialState)
  }

  return (
    <div className="my-5 p-2 flex items-center gap-4 rounded">
      <div style={{ color: "black" }} className="my-4">
        <VariantBar variant="Chart Options">
          <Button onClick={color}>Color</Button>
          <Button onClick={segmentBorder}>Segment border</Button>
          <Button onClick={hover}>Hover highlight</Button>
          <Button onClick={explode}>Offset on hover</Button>
        </VariantBar>
        <div className="my-4">
          <Button onClick={resetChart} style={{ backgroundColor: 'white', border: '1px solid black', color: 'black' }}>Reset chart styles</Button>
        </div>
      </div>
      <div id="chart" style={{ width: '700px', color: 'black' }}>
        <ReactApexChart key={custom ? 'custom' : 'default'} options={state.options} series={state.series} type="pie" height={300} />
      </div>
    </div>
  )
}