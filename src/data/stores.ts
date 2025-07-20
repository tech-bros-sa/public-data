import hardwareData from "./stores/hardware/index.json"
import clothingData from "./stores/clothing/index.json"
import supermarketsData from "./stores/supermarkets/index.json"
import insuranceData from "./stores/insurance/index.json"
import pepPaxiCodes from "./stores/store-codes/pep-paxi-store-codes.json"

export interface Store {
  name: string
  code?: string
  type: string
  province?: string
  city?: string
  address?: string
  coordinates?: {
    latitude: number
    longitude: number
  }
}

export const hardwareStores: Store[] = hardwareData as Store[]
export const clothingStores: Store[] = clothingData as Store[]
export const supermarkets: Store[] = supermarketsData as Store[]
export const insuranceProviders: Store[] = insuranceData as Store[]
export const pepPaxiStoreCodes = pepPaxiCodes

export const allStores: Store[] = [...hardwareStores, ...clothingStores, ...supermarkets, ...insuranceProviders]

export function getStoresByType(type: string): Store[] {
  return allStores.filter((store) => store.type === type)
}

export function getStoresByProvince(provinceCode: string): Store[] {
  return allStores.filter((store) => store.province === provinceCode)
}

export function getStoreByCode(code: string): Store | undefined {
  return allStores.find((store) => store.code === code)
}
