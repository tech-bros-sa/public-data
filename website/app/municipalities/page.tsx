'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Building2,
  Search,
  Download,
  Filter,
  MapPin,
  Phone,
  Globe,
  Mail,
  ChevronDown,
  ChevronUp,
  Users,
  DollarSign,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export default function MunicipalitiesPage() {
  const [municipalities, setMunicipalities] = useState<any[]>([]);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [filteredMunicipalities, setFilteredMunicipalities] = useState<any[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { municipalities: municipalitiesData, provinces: provincesData } =
          await import('@/lib/data-loader');
        const munData = Array.isArray(municipalitiesData)
          ? municipalitiesData
          : [];
        const provData = Array.isArray(provincesData) ? provincesData : [];
        setMunicipalities(munData);
        setProvinces(provData);
        setFilteredMunicipalities(munData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading municipalities:', error);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    let filtered = municipalities;

    if (searchTerm) {
      filtered = filtered.filter((municipality) =>
        Object.values(municipality).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (selectedProvince !== 'all') {
      filtered = filtered.filter(
        (municipality) =>
          municipality.province === selectedProvince ||
          municipality.province_code === selectedProvince
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(
        (municipality) =>
          municipality.type === selectedType ||
          municipality.municipality_type === selectedType
      );
    }

    setFilteredMunicipalities(filtered);
  }, [searchTerm, selectedProvince, selectedType, municipalities]);

  const downloadJSON = () => {
    const dataStr = JSON.stringify(filteredMunicipalities, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'municipalities.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>
          <Building2 className='h-12 w-12 text-green-600 mx-auto mb-4 animate-pulse' />
          <p className='text-gray-600'>Loading municipalities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            South African Municipalities
          </h1>
          <p className='text-gray-600'>
            Showing {filteredMunicipalities.length} of {municipalities.length}{' '}
            municipalities
          </p>
        </div>
        <Button onClick={downloadJSON} variant='outline'>
          <Download className='h-4 w-4 mr-2' />
          Download JSON
        </Button>
      </div>

      {/* Filters */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
          <Input
            placeholder='Search municipalities...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10'
          />
        </div>
        <Select value={selectedProvince} onValueChange={setSelectedProvince}>
          <SelectTrigger>
            <SelectValue placeholder='All Provinces' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Provinces</SelectItem>
            {provinces.map((province) => (
              <SelectItem
                key={province.code || province.id}
                value={province.code || province.id}
              >
                {province.name.en || province.province_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger>
            <SelectValue placeholder='All Types' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Types</SelectItem>
            <SelectItem value='metro'>Metro</SelectItem>
            <SelectItem value='local'>Local</SelectItem>
            <SelectItem value='district'>District</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant='outline'
          onClick={() => {
            setSearchTerm('');
            setSelectedProvince('all');
            setSelectedType('all');
          }}
        >
          <Filter className='h-4 w-4 mr-2' />
          Clear Filters
        </Button>
      </div>

      {/* Municipalities Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {filteredMunicipalities.map((municipality, index) => (
          <MunicipalityCard key={index} municipality={municipality} />
        ))}
      </div>

      {filteredMunicipalities.length === 0 && (
        <div className='text-center py-12'>
          <Building2 className='h-12 w-12 text-gray-400 mx-auto mb-4' />
          <h3 className='text-lg font-medium text-gray-900 mb-2'>
            No municipalities found
          </h3>
          <p className='text-gray-600'>
            Try adjusting your search terms or filters.
          </p>
        </div>
      )}
    </div>
  );
}

function MunicipalityCard({ municipality }: { municipality: any }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className='hover:shadow-lg transition-shadow'>
      <CardHeader>
        <div className='flex items-start justify-between'>
          <div className='flex items-center gap-3 flex-1'>
            <div className='p-2 bg-green-500 rounded-lg flex-shrink-0'>
              <Building2 className='h-5 w-5 text-white' />
            </div>
            <div className='flex-1 min-w-0'>
              <CardTitle className='text-lg leading-tight'>
                {municipality.name ||
                  municipality.municipality_name ||
                  'Municipality'}
              </CardTitle>
              <div className='flex flex-wrap gap-2 mt-2'>
                {municipality.code && (
                  <Badge variant='secondary' className='text-xs'>
                    {municipality.code}
                  </Badge>
                )}
                {(municipality.type || municipality.municipality_type) && (
                  <Badge variant='outline' className='text-xs'>
                    {municipality.type || municipality.municipality_type}
                  </Badge>
                )}
                {municipality.mdb_code && (
                  <Badge variant='outline' className='text-xs'>
                    MDB: {municipality.mdb_code}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className='space-y-4'>
        {/* Basic Info */}
        <div className='grid grid-cols-2 gap-4 text-sm'>
          {municipality.province && (
            <div className='flex items-center gap-2'>
              <MapPin className='h-4 w-4 text-gray-500' />
              <span>{municipality.province}</span>
            </div>
          )}
          {municipality.area_in_km_squared && (
            <div className='flex items-center gap-2'>
              <Users className='h-4 w-4 text-gray-500' />
              <span>
                {municipality.area_in_km_squared.toLocaleString()} km²
              </span>
            </div>
          )}
        </div>

        {/* Contact Info */}
        {(municipality.tel || municipality.website) && (
          <div className='space-y-2'>
            {municipality.tel && (
              <div className='flex items-center gap-2 text-sm'>
                <Phone className='h-4 w-4 text-gray-500' />
                <span>{municipality.tel}</span>
              </div>
            )}
            {municipality.website && (
              <div className='flex items-center gap-2 text-sm'>
                <Globe className='h-4 w-4 text-gray-500' />
                <a
                  href={
                    municipality.website.startsWith('http')
                      ? municipality.website
                      : `https://${municipality.website}`
                  }
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 hover:underline'
                >
                  {municipality.website}
                </a>
              </div>
            )}
          </div>
        )}

        {/* Address */}
        {municipality.address && (
          <div className='space-y-2'>
            <h4 className='font-medium text-sm'>Address</h4>
            <div className='text-sm text-gray-600 space-y-1'>
              {municipality.address.physical && (
                <div>
                  <span className='font-medium'>Physical:</span>{' '}
                  {municipality.address.physical}
                </div>
              )}
              {municipality.address.postal && (
                <div>
                  <span className='font-medium'>Postal:</span>{' '}
                  {municipality.address.postal}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Description - Collapsible */}
        {municipality.description && (
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <Button
                variant='ghost'
                className='w-full justify-between p-0 h-auto'
              >
                <span className='font-medium text-sm'>Description</span>
                {isExpanded ? (
                  <ChevronUp className='h-4 w-4' />
                ) : (
                  <ChevronDown className='h-4 w-4' />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className='mt-2'>
              <div className='text-sm text-gray-600 max-h-32 overflow-y-auto bg-gray-50 p-3 rounded'>
                {municipality.description}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Towns - Scrollable */}
        {municipality.towns &&
          Array.isArray(municipality.towns) &&
          municipality.towns.length > 0 && (
            <div className='space-y-2'>
              <h4 className='font-medium text-sm'>
                Towns ({municipality.towns.length})
              </h4>
              <div className='max-h-24 overflow-y-auto bg-gray-50 p-2 rounded'>
                <div className='flex flex-wrap gap-1'>
                  {municipality.towns.map((town: string, idx: number) => (
                    <Badge key={idx} variant='outline' className='text-xs'>
                      {town}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

        {/* Economic Sectors */}
        {municipality.economic_sectors &&
          Array.isArray(municipality.economic_sectors) &&
          municipality.economic_sectors.length > 0 && (
            <div className='space-y-2'>
              <h4 className='font-medium text-sm flex items-center gap-2'>
                <DollarSign className='h-4 w-4' />
                Economic Sectors
              </h4>
              <div className='flex flex-wrap gap-1'>
                {municipality.economic_sectors.map(
                  (sector: string, idx: number) => (
                    <Badge key={idx} variant='secondary' className='text-xs'>
                      {sector.name +
                        (sector.percentage ? ` (${sector.percentage}%)` : '')}
                    </Badge>
                  )
                )}
              </div>
            </div>
          )}

        {/* Department Contacts - Collapsible */}
        {municipality.contacts?.departments && (
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button
                variant='ghost'
                className='w-full justify-between p-0 h-auto'
              >
                <span className='font-medium text-sm flex items-center gap-2'>
                  <Mail className='h-4 w-4' />
                  Department Contacts
                </span>
                <ChevronDown className='h-4 w-4' />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className='mt-2'>
              <div className='space-y-2 max-h-32 overflow-y-auto bg-gray-50 p-3 rounded'>
                {Object.entries(municipality.contacts.departments).map(
                  ([dept, contact]) => (
                    <div key={dept} className='text-xs'>
                      <span className='font-medium capitalize'>
                        {dept.replace(/_/g, ' ')}:
                      </span>
                      <div className='text-gray-600 ml-2'>
                        {String(contact)}
                      </div>
                    </div>
                  )
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
}
