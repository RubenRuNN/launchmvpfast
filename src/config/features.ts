/**
 * This file contains the features data for the features page.
 *
 * @add a new feature, add a new object to the `features` array.
 * 1. Add id to the features object then use it as the id of the new feature object.
 * 2. Add title and inludedIn to the new feature object. (inludedIn is an array of pricing plan ids that include this feature)
 * 3. Add description to the new feature object.
 * 4. Add image to the new feature object.
 * 5. Add imageDark to the new feature object. (optional)
 */

export type Feature = {
    title: string;
    description: string;
    image: string;
    imageDark?: string;
};

export const features: Feature[] = [
    {
        title: "Service Management Dashboard",
        description:
            "Comprehensive dashboard to manage all your car wash operations. Track bookings, monitor service progress, and get real-time insights into your business performance.",
        image: "https://utfs.io/f/43bbc3c8-cf3c-4fae-a0eb-9183f1779489-294m81.png",
        imageDark:
            "https://utfs.io/f/fddea366-51c6-45f4-bd54-84d273ad9fb9-1ly324.png",
    },
    {
        title: "Secure Customer Portal",
        description:
            "Secure customer authentication system allowing clients to book services, manage their vehicles, and track service history. Multiple login options including social authentication.",
        image: "https://utfs.io/f/805616c1-22b8-4508-9890-9ba9e2867a41-p24dnn.png",
        imageDark:
            "https://utfs.io/f/9074c0de-d9ea-4c0b-9d49-55dca1253a3f-6ig3yq.png",
    },
    {
        title: "Kanban Service Management",
        description:
            "Visual kanban board for managing service workflows. Track bookings from pending to completion with customizable status columns and drag-and-drop functionality.",
        image: "https://utfs.io/f/43bbc3c8-cf3c-4fae-a0eb-9183f1779489-294m81.png",
        imageDark:
            "https://utfs.io/f/fddea366-51c6-45f4-bd54-84d273ad9fb9-1ly324.png",
    },
    {
        title: "Fleet & Employee Management",
        description:
            "Complete management system for your mobile fleet vehicles and employees. Assign staff and vehicles to bookings, track availability, and optimize resource allocation.",
        image: "https://utfs.io/f/72a2c035-69e0-46ca-84a8-446e4dabf77c-3koi6e.png",
        imageDark:
            "https://utfs.io/f/89099112-4273-4375-9e44-1b3394600e21-c6ikq1.png",
    },
];
