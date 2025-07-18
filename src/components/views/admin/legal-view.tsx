
"use client";

import { ContractGenerator } from '@/components/views/admin/contract-generator';
import { AdminViewWrapper } from '../admin-view-wrapper';

export function LegalView() {
    return (
        <AdminViewWrapper
            title="Gestión de Contratos"
            description="Genera contratos de arrendamiento de forma automática con ayuda de IA."
        >
          <ContractGenerator />
        </AdminViewWrapper>
    )
}
