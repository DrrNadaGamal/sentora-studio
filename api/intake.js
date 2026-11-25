import { put } from '@vercel/blob';

const clean = (v, n) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, n);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  if (b.website) return res.status(200).json({ ok: true }); // honeypot
  const idea = clean(b.idea, 600), contact = clean(b.contact, 120), name = clean(b.name, 80);
  if (idea.length < 10 || contact.length < 5) return res.status(400).json({ ok: false });
  const rec = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), at: new Date().toISOString(), name, contact, idea, lang: clean(b.lang, 4), page: clean(b.page, 40) };
  console.log('INTAKE ' + JSON.stringify(rec));
  try {
    await put(`intake/${rec.at.replace(/[:.]/g, '-')}-${rec.id}.json`, JSON.stringify(rec, null, 2), { access: 'private', addRandomSuffix: true, contentType: 'application/json' });
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('intake store failed', e && e.message);
    return res.status(500).json({ ok: false });
  }
}
