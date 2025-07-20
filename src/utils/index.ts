import { provinces } from "../data/provinces"
import { municipalities } from "../data/municipalities"

export function validateProvinceCode(code: string): boolean {
  return provinces.some((province) => province.code === code)
}

export function validateMunicipalityCode(code: string): boolean {
  return municipalities.some((municipality) => municipality.code === code)
}

export function formatProvinceCode(code: string): string {
  return code.toUpperCase().trim()
}

export function searchByName(items: any[], searchTerm: string, nameField = "name"): any[] {
  const term = searchTerm.toLowerCase()
  return items.filter((item) => {
    const name = item[nameField]
    if (typeof name === "string") {
      return name.toLowerCase().includes(term)
    }
    if (typeof name === "object" && name.en) {
      return name.en.toLowerCase().includes(term) || (name.local && name.local.toLowerCase().includes(term))
    }
    return false
  })
}

export function groupByProvince<T extends { province: string }>(items: T[]): Record<string, T[]> {
  return items.reduce(
    (acc, item) => {
      if (!acc[item.province]) {
        acc[item.province] = []
      }
      acc[item.province].push(item)
      return acc
    },
    {} as Record<string, T[]>,
  )
}
