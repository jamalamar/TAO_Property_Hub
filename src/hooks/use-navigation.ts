"use client";

import { usePathname, useSearchParams } from 'next/navigation';

export function useNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isActive = (href: string) => {
    if (href === '/') {
        return pathname === '/';
    }
    return pathname.startsWith(href);
  };
  
  const getRole = () => {
    return searchParams.get('role');
  }

  return {
    pathname,
    isActive,
    getRole,
  };
}
