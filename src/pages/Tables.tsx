import { useState } from "react"
import { Button } from "../components/Custom/Button"
import { TSTable } from "../components/tables/TanStack"
import { TSDivTable } from "../components/tables/TSDiv"

const Tables = {
  TS_TABLE: {
    label: 'TanStack',
    value: 'ts_table'
  },
  TS_DIV_TABLE: {
    label: 'TanStack DIV',
    value: 'ts_div_table'
  },
  AG_GRID: {
    label: 'AG Grid',
    value: 'ag_grid_table'
  },
  REACT_DG: {
    label: 'React Data Grid',
    value: 'react_data_grid'
  },
}

export const TablesDemo = () => {

  const [selectedTable, setSelectedTable] = useState(Tables.TS_DIV_TABLE.value)

  return (
    <div className="my-4 text-black">
      <h2 className="text-3xl">Tables</h2>
      <div className="my-4 flex gap-2 items-center justify-center">
        {
          Object.keys(Tables).map(key => (
            <Button key={key} onClick={() => setSelectedTable(Tables[key as keyof typeof Tables].value)}>
              {Tables[key as keyof typeof Tables].label}
            </Button>
          ))
        }
      </div>
      {selectedTable === Tables.TS_TABLE.value && <TSTable />}
      {selectedTable === Tables.TS_DIV_TABLE.value && <TSDivTable />}
    </div>
  )
}