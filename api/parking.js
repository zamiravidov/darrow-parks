export default async function handler(req, res) {
    const edgeConfigId = process.env.EDGE_CONFIG;
    
    try {
        if (req.method === 'GET') {
            const response = await fetch(`https://edge-config.vercel.com/v1/items/parking`, {
                headers: {
                    'Authorization': `Bearer ${process.env.EDGE_CONFIG_TOKEN}`
                }
            });
            const data = await response.json();
            return res.json(data || { parkingSpots: [], waitingList: [] });
        }

        if (req.method === 'POST') {
            const result = await fetch(`https://edge-config.vercel.com/v1/items`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${process.env.EDGE_CONFIG_TOKEN}`,
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
        return res.status(500).json({ error: error.message });
    }
}
