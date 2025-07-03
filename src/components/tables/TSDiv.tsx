import { createColumnHelper, flexRender, getCoreRowModel, getExpandedRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import type { Shipment } from "../../types/table";
import mockData from "../../data/data-table.json"
import { Fragment } from "react/jsx-runtime";
import styles from './TanStack.module.css';
import { useMemo, useState } from "react";
import { getDestinationOptions, getOriginOptions, getStatusOptions } from "../../helpers/data-table";

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
    enableSorting: false
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

const originOptions = getOriginOptions()
const destinationOptions = getDestinationOptions()
const statusOptions = getStatusOptions()

export const TSDivTable = () => {

  const [filters, setFilters] = useState({
    origin: '',
    destination: '',
    status: '',
    startDate: '',
    endDate: ''
  })

  const filteredData: Shipment[] = useMemo(() =>
    mockData.filter(item => {
      // The logic is: "return true if the filter is not set, OR if the item matches the filter."
      // We chain these conditions together with &&.
      // If any condition is false, the entire expression becomes false, and the item is filtered out

      const matchesOrigin = !filters.origin || item.origin === filters.origin;
      const matchesDestination = !filters.destination || item.destination === filters.destination;
      const matchesStatus = !filters.status || item.status === filters.status;

      //TODO: end date range


      return matchesOrigin && matchesDestination && matchesStatus;
    })
    , [filters])

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 4,
      },
    },
    getSortedRowModel: getSortedRowModel(),
  })

  const pageSizeOptions = useMemo(() => [4, 5, 6, 7], [])


  return (
    <div className="p-2">
      <div className="my-2 flex gap-4 items-center">
        Date range
        <input type="date" name="start" className="border rounded-md p-1 bg-indigo-900 text-white" value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} />
        <input type="date" name="end" className="border rounded-md p-1 bg-indigo-900 text-white" value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} />
        <select
          name="origin"
          className="border rounded-md p-1"
          value={filters.origin}
          onChange={(e) => setFilters({ ...filters, origin: e.target.value })}>
          <option value="">Select origin</option>
          {
            originOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))
          }
        </select>
        <select
          name="destination"
          className="border rounded-md p-1"
          value={filters.destination}
          onChange={(e) => setFilters({ ...filters, destination: e.target.value })}>
          <option value="">Select destination</option>
          {
            destinationOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))
          }
        </select>
        <select
          name="status"
          className="border rounded-md p-1"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">Select status</option>
          {
            statusOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))
          }
        </select>
        <button className="text-white" onClick={() => setFilters({ origin: '', destination: '', status: '', startDate: '', endDate: '' })}>Reset</button>
      </div>
      <div className="flex flex-col gap-y-4">
        {table.getHeaderGroups().map(headerGroup => (
          <div key={headerGroup.id} className="grid grid-cols-8 rounded uppercase font-semibold bg-stone-200 text-stone-500">
            {headerGroup.headers.map(header => (
              <div
                key={header.id}
                className={`p-2 select-none${header.column.getCanSort() ? ' cursor-pointer' : ''}`}
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
              </div>
            ))}
          </div>
        ))}
        <Fragment>
          {table.getRowModel().rows.map(row => (
            <div className="rounded-lg border border-stone-400" key={row.id}>
              <div className="grid grid-cols-8 rounded-t-lg items-center">
                {row.getVisibleCells().map(cell => (
                  <div key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
              <div className="p-4 bg-stone-200 border-stone-400 rounded-b-lg">
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
              </div>
            </div>
          ))}
        </Fragment>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <button
          className="border rounded p-1 text-white"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1 text-white"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1 text-white"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1 text-white"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {pageSizeOptions.map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

