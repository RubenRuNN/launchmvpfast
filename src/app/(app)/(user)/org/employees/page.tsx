import { AppPageShell } from "@/app/(app)/_components/page-shell";
import { employeesPageConfig } from "@/app/(app)/(user)/org/employees/_constants/page-config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon, PlusIcon, PhoneIcon, MailIcon } from "lucide-react";

// Mock data - replace with actual database queries
const mockEmployees = [
    {
        id: "1",
        name: "Mike Johnson",
        email: "mike@carwash.com",
        phone: "+1234567890",
        isActive: true,
        currentBookings: 2,
        avatar: null,
    },
    {
        id: "2",
        name: "Sarah Wilson",
        email: "sarah@carwash.com",
        phone: "+1234567891",
        isActive: true,
        currentBookings: 1,
        avatar: null,
    },
    {
        id: "3",
        name: "Tom Brown",
        email: "tom@carwash.com",
        phone: "+1234567892",
        isActive: false,
        currentBookings: 0,
        avatar: null,
    },
];

export default function EmployeesPage() {
    return (
        <AppPageShell
            title={employeesPageConfig.title}
            description={employeesPageConfig.description}
        >
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">
                        {mockEmployees.filter(e => e.isActive).length} active employees
                    </h2>
                    <Button>
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Employee
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {mockEmployees.map((employee) => (
                        <Card key={employee.id} className={!employee.isActive ? "opacity-60" : ""}>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={employee.avatar || ""} />
                                        <AvatarFallback>
                                            {employee.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <CardTitle className="text-base">{employee.name}</CardTitle>
                                        <Badge
                                            variant={employee.isActive ? "success" : "secondary"}
                                            className="mt-1"
                                        >
                                            {employee.isActive ? "Active" : "Inactive"}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <MailIcon className="h-4 w-4 text-muted-foreground" />
                                        <span>{employee.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                                        <span>{employee.phone}</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between pt-2 border-t">
                                    <span className="text-sm text-muted-foreground">
                                        Current bookings: {employee.currentBookings}
                                    </span>
                                </div>
                                
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="flex-1">
                                        Edit
                                    </Button>
                                    <Button 
                                        variant={employee.isActive ? "destructive" : "default"} 
                                        size="sm"
                                        className="flex-1"
                                    >
                                        {employee.isActive ? "Deactivate" : "Activate"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {mockEmployees.length === 0 && (
                    <div className="text-center py-12">
                        <UserIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No employees added</h3>
                        <p className="text-muted-foreground mb-4">
                            Add your first employee to start managing service assignments.
                        </p>
                        <Button>
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add Employee
                        </Button>
                    </div>
                )}
            </div>
        </AppPageShell>
    );
}