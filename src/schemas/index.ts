import { z } from 'zod';

export const ProvinceSchema = z.object({
  code: z.string().length(2),
  name: z.object({
    en: z.string(),
    local: z.string().optional(),
  }),
  capital: z.string(),
  municipalities: z.array(z.object({
    code: z.string(),
    name: z.object({
      en: z.string(),
      local: z.string().optional(),
    }),
    type: z.enum(['metropolitan', 'district', 'local']),
    province: z.string(),
  })),
  geographicCode: z.string(),
});

export const GovernmentDepartmentSchema = z.object({
  code: z.string(),
  name: z.object({
    en: z.string(),
    local: z.string().optional(),
  }),
  level: z.enum(['national', 'provincial']),
  province: z.string().optional(),
  contact: z.object({
    phone: z.string(),
    email: z.string().email(),
    website: z.string().url(),
    address: z.string(),
  }),
});

export const PublicHolidaySchema = z.object({
  date: z.string(),
  name: z.object({
    en: z.string(),
    local: z.string().optional(),
  }),
  type: z.enum(['public holiday', 'commemorative day']),
  description: z.string(),
  fixed: z.boolean(),
});