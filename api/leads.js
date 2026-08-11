// Vercel Serverless Function for Cholojai Tours Traveler Inquiries & Booking Leads
module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        try {
            const body = req.body || {};
            const name = body.name || "Unknown Traveler";
            const contact = body.phone || body.contact || "N/A";
            const scope = body.destination || body.scope || "General Tour Inquiry";
            const budget = body.budget || "Booking Request";
            const inquiry_id = `CHOLOJAI-${Date.now()}`;

            console.log(`[CHOLOJAI TOUR INQUIRY] ${name} (${contact}) - Destination: ${scope}`);

            // Return success response to frontend
            return res.status(200).json({
                success: true,
                message: "Tour booking inquiry successfully processed on Vercel Serverless API!",
                lead_id: inquiry_id,
                inquiry: { name, contact, scope, budget }
            });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }

    return res.status(200).json({ message: "Cholojai Tours API is active on Vercel!" });
};
