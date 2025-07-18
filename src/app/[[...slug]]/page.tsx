import { AppLayout } from '@/components/app-layout';
import { DashboardView } from '@/components/views/dashboard-view';
import { PropertyView } from '@/components/views/property-view';
import { PlaceholderView } from '@/components/views/placeholder-view';
import { LegalView } from '@/components/views/admin/legal-view';
import { PropertyManagement } from '@/components/views/admin/property-management';
import { EstimatesView } from '@/components/views/admin/estimates-view';

export default function Page({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug || [];

  const renderContent = () => {
    if (slug.length === 0) {
      return <DashboardView />;
    }

    const [first, second] = slug;

    if (first === 'assets-for-rent') {
        return <PlaceholderView title="Activos en Renta" />;
    }

    if (first === 'property' && slug.length === 4) {
      const [_, cityId, typeId, propertyId] = slug;
      return <PropertyView cityId={cityId} typeId={typeId} propertyId={propertyId} />;
    }
    
    if (first === 'admin') {
      if (second === 'legal') {
        return <LegalView />;
      }
      if (second === 'administration') {
         return <PropertyManagement />;
      }
      if (second === 'maintenance') {
        return <EstimatesView />;
      }
    }

    return <DashboardView />;
  };

  return <AppLayout>{renderContent()}</AppLayout>;
}
