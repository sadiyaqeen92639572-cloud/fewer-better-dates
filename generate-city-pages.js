// Generates /dating/<slug>/index.html per city (from city-data.js), the
// /dating/index.html hub, sitemap.xml and robots.txt.
//
// Publish gate: a city only ships if `publish === true` AND it clears the
// automatic content-quality checks below. A city that fails is skipped and
// logged: it must never crash the build, and must never appear in the
// sitemap.
const fs = require('fs');
const path = require('path');

const cities = require('./city-data.js');
const ROOT = __dirname;
const SITE_URL = 'https://fewerbetterdates.com';

const MIN_LANDSCAPE_NOTE_LENGTH = 200;
const MIN_MEET_IDEAS = 5;
const MIN_SOURCES = 2;
const REQUIRED_STATS = ['population', 'singleShare', 'medianAge'];

function hasValidStats(city) {
  return REQUIRED_STATS.every(key => {
    const stat = city.stats && city.stats[key];
    return stat && stat.value != null && stat.source && stat.date;
  });
}

function passesGate(city) {
  if (city.publish !== true) return false;
  if (!city.landscapeNote || city.landscapeNote.length < MIN_LANDSCAPE_NOTE_LENGTH) return false;
  if (!Array.isArray(city.meetIdeas) || city.meetIdeas.length < MIN_MEET_IDEAS) return false;
  if (!Array.isArray(city.sources) || city.sources.length < MIN_SOURCES) return false;
  if (!hasValidStats(city)) return false;
  return true;
}

