import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { vehiclesPageConfig } from "@/app/(app)/(user)/vehicles/_constants/page-config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CarIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { siteUrls } from "@/config/urls";

// Mock data - replace with actual database queries
const mockVehicles = [
    {
        id: "1",
        brand: "Toyota",
        model: "Camry",
        year: 2020,
        color: "Silver",
        licensePlate: "ABC123",
        lastService: "2025-01-10",
    },
    {
        id: "2",
        brand: "Honda",
        model: "Civic",
        year: 2019,
        color: "Blue",
        licensePlate: "XYZ789",
        lastService: "2025-01-05",
    },
];

export default function VehiclesPage() {
    return (
        <AppPageShell
            title={vehiclesPageConfig.title}
            description={vehiclesPageConfig.description}
        >
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">
                        {mockVehicles.length} registered vehicles
                    </h2>
                    <Button asChild>
                        <Link href={siteUrls.vehicles.create}>
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add Vehicle
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {mockVehicles.map((vehicle) => (
                        <Card key={vehicle.id}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CarIcon className="h-5 w-5" />
                                    {vehicle.brand} {vehicle.model}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <span className="text-muted-foreground">Year:</span>
                                    <span>{vehicle.year}</span>
                                    <span className="text-muted-foreground">Color:</span>
                                    <span>{vehicle.color}</span>
                                    <span className="text-muted-foreground">Plate:</span>
                                    <span className="font-mono">{vehicle.licensePlate}</span>
                                    <span className="text-muted-foreground">Last Service:</span>
                                    <span>{vehicle.lastService}</span>
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <Button size="sm" className="flex-1">
                                        Book Service
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        Edit
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {mockVehicles.length === 0 && (
                    <div className="text-center py-12">
                        <CarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No vehicles registered</h3>
                        <p className="text-muted-foreground mb-4">
                            Add your first vehicle to start booking car wash services.
                        </p>
                        <Button asChild>
                            <Link href={siteUrls.vehicles.create}>
                                <PlusIcon className="h-4 w-4 mr-2" />
                                Add Vehicle
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </AppPageShell>
    );
}