export default async function handler(req, res) {
    const edgeConfigId = process.env.EDGE_CONFIG;
    const token = process.env.EDGE_CONFIG_TOKEN;
    const baseUrl = `https://edge-config.vercel.com/ecfg_i1rcwr5ehpvndhu271wt3nrr7nck`;

    try {
        if (req.method === 'GET') {
            // קריאת נתונים מה-Edge Config
            const response = await fetch(`${baseUrl}/item/parking`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            return res.json(data || { parkingSpots: [], waitingList: [] });
        }

        if (req.method === 'POST') {
            // שמירת נתונים ב-Edge Config
            const result = await fetch(`${baseUrl}/items`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    items: {
                        parking: req.body
                    }
                })
            });

            if (!result.ok) {
                throw new Error('Failed to save data');
            }

            return res.json({ success: true });
        }

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
