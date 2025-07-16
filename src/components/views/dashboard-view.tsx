import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Building, Home, Mountain, Construction } from "lucide-react";
import Image from "next/image";

const stats = [
    { title: "Total Value", value: "$12,345,678", icon: DollarSign },
    { title: "Commercial", value: "12 Properties", icon: Building },
    { title: "Houses", value: "25 Properties", icon: Home },
    { title: "Land", value: "8 Lots", icon: Mountain },
    { title: "In Construction", value: "3 Projects", icon: Construction },
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
                    <CardTitle>Featured Property: Vista Mar Condos</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                       <Image 
                         src="https://placehold.co/600x400.png"
                         alt="Featured Property" 
                         width={600} 
                         height={400} 
                         className="rounded-lg object-cover"
                         data-ai-hint="luxury apartment ocean"
                       />
                    </div>
                    <div className="space-y-4">
                        <p className="text-muted-foreground">
                            Located in the heart of Acapulco, Vista Mar Condos offers breathtaking ocean views and luxurious amenities. This prime real estate asset represents a significant portion of our residential portfolio.
                        </p>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2"><span className="font-semibold">Location:</span> Acapulco</li>
                            <li className="flex items-center gap-2"><span className="font-semibold">Type:</span> Apartments</li>
                            <li className="flex items-center gap-2"><span className="font-semibold">Units:</span> 48</li>
                            <li className="flex items-center gap-2"><span className="font-semibold">Occupancy:</span> 95%</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
