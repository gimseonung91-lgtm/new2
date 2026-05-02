import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { ATPT_OFCDC_SC_CODE, SD_SCHUL_CODE, MLSV_YMD, MLSV_FROM_YMD, MLSV_TO_YMD } = req.query;

  if (!ATPT_OFCDC_SC_CODE || !SD_SCHUL_CODE) {
    return res.status(400).json({ error: 'SIDO and School codes are required' });
  }

  const API_KEY = process.env.NEIS_API_KEY;
  let url = `https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&KEY=${API_KEY}`;

  if (MLSV_YMD) url += `&MLSV_YMD=${MLSV_YMD}`;
  if (MLSV_FROM_YMD) url += `&MLSV_FROM_YMD=${MLSV_FROM_YMD}`;
  if (MLSV_TO_YMD) url += `&MLSV_TO_YMD=${MLSV_TO_YMD}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: 'Failed to fetch meal info' });
  }
}
