//@ts-nocheck - Only for chart demo deploy, remove it later and fix all the type errors

import data from '../data/data.json'

const oDataGroupedByMonthYear = data.reduce((acc, item) => {
  const yearMonth = item.date.substring(0, 7);
  if (!acc[yearMonth]) {
    acc[yearMonth] = item.shipments;
  } else {
    acc[yearMonth] += item.shipments;
  }
  return acc;
}, {} as unknown as Record<string, number>)

export const dataGroupedByMonthYear = Object.entries(oDataGroupedByMonthYear).map(([key, value]) => ({ dateRange: key, shipments: value }))

export const dataGroupedByDestination = Object.groupBy(data, ({ destination }) => destination)

export const dataAggregationByDestination = Object.entries(
  data.reduce((acc, item) => {
    const destination = item.destination;
    if (!acc[destination]) {
      acc[destination] = item.shipments;
    } else {
      acc[destination] += item.shipments;
    }
    return acc;

  }, {} as unknown as Record<string, number>)
).map(([key, value]) => ({ destination: key, shipments: value }))


