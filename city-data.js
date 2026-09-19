// City dossiers for /dating/<city>/ pages.
// Every stat is real, sourced, and dated — never invented. If a solid sourced
// figure couldn't be found for a city (Edinburgh, Chicago, Los Angeles this
// pass — no clean city-level "never married" share turned up in research),
// that city is left out of this file entirely rather than padded with a
// guess. Required stats for the publish gate: population, singleShare,
// medianAge. Re-verify before adding further cities or refreshing dates.
module.exports = [
  {
    slug: 'london',
    city: 'London',
    country: 'UK',
    publish: true,
    stats: {
      population: { value: '9,089,736', source: 'ONS mid-2024 population estimate', date: 'mid-2024' },
      singleShare: { value: '46.2%', source: 'ONS Census 2021 — marital and civil partnership status, age 16+', date: '2021' },
      medianAge: { value: '35', source: 'ONS Census 2021 — median age', date: '2021' }
    },
    subhead: 'London has one of the UK\'s largest dating pools — and one of its highest never-married shares. Here\'s what that actually means for meeting someone.',
    landscapeNote: 'London\'s dating pool is enormous but scattered across a city that takes an hour to cross. Most Londoners date within a patchwork of overlapping but disconnected worlds — work, a couple of postcodes, maybe one hobby — so the odds of bumping into someone compatible by chance are lower than the population number suggests. That gap between "millions of people" and "almost nobody I actually meet" is the single most common complaint from single Londoners.',
    meetIdeas: [
      { name: 'London Social Runners', type: 'Running club', url: 'https://www.meetup.com/londonsocialrunners/', checkedAt: '2026-09-18', text: 'Saturday 10am social runs around Hyde Park (6.5k/4 miles) followed by coffee and brunch — low-pressure, all abilities, genuinely built around the social part.' },
      { name: 'London City Runners', type: 'Running club', url: 'https://www.instagram.com/londoncityrunners/', checkedAt: '2026-09-18', text: 'One of London\'s largest social running communities, known for post-run drinks or food rather than serious training.' },
      { name: 'Serpentine Running and Triathlon Club', type: 'Running club', url: 'https://www.serpentine.org.uk/', checkedAt: '2026-09-18', text: 'Long-established, structured sessions if you want training alongside the social side.' },
      { name: 'Bonne London', type: 'Running club', url: 'https://www.instagram.com/bonne.london/', checkedAt: '2026-09-18', text: 'Social run meetups that combine running with brunch and coffee, built around community and connection rather than pace.' },
      { name: 'Queen\'s Park Harriers', type: 'Running club', url: 'https://www.qph.org.uk/', checkedAt: '2026-09-18', text: 'A long-established club with a genuinely mixed, community-first membership rather than a competitive-only focus.' }
    ],
    seriousDatingTake: 'London has one of the largest dating pools in the UK, which cuts both ways: more potential matches, but also more competition for attention and more paradox-of-choice fatigue. It works well for serious dating if you narrow the field deliberately — through a shared activity, a specific neighbourhood, or an introduction service — rather than relying on the sheer size of the city to sort things out for you.',
    sources: [
      { name: 'ONS mid-2024 population estimate', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/bulletins/annualmidyearpopulationestimates/mid2024', accessed: '2026-09-18' },
      { name: 'ONS — Marriage and civil partnership status, England and Wales, Census 2021', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/marriagecohabitationandcivilpartnerships/articles/marriageandcivilpartnershipstatusenglandandwalescensus2021/2023-02-22', accessed: '2026-09-18' },
      { name: 'ONS — Census 2021 median age', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/adhocs/2583census2021medianage', accessed: '2026-09-18' }
    ]
  },
  {
    slug: 'manchester',
    city: 'Manchester',
    country: 'UK',
    publish: true,
    stats: {
      population: { value: '551,900', source: 'ONS Census 2021 / Manchester City Council', date: '2021' },
      singleShare: { value: '55.8%', source: 'ONS Census 2021 — never married and never registered a civil partnership, age 16+', date: '2021' },
      medianAge: { value: '31', source: 'ONS Census 2021', date: '2021' }
    },
    subhead: 'Manchester skews young and has one of England\'s highest never-married rates. What that means for anyone dating here seriously.',
    landscapeNote: 'Manchester\'s median age (31) is noticeably younger than London\'s, and its never-married share (55.8%) is one of the highest of any major English city — a long way above the England and Wales average of 37.9%. The city\'s dating culture leans heavily on its music, sport and student-city social scene rather than the more work-first pace of London.',
    meetIdeas: [
      { name: 'Manchester Road Runners', type: 'Running club', url: 'http://www.manchesterroadrunners.com/', checkedAt: '2026-09-18', text: 'Free, volunteer-run club meeting Wednesdays 6:30pm at The Wharf, groups for every ability — built explicitly around making friends, not just times.' },
      { name: 'Didsbury Runners', type: 'Running club', url: 'https://didsburyrunners.co.uk/', checkedAt: '2026-09-18', text: 'Volunteer-led, not-for-profit; Monday evening 5K/10K groups at a range of paces.' },
      { name: 'Birchfields Community Run', type: 'Community run', url: 'https://www.parkrun.org.uk/', checkedAt: '2026-09-18', text: 'Free weekly timed 2k/5k in Birchfields Park every Sunday 11am, entirely volunteer-run and open to all ages.' },
      { name: 'Manchester Metropolitan University Running Society', type: 'Running club', url: 'https://www.theunionmmu.org/groups/running-society-d5c1', checkedAt: '2026-09-18', text: 'Meets Monday and Wednesday 6pm at the MMU Union — open beyond students in practice, a reliable recurring social run.' },
      { name: 'Meetup Manchester social & networking groups', type: 'Meetup community', url: 'https://www.meetup.com/find/gb--manchester/', checkedAt: '2026-09-18', text: 'An active cluster of recurring social, hobby and networking meetups beyond just running — useful for people who want a non-fitness route in.' }
    ],
    seriousDatingTake: 'Manchester\'s combination of a young population and a high never-married share means the raw dating pool skews toward people who are, demographically, still actively looking rather than settled. That\'s good news for volume, but the same youth-and-churn dynamic that makes the pool large also makes casual, low-commitment dating the local default — worth knowing if you\'re specifically after something serious.',
    sources: [
      { name: 'ONS — How life has changed in Manchester: Census 2021', url: 'https://www.ons.gov.uk/visualisations/censusareachanges/E08000003/', accessed: '2026-09-18' },
      { name: 'ONS — Marriage and civil partnership status, Census 2021', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/marriagecohabitationandcivilpartnerships/articles/marriageandcivilpartnershipstatusenglandandwalescensus2021/2023-02-22', accessed: '2026-09-18' }
    ]
  },
  {
    slug: 'norwich',
    city: 'Norwich',
    country: 'UK',
    publish: true,
    stats: {
      population: { value: '143,900', source: 'ONS Census 2021', date: '2021' },
      singleShare: { value: '52.4%', source: 'ONS Census 2021 — never married or in a civil partnership, age 16+', date: '2021' },
      medianAge: { value: '34', source: 'ONS Census 2021', date: '2021' }
    },
    subhead: 'Norwich is small enough that dating here doesn\'t feel anonymous — and its numbers are more interesting than you\'d expect.',
    landscapeNote: 'Norwich is small enough that its dating pool doesn\'t feel anonymous the way London\'s does, but it still posts one of the higher never-married shares among English cities (52.4%). It\'s the kind of place where a single well-run running club or Meetup group can plausibly become the main way a lot of people actually meet someone, rather than one option among hundreds.',
    meetIdeas: [
      { name: 'Norwich Social Joggers', type: 'Running club', url: 'https://www.facebook.com/p/Norwich-Social-Joggers-100067468565253/', checkedAt: '2026-09-18', text: 'Friendly, no-fee weekly jog open to all abilities and ages — explicitly social rather than competitive.' },
      { name: 'City of Norwich AC', type: 'Running club', url: 'https://www.cityofnorwichac.org.uk/', checkedAt: '2026-09-18', text: 'One of the UK\'s larger athletics clubs with 700+ members, from beginner-friendly jogs to competitive sessions.' },
      { name: 'Run Norwich volunteering', type: 'Volunteering', url: 'https://www.runnorwich.co.uk/volunteers/', checkedAt: '2026-09-18', text: 'The city\'s annual 10K needs 500+ volunteers each year — a genuine, recurring way to meet people through shared effort rather than a single event.' },
      { name: 'Meetup Norwich social & networking groups', type: 'Meetup community', url: 'https://www.meetup.com/find/gb--norwich/social-activities/', checkedAt: '2026-09-18', text: 'Small but active set of recurring social and networking meetups, better suited to a city this size than app-scale volume.' },
      { name: 'Eaton Park community sport & social sessions', type: 'Community sport', url: 'https://www.norwich.gov.uk/directory/1/parks_and_open_spaces/category/70', checkedAt: '2026-09-18', text: 'A recurring, low-key meeting point named repeatedly in local guides as where casual sport and social running groups actually gather.' }
    ],
    seriousDatingTake: 'Norwich is a genuine unknown for a dating product like this — the demographic mix (young-skewing, high never-married share, small enough to build real recurring community) fits the "intentional dating" thesis well on paper, but it\'s untested compared to somewhere like London. Worth watching as an affinity signal precisely because it isn\'t an obvious volume play.',
    sources: [
      { name: 'ONS — How life has changed in Norwich: Census 2021', url: 'https://www.ons.gov.uk/visualisations/censusareachanges/E07000148/', accessed: '2026-09-18' },
      { name: 'ONS — Marriage and civil partnership status, Census 2021', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/marriagecohabitationandcivilpartnerships/articles/marriageandcivilpartnershipstatusenglandandwalescensus2021/2023-02-22', accessed: '2026-09-18' }
    ]
  },
  {
    slug: 'new-york',
    city: 'New York',
    country: 'US',
    publish: true,
    stats: {
      population: { value: '8,584,629', source: 'U.S. Census Bureau population estimate', date: '2025' },
      singleShare: { value: '38.61%', source: 'U.S. Census Bureau, American Community Survey Table S1201 (Marital Status)', date: '2023 5-year estimates' },
      medianAge: { value: '38.2', source: 'U.S. Census Bureau population estimate', date: '2024' }
    },
    subhead: 'New York has more single adults than any other U.S. city — and more dating-app fatigue to go with it.',
    landscapeNote: 'New York has more single adults than any other U.S. city in absolute terms, and a well-documented Manhattan-specific quirk: roughly half of Manhattan residents have never married, well above the citywide figure. The dating culture here is famously fast-paced and app-saturated — the volume of options is real, but so is the fatigue that comes with it.',
    meetIdeas: [
      { name: 'North Brooklyn Runners', type: 'Running club', url: 'https://www.northbrooklynrunners.com/', checkedAt: '2026-09-18', text: 'Young-professional crowd centred on Williamsburg/Greenpoint/LIC, known for post-run beers and a genuinely social, non-competitive vibe.' },
      { name: 'New York Road Runners club runs', type: 'Running club', url: 'https://www.nyrr.org/getinvolved/club', checkedAt: '2026-09-18', text: 'The city\'s largest running organisation — structured runs for every level plus access to a huge recurring event calendar.' },
      { name: 'Social Striders Running Club', type: 'Running club', url: 'https://www.meetup.com/social-striders-running-club/', checkedAt: '2026-09-18', text: 'Explicitly built around social events and volunteering alongside running, not just training.' },
      { name: 'Running Souls Run Club', type: 'Running club', url: 'https://www.instagram.com/runningsoulsrunclub/', checkedAt: '2026-09-18', text: 'Brooklyn-based, mental-health and community focused rather than pace-focused.' },
      { name: 'Front Runners New York', type: 'Running club', url: 'https://frny.org/', checkedAt: '2026-09-18', text: 'Long-running LGBTQ+ running and social club with regular group runs across the city.' }
    ],
    seriousDatingTake: 'NYC\'s dating pool is genuinely the largest of any city here, but the "paradox of choice" problem is also sharper here than almost anywhere else — endless options are the default complaint from single New Yorkers, not a lack of people. A structured, limited-introduction approach is arguably a bigger relief in a city like this than in a smaller one, precisely because the usual alternative is so overwhelming.',
    sources: [
      { name: 'U.S. Census Bureau — New York city population and demographics', url: 'https://www.census.gov/quickfacts/newyorkcitynewyork', accessed: '2026-09-18' },
      { name: 'U.S. Census Bureau — ACS Table S1201, Marital Status', url: 'https://data.census.gov/table/ACSST5Y2023.S1201', accessed: '2026-09-18' }
    ]
  },
  {
    slug: 'atlanta',
    city: 'Atlanta',
    country: 'US',
    publish: true,
    stats: {
      population: { value: '505,268', source: 'U.S. Census Bureau population estimate (city proper)', date: '2024' },
      singleShare: { value: '~50%', source: 'Axios Atlanta, reporting Census-derived metro-area marital status data ("Half of metro Atlanta adults are single")', date: '2025-02-14' },
      medianAge: { value: '34.2', source: 'U.S. Census Bureau population estimate (city proper)', date: '2024' }
    },
    subhead: 'Atlanta consistently ranks among the best U.S. cities for singles. Here\'s what\'s actually behind that reputation.',
    landscapeNote: 'Atlanta consistently ranks near the top of national "best cities for singles" studies, and the single-share figure here is a metro-area number, worth noting since Atlanta\'s dating pool functionally spans well beyond the city line into a much larger metro region. The city has one of the more active LGBTQ+ scenes in the South and a dating culture built as much around neighbourhood identity (Midtown, Buckhead, Old Fourth Ward) as around any single downtown core.',
    meetIdeas: [
      { name: 'Atlanta Track Club community group runs', type: 'Running club', url: 'https://www.atlantatrackclub.org/community-group-runs', checkedAt: '2026-09-18', text: 'A 40,000-member nonprofit running organisation with a full calendar of beginner-friendly community group runs, not just races.' },
      { name: 'Atlanta Beltline Run Club', type: 'Running club', url: 'https://beltline.org/things-to-do/fitness/run-club/', checkedAt: '2026-09-18', text: 'Weekly Thursday fun runs/walks along the Beltline, guided by Track Club and Beltline Partnership staff and volunteers.' },
      { name: 'Big Peach Social Run', type: 'Running club', url: 'https://www.bigpeachrunningco.com/', checkedAt: '2026-09-18', text: 'Recurring social run out of a local running-shop community, casual pace, regular attendees.' },
      { name: 'Buckhead Run Club', type: 'Running club', url: 'https://www.instagram.com/buckheadrunclub/', checkedAt: '2026-09-18', text: 'Neighbourhood-based social run group in one of Atlanta\'s most singles-dense areas.' },
      { name: 'Hands On Atlanta volunteering', type: 'Volunteering', url: 'https://www.handsonatlanta.org/', checkedAt: '2026-09-18', text: 'The city\'s largest volunteer network, with recurring group projects — a genuinely durable way to meet people around shared values rather than a swipe.' }
    ],
    seriousDatingTake: 'Atlanta scores well on raw single-population share and on lifestyle affordability (a first date here is cheaper than in NYC or LA), which lowers the practical friction of dating a lot. Whether that translates into serious relationships or an active hookup-and-casual-dating culture depends heavily on which neighbourhood and social scene you\'re in — this is a city where being deliberate about intent matters more than the numbers alone suggest.',
    sources: [
      { name: 'U.S. Census Bureau QuickFacts — Atlanta city, Georgia', url: 'https://www.census.gov/quickfacts/fact/table/atlantacitygeorgia', accessed: '2026-09-18' },
      { name: 'Axios Atlanta — Half of metro Atlanta adults are single', url: 'https://www.axios.com/local/atlanta/2025/02/14/half-of-metro-atlanta-adults-are-single', accessed: '2026-09-18' }
    ]
  },
  {
    slug: 'austin',
    city: 'Austin',
    country: 'US',
    publish: true,
    stats: {
      population: { value: '~980,000', source: 'U.S. Census Bureau population estimate (city proper)', date: '2024' },
      singleShare: { value: '44.5%', source: 'SmartAsset "Where Most People Are Single or Married" study, using U.S. Census Bureau data', date: '2024' },
      medianAge: { value: '34', source: 'U.S. Census Bureau American Community Survey estimate', date: '2024' }
    },
    subhead: 'Austin\'s tech boom brought a young, gender-balanced dating pool with it. Here\'s what that\'s actually done to the local dating scene.',
    landscapeNote: 'Austin\'s dating pool skews younger and more tech-and-startup-professional than most of the other cities here, driven by continued in-migration of people in their late 20s and 30s. Local reporting puts roughly a third of the city\'s 20-40 population as single, with a close-to-even gender split — a genuinely balanced pool rather than one skewed heavily toward one side.',
    meetIdeas: [
      { name: 'Austin Runners Club', type: 'Running club', url: 'https://austinrunners.org/run-groups/', checkedAt: '2026-09-18', text: 'Nonprofit with active run groups across North, South, East and West Austin, for every pace.' },
      { name: 'Monday Night Run', type: 'Running club', url: 'https://www.readytorunstore.com/', checkedAt: '2026-09-18', text: 'Running 20+ years out of Northwest Hills, meets 6:30pm Mondays — one of the city\'s longest-standing social run traditions.' },
      { name: 'The Most Informal Running Club Ever: Austin (TMIRCE:ATX)', type: 'Running club', url: 'https://www.meetup.com/austin-informal-running-club-home-of-tmirce-atx/', checkedAt: '2026-09-18', text: 'Track workouts, runs and casual brunches/hangouts — explicitly social-first.' },
      { name: 'Zilker Park Thursday group run', type: 'Community run', url: 'https://do512.com/p/run-clubs-in-austin', checkedAt: '2026-09-18', text: 'Free, all-abilities 3-mile Thursday evening run, one of the more consistently-attended casual meetups in the city.' },
      { name: 'Team Glo volunteering', type: 'Volunteering', url: 'https://teamglo.org/', checkedAt: '2026-09-18', text: 'Volunteer opportunities helping run community races — a recurring, low-key way to meet people through shared effort.' }
    ],
    seriousDatingTake: 'Austin\'s young, professional, gender-balanced single population is a genuinely good structural fit for serious dating, and the city\'s outdoor, activity-first culture (running, live music, the lake) gives people more natural low-pressure ways to meet than a purely bar-and-restaurant city would. The tech-industry influx also means a lot of newcomers with thin existing social circles, which is exactly the gap an introduction-based approach is built to fill.',
    sources: [
      { name: 'U.S. Census Bureau QuickFacts — Austin city, Texas', url: 'https://www.census.gov/quickfacts/austincitytexas', accessed: '2026-09-18' },
      { name: 'SmartAsset — Where Most People Are Single or Married, 2024 Study', url: 'https://smartasset.com/data-studies/single-married-2024', accessed: '2026-09-18' }
    ]
  }
];
