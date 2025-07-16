import { getPropertyDetails } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Building, MapPin, DollarSign } from "lucide-react";

type PropertyViewProps = {
    cityId: string;
    typeId: string;
    propertyId: string;
}

export function PropertyView({ cityId, typeId, propertyId }: PropertyViewProps) {
    const property = getPropertyDetails(cityId, typeId, propertyId);

    if (!property) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Property Not Found</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>The requested property could not be found.</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle className="text-3xl">{property.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {property.city}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <Image
                    src="https://placehold.co/1200x600.png"
                    alt={property.name}
                    width={1200}
                    height={600}
                    className="rounded-lg object-cover w-full"
                    data-ai-hint={`${property.type} building exterior`}
                />
                <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-muted rounded-lg">
                        <Building className="mx-auto h-8 w-8 text-primary mb-2" />
                        <h3 className="text-lg font-semibold">{property.type}</h3>
                        <p className="text-sm text-muted-foreground">Property Type</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                        <DollarSign className="mx-auto h-8 w-8 text-primary mb-2" />
                        <h3 className="text-lg font-semibold">$1,200,000</h3>
                        <p className="text-sm text-muted-foreground">Estimated Value</p>
                    </div>
                     <div className="p-4 bg-muted rounded-lg">
                        <p className="text-3xl font-bold">95%</p>
                        <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">
                        This is a placeholder description for {property.name}. It is a premier {property.type?.toLowerCase()} property located in the vibrant city of {property.city}. It features modern amenities and a strategic location, making it a valuable asset in our portfolio.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
