import provincesData from "./gov/provinces/index.json"
import type { Province } from "../types"

export const provinces: Province[] = provincesData as Province[]

export function getProvinceByCode(code: string): Province | undefined {
  return provinces.find((province) => province.code === code)
}

export function getProvinceByName(name: string): Province | undefined {
  return provinces.find(
    (province) =>
      province.name.en.toLowerCase() === name.toLowerCase() ||
      province.name.local?.toLowerCase() === name.toLowerCase(),
  )
}

export function getProvinceCodes(): string[] {
  return provinces.map((province) => province.code)
}

export function getProvinceNames(): string[] {
  return provinces.map((province) => province.name.en)
}
