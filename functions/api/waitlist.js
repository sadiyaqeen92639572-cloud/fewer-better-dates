// Cloudflare Pages Function — POST /api/waitlist
// Binds a D1 database named DB (set in wrangler.toml / Pages dashboard).

const ALLOWED_FIELDS = [
  'city', 'landing_city', 'source_page', 'landing_variant',
  'age_range', 'local_area', 'goal', 'gender', 'looking_to_meet',
  'utm_source', 'utm_medium', 'utm_campaign', 'email'
];

const MAX_LEN = 200;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' }
  });
}

function clean(value) {
  if (typeof value !== 'string') return null;
  const v = value.trim().slice(0, MAX_LEN);
  return v.length ? v : null;
}

async function hashIp(ip, salt) {
  const enc = new TextEncoder().encode(salt + ip);
  const digest = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  // Honeypot: real users never fill a field named this in the form.
  if (clean(body.website)) {
    return json({ ok: true }); // pretend success, drop silently
  }

  const email = clean(body.email);
  if (!email || !email.includes('@') || email.length > MAX_LEN) {
    return json({ error: 'invalid_email' }, 400);
  }

  const frustration = Array.isArray(body.frustration)
    ? body.frustration.filter(v => typeof v === 'string').slice(0, 10).join('; ').slice(0, MAX_LEN)
    : clean(body.frustration);

  const row = { email };
  for (const field of ALLOWED_FIELDS) {
    if (field === 'email') continue;
    row[field] = clean(body[field]);
  }
  row.frustration = frustration;

  const ip = request.headers.get('cf-connecting-ip') || '';
  const salt = env.IP_HASH_SALT || 'fewer-better-dates';
  const ipHash = ip ? await hashIp(ip, salt) : null;

  try {
    await env.DB.prepare(
      `INSERT INTO signups
        (city, landing_city, source_page, landing_variant, age_range, local_area,
         goal, gender, looking_to_meet, frustration, utm_source, utm_medium,
         utm_campaign, email, ip_hash)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      row.city, row.landing_city, row.source_page, row.landing_variant,
      row.age_range, row.local_area, row.goal, row.gender, row.looking_to_meet,
      row.frustration, row.utm_source, row.utm_medium, row.utm_campaign,
      row.email, ipHash
    ).run();
  } catch (err) {
    // Unique(email, city) collision = already on the list for that city.
    if (String(err.message || '').includes('UNIQUE')) {
      return json({ ok: true, duplicate: true });
    }
    return json({ error: 'db_error' }, 500);
  }

  return json({ ok: true }, 201);
}

export async function onRequestGet() {
  return json({ error: 'method_not_allowed' }, 405);
}
