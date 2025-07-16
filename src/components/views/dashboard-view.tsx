import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Building, Home, Mountain, Construction } from "lucide-react";
import Image from "next/image";

const stats = [
    { title: "Valor Total", value: "$12,345,678", icon: DollarSign },
    { title: "Comercial", value: "12 Propiedades", icon: Building },
    { title: "Casas", value: "25 Propiedades", icon: Home },
    { title: "Terrenos", value: "8 Lotes", icon: Mountain },
    { title: "En Construcción", value: "3 Proyectos", icon: Construction },
];

export function DashboardView() {
    return (
        <div className="space-y-6">
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Propiedad Destacada: Condominios Vista Mar</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                       <Image 
                         src="https://placehold.co/600x400.png"
                         alt="Propiedad Destacada" 
                         width={600} 
                         height={400} 
                         className="rounded-lg object-cover"
                         data-ai-hint="luxury apartment ocean"
                       />
                    </div>
                    <div className="space-y-4">
                        <p className="text-muted-foreground">
                            Ubicado en el corazón de Acapulco, los Condominios Vista Mar ofrecen impresionantes vistas al mar y lujosas amenidades. Este activo inmobiliario de primera representa una porción significativa de nuestra cartera residencial.
                        </p>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2"><span className="font-semibold">Ubicación:</span> Acapulco</li>
                            <li className="flex items-center gap-2"><span className="font-semibold">Tipo:</span> Apartamentos</li>
                            <li className="flex items-center gap-2"><span className="font-semibold">Unidades:</span> 48</li>
                            <li className="flex items-center gap-2"><span className="font-semibold">Ocupación:</span> 95%</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
