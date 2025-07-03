import data from '../data/data-table.json'
import type { Shipment } from '../types/table'

type fnParams = {
  key: string,
  sortDirection: 'asc' | 'desc'
}

export const getSortedData = ({ key, sortDirection }: fnParams): Shipment[] => {
  return data.toSorted((a, b) => {
    if (typeof a[key as keyof typeof a] === 'string') {
      return sortDirection === 'asc'
        ? (a[key as keyof typeof a] as string).localeCompare(b[key as keyof typeof b] as string)
        : (b[key as keyof typeof b] as string).localeCompare(a[key as keyof typeof a] as string)
    }

    if (typeof a[key as keyof typeof a] === 'number') {
      return sortDirection === 'asc'
        ? (a[key as keyof typeof a] as number) - (b[key as keyof typeof b] as number)
        : (b[key as keyof typeof b] as number) - (a[key as keyof typeof a] as number)
    }

    return 0
  })
}

type splitDataParams = {
  page: number,
  pageSize: number
}

export const splitData = ({ page = 0, pageSize = 5 }: splitDataParams) => {

  const splittedData = data.slice(page * pageSize, (page + 1) * pageSize)
  return {
    data: splittedData,
    total: data.length,
    page,
    pageSize
  }
}

export const getOriginOptions = () => {
  const originOptions = data.map(item => item.origin)
  return [...new Set(originOptions)]
}
export const getDestinationOptions = () => {
  const destinationOptions = data.map(item => item.destination)
  return [...new Set(destinationOptions)]
}
export const getStatusOptions = () => {
  const statusOptions = data.map(item => item.status)
  return [...new Set(statusOptions)]
}
