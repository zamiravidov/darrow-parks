export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            const response = await fetch(`https://edge-config.vercel.com/v1/spaces/${process.env.EDGE_CONFIG}/items/parking`, {
                headers: {
                    'Authorization': `Bearer ${process.env.EDGE_CONFIG_TOKEN}`
                }
            });
            const data = await response.json();
            return res.json(data.value || { parkingSpots: [], waitingList: [] });
        }

        if (req.method === 'POST') {
            const result = await fetch(`https://edge-config.vercel.com/v1/spaces/${process.env.EDGE_CONFIG}/items`, {
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
                throw new Error(`Failed to save data: ${result.status}`);
            }

            return res.json({ success: true });
        }

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
