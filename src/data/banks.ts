import banksData from "./banks/index.json"

export interface Bank {
  name: string
  code: string
  branchCode?: string
  swiftCode?: string
  website?: string
  type: "commercial" | "mutual" | "investment" | "development"
}

export const banks: Bank[] = banksData as Bank[]

export function getBankByCode(code: string): Bank | undefined {
  return banks.find((bank) => bank.code === code)
}

export function getBankByName(name: string): Bank | undefined {
  return banks.find((bank) => bank.name.toLowerCase().includes(name.toLowerCase()))
}

export function getBanksByType(type: Bank["type"]): Bank[] {
  return banks.filter((bank) => bank.type === type)
}
