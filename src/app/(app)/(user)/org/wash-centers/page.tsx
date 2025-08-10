import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { washCentersPageConfig } from "@/app/(app)/(user)/org/wash-centers/_constants/page-config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPinIcon, PlusIcon, PhoneIcon } from "lucide-react";

// Mock data - replace with actual database queries
const mockWashCenters = [
    {
        id: "1",
        name: "Downtown Wash Center",
        address: "123 Main Street, Downtown, City 12345",
        phone: "+1234567890",
        isActive: true,
        todayBookings: 8,
    },
    {
        id: "2",
        name: "Mall Location",
        address: "456 Shopping Mall, Suburb, City 67890",
        phone: "+1234567891",
        isActive: true,
        todayBookings: 12,
    },
    {
        id: "3",
        name: "Airport Branch",
        address: "789 Airport Road, Terminal 2, City 11111",
        phone: "+1234567892",
        isActive: false,
        todayBookings: 0,
    },
];

export default function WashCentersPage() {
    return (
        <AppPageShell
            title={washCentersPageConfig.title}
            description={washCentersPageConfig.description}
        >
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">
                        {mockWashCenters.filter(c => c.isActive).length} active centers
                    </h2>
                    <Button>
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Center
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {mockWashCenters.map((center) => (
                        <Card key={center.id} className={!center.isActive ? "opacity-60" : ""}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPinIcon className="h-5 w-5" />
                                        {center.name}
                                    </CardTitle>
                                    <Badge
                                        variant={center.isActive ? "success" : "secondary"}
                                    >
                                        {center.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2 text-sm">
                                        <MapPinIcon className="h-4 w-4 text-muted-foreground mt-0.5" />
                                        <span>{center.address}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                                        <span>{center.phone}</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between pt-2 border-t">
                                    <span className="text-sm text-muted-foreground">
                                        Today's bookings: {center.todayBookings}
                                    </span>
                                </div>
                                
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1">
                                        Edit
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1">
                                        View Schedule
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {mockWashCenters.length === 0 && (
                    <div className="text-center py-12">
                        <MapPinIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No wash centers</h3>
                        <p className="text-muted-foreground mb-4">
                            Add your first wash center location to start accepting center-based bookings.
                        </p>
                        <Button>
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add Center
                        </Button>
                    </div>
                )}
            </div>
        </AppPageShell>
    );
}