# ZA Public Data

Standardized access to South African governmental and administrative data.

## Features

- Comprehensive collection of South African public data
- TypeScript support with full type definitions
- Available in both CommonJS and ES Module formats
- Validated data schemas
- Regular updates with version control
- Extensive documentation and examples

## Installation

```bash
npm install za-public-data
```

## Usage

```typescript
import { provinces, GovernmentDepartmentSchema } from 'za-public-data';

// Access province data
const easternCape = provinces.find(p => p.code === 'EC');

// Validate government department data
const departmentData = {
  // ... your data
};
const validatedData = GovernmentDepartmentSchema.parse(departmentData);
```

## Data Sets

- Provinces and Municipalities
- Government Departments
- Public Institutions
- Administrative Regions
- Public Holidays
- National Symbols

## Documentation

Full documentation is available at [docs/index.html](docs/index.html)

## Contributing

Contributions are welcome! Please read our contributing guidelines for details.

## License

MIT