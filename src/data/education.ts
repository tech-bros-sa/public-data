import universitiesData from "./education/universities/index.json"
import schoolsData from "./education/schools/index.json"

export interface University {
  name: string
  code: string
  type: "university" | "university_of_technology" | "comprehensive"
  province: string
  city: string
  website?: string
  established?: number
}

export interface School {
  name: string
  code: string
  type: "primary" | "secondary" | "combined"
  province: string
  district: string
  language: string[]
}

export const universities: University[] = universitiesData as University[]
export const schools: School[] = schoolsData as School[]

export function getUniversityByCode(code: string): University | undefined {
  return universities.find((university) => university.code === code)
}

export function getUniversitiesByProvince(provinceCode: string): University[] {
  return universities.filter((university) => university.province === provinceCode)
}

export function getSchoolsByProvince(provinceCode: string): School[] {
  return schools.filter((school) => school.province === provinceCode)
}

export function getSchoolsByType(type: School["type"]): School[] {
  return schools.filter((school) => school.type === type)
}
