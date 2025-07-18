"use client";

import React from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { SidebarNav } from './sidebar-nav';
import { Header } from './header';
import Image from 'next/image';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentRole = searchParams.get('role') || 'socio-director';

  const handleRoleChange = (newRole: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('role', newRole);
    
    let newPath = pathname;
    if (newRole === 'admin' && !pathname.startsWith('/admin')) {
      newPath = '/admin/administration';
    } else if (newRole !== 'admin' && pathname.startsWith('/admin')) {
      newPath = '/';
    }

    router.push(`${newPath}?${params.toString()}`);
  };

  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary">
                <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9.075l9-5.25V7.93zM2.25 7.93v9.075l9 5.25V13.18l-9-5.25z" />
            </svg>
            <h1 className="text-xl font-semibold font-headline">TAO</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav role={currentRole} />
        </SidebarContent>
        <SidebarFooter>
          {/* Footer content if any */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Header role={currentRole} onRoleChange={handleRoleChange} />
        <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
