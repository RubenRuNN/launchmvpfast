import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { servicesPageConfig } from "@/app/(app)/(user)/org/services/_constants/page-config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WashingMachineIcon, PlusIcon, ClockIcon, DollarSignIcon } from "lucide-react";

// Mock data - replace with actual database queries
const mockServices = [
    {
        id: "1",
        name: "Basic Wash",
        description: "Exterior wash with soap and rinse",
        price: 15.00,
        duration: 30,
        type: "Both",
        isActive: true,
    },
    {
        id: "2",
        name: "Premium Wash",
        description: "Exterior wash, wax, and interior cleaning",
        price: 25.00,
        duration: 60,
        type: "Both",
        isActive: true,
    },
    {
        id: "3",
        name: "Mobile Express",
        description: "Quick mobile wash service",
        price: 20.00,
        duration: 45,
        type: "Mobile",
        isActive: true,
    },
    {
        id: "4",
        name: "Deluxe Center Wash",
        description: "Full service with detailing",
        price: 40.00,
        duration: 90,
        type: "Center",
        isActive: false,
    },
];

export default function ServicesPage() {
    return (
        <AppPageShell
            title={servicesPageConfig.title}
            description={servicesPageConfig.description}
        >
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">
                        {mockServices.filter(s => s.isActive).length} active services
                    </h2>
                    <Button>
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Service
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {mockServices.map((service) => (
                        <Card key={service.id} className={!service.isActive ? "opacity-60" : ""}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="flex items-center gap-2">
                                        <WashingMachineIcon className="h-5 w-5" />
                                        {service.name}
                                    </CardTitle>
                                    <Badge
                                        variant={service.isActive ? "success" : "secondary"}
                                    >
                                        {service.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <p className="text-sm text-muted-foreground">
                                    {service.description}
                                </p>
                                
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                                        <span>${service.price}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <ClockIcon className="h-4 w-4 text-muted-foreground" />
                                        <span>{service.duration}min</span>
                                    </div>
                                </div>
                                
                                <Badge variant="outline" className="w-fit">
                                    {service.type}
                                </Badge>
                                
                                <div className="flex gap-2 pt-2">
                                    <Button variant="outline" size="sm" className="flex-1">
                                        Edit
                                    </Button>
                                    <Button 
                                        variant={service.isActive ? "destructive" : "default"} 
                                        size="sm"
                                        className="flex-1"
                                    >
                                        {service.isActive ? "Deactivate" : "Activate"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {mockServices.length === 0 && (
                    <div className="text-center py-12">
                        <WashingMachineIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No services configured</h3>
                        <p className="text-muted-foreground mb-4">
                            Create your first car wash service to start accepting bookings.
                        </p>
                        <Button>
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add Service
                        </Button>
                    </div>
                )}
            </div>
        </AppPageShell>
    );
}