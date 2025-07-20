'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Store {
  id: number;
  name: string;
  paxiCode: string;
  tradingHours: { day: string; times: string }[];
}

const ITEMS_PER_PAGE = 50;

const PepPaxiPage = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [expandedStoreIds, setExpandedStoreIds] = useState<Set<number>>(
    new Set()
  );
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { pepPaxiCodes } = await import('@/lib/data-loader');
        const data = Array.isArray(pepPaxiCodes) ? pepPaxiCodes : [];
        setStores(data);
        setFilteredStores(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = stores.filter(
      (store) =>
        store.name.toLowerCase().includes(query) ||
        store.paxiCode.toLowerCase().includes(query)
    );
    setFilteredStores(filtered);
    setCurrentPage(1);
  };

  const toggleExpand = (id: number) => {
    setExpandedStoreIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const totalPages = Math.ceil(filteredStores.length / ITEMS_PER_PAGE);
  const paginatedStores = filteredStores.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 5;

    const createButton = (page: number, label?: string) => (
      <Button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`mx-1 px-3 py-1 rounded ${
          currentPage === page
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        {label || page}
      </Button>
    );

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pages.push(createButton(i));
    } else {
      pages.push(createButton(1));
      if (currentPage > 3)
        pages.push(
          <span key='start-ellipsis' className='mx-1'>
            ...
          </span>
        );
      const middlePages = [
        currentPage - 1,
        currentPage,
        currentPage + 1,
      ].filter((p) => p > 1 && p < totalPages);
      middlePages.forEach((p) => pages.push(createButton(p)));
      if (currentPage < totalPages - 2)
        pages.push(
          <span key='end-ellipsis' className='mx-1'>
            ...
          </span>
        );
      pages.push(createButton(totalPages));
    }

    return (
      <div className='flex justify-center items-center mt-6 flex-wrap'>
        <Button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className='mx-1 px-3 py-1 bg-gray-100 hover:bg-gray-200'
          disabled={currentPage === 1}
        >
          ←
        </Button>
        {pages}
        <Button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          className='mx-1 px-3 py-1 bg-gray-100 hover:bg-gray-200'
          disabled={currentPage === totalPages}
        >
          →
        </Button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64 text-lg text-gray-600'>
        Loading...
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold text-gray-800 mb-6'>Pep Paxi Stores</h1>

      <Input
        type='text'
        placeholder='Search by name or code'
        value={searchQuery}
        onChange={handleSearch}
        className='mb-6 w-full sm:w-96'
      />

      <div className='overflow-x-auto rounded-lg shadow'>
        <table className='min-w-full divide-y divide-gray-200 text-sm'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='text-left px-4 py-3 font-medium text-gray-700'>
                Store Name
              </th>
              <th className='text-left px-4 py-3 font-medium text-gray-700'>
                Code
              </th>
              <th className='text-left px-4 py-3 font-medium text-gray-700'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-100'>
            {paginatedStores.map((store) => (
              <React.Fragment key={store.id}>
                <tr
                  className='hover:bg-gray-50 transition cursor-pointer'
                  onClick={() => toggleExpand(store.id)}
                >
                  <td className='px-4 py-3 text-gray-800'>{store.name}</td>
                  <td className='px-4 py-3 text-gray-600'>{store.paxiCode}</td>
                  <td className='px-4 py-3'>
                    <span className='text-blue-600 hover:underline'>
                      {expandedStoreIds.has(store.id)
                        ? 'Hide Hours'
                        : 'Show Hours'}
                    </span>
                  </td>
                </tr>
                {expandedStoreIds.has(store.id) && (
                  <tr className='bg-gray-50'>
                    <td colSpan={3} className='px-6 pb-4'>
                      <div className='text-sm text-gray-600'>
                        <p className='font-semibold text-gray-800 mb-1'>
                          Trading Hours:
                        </p>
                        <ul className='list-disc list-inside space-y-1'>
                          {store.tradingHours.map((hour, idx) => (
                            <li key={idx}>
                              {hour.day}: {hour.times}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {renderPagination()}
    </div>
  );
};

export default PepPaxiPage;
