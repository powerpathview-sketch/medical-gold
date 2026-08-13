// Contact form → email via Resend. Requires RESEND_API_KEY env var on the Vercel project.
const RECIPIENT = 'urosh.belgrade@gmail.com';
const FROM = 'Medical Gold sajt <info@medicalgold.rs>';

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');
  const b = req.body || {};
  if (b.website) return res.redirect(303, '/contact/?sent=1'); // honeypot
  const clean = (v) => (v || '').toString().slice(0, 1000).trim();
  const name = clean(b.name), email = clean(b.email), phone = clean(b.phone);
  const product = clean(b.product), message = clean(b.message);
  if (!name || !email) return res.redirect(303, '/contact/?sent=0&r=input');
  if (!process.env.RESEND_API_KEY) return res.redirect(303, '/contact/?sent=0&r=cfg');

  const text = [
    `Ime i prezime: ${name}`,
    `Email: ${email}`,
    phone && `Telefon: ${phone}`,
    product && `Proizvod: ${product}`,
    '',
    message,
  ].filter(Boolean).join('\n');

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [RECIPIENT],
        reply_to: email,
        subject: `Upit sa sajta — ${name}${product ? ` (${product})` : ''}`,
        text,
      }),
    });
    return res.redirect(303, r.ok ? '/contact/?sent=1' : '/contact/?sent=0&r=api' + r.status);
  } catch {
    return res.redirect(303, '/contact/?sent=0&r=exc');
  }
};
