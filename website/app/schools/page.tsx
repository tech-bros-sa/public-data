'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Download,
  Search,
  GraduationCap,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { schools, provinces } from '@/lib/data-loader';

const ITEMS_PER_PAGE = 50;

export default function SchoolsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Filter schools based on search and province
  const filteredSchools = useMemo(() => {
    let filtered = schools;

    if (searchTerm) {
      filtered = filtered.filter(
        (school: any) =>
          school.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          school.district?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          school.town?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedProvince !== 'all') {
      filtered = filtered.filter(
        (school: any) => school.province === selectedProvince
      );
    }

    return filtered;
  }, [searchTerm, selectedProvince]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredSchools.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentSchools = filteredSchools.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedProvince]);

  const downloadJSON = () => {
    setIsLoading(true);
    try {
      const dataStr = JSON.stringify(schools, null, 2);
      const dataUri =
        'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const exportFileDefaultName = 'za-schools.json';
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } finally {
      setIsLoading(false);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    buttons.push(
      <Button
        key='prev'
        variant='outline'
        size='sm'
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className='h-4 w-4' />
      </Button>
    );

    // First page
    if (startPage > 1) {
      buttons.push(
        <Button key={1} variant='outline' size='sm' onClick={() => goToPage(1)}>
          1
        </Button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key='ellipsis1' className='px-2'>
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={i === currentPage ? 'default' : 'outline'}
          size='sm'
          onClick={() => goToPage(i)}
        >
          {i}
        </Button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key='ellipsis2' className='px-2'>
            ...
          </span>
        );
      }
      buttons.push(
        <Button
          key={totalPages}
          variant='outline'
          size='sm'
          onClick={() => goToPage(totalPages)}
        >
          {totalPages}
        </Button>
      );
    }

    // Next button
    buttons.push(
      <Button
        key='next'
        variant='outline'
        size='sm'
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className='h-4 w-4' />
      </Button>
    );

    return buttons;
  };

  return (
    <div className='min-h-screen bg-slate-50'>
      {/* Header */}
      <header className='bg-white border-b sticky top-0 z-50'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Link
                href='/'
                className='text-blue-600 hover:text-blue-700 flex items-center gap-2'
              >
                <ArrowLeft className='h-4 w-4' />
                Back to Home
              </Link>
              <div className='h-6 w-px bg-gray-300' />
              <div className='flex items-center gap-2'>
                <GraduationCap className='h-5 w-5 text-blue-600' />
                <h1 className='text-xl font-semibold'>South African Schools</h1>
              </div>
            </div>
            <Button onClick={downloadJSON} disabled={isLoading}>
              <Download className='h-4 w-4 mr-2' />
              {isLoading ? 'Preparing...' : 'Download JSON'}
            </Button>
          </div>
        </div>
      </header>

      <div className='container mx-auto px-4 py-8'>
        {/* Search and Stats */}
        <div className='mb-8'>
          <div className='flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6'>
            <div>
              <h2 className='text-2xl font-bold mb-2'>Schools Dataset</h2>
              <p className='text-gray-600'>
                Primary and secondary schools across South Africa
              </p>
            </div>
            <div className='flex gap-2'>
              <Badge variant='outline'>
                {schools.length.toLocaleString()} total schools
              </Badge>
              <Badge variant='secondary'>
                {filteredSchools.length.toLocaleString()} filtered
              </Badge>
            </div>
          </div>

          {/* Filters */}
          <div className='flex flex-col md:flex-row gap-4 mb-6'>
            <div className='relative flex-1 max-w-md'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
              <Input
                placeholder='Search schools, districts, or towns...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10'
              />
            </div>
            <Select
              value={selectedProvince}
              onValueChange={setSelectedProvince}
            >
              <SelectTrigger className='w-full md:w-48'>
                <SelectValue placeholder='Select province' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Provinces</SelectItem>
                {provinces.map((province: any) => (
                  <SelectItem key={province.code} value={province.code}>
                    {province.name.en}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Pagination Info */}
          <div className='flex items-center justify-between text-sm text-gray-600 mb-4'>
            <div>
              Showing {startIndex + 1}-
              {Math.min(endIndex, filteredSchools.length)} of{' '}
              {filteredSchools.length.toLocaleString()} schools
            </div>
            <div>
              Page {currentPage} of {totalPages.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Schools Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
          {currentSchools.map((school: any, index: number) => (
            <Card
              key={`${school.name}-${index}`}
              className='hover:shadow-lg transition-shadow'
            >
              <CardHeader>
                <CardTitle className='text-lg leading-tight line-clamp-2'>
                  {school.name}
                </CardTitle>
                {school.district && (
                  <Badge variant='outline' className='w-fit'>
                    {school.district}
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  {school.province && (
                    <div className='text-sm'>
                      <span className='font-medium'>Province:</span>{' '}
                      <span className='text-gray-600'>{school.province}</span>
                    </div>
                  )}
                  {school.town && (
                    <div className='text-sm'>
                      <span className='font-medium'>Town:</span>{' '}
                      <span className='text-gray-600'>{school.town}</span>
                    </div>
                  )}
                  {school.type && (
                    <div className='text-sm'>
                      <span className='font-medium'>Type:</span>{' '}
                      <Badge variant='secondary' className='text-xs'>
                        {school.type}
                      </Badge>
                    </div>
                  )}
                  {school.phase && (
                    <div className='text-sm'>
                      <span className='font-medium'>Phase:</span>{' '}
                      <span className='text-gray-600'>{school.phase}</span>
                    </div>
                  )}
                  {school.language && (
                    <div className='text-sm'>
                      <span className='font-medium'>Language:</span>{' '}
                      <span className='text-gray-600'>{school.language}</span>
                    </div>
                  )}
                  {school.quintile && (
                    <div className='text-sm'>
                      <span className='font-medium'>Quintile:</span>{' '}
                      <Badge variant='outline' className='text-xs'>
                        {school.quintile}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex items-center justify-center gap-2 flex-wrap'>
            {renderPaginationButtons()}
          </div>
        )}

        {filteredSchools.length === 0 && (
          <div className='text-center py-12'>
            <GraduationCap className='h-12 w-12 text-gray-400 mx-auto mb-4' />
            <p className='text-gray-500 text-lg'>
              No schools found matching your search criteria.
            </p>
            <p className='text-gray-400 text-sm mt-2'>
              Try adjusting your search terms or province filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
