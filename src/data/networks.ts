import networksData from "./networks/index.json"

export interface NetworkProvider {
  name: string
  code: string
  type: "mobile" | "fixed" | "internet"
  services: string[]
  coverage: string[]
}

export const networkProviders: NetworkProvider[] = networksData as NetworkProvider[]

export function getNetworkProviderByCode(code: string): NetworkProvider | undefined {
  return networkProviders.find((provider) => provider.code === code)
}

export function getNetworkProvidersByType(type: NetworkProvider["type"]): NetworkProvider[] {
  return networkProviders.filter((provider) => provider.type === type)
}

export function getMobileProviders(): NetworkProvider[] {
  return getNetworkProvidersByType("mobile")
}

export function getInternetProviders(): NetworkProvider[] {
  return getNetworkProvidersByType("internet")
}
