import { resend } from "@/server/resend";
import { siteConfig } from "@/config/site";

export async function sendBookingConfirmationEmail(
    email: string,
    customerName: string,
    service: string,
    date: string,
    time: string,
    vehicleInfo: string,
    serviceType: "Mobile" | "Center",
    location: string
) {
    try {
        await resend.emails.send({
            from: siteConfig.noReplyEmail,
            to: email,
            subject: `Booking Confirmed - ${service} | ${siteConfig.name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #333;">Booking Confirmation</h1>
                    <p>Hi ${customerName},</p>
                    <p>Your car wash service booking has been confirmed!</p>
                    
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Booking Details</h3>
                        <p><strong>Service:</strong> ${service}</p>
                        <p><strong>Vehicle:</strong> ${vehicleInfo}</p>
                        <p><strong>Date & Time:</strong> ${date} at ${time}</p>
                        <p><strong>Service Type:</strong> ${serviceType}</p>
                        <p><strong>Location:</strong> ${location}</p>
                    </div>
                    
                    <p>We'll send you updates as we prepare for your service.</p>
                    <p>Thank you for choosing ${siteConfig.name}!</p>
                </div>
            `,
            tags: [
                {
                    name: "category",
                    value: "booking_confirmation",
                },
            ],
        });
        
        return { success: true };
    } catch (error) {
        console.error("Email sending failed:", error);
        return { success: false, error };
    }
}

export async function sendServiceCompletedEmail(
    email: string,
    customerName: string,
    service: string,
    vehicleInfo: string,
    completedDate: string
) {
    try {
        await resend.emails.send({
            from: siteConfig.noReplyEmail,
            to: email,
            subject: `Service Completed - ${service} | ${siteConfig.name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #333;">Service Completed!</h1>
                    <p>Hi ${customerName},</p>
                    <p>Your ${service} service for ${vehicleInfo} has been completed on ${completedDate}.</p>
                    
                    <p>We hope you're satisfied with our service! Please consider leaving us a review.</p>
                    <p>Thank you for choosing ${siteConfig.name}!</p>
                </div>
            `,
            tags: [
                {
                    name: "category",
                    value: "service_completed",
                },
            ],
        });
        
        return { success: true };
    } catch (error) {
        console.error("Email sending failed:", error);
        return { success: false, error };
    }
}