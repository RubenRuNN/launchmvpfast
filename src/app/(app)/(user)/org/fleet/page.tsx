import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { fleetPageConfig } from "@/app/(app)/(user)/org/fleet/_constants/page-config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TruckIcon, PlusIcon, CalendarIcon } from "lucide-react";

// Mock data - replace with actual database queries
const mockFleetVehicles = [
    {
        id: "1",
        licensePlate: "VAN001",
        brand: "Ford",
        model: "Transit",
        year: 2022,
        isActive: true,
        currentBookings: 3,
        nextService: "2025-01-15 10:00 AM",
    },
    {
        id: "2",
        licensePlate: "VAN002",
        brand: "Mercedes",
        model: "Sprinter",
        year: 2021,
        isActive: true,
        currentBookings: 1,
        nextService: "2025-01-16 2:00 PM",
    },
    {
        id: "3",
        licensePlate: "VAN003",
        brand: "Iveco",
        model: "Daily",
        year: 2020,
        isActive: false,
        currentBookings: 0,
        nextService: null,
    },
];

export default function FleetPage() {
    return (
        <AppPageShell
            title={fleetPageConfig.title}
            description={fleetPageConfig.description}
        >
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">
                        {mockFleetVehicles.filter(v => v.isActive).length} active vehicles
                    </h2>
                    <Button>
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Vehicle
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {mockFleetVehicles.map((vehicle) => (
                        <Card key={vehicle.id} className={!vehicle.isActive ? "opacity-60" : ""}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="flex items-center gap-2">
                                        <TruckIcon className="h-5 w-5" />
                                        {vehicle.brand} {vehicle.model}
                                    </CardTitle>
                                    <Badge
                                        variant={vehicle.isActive ? "success" : "secondary"}
                                    >
                                        {vehicle.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <span className="text-muted-foreground">Plate:</span>
                                    <span className="font-mono">{vehicle.licensePlate}</span>
                                    <span className="text-muted-foreground">Year:</span>
                                    <span>{vehicle.year}</span>
                                    <span className="text-muted-foreground">Active Bookings:</span>
                                    <span>{vehicle.currentBookings}</span>
                                </div>
                                
                                {vehicle.nextService && (
                                    <div className="flex items-center gap-2 text-sm p-2 bg-muted rounded">
                                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                        <span>Next: {vehicle.nextService}</span>
                                    </div>
                                )}
                                
                                <div className="flex gap-2 pt-2">
                                    <Button variant="outline" size="sm" className="flex-1">
                                        Edit
                                    </Button>
                                    <Button 
                                        variant={vehicle.isActive ? "destructive" : "default"} 
                                        size="sm"
                                        className="flex-1"
                                    >
                                        {vehicle.isActive ? "Deactivate" : "Activate"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {mockFleetVehicles.length === 0 && (
                    <div className="text-center py-12">
                        <TruckIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No fleet vehicles</h3>
                        <p className="text-muted-foreground mb-4">
                            Add your first fleet vehicle to start offering mobile services.
                        </p>
                        <Button>
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add Vehicle
                        </Button>
                    </div>
                )}
            </div>
        </AppPageShell>
    );
}