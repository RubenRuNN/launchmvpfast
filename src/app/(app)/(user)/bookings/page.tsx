import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { bookingsPageConfig } from "@/app/(app)/(user)/bookings/_constants/page-config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, CarIcon, MapPinIcon, ClockIcon } from "lucide-react";
import Link from "next/link";
import { siteUrls } from "@/config/urls";

// Mock data - replace with actual database queries
const mockBookings = [
    {
        id: "1",
        service: "Premium Wash",
        vehicle: "Toyota Camry - ABC123",
        date: "2025-01-15",
        time: "10:00 AM",
        status: "Confirmed",
        type: "Mobile",
        address: "123 Main St, City",
        price: "$25.00",
    },
    {
        id: "2",
        service: "Basic Wash",
        vehicle: "Honda Civic - XYZ789",
        date: "2025-01-18",
        time: "2:00 PM",
        status: "Pending",
        type: "Center",
        address: "Downtown Wash Center",
        price: "$15.00",
    },
];

export default function BookingsPage() {
    return (
        <AppPageShell
            title={bookingsPageConfig.title}
            description={bookingsPageConfig.description}
        >
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">
                        {mockBookings.length} active bookings
                    </h2>
                    <Button asChild>
                        <Link href={siteUrls.bookings.create}>
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            Book Service
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4">
                    {mockBookings.map((booking) => (
                        <Card key={booking.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg">
                                        {booking.service}
                                    </CardTitle>
                                    <Badge
                                        variant={
                                            booking.status === "Confirmed"
                                                ? "success"
                                                : booking.status === "Pending"
                                                ? "info"
                                                : "secondary"
                                        }
                                    >
                                        {booking.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <CarIcon className="h-4 w-4" />
                                    {booking.vehicle}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <CalendarIcon className="h-4 w-4" />
                                    {booking.date} at {booking.time}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPinIcon className="h-4 w-4" />
                                    {booking.type}: {booking.address}
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="font-semibold text-lg">
                                        {booking.price}
                                    </span>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">
                                            Reschedule
                                        </Button>
                                        <Button variant="destructive" size="sm">
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {mockBookings.length === 0 && (
                    <div className="text-center py-12">
                        <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
                        <p className="text-muted-foreground mb-4">
                            Book your first car wash service to get started.
                        </p>
                        <Button asChild>
                            <Link href={siteUrls.bookings.create}>
                                Book Service
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </AppPageShell>
    );
}