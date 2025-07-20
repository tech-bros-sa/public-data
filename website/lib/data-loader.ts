// Simple data loader that handles missing files gracefully
let provinces: any[] = [];
let metros: any[] = [];
let locals: any[] = [];
let banks: any[] = [];
let universities: any[] = [];
let schools: any[] = [];
let networks: any[] = [];
let entities: any[] = [];
let hardwareStores: any[] = [];
let clothingStores: any[] = [];
let supermarkets: any[] = [];
let insuranceStores: any[] = [];
let samsungCsc: any[] = [];
let pepPaxiCodes: any[] = [];

// Try to load each data file, use empty array if not found
try {
  provinces = require('../../src/data/gov/provinces/index.json') || [];
} catch (e) {
  provinces = [];
}

try {
  metros = require('../../src/data/gov/municipalities/metros.json') || [];
} catch (e) {
  metros = [];
}

try {
  locals = require('../../src/data/gov/municipalities/locals.json') || [];
} catch (e) {
  locals = [];
}

try {
  banks = require('../../src/data/banks/index.json') || [];
} catch (e) {
  banks = [];
}

try {
  universities =
    require('../../src/data/education/universities/index.json') || [];
} catch (e) {
  universities = [];
}

try {
  schools = require('../../src/data/education/schools/index.json') || [];
} catch (e) {
  schools = [];
}

try {
  networks = require('../../src/data/networks/index.json') || [];
} catch (e) {
  networks = [];
}

try {
  entities = require('../../src/data/gov/entities/index.json') || [];
} catch (e) {
  entities = [];
}

try {
  hardwareStores = require('../../src/data/stores/hardware/index.json') || [];
} catch (e) {
  hardwareStores = [];
}

try {
  clothingStores = require('../../src/data/stores/clothing/index.json') || [];
} catch (e) {
  clothingStores = [];
}

try {
  supermarkets = require('../../src/data/stores/supermarkets/index.json') || [];
} catch (e) {
  supermarkets = [];
}

try {
  insuranceStores = require('../../src/data/stores/insurance/index.json') || [];
} catch (e) {
  insuranceStores = [];
}

try {
  samsungCsc = require('../../src/data/android/samsung/csc/index.json') || [];
} catch (e) {
  samsungCsc = [];
}

try {
  pepPaxiCodes =
    require('../../src/data/stores/store-codes/pep-paxi-store-codes.json') ||
    [];
} catch (e) {
  pepPaxiCodes = [];
}

// Ensure all exports are arrays
export {
  provinces,
  metros,
  locals,
  banks,
  universities,
  schools,
  networks,
  entities,
  hardwareStores,
  clothingStores,
  supermarkets,
  insuranceStores,
  samsungCsc,
  pepPaxiCodes,
};

// Combine municipalities
export const municipalities = [...metros, ...locals];

// Utility functions
export const getProvinceByCode = (code: string) => {
  return provinces.find((p: any) => p?.code === code);
};

export const getMunicipalitiesByProvince = (provinceCode: string) => {
  return municipalities.filter((m: any) => m?.province === provinceCode);
};

export const getBankByCode = (code: string) => {
  return banks.find((b: any) => b?.code === code);
};
