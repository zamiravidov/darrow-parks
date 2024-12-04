export default async function handler(req, res) {
    // קבלת נתונים
    if (req.method === 'GET') {
        const data = await fetch('https://api.vercel.com/v1/edge-config/...', {
            headers: {
                Authorization: `Bearer ${process.env.EDGE_CONFIG_TOKEN}`
            }
        });
        return res.json(await data.json());
    }
    
    // שמירת נתונים
    if (req.method === 'POST') {
        await fetch('https://api.vercel.com/v1/edge-config/...', {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${process.env.EDGE_CONFIG_TOKEN}`
            },
            body: JSON.stringify(req.body)
        });
        return res.json({ success: true });
    }
}
