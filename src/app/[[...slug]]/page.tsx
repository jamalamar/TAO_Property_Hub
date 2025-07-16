import { AppLayout } from '@/components/app-layout';
import { DashboardView } from '@/components/views/dashboard-view';
import { PropertyView } from '@/components/views/property-view';
import { PlaceholderView } from '@/components/views/placeholder-view';
import { DocumentSummarizer } from '@/components/views/admin/document-summarizer';
import { ReportGenerator } from '@/components/views/admin/report-generator';

export default function Page({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug || [];

  const renderContent = () => {
    if (slug.length === 0) {
      return <DashboardView />;
    }

    const [first, second, third, fourth] = slug;

    if (first === 'assets-for-rent') {
        return <PlaceholderView title="Assets for Rent" />;
    }

    if (first === 'property' && slug.length === 4) {
      return <PropertyView cityId={second} typeId={third} propertyId={fourth} />;
    }
    
    if (first === 'admin') {
      if (second === 'legal') {
        if (third === 'documents') return <DocumentSummarizer />;
        if (third === 'contracts') return <PlaceholderView title="Contracts" />;
      }
      if (second === 'administration') {
         // The request mentioned document summarizer in Legal and Administration modules.
         // Let's assume the report generator fits best under the main Administration section.
         return <ReportGenerator />
      }
      if (second === 'maintenance') {
        if (third === 'estimates') return <PlaceholderView title="Estimates" />;
        if (third === 'work-orders') return <PlaceholderView title="Work Orders" />;
      }
    }

    return <DashboardView />;
  };

  return <AppLayout>{renderContent()}</AppLayout>;
}
