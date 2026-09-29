export const sendEmergencyEmail = async (userLocation: string, userEmail: string) => {
    const SERVICE_ID = process.env.EXPO_PUBLIC_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.EXPO_PUBLIC_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.EXPO_PUBLIC_EMAILJS_PUBLIC_KEY;
    try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                service_id: SERVICE_ID,
                template_id: TEMPLATE_ID,
                user_id: PUBLIC_KEY,
                template_params: {
                    user_location: userLocation,
                    user_email: userEmail,
                },
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to send email: ${response.statusText}`);
        }

        console.log('Emergency email sent successfully!');
    } catch (error) {
        console.error('Error sending emergency email:', error);
    }
};