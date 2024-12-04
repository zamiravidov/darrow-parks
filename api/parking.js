export default async function handler(req, res) {
    // לקבל את המזהה של ה-Edge Config מהגדרות הסביבה
    const edgeConfigId = process.env.EDGE_CONFIG;
    const baseUrl = `https://edge-config.vercel.com/ecfg-${edgeConfigId}`;
    
    try {
        // GET request - קבלת נתונים
        if (req.method === 'GET') {
            const response = await fetch(`${baseUrl}/items/parking`, {
                headers: {
                    'Authorization': `Bearer ${process.env.EDGE_CONFIG_TOKEN}`
                }
            });
            const data = await response.json();
            return res.json(data || { parkingSpots: [], waitingList: [] });
        }
        
        // POST request - שמירת נתונים
        if (req.method === 'POST') {
            await fetch(`${baseUrl}/items/parking`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${process.env.EDGE_CONFIG_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req.body)
            });
            return res.json({ success: true });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
