import samsungCscData from "./android/samsung/csc/index.json"

export interface SamsungCSC {
  code: string
  country: string
  carrier?: string
  region: string
  description: string
}

export const samsungCSCCodes: SamsungCSC[] = samsungCscData as SamsungCSC[]

export function getSamsungCSCByCode(code: string): SamsungCSC | undefined {
  return samsungCSCCodes.find((csc) => csc.code === code)
}

export function getSamsungCSCByCarrier(carrier: string): SamsungCSC[] {
  return samsungCSCCodes.filter((csc) => csc.carrier?.toLowerCase().includes(carrier.toLowerCase()))
}

export function getSouthAfricanCSCCodes(): SamsungCSC[] {
  return samsungCSCCodes.filter((csc) => csc.country === "South Africa")
}