function esc(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ---- shared design tokens (matches index.html / journal/*.html) ----
const STYLE = `
  :root{
    --bg:#16121b;
    --surface:#1f1926;
    --surface-2:#271f30;
    --line:rgba(244,237,228,0.10);
    --line-strong:rgba(244,237,228,0.18);
    --text:#f4ede4;
    --text-dim:#d7cddc;
    --text-faint:#b3a7ba;
    --accent:#c8433f;
    --accent-soft:rgba(200,67,63,0.16);
    --accent-line:rgba(200,67,63,0.45);
    --focus:#e0a15e;
  }
  *{box-sizing:border-box;}
  body{
    margin:0;
    background:var(--bg);
    color:var(--text);
    font-family:'Public Sans',system-ui,-apple-system,Segoe UI,sans-serif;
    font-size:22px;
    line-height:1.7;
    -webkit-font-smoothing:antialiased;
    padding-inline:20px;
  }
  a{color:var(--accent);text-decoration-thickness:1px;text-underline-offset:2px;}
  a:hover{color:#e0655f;}
  img{max-width:100%;}
  .wrap{max-width:640px;margin:0 auto;}
  .eyebrow{
    font-family:'IBM Plex Mono',ui-monospace,monospace;
    font-size:16px;
    letter-spacing:0.12em;
    text-transform:uppercase;
    color:var(--text-faint);
  }
  nav.top{padding-block:28px;display:flex;align-items:center;justify-content:space-between;}
  nav.top a{font-family:'IBM Plex Mono',monospace;font-size:17px;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);text-decoration:none;}
  nav.top .back{color:var(--text-faint);}
  nav.top .back:hover{color:var(--text-dim);}
  h1{
    font-family:'Fraunces',Georgia,serif;
    font-style:italic;
    font-weight:600;
    font-size:clamp(42px,8.3vw,60px);
    line-height:1.1;
    text-wrap:balance;
    margin:0;
  }
  header.hero{padding-block:20px 40px;display:flex;flex-direction:column;gap:16px;}
  .dek{font-size:25px;color:var(--text-dim);max-width:52ch;margin:0;}
  .meta-row{font-family:'IBM Plex Mono',monospace;font-size:16px;color:var(--text-faint);display:flex;gap:16px;flex-wrap:wrap;}
  section{padding-block:6px;}
  h2{
    font-family:'Fraunces',Georgia,serif;
    font-style:italic;
    font-weight:500;
    font-size:clamp(29px,5.2vw,35px);
    line-height:1.25;
    margin:40px 0 14px;
    text-wrap:balance;
  }
  p{margin:0 0 18px;max-width:64ch;color:var(--text);}
  p.dim{color:var(--text-dim);}
  ul{margin:0 0 18px;padding-left:22px;max-width:60ch;}
  li{margin-bottom:8px;color:var(--text-dim);}
  strong{color:var(--text);}
  .btn{
    display:inline-flex;align-items:center;justify-content:center;gap:8px;
    padding:13px 24px;background:var(--accent);color:#fff8f2;
    font-family:'Public Sans',sans-serif;font-weight:600;font-size:20px;
    border:none;border-radius:2px;text-decoration:none;cursor:pointer;
    width:fit-content;transition:background 0.15s ease, transform 0.15s ease;
  }
  .btn:hover{background:#d9524d;transform:translateY(-1px);color:#fff8f2;}
  .btn:focus-visible{outline:2px solid var(--focus);outline-offset:3px;}
  .stats-wrap{overflow-x:auto;margin:0 0 18px;}
  table.stats{border-collapse:collapse;width:100%;min-width:420px;font-size:20px;}
  table.stats th,table.stats td{text-align:left;padding:10px 14px;border-bottom:1px solid var(--line);}
  table.stats th{font-family:'IBM Plex Mono',monospace;font-size:14px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-faint);font-weight:500;}
  table.stats td.val{color:var(--text);font-weight:600;}
  table.stats td.yr{color:var(--text-faint);font-family:'IBM Plex Mono',monospace;font-size:16px;}
  .meet-list{display:flex;flex-direction:column;gap:16px;margin:0 0 18px;}
  .meet-item{padding:16px 0;border-top:1px solid var(--line);}
  .meet-item:first-child{border-top:none;padding-top:0;}
  .meet-item .meet-name{font-weight:700;color:var(--text);}
  .meet-item .meet-type{font-family:'IBM Plex Mono',monospace;font-size:14px;letter-spacing:0.05em;text-transform:uppercase;color:var(--accent);margin-left:8px;}
  .meet-item p{margin:6px 0 0;font-size:20px;}
  .cta-card{
    margin-top:44px;padding:28px;background:var(--surface);
    border:1px solid var(--accent-line);border-radius:2px;
    display:flex;flex-direction:column;gap:14px;
  }
  .cta-card .eyebrow{color:var(--accent);}
  .cta-card h3{font-family:'Fraunces',Georgia,serif;font-style:italic;font-weight:600;font-size:31px;margin:0;color:var(--text);}
  .cta-card p{color:var(--text-dim);margin:0;}
  .field{display:flex;flex-direction:column;gap:8px;}
  .field label,fieldset legend{
    font-family:'IBM Plex Mono',monospace;font-size:14px;letter-spacing:0.08em;
    text-transform:uppercase;color:var(--text-faint);
  }
  fieldset{border:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px;}
  input[type="text"],input[type="email"],select{
    background:var(--surface-2);border:1px solid var(--line-strong);border-radius:2px;
    color:var(--text);font-family:'Public Sans',sans-serif;font-size:20px;padding:12px 14px;width:100%;
  }
  input::placeholder{color:var(--text-faint);}
  input:focus-visible,select:focus-visible{outline:2px solid var(--focus);outline-offset:1px;}
  select{appearance:none;background-image:linear-gradient(45deg,transparent 50%,var(--text-faint) 50%),linear-gradient(135deg,var(--text-faint) 50%,transparent 50%);background-position:calc(100% - 20px) center,calc(100% - 15px) center;background-size:5px 5px,5px 5px;background-repeat:no-repeat;}
  .row2{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
  @media (max-width:480px){.row2{grid-template-columns:1fr;}}
  .pill-group{display:flex;flex-wrap:wrap;gap:8px;}
  .pill{position:relative;}
  .pill input{position:absolute;opacity:0;width:1px;height:1px;}
  .pill label{
    display:inline-flex;align-items:center;padding:9px 14px;background:var(--surface-2);
    border:1px solid var(--line-strong);border-radius:20px;font-family:'Public Sans',sans-serif;
    font-size:18px;color:var(--text-dim);cursor:pointer;
    transition:background 0.12s ease, border-color 0.12s ease, color 0.12s ease;
  }
  .pill input:checked + label{background:var(--accent-soft);border-color:var(--accent-line);color:var(--text);}
  .pill input:focus-visible + label{outline:2px solid var(--focus);outline-offset:2px;}
  .submit-row{display:flex;flex-direction:column;gap:10px;align-items:flex-start;padding-top:6px;}
  .fine{font-size:17px;color:var(--text-faint);}
  form{display:flex;flex-direction:column;gap:22px;margin-top:8px;}
  form.hide{display:none;}
  .confirm{
    display:none;
    background:var(--surface);
    border:1px solid var(--accent-line);
    border-radius:2px;
    padding:22px;
    margin-top:8px;
    font-family:'Fraunces',Georgia,serif;
    font-style:italic;
    font-size:23px;
    color:var(--text);
  }
  .confirm.show{display:block;}
  footer{padding-block:44px 56px;border-top:1px solid var(--line);margin-top:48px;}
  footer p{color:var(--text-faint);font-size:17px;max-width:56ch;}
  .sources-list{margin:0;padding-left:18px;}
  .sources-list li{font-size:17px;color:var(--text-faint);}
  .hub-grid{display:flex;flex-direction:column;gap:8px;list-style:none;margin:0;padding:0;}
  .hub-group{margin-bottom:28px;}
  .hub-group h2{margin-top:0;}
`;

function renderMeetIdeas(meetIdeas) {
  return meetIdeas.map(m => `
      <div class="meet-item">
        <span class="meet-name">${esc(m.name)}</span><span class="meet-type">${esc(m.type)}</span>
        <p>${esc(m.text)}</p>
      </div>`).join('');
}

function renderStatsTable(city) {
  const rows = [];
  const push = (label, key) => {
    const s = city.stats[key];
    if (s) rows.push(`<tr><th>${esc(label)}</th><td class="val">${esc(s.value)}</td><td class="yr">${esc(s.source)}, ${esc(s.date)}</td></tr>`);
  };
  push('Population', 'population');
  push('Never-married / single share', 'singleShare');
  push('Estimated single population', 'estimatedSinglePopulation');
  push('Median age', 'medianAge');
  push('Age 25–34/25–44 share', 'age25to34Share');
  return `<div class="stats-wrap"><table class="stats"><thead><tr><th>Metric</th><th>Value</th><th>Source</th></tr></thead><tbody>${rows.join('')}</tbody></table></div>`;
}

function renderSources(sources) {
  return sources.map(s => `<li><a href="${esc(s.url)}">${esc(s.name)}</a> (accessed ${esc(s.accessed)})</li>`).join('');
}

function renderCityPage(city) {
  const title = `Dating in ${city.city}: The Local Dating Guide | Fewer Better Dates`;
  const subhead = city.subhead || `What dating is actually like in ${city.city}, and a different approach for people looking for something serious.`;
  const dateCostLine = city.stats.costOfLivingNote
    ? `<p class="dim">${esc(city.stats.costOfLivingNote.value)} (${esc(city.stats.costOfLivingNote.source)}, ${esc(city.stats.costOfLivingNote.date)})</p>`
    : '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Fewer Better Dates', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Dating by city', item: `${SITE_URL}/dating/` },
          { '@type': 'ListItem', position: 3, name: `Dating in ${city.city}`, item: `${SITE_URL}/dating/${city.slug}/` }
        ]
      },
      {
        '@type': 'Article',
        headline: `Dating in ${city.city}`,
        description: subhead,
        about: `Dating in ${city.city}`,
        publisher: { '@type': 'Organization', name: 'Gesmine-Invest Limited' }
      }
    ]
  };

  const metaDesc = `Real, sourced data on dating in ${city.city}: the local single population, how people actually meet, and a different approach for anyone looking for something serious.`;
  const pageUrl = `${SITE_URL}/dating/${city.slug}/`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(metaDesc)}">
<link rel="canonical" href="${pageUrl}">
<link rel="icon" href="../../favicon.svg" type="image/svg+xml">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Fewer Better Dates">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(metaDesc)}">
<meta property="og:url" content="${pageUrl}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(metaDesc)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500;1,9..144,600&family=Public+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
<style>${STYLE}</style>
</head>
<body>
<div class="wrap">

  <nav class="top">
    <span class="eyebrow" style="color:var(--accent);">Fewer Better Dates</span>
    <a class="back" href="../../index.html">← Back to Fewer Better Dates</a>
  </nav>

  <header class="hero">
    <span class="eyebrow">Dating by city · ${esc(city.country)}</span>
    <h1>Dating in ${esc(city.city)}</h1>
    <p class="dek">${esc(subhead)}</p>
    <div class="meta-row"><span>Local dating guide</span><span>Sourced &amp; dated data</span></div>
  </header>

  <section>
    <span class="eyebrow">A different way to date</span>
    <h2>A different way to date is coming to ${esc(city.city)}.</h2>
    <p>8 Weeks. 6 Introductions. No Swiping. A small number of carefully selected introductions instead of an endless queue of profiles, built for people looking for a real relationship.</p>
    <a href="#waitlist" class="btn">Join the early-access list</a>
  </section>

  <section>
    <span class="eyebrow">The dating landscape in ${esc(city.city)}</span>
    <h2>What the numbers say about dating in ${esc(city.city)}</h2>
    ${renderStatsTable(city)}
    ${dateCostLine}
    <p>${esc(city.landscapeNote)}</p>
  </section>

  <section>
    <span class="eyebrow">How to actually meet someone here</span>
    <h2>Best ways to meet someone in ${esc(city.city)}</h2>
    <p class="dim">Recurring, real, and checked recently, not a generic "try a class" list. Organisations and communities age better than restaurant recommendations, so that's what's here.</p>
    <div class="meet-list">${renderMeetIdeas(city.meetIdeas)}</div>
  </section>

  <section>
    <span class="eyebrow">The honest take</span>
    <h2>Is ${esc(city.city)} good for serious dating?</h2>
    <p>${esc(city.seriousDatingTake)}</p>
  </section>

  <section id="waitlist">
    <span class="eyebrow">Join</span>
    <h2>Ready to try dating differently in ${esc(city.city)}?</h2>
    <p class="dim">We're building this city by city. No commitment: join the early-access list and we'll let you know when ${esc(city.city)} founding memberships open.</p>

    <form id="waitlist-form-${esc(city.slug)}" data-waitlist-form data-confirm-target="confirm-${esc(city.slug)}">
      <input type="hidden" name="city" value="${esc(city.city)}">
      <input type="hidden" name="landing_city" value="${esc(city.city)}">
      <input type="hidden" name="source_page" value="dating/${esc(city.slug)}">
      <input type="hidden" name="landing_variant" value="A" data-variant-field>
      <input type="hidden" name="utm_source" value="" data-utm="utm_source">
      <input type="hidden" name="utm_medium" value="" data-utm="utm_medium">
      <input type="hidden" name="utm_campaign" value="" data-utm="utm_campaign">
      <input type="text" name="website" value="" style="position:absolute;left:-9999px;" tabindex="-1" autocomplete="off" aria-hidden="true">

      <div class="field">
        <label for="email-${esc(city.slug)}">Email</label>
        <input type="email" id="email-${esc(city.slug)}" name="email" placeholder="you@email.com" required>
      </div>

      <div class="row2">
        <div class="field">
          <label for="age-${esc(city.slug)}">Age range</label>
          <select id="age-${esc(city.slug)}" name="age_range" required>
            <option value="" disabled selected>Select</option>
            <option>22–27</option>
            <option>28–33</option>
            <option>34–39</option>
            <option>40–45</option>
            <option>46+</option>
          </select>
        </div>
        <div class="field">
          <label for="area-${esc(city.slug)}">Neighbourhood / area</label>
          <input type="text" id="area-${esc(city.slug)}" name="local_area" placeholder="e.g. a neighbourhood in ${esc(city.city)}">
        </div>
      </div>

      <fieldset>
        <legend>I'm looking for</legend>
        <div class="pill-group">
          <span class="pill"><input type="radio" id="goal1-${esc(city.slug)}" name="goal" value="Long-term relationship" required><label for="goal1-${esc(city.slug)}">Long-term relationship</label></span>
          <span class="pill"><input type="radio" id="goal2-${esc(city.slug)}" name="goal" value="Marriage / life partner"><label for="goal2-${esc(city.slug)}">Marriage / life partner</label></span>
          <span class="pill"><input type="radio" id="goal3-${esc(city.slug)}" name="goal" value="Not sure yet"><label for="goal3-${esc(city.slug)}">Not sure yet</label></span>
        </div>
      </fieldset>

      <div class="row2">
        <div class="field">
          <label for="gender-${esc(city.slug)}">I am</label>
          <select id="gender-${esc(city.slug)}" name="gender" required>
            <option value="" disabled selected>Select</option>
            <option>Woman</option>
            <option>Man</option>
            <option>Non-binary</option>
            <option>Prefer to self-describe</option>
          </select>
        </div>
        <div class="field">
          <label for="meet-${esc(city.slug)}">Looking to meet</label>
          <select id="meet-${esc(city.slug)}" name="looking_to_meet" required>
            <option value="" disabled selected>Select</option>
            <option>Women</option>
            <option>Men</option>
            <option>Everyone</option>
          </select>
        </div>
      </div>

      <fieldset>
        <legend>What frustrates you most about dating apps?</legend>
        <div class="pill-group">
          <span class="pill"><input type="checkbox" id="f1-${esc(city.slug)}" name="frustration" value="Too much swiping"><label for="f1-${esc(city.slug)}">Too much swiping</label></span>
          <span class="pill"><input type="checkbox" id="f2-${esc(city.slug)}" name="frustration" value="Too many matches, too few dates"><label for="f2-${esc(city.slug)}">Too many matches, too few dates</label></span>
          <span class="pill"><input type="checkbox" id="f3-${esc(city.slug)}" name="frustration" value="People aren't looking for the same thing"><label for="f3-${esc(city.slug)}">People aren't looking for the same thing</label></span>
          <span class="pill"><input type="checkbox" id="f4-${esc(city.slug)}" name="frustration" value="Conversations go nowhere"><label for="f4-${esc(city.slug)}">Conversations go nowhere</label></span>
          <span class="pill"><input type="checkbox" id="f5-${esc(city.slug)}" name="frustration" value="I don't trust the profiles"><label for="f5-${esc(city.slug)}">I don't trust the profiles</label></span>
          <span class="pill"><input type="checkbox" id="f6-${esc(city.slug)}" name="frustration" value="Something else"><label for="f6-${esc(city.slug)}">Something else</label></span>
        </div>
      </fieldset>

      <div class="submit-row">
        <button type="submit" class="btn">Join the ${esc(city.city)} waitlist</button>
        <span class="fine">No spam. One email when founding memberships open.</span>
      </div>
    </form>

    <div id="confirm-${esc(city.slug)}" class="confirm">You're on the ${esc(city.city)} list. We'll be in touch before founding memberships open.</div>
  </section>

  <section>
    <span class="eyebrow">Sources</span>
    <ul class="sources-list">${renderSources(city.sources)}</ul>
  </section>

  <section>
    <span class="eyebrow">From the journal</span>
    <p class="dim"><a href="../../journal/why-is-dating-so-hard.html">Why Is Dating So Hard?</a> · <a href="../../journal/why-am-i-still-single.html">Why Am I Still Single?</a> · <a href="../../journal/how-to-find-love.html">How to Find Love</a></p>
  </section>

  <footer>
    <p>Fewer Better Dates is a founding waitlist for people who want fewer, better introductions instead of more swiping, building city by city. <a href="../index.html">See all city guides</a></p>
    <p style="margin-top:10px;font-size:14px;"><a href="../../about/index.html" style="color:var(--text-faint);">About</a> · <a href="../../privacy/index.html" style="color:var(--text-faint);">Privacy</a> · Published by Gesmine-Invest Limited</p>
  </footer>

</div>
<script src="../../assets/js/waitlist.js"></script>
</body>
</html>
`;
}

function renderHub(publishedCities) {
  const uk = publishedCities.filter(c => c.country === 'UK');
  const us = publishedCities.filter(c => c.country === 'US');
  const group = (label, list) => list.length ? `
    <div class="hub-group">
      <span class="eyebrow">${esc(label)}</span>
      <ul class="hub-grid">
        ${list.map(c => `<li><a href="${esc(c.slug)}/">Dating in ${esc(c.city)}</a></li>`).join('')}
      </ul>
    </div>` : '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', name: 'Fewer Better Dates', url: `${SITE_URL}/` },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Fewer Better Dates', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Dating by city', item: `${SITE_URL}/dating/` }
        ]
      }
    ]
  };

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Dating by City</title>
<meta name="description" content="How dating differs from one city to another: local guides with sourced, dated data on the single population, dating culture, and how people actually meet.">
<link rel="canonical" href="${SITE_URL}/dating/">
<link rel="icon" href="../favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Fewer Better Dates">
<meta property="og:title" content="Dating by City">
<meta property="og:description" content="How dating differs from one city to another: local guides with sourced, dated data on the single population, dating culture, and how people actually meet.">
<meta property="og:url" content="${SITE_URL}/dating/">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="Dating by City">
<meta name="twitter:description" content="How dating differs from one city to another: local guides with sourced, dated data on the single population, dating culture, and how people actually meet.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500;1,9..144,600&family=Public+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
<style>${STYLE}</style>
</head>
<body>
<div class="wrap">

  <nav class="top">
    <span class="eyebrow" style="color:var(--accent);">Fewer Better Dates</span>
    <a class="back" href="../index.html">← Back to Fewer Better Dates</a>
  </nav>

  <header class="hero">
    <span class="eyebrow">Local research</span>
    <h1>Dating by City</h1>
    <p class="dek">We're researching how dating differs from one city to another, from the size of the dating pool to how people actually meet.</p>
  </header>

  <section>
    <p class="dim">Our city guides combine public demographic data, local research and original analysis. Statistics are dated and sourced where available. We only publish a city guide once we have enough real, verified local material, which is why this list is shorter than the number of cities we're actually looking at.</p>
  </section>

  <section>
    ${group('United Kingdom', uk)}
    ${group('United States', us)}
  </section>

  <section>
    <span class="eyebrow">From the journal</span>
    <p class="dim"><a href="../journal/why-is-dating-so-hard.html">Why Is Dating So Hard?</a> · <a href="../journal/why-am-i-still-single.html">Why Am I Still Single?</a> · <a href="../journal/how-to-find-love.html">How to Find Love</a></p>
  </section>

  <footer>
    <p>Fewer Better Dates is a founding waitlist for people who want fewer, better introductions instead of more swiping. <a href="../index.html#waitlist">Join the waitlist</a></p>
    <p style="margin-top:10px;font-size:14px;"><a href="../about/index.html" style="color:var(--text-faint);">About</a> · <a href="../privacy/index.html" style="color:var(--text-faint);">Privacy</a> · Published by Gesmine-Invest Limited</p>
  </footer>

</div>
</body>
</html>
`;
}

function buildSitemap(urls) {
  const urlEntries = urls.map(u => `  <url><loc>${SITE_URL}/${u}</loc></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
}

function main() {
  const datingDir = path.join(ROOT, 'dating');
  fs.mkdirSync(datingDir, { recursive: true });

  const published = [];
  const skipped = [];

  for (const city of cities) {
    if (passesGate(city)) {
      const outDir = path.join(datingDir, city.slug);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, 'index.html'), renderCityPage(city));
      published.push(city);
    } else {
      skipped.push(city.slug);
      console.log(`Skipping ${city.city || city.slug}: insufficient sourced material`);
    }
  }

  fs.writeFileSync(path.join(datingDir, 'index.html'), renderHub(published));

  const sitemapUrls = [
    '',
    'about/',
    'privacy/',
    'journal/why-is-dating-so-hard',
    'journal/why-am-i-still-single',
    'journal/how-to-find-love',
    'dating/',
    ...published.map(c => `dating/${c.slug}/`)
  ];
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), buildSitemap(sitemapUrls));
  fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);

  console.log(`\nPublished ${published.length} city page(s): ${published.map(c => c.slug).join(', ') || 'none'}`);
  if (skipped.length) console.log(`Skipped ${skipped.length} city page(s): ${skipped.join(', ')}`);
}

main();
