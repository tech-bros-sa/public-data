import metrosData from "./gov/municipalities/metros.json"
import localsData from "./gov/municipalities/locals.json"
import type { Municipality } from "../types"

const metros: Municipality[] = metrosData as Municipality[]
const locals: Municipality[] = localsData as Municipality[]

export const municipalities: Municipality[] = [...metros, ...locals]

export function getMunicipalityByCode(code: string): Municipality | undefined {
  return municipalities.find((municipality) => municipality.code === code)
}

export function getMunicipalitiesByProvince(provinceCode: string): Municipality[] {
  return municipalities.filter((municipality) => municipality.province === provinceCode)
}

export function getMunicipalitiesByType(type: Municipality["type"]): Municipality[] {
  return municipalities.filter((municipality) => municipality.type === type)
}

export function getMetropolitanMunicipalities(): Municipality[] {
  return metros
}

export function getLocalMunicipalities(): Municipality[] {
  return locals
}
