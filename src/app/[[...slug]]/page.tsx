import { AppLayout } from '@/components/app-layout';
import { DashboardView } from '@/components/views/dashboard-view';
import { PropertyView } from '@/components/views/property-view';
import { PlaceholderView } from '@/components/views/placeholder-view';
import { DocumentSummarizer } from '@/components/views/admin/document-summarizer';
import { ReportGenerator } from '@/components/views/admin/report-generator';
import { PropertyManagement } from '@/components/views/admin/property-management';

export default function Page({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug || [];

  const renderContent = () => {
    if (slug.length === 0) {
      return <DashboardView />;
    }

    const [first, second, third, fourth] = slug;

    if (first === 'assets-for-rent') {
        return <PlaceholderView title="Activos en Renta" />;
    }

    if (first === 'property' && slug.length === 4) {
      return <PropertyView cityId={second} typeId={third} propertyId={fourth} />;
    }
    
    if (first === 'admin') {
      if (second === 'legal') {
        if (third === 'documents') return <DocumentSummarizer />;
        if (third === 'contracts') return <PlaceholderView title="Contratos" />;
      }
      if (second === 'administration') {
         if (third === 'properties') return <PropertyManagement />;
         if (third === 'payments') return <PlaceholderView title="Pagos" />;
         if (third === 'services') return <PlaceholderView title="Servicios" />;
         if (third === 'taxes') return <PlaceholderView title="Impuestos" />;
         return <ReportGenerator />
      }
      if (second === 'maintenance') {
        if (third === 'estimates') return <PlaceholderView title="Estimaciones" />;
        if (third === 'work-orders') return <PlaceholderView title="Work Orders" />;
      }
    }

    return <DashboardView />;
  };

  return <AppLayout>{renderContent()}</AppLayout>;
}
