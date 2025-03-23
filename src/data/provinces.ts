import { Province } from '../types';

export const provinces: Province[] = [
  {
    code: 'EC',
    name: {
      en: 'Eastern Cape',
      local: 'Mpuma-Koloni',
    },
    capital: 'Bhisho',
    geographicCode: 'ZA-EC',
    municipalities: [
      {
        code: 'BUF',
        name: {
          en: 'Buffalo City Metropolitan',
        },
        type: 'metropolitan',
        province: 'EC',
      },
      // Additional municipalities would be listed here
    ],
  },
  // Additional provinces would be listed here
];