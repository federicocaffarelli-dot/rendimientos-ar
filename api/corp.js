export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');

  try {
    const r = await fetch('https://data912.com/live/arg_corp', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; rendimientos-ar/1.0)',
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!r.ok) throw new Error(`data912 responded ${r.status}`);

    const data = await r.json();
    res.status(200).json({ data, source: 'data912' });
  } catch (err) {
    res.status(502).json({ error: err.message, data: [] });
  }
}
