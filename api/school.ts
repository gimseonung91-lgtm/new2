import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { SCHUL_NM } = req.query;

  if (!SCHUL_NM) {
    return res.status(400).json({ error: 'School name is required' });
  }

  const API_KEY = process.env.NEIS_API_KEY;
  const url = `https://open.neis.go.kr/hub/schoolInfo?Type=json&SCHUL_NM=${encodeURIComponent(SCHUL_NM as string)}&KEY=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: 'Failed to fetch school info' });
  }
}
