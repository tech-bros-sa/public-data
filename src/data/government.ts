import entitiesData from "./gov/entities/index.json"
import type { GovernmentDepartment } from "../types"

export const governmentEntities: GovernmentDepartment[] = entitiesData as GovernmentDepartment[]

export function getGovernmentEntityByCode(code: string): GovernmentDepartment | undefined {
  return governmentEntities.find((entity) => entity.code === code)
}

export function getGovernmentEntitiesByLevel(level: "national" | "provincial"): GovernmentDepartment[] {
  return governmentEntities.filter((entity) => entity.level === level)
}

export function getGovernmentEntitiesByProvince(provinceCode: string): GovernmentDepartment[] {
  return governmentEntities.filter((entity) => entity.province === provinceCode)
}

export function getNationalDepartments(): GovernmentDepartment[] {
  return getGovernmentEntitiesByLevel("national")
}

export function getProvincialDepartments(): GovernmentDepartment[] {
  return getGovernmentEntitiesByLevel("provincial")
}
