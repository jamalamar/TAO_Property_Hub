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
                    <CardTitle>Propiedad no Encontrada</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>La propiedad solicitada no pudo ser encontrada.</p>
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
                        <p className="text-sm text-muted-foreground">Tipo de Propiedad</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                        <DollarSign className="mx-auto h-8 w-8 text-primary mb-2" />
                        <h3 className="text-lg font-semibold">$1,200,000</h3>
                        <p className="text-sm text-muted-foreground">Valor Estimado</p>
                    </div>
                     <div className="p-4 bg-muted rounded-lg">
                        <p className="text-3xl font-bold">95%</p>
                        <p className="text-sm text-muted-foreground">Tasa de Ocupación</p>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">Descripción</h3>
                    <p className="text-muted-foreground">
                        Esta es una descripción de marcador de posición para {property.name}. Es una propiedad de primer nivel de tipo {property.type?.toLowerCase()} ubicada en la vibrante ciudad de {property.city}. Cuenta con comodidades modernas y una ubicación estratégica, lo que la convierte en un activo valioso en nuestra cartera.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
