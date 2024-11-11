'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Options } from 'nuqs';
import { useEffect, useState, useTransition } from 'react';

interface DataTableSearchProps {
  searchKey: string;
  searchQuery: string;
  setSearchQuery: (
    value: string | ((old: string) => string | null) | null,
    options?: Options<any> | undefined
  ) => Promise<URLSearchParams>;
  setPage: <Shallow>(
    value: number | ((old: number) => number | null) | null,
    options?: Options<Shallow> | undefined
  ) => Promise<URLSearchParams>;
}

export function DataTableSearch({
  searchKey,
  searchQuery,
  setSearchQuery,
  setPage
}: DataTableSearchProps) {
  const [isLoading, startTransition] = useTransition();
  const [queryValue, setQueryValue] = useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value, { startTransition });
    setPage(1); // Reset page to 1 when search changes
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(queryValue);
  };

  useEffect(() => {
    setQueryValue(searchQuery)
  }, [searchQuery])

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder={`Search ${searchKey}...`}
        value={queryValue}
        onChange={e => setQueryValue(e.target.value)}
        className={cn('w-full md:max-w-sm', isLoading && 'animate-pulse')}
      />
    </form>
  );
}
