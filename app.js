/* ============================================================
   Cholojai Tours & Travels — app.js v3
   Professional, clean, IIFE-scoped
   ============================================================ */
(() => {
  'use strict';

  // ── Config ────────────────────────────────────────────────
  const WA_NUM      = '8801988443399';
  const LEADS_KEY   = 'cholojai_leads_v3';
  const THEME_KEY   = 'cholojai_theme';
  const API_URL     = ['localhost','127.0.0.1'].includes(location.hostname) || location.protocol==='file:'
                      ? 'http://localhost:8080/api/leads' : '/api/leads';

  // ── Package Data ──────────────────────────────────────────
  const PACKAGES = [
    {
      title:'Cox\'s Bazar & St. Martin Island',
      category:'Domestic Bangladesh Tour',
      duration:'3 Days / 2 Nights',
      price:'৳8,500',
      per:'per person',
      highlights:['4-Star Beachfront Hotel on the world\'s longest natural beach','St. Martin Island Luxury Bay Cruise (return)','Complimentary Buffet Breakfast & Seafood Dinner','Inani Beach, Himchari Waterfall & Laboni Beach guided tour','Comfortable AC bus from Dhaka to Cox\'s Bazar'],
      itinerary:[{day:'Day 1',desc:'Arrival, hotel check-in, Laboni Beach sunset walk & seafood dinner.'},{day:'Day 2',desc:'St. Martin Island full day cruise, snorkeling, BBQ lunch on the beach.'},{day:'Day 3',desc:'Inani Beach & Himchari Hill, local shopping, departure.'}],
    },
    {
      title:'Sajek Valley & Bandarban Hills',
      category:'Domestic Hill Tracks Tour',
      duration:'3 Days / 2 Nights',
      price:'৳6,800',
      per:'per person',
      highlights:['Konglak & Helipad hilltop cloud cottage stay','Chander Gari open-air jeep safari across misty hills','Ruilui Para tribal village & hilltop BBQ dinner','Nilgiri, Chimbuk Hill & Shailopropat Waterfall','Professional armed escort & certified local guide'],
      itinerary:[{day:'Day 1',desc:'Khagrachari pickup, Sajek Valley arrival, Helipad sunset.'},{day:'Day 2',desc:'Konglak sunrise trek, jeep safari, transfer to Bandarban Nilgiri.'},{day:'Day 3',desc:'Chimbuk Hill, Shailopropat Waterfall, return journey.'}],
    },
    {
      title:'Kashmir Paradise & Dal Lake Houseboat',
      category:'International Himalayan Tour',
      duration:'5 Days / 4 Nights',
      price:'৳28,500',
      per:'per person',
      highlights:['Dal Lake traditional deluxe houseboat (2 nights)','Shikara boat ride & floating vegetable market tour','Gulmarg Gondola cable car — Phase 1 & Phase 2','Pahalgam Betaab Valley, Chandanwari & Aru Valley','Full Indian Tourist Visa assistance included'],
      itinerary:[{day:'Day 1',desc:'Srinagar arrival, Dal Lake houseboat check-in, Shikara ride.'},{day:'Day 2',desc:'Gulmarg Gondola snow adventure, meadow walk, return.'},{day:'Day 3',desc:'Pahalgam full day — Betaab Valley, Chandanwari, Aru Valley.'},{day:'Day 4',desc:'Mughal Gardens (Shalimar, Nishat), local market shopping.'},{day:'Day 5',desc:'Departure transfer to Srinagar Airport.'}],
    },
    {
      title:'Dubai & Abu Dhabi Grand Tour',
      category:'International Middle East Package',
      duration:'5 Days / 4 Nights',
      price:'৳45,000',
      per:'per person',
      highlights:['4-Star Hotel in Bur Dubai / Deira city centre','Desert Safari: 4×4 dune bashing, BBQ dinner & belly dance','Burj Khalifa At The Top 124th floor observation ticket','Abu Dhabi Grand Mosque & Sheikh Zayed Palace Museum','30-day Express UAE Tourist E-Visa fully included'],
      itinerary:[{day:'Day 1',desc:'Dubai arrival, Dubai Marina & JBR walk, dinner cruise.'},{day:'Day 2',desc:'City tour (Gold Souk, Creek, Deira) + Desert Safari night.'},{day:'Day 3',desc:'Abu Dhabi day trip — Grand Mosque, Yas Island, Corniche.'},{day:'Day 4',desc:'Burj Khalifa, Dubai Mall, Dubai Frame & night souk.'},{day:'Day 5',desc:'Duty-free shopping, airport departure.'}],
    },
    {
      title:'Thailand & Phuket Island Gateway',
      category:'South East Asia Package',
      duration:'5 Days / 4 Nights',
      price:'৳32,000',
      per:'per person',
      highlights:['Bangkok 4-Star Hotel + Phuket Patong Beach Resort','Phi Phi Island & Maya Bay speedboat tour with buffet lunch','Coral Island snorkeling, banana boat & parasailing','Safari World, Grand Palace & Chatuchak Weekend Market','Express Thailand Tourist E-Visa included'],
      itinerary:[{day:'Day 1',desc:'Bangkok arrival, hotel check-in, night market & street food.'},{day:'Day 2',desc:'Bangkok→Phuket flight, Patong beach afternoon.'},{day:'Day 3',desc:'Phi Phi Island & Maya Bay speedboat full day tour.'},{day:'Day 4',desc:'Bangkok return, Safari World & Marine Park.'},{day:'Day 5',desc:'Grand Palace, Chatuchak market, departure.'}],
    },
    {
      title:'Executive 5-Star Umrah Package',
      category:'Religious Pilgrimage',
      duration:'10 Days',
      price:'Custom Rate',
      per:'tailored quote',
      highlights:['Makkah 5-Star Hotel within 150m of Masjid Al-Haram','Madinah 5-Star Hotel adjacent to Masjid Al-Nabawi','Express Umrah Visa + full travel insurance coverage','Round-trip flight via Biman Bangladesh / Saudi Airlines','Private AC bus for all Makkah & Madinah Ziyarat'],
      itinerary:[{day:'Days 1–5',desc:'Makkah Mukarramah — Umrah rituals, Haram ibadah & Ziyarat.'},{day:'Days 6–9',desc:'Madinah Munawwarah — Masjid Nabawi, Quba Mosque & Ziyarat.'},{day:'Day 10',desc:'Jeddah departure, return flight to Dhaka.'}],
    },
    {
      title:'Tanguar Haor Luxury Houseboat',
      category:'Domestic Bangladesh Tour',
      duration:'2 Days / 1 Night',
      price:'Custom Rate',
      per:'tailored quote',
      highlights:['Luxury AC houseboat with rooftop lounge & master cabins','Tekerhat limestone quarry & Niladri Lake crystal clear water','Watchtower & Jadukata river boat tour','Traditional Sylhet duck curry & fish feast','Starry night sky experience on open water'],
      itinerary:[{day:'Day 1',desc:'Sunamganj boarding, luxury houseboat cruise, Tekerhat & Niladri Lake.'},{day:'Day 2',desc:'Watchtower sunrise, Jadukata river bath, return to Sunamganj.'}],
    },
    {
      title:'Sundarbans Forest Cruise & Safari',
      category:'Domestic Bangladesh Tour',
      duration:'3 Days / 2 Nights',
      price:'Custom Rate',
      per:'tailored quote',
      highlights:['3-Day luxury ship cruise through UNESCO mangrove forest','Kotka beach walk & wildlife observation tower','Karamjal deer sanctuary & saltwater crocodile breeding centre','Royal Bengal Tiger tracking & forest guard escort','Full board gourmet seafood meals included'],
      itinerary:[{day:'Day 1',desc:'Khulna/Mongla boarding, Karamjal sanctuary, anchor at Kotka.'},{day:'Day 2',desc:'Kotka forest trek, Jamtola beach walk, Hiron Point river safari.'},{day:'Day 3',desc:'Harbaria mangrove trail, return journey to Mongla.'}],
    },
  ];

  // ── State ─────────────────────────────────────────────────
  let leads = JSON.parse(localStorage.getItem(LEADS_KEY) || '[]');

  // ── Helpers ────────────────────────────────────────────────
  const $  = (s,c=document) => c.querySelector(s);
  const $$ = (s,c=document) => [...c.querySelectorAll(s)];
  const esc = s => String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  const fmtBDT = n => '৳' + parseInt(n).toLocaleString('en-IN');

  // ── Scroll Progress Bar ────────────────────────────────────
  const progressBar = $('#progressBar');
  window.addEventListener('scroll', () => {
    if (!progressBar) return;
    const p = (scrollY / (document.body.scrollHeight - innerHeight)) * 100;
    progressBar.style.width = p + '%';
  }, {passive:true});

  // ── Navbar Scroll ──────────────────────────────────────────
  const navbar = $('#navbar');
  const sections = $$('section[id]');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', scrollY > 50);
    let current = '';
    sections.forEach(s => { if (scrollY >= s.offsetTop - 110) current = s.id; });
    $$('.nav-links a, .drawer-link').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  }, {passive:true});

  // ── Hamburger / Mobile Drawer ──────────────────────────────
  const hamburger = $('#hamburger');
  const drawer    = $('#mobileDrawer');
  hamburger?.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    drawer?.classList.toggle('open', open);
  });

  // ── Corporate Form ─────────────────────────────────────────
  $('#corpForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const company = $('#corpCompany')?.value.trim();
    const name    = $('#corpName')?.value.trim();
    const phone   = $('#corpPhone')?.value.trim();
    const dest    = $('#corpDest')?.value;
    const pax     = $('#corpPax')?.value;

    if (!company || !name || !phone) {
      toast('⚠️ Please fill out company name, contact person, and phone.');
      return;
    }

    const leadObj = {
      date: new Date().toLocaleString(),
      name: `${company} (${name})`,
      phone,
      scope: `Corporate Proposal: ${dest} (${pax})`,
      status: 'Corporate Inquiry'
    };
    // Save to local storage
    leads.push(leadObj);
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
    updateBadge();

    const msg = `Hi Cholojai Tours! My company *${company}* (Contact: ${name}, Phone: ${phone}) would like to request a corporate proposal and quotation for *${dest}* (Group size: ${pax}). Please share detailed proposal & terms.`;
    wa(msg);
  });
  $$('.drawer-link').forEach(a => a.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    drawer?.classList.remove('open');
  }));

  // ── Theme Toggle ───────────────────────────────────────────
  const themeBtn = $('#themeBtn');
  if (localStorage.getItem(THEME_KEY) === 'light') {
    document.body.classList.add('light');
    if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
  themeBtn?.addEventListener('click', () => {
    const light = document.body.classList.toggle('light');
    themeBtn.innerHTML = light ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem(THEME_KEY, light ? 'light' : 'dark');
    toast(light ? '☀️ Light mode' : '🌙 Dark mode');
  });

  // ── Scroll Reveal ──────────────────────────────────────────
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
  }, {threshold: 0.12});
  $$('.fade-up').forEach(el => ro.observe(el));

  // ── Animated Counter Stats (hero) ─────────────────────────
  function animateCounter(el, target, suffix='') {
    let start = 0;
    const duration = 2200;
    const step = timestamp => {
      if (!start) start = timestamp;
      const p = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ease * target).toLocaleString('en-IN');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        $$('.hstat-num').forEach(el => {
          let target = parseInt(el.dataset.target);
          // 994 actually means 99.4 visually shown separately
          if (el.dataset.target === '994') {
            animateCounter(el, 994);
            // Swap to show "99.4" after counter runs
            setTimeout(() => { el.textContent = '99.4'; }, 2300);
          } else {
            animateCounter(el, target);
          }
        });
        statsObserver.disconnect();
      }
    });
  }, {threshold: 0.5});
  const heroStats = $('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  // ── Toast ──────────────────────────────────────────────────
  let toastTimer;
  function toast(msg, ms=3300) {
    const el = $('#toast'); if (!el) return;
    clearTimeout(toastTimer);
    el.textContent = msg;
    el.style.display = 'block';
    el.style.animation = 'none'; void el.offsetWidth; el.style.animation = '';
    toastTimer = setTimeout(() => el.style.display = 'none', ms);
  }

  // ── WhatsApp helper ────────────────────────────────────────
  const wa = text => window.open(`https://wa.me/${WA_NUM}?text=${encodeURIComponent(text)}`, '_blank');

  // ── Lead Badge ─────────────────────────────────────────────
  const updateBadge = () => { const b = $('#leadCount'); if (b) b.textContent = leads.length; };
  updateBadge();

  // ── Modal helpers ──────────────────────────────────────────
  function openModal(id) {
    document.getElementById(id)?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(id) {
    document.getElementById(id)?.classList.remove('open');
    document.body.style.overflow = '';
  }
  $$('.modal').forEach(m => m.addEventListener('click', e => {
    if (e.target === m) { m.classList.remove('open'); document.body.style.overflow = ''; }
  }));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') $$('.modal.open').forEach(m => { m.classList.remove('open'); document.body.style.overflow = ''; });
  });

  // ── Package Filter ─────────────────────────────────────────
  $$('.ftab').forEach(btn => btn.addEventListener('click', () => {
    $$('.ftab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    $$('.pkg-card').forEach(c => { c.style.display = (cat==='all' || c.dataset.cat===cat) ? 'flex' : 'none'; });
  }));

  // ── Package Detail Modal ───────────────────────────────────
  function renderPkgModal(idx) {
    const p = PACKAGES[idx]; if (!p) return;
    const titleEl = $('#pkgModalTitle');
    const bodyEl  = $('#pkgModalBody');
    if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-plane" style="color:var(--gold)"></i> ${esc(p.title)}`;
    if (bodyEl) bodyEl.innerHTML = `
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:22px;align-items:center;">
        <span class="pill-badge">${esc(p.category)}</span>
        <span style="background:rgba(0,122,140,.12);border:1px solid rgba(0,122,140,.3);color:var(--gold);padding:5px 14px;border-radius:999px;font-size:12px;font-weight:700;">
          <i class="fa-regular fa-clock"></i> ${esc(p.duration)}
        </span>
        <span style="font-size:16px;font-weight:800;font-family:'Outfit',sans-serif;color:var(--brand-lime);">Ask for Custom Rate</span>
      </div>
      <h4 style="font-size:14px;font-weight:700;color:var(--gold);margin-bottom:12px;"><i class="fa-solid fa-check-circle"></i> What's Included</h4>
      <ul style="padding-left:18px;display:flex;flex-direction:column;gap:8px;margin-bottom:24px;">
        ${p.highlights.map(h=>`<li style="font-size:14px;color:var(--txt2);line-height:1.6;">${esc(h)}</li>`).join('')}
      </ul>
      <h4 style="font-size:14px;font-weight:700;color:var(--brand-lime);margin-bottom:12px;"><i class="fa-solid fa-map-location-dot"></i> Day-by-Day Itinerary</h4>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:28px;">
        ${p.itinerary.map(it=>`
          <div style="display:flex;gap:14px;padding:12px;background:rgba(255,255,255,.03);border:1px solid var(--border);border-radius:var(--r);">
            <span style="flex-shrink:0;padding:4px 12px;border-radius:999px;background:var(--gold-soft);border:1px solid var(--border-gold);font-size:11px;font-weight:700;color:var(--gold);white-space:nowrap;">${esc(it.day)}</span>
            <span style="font-size:13px;color:var(--txt2);line-height:1.6;">${esc(it.desc)}</span>
          </div>
        `).join('')}
      </div>
      <button class="cta-btn full lg" id="pkgBookBtn" data-title="${esc(p.title)}">
        <i class="fa-brands fa-whatsapp"></i> Ask Price on WhatsApp
      </button>`;

    openModal('pkgModal');
    $('#pkgBookBtn')?.addEventListener('click', e => {
      const t = e.currentTarget.dataset.title;
      closeModal('pkgModal');
      const sc = $('#cScope'); if (sc) sc.value = `${t} (Custom Quote Request)`;
      const cd = $('#cDetails'); if (cd) cd.value = `Hi Cholojai Tours! I'd like to ask for the best custom price for "${t}". Please share availability and rates.`;
      document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});
      toast('✅ Package added to inquiry form!');
    });
  }

  $$('.pkg-detail-btn').forEach(b => b.addEventListener('click', () => renderPkgModal(+b.dataset.pkg)));

  // Book Now buttons on cards
  $$('.book-btn').forEach(b => b.addEventListener('click', () => {
    const sc = $('#cScope'); if (sc) sc.value = b.dataset.title + ' (' + b.dataset.price + ')';
    document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});
    toast('✅ Destination pre-filled in the form!');
  }));

  // Close pkg modal
  $('#closePkg')?.addEventListener('click', () => closeModal('pkgModal'));

  // ── Budget Estimator ───────────────────────────────────────
  const estDest = $('#estDest'), estPax = $('#estPax');
  const addonChks = $$('.addon-chk');

  function calcBudget() {
    if (!estDest || !estPax) return;
    const base = parseInt(estDest.value) || 0;
    const pax  = parseFloat(estPax.value) || 1;
    const destName = (estDest.options[estDest.selectedIndex]?.dataset.name || '').split('(')[0].trim();
    const paxName  = (estPax.options[estPax.selectedIndex]?.text || '').split('[')[0].trim();

    let addons = 0;
    addonChks.forEach((chk, i) => {
      const wrap = document.getElementById(`a${i}`);
      if (chk.checked) { addons += parseInt(chk.value)||0; wrap?.classList.add('active'); }
      else wrap?.classList.remove('active');
    });

    const total = Math.round((base + addons) * pax);
    const sd = $('#sumDest'),  sa = $('#sumAddons'), sp = $('#sumPax'), et = $('#estTotal');
    if (sd) sd.textContent = destName;
    if (sa) sa.textContent = fmtBDT(addons);
    if (sp) sp.textContent = paxName;
    if (et) et.textContent = fmtBDT(total);
  }
  estDest?.addEventListener('change', calcBudget);
  estPax?.addEventListener('change', calcBudget);
  addonChks.forEach(c => c.addEventListener('change', calcBudget));
  calcBudget();

  $('#reserveBtn')?.addEventListener('click', () => {
    const destName = (estDest?.options[estDest.selectedIndex]?.dataset.name || 'Tour Package').split('(')[0].trim();
    const paxTxt = (estPax?.options[estPax.selectedIndex]?.text || 'Solo').split('[')[0].trim();
    const sc = $('#cScope');
    const cd = $('#cDetails');
    if (sc) sc.value = `${destName} (Custom Quote for ${paxTxt})`;
    if (cd) cd.value = `Hi Cholojai Tours! Please provide a custom price quote for ${destName} (${paxTxt}).`;
    document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});
    toast('✅ Custom quote request added to form!');
  });

  // ── Contact Form ───────────────────────────────────────────
  $('#contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const name  = $('#cName')?.value.trim();
    const phone = $('#cPhone')?.value.trim();
    const scope = $('#cScope')?.value.trim() || 'General Inquiry';
    const notes = $('#cDetails')?.value.trim() || 'No notes.';
    if (!name || !phone) { toast('❌ Please fill your name and WhatsApp number.'); return; }

    const lead = { id:Date.now(), date:new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}), name, phone, scope, notes };
    leads.unshift(lead);
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
    updateBadge();

    fetch(API_URL, {method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({name, phone, destination:scope, budget:'Booking Request', source:'Cholojai Web v3'})}).catch(()=>{});

    toast('✅ Booking saved! Opening WhatsApp…');
    const msg = `Hi Cholojai Tours! 👋\n\nName: *${name}*\nContact: ${phone}\nDestination: *${scope}*\nNotes: ${notes}`;
    setTimeout(() => { wa(msg); e.target.reset(); }, 900);
  });

  // ── Admin Modal ────────────────────────────────────────────
  function renderLeads() {
    const tbody = $('#leadsBody'), noMsg = $('#noLeads'), tbl = $('#leadsTable');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (leads.length === 0) {
      if (noMsg) noMsg.style.display = 'block';
      if (tbl)   tbl.style.display   = 'none';
    } else {
      if (noMsg) noMsg.style.display = 'none';
      if (tbl)   tbl.style.display   = 'table';
      leads.forEach(l => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td style="white-space:nowrap">${esc(l.date)}</td>
          <td><strong>${esc(l.name)}</strong></td>
          <td>${esc(l.phone)}</td>
          <td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${esc(l.scope)}">${esc(l.scope)}</td>
          <td><span style="font-size:11px;padding:3px 10px;border-radius:999px;background:rgba(16,185,129,.12);color:#10b981;border:1px solid rgba(16,185,129,.3);font-weight:700;">Active</span></td>
          <td><button class="ghost-btn sm wa-lead" data-n="${esc(l.name)}" data-p="${esc(l.phone)}" style="gap:5px;"><i class="fa-brands fa-whatsapp" style="color:#25d366"></i> Chat</button></td>`;
        tbody.appendChild(tr);
      });
      $$('.wa-lead').forEach(b => b.addEventListener('click', () =>
        wa(`Hi ${b.dataset.n}! This is Cholojai Tours following up on your travel inquiry. How can we help? 🌍`)
      ));
    }
  }

  const openAdmin = () => { renderLeads(); openModal('adminModal'); };
  $('#openAdminBtn')?.addEventListener('click', openAdmin);
  $('#footerAdminBtn')?.addEventListener('click', openAdmin);
  $('#closeAdmin')?.addEventListener('click', () => closeModal('adminModal'));

  $('#clearLeads')?.addEventListener('click', () => {
    if (!confirm('Clear all leads?')) return;
    leads = []; localStorage.removeItem(LEADS_KEY); updateBadge(); renderLeads(); toast('🗑️ All leads cleared.');
  });
  $('#exportLeads')?.addEventListener('click', () => {
    if (!leads.length) { toast('No leads to export.'); return; }
    let csv = 'DATE\tNAME\tPHONE\tDESTINATION\tNOTES\n';
    leads.forEach(l => { csv += `${l.date}\t${l.name}\t${l.phone}\t${l.scope}\t${l.notes}\n`; });
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(new Blob([csv],{type:'text/plain;charset=utf-8'})),
      download:`cholojai_leads_${Date.now()}.txt`,
    });
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    toast('📥 Leads exported!');
  });

  // ── Smooth Scroll Override ─────────────────────────────────
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const tgt = document.querySelector(a.getAttribute('href'));
    if (tgt) { e.preventDefault(); window.scrollTo({top: tgt.offsetTop - 75, behavior:'smooth'}); }
  }));

})();
