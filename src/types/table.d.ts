export interface Shipment {
  bookingId: string
  reference: string,
  origin: string,
  destination: string,
  transport: string,
  cartons: number,
  CBM: number,
  weightKG: number,
  shipDate: string,
  status: string,
  shipmentType: string,
  transitTime: string,
  pickupDetails: string,
  deliveryDetails: string,
}