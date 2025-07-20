export interface Province {
  code: string;
  name: {
    en: string;
    local?: string;
  };
  capital: string;
  municipalities: Municipality[];
  geographicCode: string;
}

export interface Municipality {
  code: string;
  name: {
    en: string;
    local?: string;
  };
  type: 'metropolitan' | 'district' | 'local';
  province: string;
}

export interface GovernmentDepartment {
  code: string;
  name: {
    en: string;
    local?: string;
  };
  level: 'national' | 'provincial';
  province?: string;
  contact: {
    phone: string;
    email: string;
    website: string;
    address: string;
  };
}

export interface PublicInstitution {
  id: string;
  type: 'university' | 'hospital' | 'court' | 'other';
  name: {
    en: string;
    local?: string;
  };
  location: {
    province: string;
    municipality: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  contact: {
    phone: string;
    email: string;
    website: string;
    address: string;
  };
}

export interface PublicHoliday {
  date: string;
  name: {
    en: string;
    local?: string;
  };
  type: 'public holiday' | 'commemorative day';
  description: string;
  fixed: boolean;
}

export interface NationalSymbol {
  type: 'flag' | 'coat of arms' | 'anthem' | 'animal' | 'bird' | 'fish' | 'flower' | 'tree';
  name: {
    en: string;
    local?: string;
  };
  description: string;
  imageUrl?: string;
  adoptionDate?: string;
}
