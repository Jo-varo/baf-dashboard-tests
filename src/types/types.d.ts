import type { ApexOptions } from "apexcharts";

declare global {
  interface ObjectConstructor {
    groupBy<T, K extends PropertyKey>(
      items: Iterable<T>,
      callback: (item: T, index: number) => K
    ): Record<K, T[]>;
  }

  interface Array<T> {
    toSorted(compareFn?: (a: T, b: T) => number): T[]
  }
}

export interface ApexChartState {
  options: ApexOptions;
  series: ApexOptions["series"];
}