/* ============================================================
   ROYAL BATTERIES — Premium JavaScript
   Features: Custom cursor, loader, scroll reveals, particles,
   review carousel, accordion, tabs, multilingual, status
   ============================================================ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function trackLeadEvent(eventName, details = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, details);
    return;
  }
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...details });
  }
}

/* ========================= PAGE LOADER ========================= */
(function initLoader() {
  const loader = document.getElementById('pageLoader');
  const bar = document.getElementById('loaderProgress');
  if (!loader || !bar) return;

  if (prefersReducedMotion) {
    bar.style.width = '100%';
    loader.classList.add('done');
    initRevealAnimations();
    return;
  }

  // Animate progress bar
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 20;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('done');
        initRevealAnimations();
      }, 300);
    }
    bar.style.width = progress + '%';
  }, 80);
})();

/* ========================= CUSTOM CURSOR ========================= */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower || window.innerWidth < 900 || prefersReducedMotion) return;

  let mx = 0, my = 0;
  let fx = 0, fy = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
  });

  // Smooth follower
  function animateFollower() {
    fx += (mx - fx - 18) * 0.12;
    fy += (my - fy - 18) * 0.12;
    follower.style.transform = `translate(${fx}px, ${fy}px)`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effects on interactive elements
  const hoverEls = document.querySelectorAll('a, button, .finder-card, .svc-card, .prod-card, .rev-card, .why-card');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();

/* ========================= MAGNETIC INTERACTION ========================= */
(function initMagnetic() {
  const magnets = document.querySelectorAll('.magnetic-wrap');
  if (window.innerWidth < 900 || prefersReducedMotion) return;

  magnets.forEach(m => {
    m.addEventListener('mousemove', e => {
      const rect = m.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      m.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
    });
    m.addEventListener('mouseleave', () => {
      m.style.transform = '';
    });
  });
})();

/* ========================= ENERGY FLOW ENGINE ========================= */
(function initEnergyFlow() {
  const canvas = document.getElementById('energyCanvas');
  if (!canvas || prefersReducedMotion) return;
  const ctx = canvas.getContext('2d');
  let w, h;
  let particles = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.life = Math.random() * 0.5 + 0.5;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(238, 57, 43, ${this.life * 0.2})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 60; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, w, h);
    
    // Draw connections
    ctx.lineWidth = 0.5;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(238, 57, 43, ${(1 - dist / 150) * 0.15})`;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ========================= CARD GLOW EFFECT ========================= */
(function initCardGlow() {
  const cards = document.querySelectorAll('.glow-card');
  if (prefersReducedMotion) return;
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
})();

/* ========================= NAVBAR ========================= */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });
})();

/* ========================= MOBILE MENU ========================= */
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  function setMenuState(isOpen) {
    hamburger.classList.toggle('open', isOpen);
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => {
    setMenuState(!mobileMenu.classList.contains('open'));
  });

  // Close on link click
  mobileMenu.querySelectorAll('.mm-link').forEach(link => {
    link.addEventListener('click', () => {
      setMenuState(false);
    });
  });
})();

/* ========================= THEME SWITCHER ========================= */
function setTheme(theme) {
  const body = document.body;
  if (!body) return;
  body.setAttribute('data-theme', theme);
  localStorage.setItem('rb_theme', theme);

  document.querySelectorAll('.theme-opt').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    const colorMap = {
      'royal-dark': '#0D1118',
      'royal-light': '#F4F7FB',
      'power-grid': '#081425'
    };
    metaTheme.setAttribute('content', colorMap[theme] || '#0D1118');
  }
}

(function initThemeSwitcher() {
  const savedTheme = localStorage.getItem('rb_theme') || 'royal-dark';
  setTheme(savedTheme);

  const toggle = document.getElementById('themeToggle');
  const menu = document.getElementById('themeMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', menu.classList.contains('open') ? 'true' : 'false');
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  menu.querySelectorAll('.theme-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      setTheme(btn.dataset.theme || 'royal-dark');
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ========================= SHOP STATUS ========================= */
function updateShopStatus() {
  const dot = document.getElementById('statusDot');
  const text = document.getElementById('statusText');
  if (!dot || !text) return;

  const now = new Date();
  const tz = 'Asia/Kolkata';
  const hour = parseInt(new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', hour12: false, timeZone: tz
  }).format(now));

  const isOpen = hour >= 6 && hour < 21;
  const activeCopy = i18n[currentLang] || i18n.en;

  if (isOpen) {
    dot.classList.remove('closed');
    dot.classList.add('open');
    text.textContent = activeCopy.open || i18n.en.open;
  } else {
    dot.classList.remove('open');
    dot.classList.add('closed');
    text.textContent = activeCopy.closed || i18n.en.closed;
  }
}

/* ========================= SCROLL REVEAL ========================= */
function initRevealAnimations() {
  const allReveal = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  allReveal.forEach(el => observer.observe(el));
}

/* ========================= ACCORDION ========================= */
(function initAccordion() {
  document.querySelectorAll('.acc-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.acc-body');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.acc-item').forEach(i => {
        i.classList.remove('open');
        const b = i.querySelector('.acc-body');
        if (b) b.style.maxHeight = null;
      });

      // Toggle clicked
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
})();

/* ========================= PRODUCT TABS ========================= */
function switchTab(name, el) {
  document.querySelectorAll('.ppanel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.ptab').forEach(b => b.classList.remove('active'));

  const panel = document.getElementById('panel-' + name);
  if (panel) {
    panel.classList.add('active');
    // Re-trigger reveal animations in tab
    panel.querySelectorAll('.reveal-up, .reveal, .reveal-left, .reveal-right').forEach(el => {
      el.classList.remove('revealed');
      setTimeout(() => el.classList.add('revealed'), 60);
    });
  }
  if (el) el.classList.add('active');
}

/* ========================= REVIEWS CAROUSEL ========================= */
let reviewIndex = 0;

function getReviewMetrics(track) {
  const cards = track.querySelectorAll('.rev-card');
  if (!cards.length) return { cards, cardW: 0, max: 0 };

  const styles = window.getComputedStyle(track);
  const gap = parseFloat(styles.columnGap || styles.gap || '20') || 20;
  const cardW = cards[0].getBoundingClientRect().width + gap;
  const visibleCards = Math.max(1, Math.floor(track.parentElement.offsetWidth / cardW));
  const max = Math.max(0, cards.length - visibleCards);

  return { cards, cardW, max };
}

function scrollReviews(dir) {
  const track = document.getElementById('reviewsTrack');
  if (!track) return;

  const { cardW, max } = getReviewMetrics(track);
  if (!cardW) return;

  reviewIndex = Math.max(0, Math.min(reviewIndex + dir, max));
  track.style.transform = `translateX(-${reviewIndex * cardW}px)`;
}

// Auto-scroll reviews
(function autoScrollReviews() {
  if (prefersReducedMotion) return;
  setInterval(() => {
    if (document.hidden) return;
    const track = document.getElementById('reviewsTrack');
    if (!track) return;
    const { cardW, max } = getReviewMetrics(track);
    if (!cardW || max === 0) return;
    reviewIndex = reviewIndex >= max ? 0 : reviewIndex + 1;
    track.style.transform = `translateX(-${reviewIndex * cardW}px)`;
  }, 4000);
})();

/* ========================= HERO VISUAL MOTION ========================= */
(function initHeroVisualMotion() {
  const heroBg = document.querySelector('.hero-bg-img');
  const stack = document.getElementById('heroVisualStack');
  if (!heroBg && !stack) return;

  function updateParallax() {
    if (heroBg && !prefersReducedMotion) {
      heroBg.style.transform = `translateY(${window.scrollY * 0.18}px)`;
    }

    if (stack && !prefersReducedMotion) {
      const rect = stack.getBoundingClientRect();
      const shift = Math.max(-12, Math.min(18, rect.top * -0.03));
      stack.style.setProperty('--hero-shift', `${shift}px`);
    }
  }

  updateParallax();
  window.addEventListener('scroll', updateParallax, { passive: true });

  if (!stack || window.innerWidth < 900 || prefersReducedMotion) return;

  stack.addEventListener('mousemove', (event) => {
    const rect = stack.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) - 0.5;
    const y = ((event.clientY - rect.top) / rect.height) - 0.5;
    stack.style.setProperty('--hero-tilt-x', `${-y * 7}deg`);
    stack.style.setProperty('--hero-tilt-y', `${x * 10}deg`);
  });

  stack.addEventListener('mouseleave', () => {
    stack.style.setProperty('--hero-tilt-x', '0deg');
    stack.style.setProperty('--hero-tilt-y', '0deg');
  });
})();

/* ========================= CTA PARTICLES ========================= */
(function initCtaParticles() {
  const container = document.getElementById('ctaParticles');
  if (!container || prefersReducedMotion) return;

  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    const x = Math.random() * 100;
    const delay = Math.random() * 6;
    const duration = Math.random() * 4 + 4;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      bottom: ${Math.random() * 20}%;
      animation-delay: ${delay}s;
      animation-duration: ${duration}s;
      opacity: ${Math.random() * 0.4};
    `;
    container.appendChild(p);
  }
})();

