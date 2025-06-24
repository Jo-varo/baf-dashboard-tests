import { useState } from "react";
import { CDDBar } from "../components/CDD/Bar";
import { CDDLine } from "../components/CDD/Line";
import { CDDPie } from "../components/CDD/Pie";
import { CDDRadial } from "../components/CDD/Radial";
import { Button } from "../components/Button";

const Charts = {
  LINE: 'line',
  BAR: 'bar',
  PIE: 'pie',
  RADIAL: 'radial',
}

export default function CDD() {

  const [barType, setBarType] = useState<string>(Charts.LINE)

  return (
    <div>
      <div className="my-4 flex gap-2 items-center justify-center">
        <h4 style={{color:'black'}}>Chart types</h4>
      {
        Object.keys(Charts).map(key => (
          <Button key={key} onClick={() => setBarType(Charts[key as keyof typeof Charts])}>
            {key}
          </Button>
        ))
      }
      </div>
      {barType === Charts.LINE && <CDDLine />}
      {barType === Charts.BAR && <CDDBar />}
      {barType === Charts.PIE && <CDDPie />}
      {barType === Charts.RADIAL && <CDDRadial />}
    </div>
  )
}

