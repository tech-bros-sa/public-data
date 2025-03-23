import { describe, it, expect } from 'vitest';
import { provinces } from '../data/provinces';
import { ProvinceSchema } from '../schemas';

describe('Provinces Dataset', () => {
  it('should contain valid province data', () => {
    provinces.forEach(province => {
      expect(() => ProvinceSchema.parse(province)).not.toThrow();
    });
  });

  it('should have unique province codes', () => {
    const codes = provinces.map(p => p.code);
    const uniqueCodes = new Set(codes);
    expect(codes.length).toBe(uniqueCodes.size);
  });

  it('should have valid municipality references', () => {
    provinces.forEach(province => {
      province.municipalities.forEach(municipality => {
        expect(municipality.province).toBe(province.code);
      });
    });
  });
});