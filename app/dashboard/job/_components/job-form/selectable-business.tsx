'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useDebounce } from '@/hooks/use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getBusinessList } from '../../actions';
import type { BusinessItemType } from '@/types/business';

export default function SelectableBusiness({ value, onChange }: { value: number; onChange: (business: BusinessItemType) => void }) {
  const [open, setOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedValue = useDebounce(searchTerm, 500);

  const { data: businessList, isLoading } = useQuery({
    queryKey: ['businessList', { keyword: debouncedValue }],
    queryFn: () => getBusinessList({ pageNumber: 1, itemCount: 50, keyword: debouncedValue }),
    placeholderData: keepPreviousData,
  });

  return (
    <DropdownMenu key="businessId" open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="">
          {businessList?.items.find(item => item.id === value)?.name || '사업자 아이디 선택'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="">
        <DropdownMenuLabel>사업자 정보</DropdownMenuLabel>

        <DropdownMenuGroup className="">
          <Command>
            <CommandInput
              placeholder="Filter label..."
              autoFocus={true}
              //   disabled={isLoading}
              onValueChange={value => {
                setSearchTerm(value);
              }}
            />
            <CommandList>
              <CommandEmpty>{isLoading ? 'Loading...' : 'No business found.'}</CommandEmpty>
              <CommandGroup>
                {businessList?.items.map(business => (
                  <CommandItem
                    key={business.id}
                    value={business.name}
                    onSelect={value => {
                      onChange(business);
                      setOpen(false);
                    }}
                  >
                    <Check className={cn('mr-2 h-4 w-4', value === business.id ? 'opacity-100' : 'opacity-0')} />
                    {business.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
