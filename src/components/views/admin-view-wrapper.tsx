import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type AdminViewWrapperProps = {
    title: string;
    description: string;
    children: React.ReactNode;
}

export function AdminViewWrapper({ title, description, children }: AdminViewWrapperProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}
