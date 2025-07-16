import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

export function PlaceholderView({ title }: { title: string }) {
    return (
        <Card className="flex flex-col items-center justify-center text-center p-10 h-full">
            <CardHeader>
                <div className="mx-auto bg-muted p-3 rounded-full">
                   <Construction className="h-12 w-12 text-muted-foreground" />
                </div>
                <CardTitle className="mt-4">Page Under Construction</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">The '{title}' page is not yet implemented. Please check back later.</p>
            </CardContent>
        </Card>
    )
}
