import { env } from "@/env";
import twilio from "twilio";

// Initialize Twilio client
const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

export async function sendSMS(to: string, message: string) {
    try {
        const result = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to,
        });
        
        return { success: true, messageId: result.sid };
    } catch (error) {
        console.error("SMS sending failed:", error);
        return { success: false, error: error };
    }
}

export async function sendBookingConfirmationSMS(
    phone: string,
    customerName: string,
    service: string,
    date: string,
    time: string
) {
    const message = `Hi ${customerName}! Your ${service} booking is confirmed for ${date} at ${time}. We'll send you updates as we prepare for your service. - CarWash Pro`;
    
    return await sendSMS(phone, message);
}

export async function sendServiceStartedSMS(
    phone: string,
    customerName: string,
    service: string
) {
    const message = `Hi ${customerName}! Your ${service} service has started. Our team is now working on your vehicle. - CarWash Pro`;
    
    return await sendSMS(phone, message);
}

export async function sendServiceCompletedSMS(
    phone: string,
    customerName: string,
    service: string
) {
    const message = `Hi ${customerName}! Your ${service} service is complete! Thank you for choosing CarWash Pro. We hope to serve you again soon.`;
    
    return await sendSMS(phone, message);
}