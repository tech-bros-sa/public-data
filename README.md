# ZA Public Data

## (Work in Progress)

A comprehensive South African public data library for developers, providing easy access to provinces, municipalities, government entities, banks, educational institutions, and more.

## Installation

```bash
npm install za-public-data
```

_We dont have an npm library yet but the aim is to have one_

## Usage

### Basic Import

```typescript
import { provinces, municipalities, banks } from 'za-public-data';

// Get all provinces
console.log(provinces);

// Get all municipalities
console.log(municipalities);

// Get all banks
console.log(banks);
```

### Specific Imports

```typescript
// Import specific data sets
import { getProvinceByCode } from 'za-public-data/provinces';
import { getMunicipalitiesByProvince } from 'za-public-data/municipalities';
import { getBankByCode } from 'za-public-data/banks';

// Get Western Cape province
const westernCape = getProvinceByCode('WC');

// Get all municipalities in Western Cape
const wcMunicipalities = getMunicipalitiesByProvince('WC');

// Get a specific bank
const bank = getBankByCode('632005');
```

### Available Data Sets

- **Provinces**: All 9 South African provinces with codes and municipalities
- **Municipalities**: Metropolitan, district, and local municipalities
- **Banks**: Commercial banks with codes and details
- **Education**: Universities and schools
- **Stores**: Hardware stores, clothing stores, supermarkets, insurance providers
- **Government**: Government departments and entities
- **Networks**: Mobile and internet service providers
- **Android**: Samsung CSC codes for South Africa

### Utility Functions

```typescript
import {
  validateProvinceCode,
  searchByName,
  groupByProvince,
} from 'za-public-data';

// Validate province code
const isValid = validateProvinceCode('WC'); // true

// Search functionality
const results = searchByName(universities, 'Cape Town');

// Group items by province
const grouped = groupByProvince(universities);
```

## API Reference

### Provinces

- `provinces`: Array of all provinces
- `getProvinceByCode(code: string)`: Get province by code
- `getProvinceByName(name: string)`: Get province by name
- `getProvinceCodes()`: Get all province codes
- `getProvinceNames()`: Get all province names

### Municipalities

- `municipalities`: Array of all municipalities
- `getMunicipalityByCode(code: string)`: Get municipality by code
- `getMunicipalitiesByProvince(provinceCode: string)`: Get municipalities by province
- `getMunicipalitiesByType(type)`: Get municipalities by type
- `getMetropolitanMunicipalities()`: Get all metropolitan municipalities
- `getLocalMunicipalities()`: Get all local municipalities

### Banks

- `banks`: Array of all banks
- `getBankByCode(code: string)`: Get bank by code
- `getBankByName(name: string)`: Get bank by name
- `getBanksByType(type)`: Get banks by type

## TypeScript Support

This library is written in TypeScript and provides full type definitions for all data structures.

```typescript
import { Province, Municipality, Bank } from 'za-public-data';

const province: Province = getProvinceByCode('WC');
const municipality: Municipality = getMunicipalityByCode('CPT');
const bank: Bank = getBankByCode('632005');
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details.
