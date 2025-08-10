import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { dashboardPageConfig } from "@/app/(app)/(user)/dashboard/_constants/page-config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    CalendarIcon,
    CarIcon,
    TruckIcon,
    WashingMachineIcon,
} from "lucide-react";

export default function DashboardPage() {
    return (
        <AppPageShell
            title={dashboardPageConfig.title}
            description={dashboardPageConfig.description}
        >
            <div className="grid gap-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Today's Bookings
                            </CardTitle>
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">24</div>
                            <p className="text-xs text-muted-foreground">
                                +12% from yesterday
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Active Services
                            </CardTitle>
                            <WashingMachineIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">8</div>
                            <p className="text-xs text-muted-foreground">
                                4 mobile, 4 center
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Fleet Vehicles
                            </CardTitle>
                            <TruckIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">5</div>
                            <p className="text-xs text-muted-foreground">
                                3 active, 2 maintenance
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Registered Vehicles
                            </CardTitle>
                            <CarIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,247</div>
                            <p className="text-xs text-muted-foreground">
                                +8.2% from last month
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex min-h-44 w-full items-center justify-center rounded-md border-2 border-dashed border-border p-4">
                    <p className="text-sm text-muted-foreground">
                        Car Wash Analytics Dashboard - Connect your data to see real-time insights
                    </p>
                </div>
            </div>
        </AppPageShell>
    );
}
