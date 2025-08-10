import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { kanbanPageConfig } from "@/app/(app)/(user)/org/kanban/_constants/page-config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CarIcon, MapPinIcon, UserIcon, TruckIcon } from "lucide-react";

// Mock data - replace with actual database queries
const mockColumns = [
    {
        id: "pending",
        title: "Pending",
        color: "bg-yellow-100 text-yellow-800",
        bookings: [
            {
                id: "1",
                service: "Premium Wash",
                customer: "John Doe",
                vehicle: "Toyota Camry - ABC123",
                time: "10:00 AM",
                type: "Mobile",
                employee: "Mike Johnson",
                fleetVehicle: "Van-001",
            },
        ],
    },
    {
        id: "confirmed",
        title: "Confirmed",
        color: "bg-blue-100 text-blue-800",
        bookings: [
            {
                id: "2",
                service: "Basic Wash",
                customer: "Jane Smith",
                vehicle: "Honda Civic - XYZ789",
                time: "2:00 PM",
                type: "Center",
                employee: "Sarah Wilson",
                fleetVehicle: null,
            },
        ],
    },
    {
        id: "inprogress",
        title: "In Progress",
        color: "bg-orange-100 text-orange-800",
        bookings: [
            {
                id: "3",
                service: "Deluxe Wash",
                customer: "Bob Johnson",
                vehicle: "BMW X5 - DEF456",
                time: "11:30 AM",
                type: "Mobile",
                employee: "Tom Brown",
                fleetVehicle: "Van-002",
            },
        ],
    },
    {
        id: "completed",
        title: "Completed",
        color: "bg-green-100 text-green-800",
        bookings: [
            {
                id: "4",
                service: "Express Wash",
                customer: "Alice Davis",
                vehicle: "Ford Focus - GHI789",
                time: "9:00 AM",
                type: "Center",
                employee: "Lisa Garcia",
                fleetVehicle: null,
            },
        ],
    },
];

export default function KanbanPage() {
    return (
        <AppPageShell
            title={kanbanPageConfig.title}
            description={kanbanPageConfig.description}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockColumns.map((column) => (
                    <div key={column.id} className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">{column.title}</h3>
                            <Badge className={column.color}>
                                {column.bookings.length}
                            </Badge>
                        </div>
                        
                        <div className="space-y-3">
                            {column.bookings.map((booking) => (
                                <Card key={booking.id} className="cursor-pointer hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base">
                                            {booking.service}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-center gap-2 text-sm">
                                            <UserIcon className="h-4 w-4 text-muted-foreground" />
                                            <span>{booking.customer}</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-sm">
                                            <CarIcon className="h-4 w-4 text-muted-foreground" />
                                            <span>{booking.vehicle}</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-sm">
                                            <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                                            <span>
                                                {booking.type === "Mobile" ? "Mobile Service" : "Wash Center"}
                                            </span>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-sm">
                                            <UserIcon className="h-4 w-4 text-muted-foreground" />
                                            <span>Employee: {booking.employee}</span>
                                        </div>
                                        
                                        {booking.fleetVehicle && (
                                            <div className="flex items-center gap-2 text-sm">
                                                <TruckIcon className="h-4 w-4 text-muted-foreground" />
                                                <span>Vehicle: {booking.fleetVehicle}</span>
                                            </div>
                                        )}
                                        
                                        <div className="flex justify-between items-center pt-2 border-t">
                                            <span className="text-sm text-muted-foreground">
                                                {booking.time}
                                            </span>
                                            <Badge variant="outline">
                                                {booking.type}
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        
                        {column.bookings.length === 0 && (
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                                <p className="text-sm text-muted-foreground">
                                    No bookings in {column.title.toLowerCase()}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </AppPageShell>
    );
}