"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, Building, Home, Mountain, Construction } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Pie, PieChart, ResponsiveContainer, Cell, Legend } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const stats = [
    { title: "Valor Total", value: "$12,345,678", icon: DollarSign },
    { title: "Comercial", value: "12 Propiedades", icon: Building },
    { title: "Casas", value: "25 Propiedades", icon: Home },
    { title: "Terrenos", value: "8 Lotes", icon: Mountain },
    { title: "En Construcción", value: "3 Proyectos", icon: Construction },
];

const portfolioByCityData = [
  { city: 'Acapulco', value: 4500000 },
  { city: 'Cancún', value: 3200000 },
  { city: 'P. Escondido', value: 1800000 },
  { city: 'Cd. Carmen', value: 2800000 },
];

const propertyTypeData = [
  { name: 'Comercial', value: 12, fill: 'hsl(var(--chart-1))' },
  { name: 'Apartamentos', value: 48, fill: 'hsl(var(--chart-2))' },
  { name: 'Casas', value: 25, fill: 'hsl(var(--chart-3))' },
  { name: 'Terrenos', value: 8, fill: 'hsl(var(--chart-4))' },
  { name: 'Construcción', value: 3, fill: 'hsl(var(--chart-5))' },
];

const chartConfig = {
    value: {
        label: "Valor",
    },
};

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
            
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Valor del Portafolio por Ciudad</CardTitle>
                        <CardDescription>Comparación del valor total de los activos en cada ciudad.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[250px] w-full">
                            <BarChart data={portfolioByCityData} accessibilityLayer>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="city"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                />
                                <YAxis 
                                    tickFormatter={(value) => `$${Number(value) / 1000000}M`}
                                />
                                <Tooltip 
                                    cursor={{fill: 'hsl(var(--muted))'}}
                                    content={<ChartTooltipContent 
                                        formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value))}
                                    />} 
                                />
                                <Bar dataKey="value" fill="hsl(var(--primary))" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Distribución de Tipos de Propiedad</CardTitle>
                        <CardDescription>Desglose del portafolio por tipo de activo.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{}} className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                <Tooltip
                                    content={
                                    <ChartTooltipContent
                                        nameKey="name"
                                        formatter={(value, name) => `${value} propiedades`}
                                    />
                                    }
                                />
                                <Pie
                                    data={propertyTypeData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    labelLine={false}
                                    label={({
                                        cx,
                                        cy,
                                        midAngle,
                                        innerRadius,
                                        outerRadius,
                                        percent,
                                        index,
                                      }) => {
                                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                                        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                                        return (
                                          <text
                                            x={x}
                                            y={y}
                                            fill="white"
                                            textAnchor={x > cx ? 'start' : 'end'}
                                            dominantBaseline="central"
                                            className="text-xs font-bold"
                                          >
                                            {`${(percent * 100).toFixed(0)}%`}
                                          </text>
                                        );
                                      }}
                                >
                                    {propertyTypeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