/* ========================= MULTILINGUAL ========================= */
let currentLang = 'en';

const i18n = {
  en: {
    n1: 'Services', n2: 'Find Battery', n3: 'Products', n4: 'About Us', n5: 'Contact',
    callNow: 'Call Now', whatsappNow: 'WhatsApp', instantReply: 'Instant Reply',
    open: 'Open Now - Batteries available today',
    closed: 'Closed Now - Opens at 6:00 AM',
    h1line1: 'Power Your Journey',
    h1line2: 'with <em>Royal Batteries</em>',
    h1line3: "Premium EXIDE CARE Showroom",
    heroSub: 'Royal Batteries is a premium EXIDE CARE showroom in Gajwel for car, bike, inverter, and commercial batteries, with fitment, testing, and warranty support across a 50+ km radius.',
    yearsExp: 'Years Experience', topBrands: 'Authorized Dealer', openDaily: 'Open Daily',
    fastCheck: 'Fast Health Check', freeTest: 'Free diagnostics',
    warranty: 'Warranty Backed', allBrands: 'All brands',
    scrollExplore: 'Scroll to explore',
    svcTag: 'What We Do',
    svcTitle: 'Battery Solutions Built Around <em>You</em>',
    svcSub: 'Every service is backed by 25+ years of expertise and a genuine commitment to your safety. We proudly serve a massive 50+ KM radius!',
    svc1t: 'Car Battery Replacement',
    svc1d: 'Correct fitment, safe installation & responsible disposal of old batteries.',
    svc2t: 'Bike Battery',
    svc2d: 'Two-wheeler batteries tested before delivery. Scooters & motorcycles covered.',
    svc3t: 'Inverter Batteries',
    svc3d: 'Long backup options for homes, clinics, shops & offices.',
    svc4t: 'Testing & Diagnostics',
    svc4d: 'Advanced voltage, CCA & charging-health diagnostics.',
    svc5t: 'Commercial Vehicles',
    svc5d: 'Tractors, trucks & HCVs. Heavy-duty options for commercial fleets.',
    enquireNow: 'Enquire Now',
    whyTag: 'Why Choose Us',
    whyTitle: 'Trusted by Thousands in <em>Telangana</em>',
    whySub: 'We do not just sell batteries. We match the right battery, explain the choice clearly, and support you after the sale.',
    talkToExpert: 'Talk to Expert',
    why1t: 'Technical Expertise', why1d: 'Khaja brings 25+ years of hands-on battery knowledge.',
    why2t: 'Transparent Pricing', why2d: 'No hidden charges. Honest quotes every time.',
    why3t: 'Same-Day Service', why3d: 'Most battery replacements done within the hour.',
    why4t: 'Warranty Support', why4d: 'Full warranty claim handling for every brand we sell.',
    relTag: 'Why Customers Return',
    relSub: 'From first call to after-sales support, we focus on fast turnaround, honest guidance, and long-term battery care that brings customers back.',
    rel1Title: 'Faster Service, Less Downtime',
    rel1Desc: 'Most replacements and fitment checks are completed within the hour, so your day keeps moving without unnecessary delays.',
    rel2Title: 'Advisory, Not Pushy Selling',
    rel2Desc: 'We recommend what fits your usage and budget, explain trade-offs clearly, and help you choose confidently.',
    rel3Title: 'After-Sales That Builds Trust',
    rel3Desc: 'Warranty support, preventive reminders, and practical care tips help customers avoid repeat breakdown stress.',
    finderTag: 'Battery Finder',
    finderTitle: 'What Are You Powering <em>Today?</em>',
    finderSub: 'Tap a category and get an instant WhatsApp quote from our experts.',
    fnd1t: 'Car', fnd1d: 'Sedan, hatchback, SUV and premium cars with petrol or diesel engines.',
    fnd2t: 'Bike / Scooter', fnd2d: 'Motorcycles & scooters with quick-fit support',
    fnd3t: 'Inverter / Home', fnd3d: 'Tubular & backup batteries for homes & shops',
    fnd4t: 'Commercial', fnd4d: 'Tractors, trucks & utility vehicles',
    getQuote: 'Get WhatsApp Quote',
    prodTag: 'Our Stock', prodTitle: 'Popular Battery <em>Models</em>',
    prodSub: 'Browse our most popular models. Contact us for current stock & pricing.',
    tabCar: 'Car', tabBike: 'Bike', tabInverter: 'Inverter',
    checkAvail: 'Check Availability',
    expertTag: 'Meet the Expert',
    expertName: 'Khaja Mujahiduddin',
    expertRole: 'Technical Battery Specialist | Royal Batteries, Gajwel',
    exp1: 'Deep diagnostics for charging & battery health issues',
    exp2: 'Practical recommendations based on your usage pattern',
    exp3: 'Trusted warranty claim handling for all major brands',
    exp4: 'Serving Gajwel, Siddipet & Medak for over two decades',
    expertQuote: '"The right battery is not about price alone. It is about fit, usage pattern, and long-term reliability."',
    callExpert: 'Call the Expert', msgExpert: 'Message on WhatsApp',
    guideTag: 'Know Before You Buy',
    guideTitle: 'Battery Buying <em>Guide</em>',
    guideSub: 'Clear answers from a 25-year expert. No jargon, just honest advice.',
    faq1q: 'What is CCA and why does it matter?',
    faq1a: 'CCA (Cold Cranking Amps) is a critical rating that measures how strongly a battery can start an engine in cold temperatures. Specifically, it indicates the number of amps a 12-volt battery can deliver for 30 seconds at 0°F (-18°C) while maintaining at least 7.2 volts. Higher CCA means the battery can start your vehicle more reliably, which is incredibly important for larger engines or during cold mornings when engine oil thickens and creates high resistance.',
    faq2q: 'How do I choose the right AH size?',
    faq2a: "Ampere Hour (AH) dictates how long the battery can supply a specific current before dying. You should strictly follow your vehicle manufacturer's recommendation. Choosing a lower AH rating means your accessories (like AC, headlights, and stereo) might drain the battery quickly and leave you stranded. At Royal Batteries, our 25+ years of experience ensure we match the exact AH and DIN layout required for your car.",
    faq3q: 'How often should inverter batteries be checked?',
    faq3a: "For heavy daily usage out in districts like Medak and Siddipet, check the water level every 3–4 months. Using distilled water exclusively and maintaining clean, petroleum-jelly-coated terminals can practically double your battery's lifespan. Never let the float indicators drop to the red zone. Drop by our Gajwel store for a completely free health and water-level check!",
    faq4q: 'Is Exide or Amaron better for my car?',
    faq4a: 'Both are premium, highly reliable brands, but they serve different needs. Exide boasts heavy-duty plate technology proven to last incredibly long in extreme Indian conditions. Amaron features SilvenX alloy, making it genuinely zero-maintenance with exceptionally high CCA output. As the best battery shop in the region, we always analyze your driving habits and budget before recommending!',
    faq5q: 'What signs mean my battery is failing?',
    faq5a: 'The most obvious signs are slow engine cranking (a sluggish "rur-rur-rur" sound), headlights dimming while idling, the need to press the accelerator to start, a bulging battery case, or a dashboard battery light. Batteries usually last 3-5 years. If yours is older, visit us immediately before you experience a sudden breakdown.',
    revTag: 'Customer Stories', revTitle: 'Real People, <em>Real Trust</em>',
    ratCount: 'Verified customers in Gajwel & Siddipet',
    rev1t: '"Very fast battery replacement and clear explanation. Pricing was 100% genuine — no surprises at all."',
    rev2t: '"Warranty claim handled so quickly and professionally. Outstanding after-sales support."',
    rev3t: '"Got the exact right inverter battery in one visit. Very knowledgeable team."',
    revLoc1: 'Gajwel Customer', revLoc2: 'Siddipet Customer', revLoc3: 'Medak Customer',
    dealerTag: 'For Businesses',
    dealerTitle: 'Dealer & Bulk Partnership',
    dealerSub: 'Resellers, workshops & institutions - contact us for exclusive dealer pricing and recurring supply.',
    callPartner: 'Call for Partnership', waPartner: 'WhatsApp Partnership',
    brandPartnerships: 'Brand Partnerships', happyCustomers: 'Happy Customers', serviceRadius: 'Service Radius',
    locTag: 'Find Us', locTitle: 'Visit Us in <em>Gajwel</em>',
    locSub: 'Opposite Munsif Court, Gajwel, Telangana - Open daily 6 AM to 9 PM.',
    address: 'Address', hours: 'Hours', hoursDetail: 'Open every day - 6:00 AM to 9:00 PM',
    phone: 'Phone', serving: 'Serving',
    ctaTitle: 'Dead Battery? We\'ll Have <em>You Moving</em> Fast.',
    ctaSub: 'Call or WhatsApp right now. We deliver fast service, honest recommendations, and dependable after-sales support that keeps customers coming back.',
    free: 'Free Diagnostics', genuine: 'Genuine Brands', warranty2: 'Warranty Backed', noHiddenFees: 'No Hidden Fees',
    footerTagline: 'Gajwel\'s most trusted battery partner since 2005.',
    services: 'Services', brands: 'Brands', contact: 'Contact',
    footerOwner: 'Owner: Khaja Mujahiduddin',
    allRights: 'All rights reserved.'
  },
  te: {
    n1: 'సేవలు', n2: 'బ్యాటరీ కనుగొనండి', n3: 'ఉత్పత్తులు', n4: 'మా గురించి', n5: 'సంప్రదింపు',
    callNow: 'ఇప్పుడే కాల్ చేయండి', whatsappNow: 'వాట్సాప్', instantReply: 'తక్షణ సమాధానం',
    heroSub: 'కారు, బైక్ & ఇన్వర్టర్ బ్యాటరీ పరిష్కారాలు — నిపుణుల మార్గదర్శకత్వంతో',
    yearsExp: 'సంవత్సరాల అనుభవం', topBrands: 'అగ్రశ్రేణి బ్రాండ్‌లు', openDaily: 'రోజూ తెరిచి',
    svcTag: 'మేము చేసేది', enquireNow: 'ఇప్పుడే అడగండి',
    whyTag: 'ఎందుకు మాను ఎంచుకోవాలి', talkToExpert: 'నిపుణుడితో మాట్లాడండి',
    finderTag: 'బ్యాటరీ కనుగొనండి', getQuote: 'వాట్సాప్ కోట్ పొందండి',
    prodTag: 'మా స్టాక్', checkAvail: 'అందుబాటు తనిఖీ చేయండి',
    expertTag: 'నిపుణుడిని కలవండి', expertName: 'ఖాజా ముజాహిద్దీన్',
    expertRole: 'సాంకేతిక బ్యాటరీ నిపుణుడు | రాయల్ బ్యాటరీస్',
    callExpert: 'నిపుణుడిని కాల్ చేయండి', msgExpert: 'వాట్సాప్‌లో సందేశం పంపండి',
    guideTag: 'కొనే ముందు తెలుసుకోండి',
    revTag: 'కస్టమర్ అభిప్రాయాలు', revTitle: 'నిజమైన విశ్వాసం',
    dealerTag: 'వ్యాపారుల కోసం', callPartner: 'భాగస్వామ్యం కోసం కాల్', waPartner: 'వాట్సాప్ భాగస్వామ్యం',
    locTag: 'మా స్థానం', locTitle: '<em>గజ్వేల్</em>లో సందర్శించండి',
    callLabel: 'కాల్', whatsappLabel: 'వాట్సాప్',
    footerTagline: '2005 నుండి గజ్వేల్ యొక్క అత్యంత విశ్వసనీయ బ్యాటరీ భాగస్వామి.',
  },
  hi: {
    n1: 'सेवाएं', n2: 'बैटरी खोजें', n3: 'प्रोडक्ट्स', n4: 'हमारे बारे में', n5: 'संपर्क',
    callNow: 'अभी कॉल करें', whatsappNow: 'व्हाट्सऐप', instantReply: 'तुरंत जवाब',
    heroSub: 'कार, बाइक और इन्वर्टर बैटरी समाधान — विशेषज्ञ मार्गदर्शन के साथ',
    yearsExp: 'साल का अनुभव', topBrands: 'शीर्ष ब्रांड', openDaily: 'रोज खुला',
    svcTag: 'हम क्या करते हैं', enquireNow: 'अभी पूछें',
    whyTag: 'हमें क्यों चुनें', talkToExpert: 'विशेषज्ञ से बात करें',
    finderTag: 'बैटरी खोजें', getQuote: 'व्हाट्सऐप कोटेशन',
    prodTag: 'हमारा स्टॉक', checkAvail: 'उपलब्धता जांचें',
    expertTag: 'विशेषज्ञ से मिलें', expertName: 'ख़ाजा मुजाहिद्दीन',
    expertRole: 'तकनीकी बैटरी विशेषज्ञ | रॉयल बैटरीज',
    callExpert: 'विशेषज्ञ को कॉल करें', msgExpert: 'व्हाट्सऐप पर संदेश',
    guideTag: 'खरीदने से पहले जानें',
    revTag: 'ग्राहकों की राय', revTitle: 'असली लोग, <em>असला भरोसा</em>',
    dealerTag: 'व्यापारियों के लिए', callPartner: 'साझेदारी के लिए कॉल', waPartner: 'व्हाट्सऐप साझेदारी',
    locTag: 'हमें खोजें', locTitle: '<em>गजवेल</em> में हमसे मिलें',
    footerTagline: '2005 से गजवेल का सबसे भरोसेमंद बैटरी पार्टनर।',
  }
};

