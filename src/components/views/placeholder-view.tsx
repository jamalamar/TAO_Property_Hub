import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

export function PlaceholderView({ title }: { title: string }) {
    return (
        <Card className="flex flex-col items-center justify-center text-center p-10 h-full">
            <CardHeader>
                <div className="mx-auto bg-muted p-3 rounded-full">
                   <Construction className="h-12 w-12 text-muted-foreground" />
                </div>
                <CardTitle className="mt-4">Página en Construcción</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">La página '{title}' aún no está implementada. Por favor, vuelva más tarde.</p>
            </CardContent>
        </Card>
    )
}
