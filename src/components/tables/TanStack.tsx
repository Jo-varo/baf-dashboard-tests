import { createColumnHelper, flexRender, getCoreRowModel, getExpandedRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import data from "../../data/data-table.json"
import type { Shipment } from "../../types/table"
import { Fragment } from "react/jsx-runtime"
import styles from './TanStack.module.css';

const columnHelper = createColumnHelper<Shipment>()

const columns = [
  columnHelper.accessor('bookingId', {
    cell: info => <div className="text-blue-800 font-semibold">{info.getValue()}</div>,
    header: () => <h3 className="italic">Booking ID</h3>,
  }),
  columnHelper.accessor('reference', {
    cell: info => <div className="text-blue-800 font-semibold">{info.getValue()}</div>,
    header: 'Reference',
  }),
  columnHelper.accessor('origin', {
    cell: info => info.getValue(),
    header: 'Origin',
  }),
  columnHelper.accessor('destination', {
    cell: info => info.getValue(),
    header: 'Destination',
  }),
  columnHelper.accessor('transport', {
    cell: info => info.getValue(),
    header: 'Transport',
  }),
  columnHelper.accessor(row => [row.cartons, row.CBM, row.weightKG], {
    id: 'loads',
    cell: info => {
      const labels = ['boxes', 'CBM', 'kg'];

      return info.getValue()
        .map((val, i) => `${val} ${labels[i]}`)
        .join(', ');
    },
    header: 'Loads',
  }),
  columnHelper.accessor('shipDate', {
    cell: info => info.getValue(),
    header: 'Ship Date',
  }),
  columnHelper.accessor('status', {
    cell: info => info.getValue(),
    header: 'Status',
  })
]

// BORDER Radius in tables don't WORK, 
// with border-collapse: collapse, with  with border-collapse: separate two rows can't be join (main and details rows)

export const TSTable = () => {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowCanExpand: (_row) => true,
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="bg-stone-200 rounded uppercase text-stone-500">
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className={`p-2 font-semibold ${header.column.getCanSort() ? 'cursor-pointer select-none' : ''}`}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <Fragment>
          {table.getRowModel().rows.map(row => (
            <Fragment key={row.id}>
              <tr>
                <td colSpan={9} className="h-4"></td>
              </tr>
              <tbody className="rounded-lg ring ring-stone-400"> {/*ring or outline*/}
                <tr>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="p-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
                <tr className="bg-stone-200">
                  <td colSpan={row.getAllCells().length} className="p-4 rounded-b-lg">
                    <button
                      {...{
                        onClick: row.getToggleExpandedHandler(),
                        style: { cursor: 'pointer' },
                      }}
                      className="text-white font-semibold"
                    >
                      {row.getIsExpanded() ? 'Collapse' : 'Expand'}
                    </button>
                    {row.getIsExpanded() && (
                      <div className={`text-left flex gap-4 items-center justify-between ${styles.custom_h5}`} >
                        <div>Courier logo</div>
                        <div>
                          <h5>Shipment type</h5>
                          {row.original.shipmentType}
                          <h5>Transit time</h5>
                          {row.original.transitTime}
                        </div>
                        <div>
                          <h5>Loads</h5>
                          {row.original.cartons} boxes - {row.original.CBM} CBM - {row.original.weightKG} kg
                          <h5>Your goods type</h5>
                          Booklets / Packaging
                        </div>
                        <div className="max-w-[200px]">
                          <h5>Pickup details</h5>
                          {row.original.pickupDetails}
                        </div>
                        <div className="max-w-[200px]">
                          <h5>Delivery details</h5>
                          {row.original.deliveryDetails}
                        </div>
                        <div className="flex flex-col gap-4">
                          <button className="text-white">View Details</button>
                          <button className="text-white">Re-quote</button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </Fragment>
          ))}
        </Fragment>
      </table>
    </div>
  )
}