function applyTranslations(lang) {
  const t = i18n[lang] || i18n.en;
  const en = i18n.en;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
    else if (en[key] !== undefined) el.textContent = en[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (t[key] !== undefined) el.innerHTML = t[key];
    else if (en[key] !== undefined) el.innerHTML = en[key];
  });
}

function setLang(lang, btn) {
  currentLang = lang;
  document.documentElement.lang = lang;
  localStorage.setItem('rb_lang', lang);
  applyTranslations(lang);
  updateShopStatus();

  document.querySelectorAll('.lang-opt').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

/* ========================= NUMBER COUNTER ========================= */
(function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count || el.dataset.target || el.textContent);
        if (isNaN(target)) return;
        
        let suffix = "";
        if (el.textContent.includes("+")) suffix = "+";
        else if (el.textContent.includes("km")) suffix = "km";
        else if (el.textContent.includes("AM")) suffix = ""; // Keep AM as is
        
        let current = 0;
        const duration = 2000;
        const step = target / (duration / 16);
        
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current) + suffix;
          if (current >= target) clearInterval(timer);
        }, 16);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count], .trust-num, .dv-num, .ep-num').forEach(el => {
    observer.observe(el);
  });
})();

/* ========================= SMOOTH ANCHOR SCROLL ========================= */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();

/* ========================= CCA TABS ========================= */
(function initCcaTabs() {
  const tabs = document.querySelectorAll('.cca-tab');
  const panels = document.querySelectorAll('.cca-panel');
  if (!tabs.length || !panels.length) return;

  function activateTab(tab) {
    const key = tab.dataset.cca;
    tabs.forEach(t => {
      const selected = t === tab;
      t.classList.toggle('active', selected);
      t.setAttribute('aria-selected', selected ? 'true' : 'false');
      t.setAttribute('tabindex', selected ? '0' : '-1');
    });

    panels.forEach(panel => {
      const show = panel.id === `cca-panel-${key}`;
      panel.classList.toggle('active', show);
      panel.hidden = !show;
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));

    tab.addEventListener('keydown', (event) => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();

      let nextIndex = index;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;

      const nextTab = tabs[nextIndex];
      if (!nextTab) return;
      activateTab(nextTab);
      nextTab.focus();
    });
  });
})();

/* ========================= LIVE POWER PULSE ========================= */
(function initLivePower() {
  const readinessEl = document.getElementById('readinessValue');
  const ringFill = document.getElementById('ringFill');
  const ccaValueEl = document.getElementById('ccaLiveValue');
  const ccaBar = document.getElementById('ccaLiveBar');
  const chargeValueEl = document.getElementById('chargeLiveValue');
  const chargeBar = document.getElementById('chargeLiveBar');
  const altValueEl = document.getElementById('altLiveValue');
  const altBar = document.getElementById('altLiveBar');
  const canvas = document.getElementById('powerWave');
  if (!readinessEl || !ringFill || !ccaValueEl || !ccaBar || !chargeValueEl || !chargeBar || !altValueEl || !altBar || !canvas) return;

  const radius = 84;
  const circumference = 2 * Math.PI * radius;
  ringFill.style.strokeDasharray = `${circumference}`;

  function setRing(percent) {
    const safe = Math.max(0, Math.min(100, percent));
    const offset = circumference - (safe / 100) * circumference;
    ringFill.style.strokeDashoffset = `${offset}`;
    readinessEl.textContent = `${safe}%`;
  }

  function setBar(el, value, min, max) {
    const pct = ((value - min) / (max - min)) * 100;
    el.style.width = `${Math.max(0, Math.min(100, pct))}%`;
  }

  function updateLiveValues() {
    const readiness = 93 + Math.floor(Math.random() * 7);
    const cca = 540 + Math.floor(Math.random() * 170);
    const charge = 80 + Math.floor(Math.random() * 17);
    const alternator = (13.6 + Math.random() * 0.8).toFixed(1);

    setRing(readiness);
    ccaValueEl.textContent = `${cca} A`;
    chargeValueEl.textContent = `${charge}%`;
    altValueEl.textContent = `${alternator} V`;

    setBar(ccaBar, cca, 500, 730);
    setBar(chargeBar, charge, 75, 100);
    setBar(altBar, parseFloat(alternator), 13.2, 14.6);
  }

  const ctx = canvas.getContext('2d');
  let t = 0;
  function drawWave() {
    if (!ctx) return;
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, '#EE392B');
    gradient.addColorStop(1, '#F7B351');

    ctx.lineWidth = 3;
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    for (let x = 0; x <= width; x++) {
      const y = height * 0.55 + Math.sin((x * 0.02) + t) * 20 + Math.sin((x * 0.008) + (t * 0.7)) * 10;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.lineWidth = 1.4;
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.beginPath();
    for (let x = 0; x <= width; x++) {
      const y = height * 0.65 + Math.sin((x * 0.015) + (t * 1.3)) * 8;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    t += 0.06;
    requestAnimationFrame(drawWave);
  }

  updateLiveValues();
  if (prefersReducedMotion) {
    setRing(95);
    return;
  }

  setInterval(updateLiveValues, 2200);
  drawWave();
})();

/* ========================= LEAD TRACKING ========================= */
(function initLeadTracking() {
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => trackLeadEvent('lead_call_click'));
  });

  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => trackLeadEvent('lead_whatsapp_click'));
  });
})();

/* ========================= INIT ========================= */
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('rb_lang') || 'en';
  currentLang = savedLang;
  applyTranslations(savedLang);
  document.documentElement.lang = savedLang;
  document.querySelectorAll('.lang-opt').forEach(btn => btn.classList.remove('active'));
  const activeLangBtn = document.querySelector(`.lang-opt[data-lang="${savedLang}"]`);
  if (activeLangBtn) activeLangBtn.classList.add('active');
  updateShopStatus();
  setInterval(updateShopStatus, 60000);

  // If loader is skipped for fast loads
  setTimeout(() => {
    const loader = document.getElementById('pageLoader');
    if (loader && !loader.classList.contains('done')) {
      loader.classList.add('done');
      initRevealAnimations();
    }
  }, 2500);
});
