/* =============================================================
   Cholojai Tours & Travels — app.js v2.0
   Professional interactive logic
   ============================================================= */

(() => {
    'use strict';

    // ── Config ──────────────────────────────────────────────────
    const WHATSAPP_NUMBER = '8801700000000';
    const STORAGE_KEY     = 'cholojai_leads_v2';
    const THEME_KEY       = 'cholojai_theme';
    const API_URL         = (location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.protocol === 'file:')
                            ? 'http://localhost:8080/api/leads'
                            : '/api/leads';

    // ── State ────────────────────────────────────────────────────
    let leads = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    // ── Tour Package Data ─────────────────────────────────────────
    const packages = [
        {
            title: "Cox's Bazar & St. Martin Island",
            category: "Domestic Bangladesh Tour",
            duration: "3 Days / 2 Nights",
            price: "৳8,500",
            label: "per person",
            highlights: [
                "4-Star Beachfront Hotel on the world's longest natural sea beach",
                "St. Martin Island Luxury Bay Cruise Ticket (return)",
                "Complimentary Buffet Breakfast & Seafood Dinner",
                "Inani Beach, Himchari Waterfall & Laboni Beach guided tour",
                "Comfortable AC bus transportation from Dhaka",
            ],
            itinerary: [
                { day: "Day 1", detail: "Arrival at Cox's Bazar, hotel check-in, Laboni Beach sunset walk." },
                { day: "Day 2", detail: "St. Martin Island cruise, snorkeling, BBQ seafood lunch on the beach." },
                { day: "Day 3", detail: "Inani Beach & Himchari Hill visit, shopping, departure." },
            ],
        },
        {
            title: "Sajek Valley & Bandarban Hills",
            category: "Domestic Hill Tracks Tour",
            duration: "3 Days / 2 Nights",
            price: "৳6,800",
            label: "per person",
            highlights: [
                "Konglak & Helipad hilltop cloud cottage stay",
                "Chander Gari open-air jeep safari across misty hills",
                "Ruilui Para tribal village culture & hilltop BBQ dinner",
                "Bandarban Nilgiri, Chimbuk Hill & Shailopropat Waterfall",
                "Professional armed escort & certified local guide",
            ],
            itinerary: [
                { day: "Day 1", detail: "Khagrachari pickup, Sajek Valley arrival, Helipad sunset." },
                { day: "Day 2", detail: "Konglak sunrise trek, Jeep safari, transfer to Bandarban Nilgiri." },
                { day: "Day 3", detail: "Chimbuk Hill, Shailopropat Waterfall, return journey." },
            ],
        },
        {
            title: "Kashmir Paradise & Houseboat",
            category: "International Himalayan Tour",
            duration: "5 Days / 4 Nights",
            price: "৳28,500",
            label: "per person",
            highlights: [
                "Dal Lake traditional deluxe houseboat stay (2 nights)",
                "Shikara boat ride across Dal Lake & floating vegetable market",
                "Gulmarg Gondola cable car ride — Phase 1 & Phase 2",
                "Pahalgam Betaab Valley, Chandanwari & Aru Valley tour",
                "Full Indian Tourist Visa assistance & airport transfers",
            ],
            itinerary: [
                { day: "Day 1", detail: "Srinagar arrival, Dal Lake houseboat check-in, Shikara ride." },
                { day: "Day 2", detail: "Gulmarg Snow Gondola, meadow walk, return to Srinagar." },
                { day: "Day 3", detail: "Pahalgam Betaab Valley, Chandanwari, Aru Valley excursion." },
                { day: "Day 4", detail: "Mughal Gardens (Shalimar, Nishat), local market shopping." },
                { day: "Day 5", detail: "Departure transfer to Srinagar Airport." },
            ],
        },
        {
            title: "Dubai & Abu Dhabi Grand Tour",
            category: "International Middle East Package",
            duration: "5 Days / 4 Nights",
            price: "৳45,000",
            label: "per person",
            highlights: [
                "4-Star Hotel stay in Bur Dubai or Deira city centre",
                "Desert Safari — 4×4 dune bashing, BBQ dinner & belly dance",
                "Burj Khalifa At The Top (124th floor) observation ticket",
                "Abu Dhabi Grand Mosque & Sheikh Zayed Palace Museum",
                "30-day Express UAE Tourist E-Visa fully included",
            ],
            itinerary: [
                { day: "Day 1", detail: "Dubai arrival, Dubai Marina & JBR evening walk." },
                { day: "Day 2", detail: "City tour (Deira, Gold Souk, Creek) + Desert Safari night." },
                { day: "Day 3", detail: "Abu Dhabi day trip — Grand Mosque & Yas Island." },
                { day: "Day 4", detail: "Burj Khalifa, Dubai Mall, Dubai Frame & night market." },
                { day: "Day 5", detail: "Duty-free shopping, airport departure." },
            ],
        },
        {
            title: "Thailand & Phuket Island Gateway",
            category: "South East Asia Package",
            duration: "5 Days / 4 Nights",
            price: "৳32,000",
            label: "per person",
            highlights: [
                "Bangkok 4-Star Hotel + Phuket Patong Beach Resort",
                "Phi Phi Island & Maya Bay speedboat tour with buffet lunch",
                "Coral Island snorkeling, banana boat & parasailing",
                "Safari World, Grand Palace & Chatuchak Weekend Market",
                "Express Thailand Tourist E-Visa processing included",
            ],
            itinerary: [
                { day: "Day 1", detail: "Bangkok arrival, hotel check-in, night market & street food." },
                { day: "Day 2", detail: "Bangkok → Phuket flight, Patong beach afternoon." },
                { day: "Day 3", detail: "Phi Phi Island & Maya Bay speedboat full day tour." },
                { day: "Day 4", detail: "Bangkok return, Safari World & Marine Park visit." },
                { day: "Day 5", detail: "Grand Palace, Chatuchak market, departure." },
            ],
        },
        {
            title: "Executive 5-Star Umrah Package",
            category: "Religious Pilgrimage",
            duration: "10 Days",
            price: "৳1,15,000",
            label: "per person",
            highlights: [
                "Makkah Mukarramah 5-Star Hotel within 150 m of Masjid Al-Haram",
                "Madinah Munawwarah 5-Star Hotel adjacent to Masjid Al-Nabawi",
                "Express Umrah Visa approval + full travel insurance",
                "Round-trip flight via Biman Bangladesh / Saudi Airlines",
                "Private AC mini-bus for Makkah & Madinah Ziyarat tours",
            ],
            itinerary: [
                { day: "Days 1–5", detail: "Makkah Mukarramah — Umrah rituals, Haram ibadah, Ziyarat." },
                { day: "Days 6–9", detail: "Madinah Munawwarah — Masjid Nabawi, Quba Mosque, Ziyarat." },
                { day: "Day 10", detail: "Jeddah departure, return flight to Dhaka." },
            ],
        },
    ];

    // ── DOM Helpers ──────────────────────────────────────────────
    const $  = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

    function esc(str) {
        if (!str) return '';
        return String(str).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
    }

    // ── Toast ───────────────────────────────────────────────────
    let toastTimer;
    function toast(msg, duration = 3400) {
        const el = $('#toast');
        if (!el) return;
        clearTimeout(toastTimer);
        el.textContent = msg;
        el.style.display = 'block';
        el.style.animation = 'none';
        void el.offsetWidth; // reflow
        el.style.animation = '';
        toastTimer = setTimeout(() => { el.style.display = 'none'; }, duration);
    }

    // ── WhatsApp ─────────────────────────────────────────────────
    function openWA(text) {
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
    }

    // ── Badge count ───────────────────────────────────────────────
    function updateBadge() {
        const b = $('#inquiryBadge');
        if (b) b.textContent = leads.length;
    }
    updateBadge();

    // ── Navbar: scroll effect & active links ─────────────────────
    const navbar = $('#navbar');
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        navbar.classList.toggle('scrolled', window.scrollY > 50);

        // Active nav link highlighting
        const sections = $$('section[id]');
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 110) current = s.id;
        });
        $$('.nav-links a, .mobile-nav a').forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
        });
    }, { passive: true });

    // ── Mobile Menu ───────────────────────────────────────────────
    const mobileMenuBtn = $('#mobileMenuBtn');
    const mobileNav     = $('#mobileNav');
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            const open = mobileNav.classList.toggle('open');
            mobileMenuBtn.innerHTML = open
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });
        // Close on link click
        $$('.mobile-nav-link').forEach(a => {
            a.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }

    // ── Theme Toggle ──────────────────────────────────────────────
    const themeBtn = $('#themeToggleBtn');
    if (localStorage.getItem(THEME_KEY) === 'light') {
        document.body.classList.add('light-theme');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
    themeBtn?.addEventListener('click', () => {
        const light = document.body.classList.toggle('light-theme');
        themeBtn.innerHTML = light ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        localStorage.setItem(THEME_KEY, light ? 'light' : 'dark');
        toast(light ? '☀️ Light mode on' : '🌙 Dark mode on');
    });

    // ── Scroll Reveal ─────────────────────────────────────────────
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                revealObserver.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });
    $$('.reveal').forEach(el => revealObserver.observe(el));

    // ── Package Filter Tabs ───────────────────────────────────────
    $$('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            $$('.package-card').forEach(card => {
                const show = filter === 'all' || card.dataset.category === filter;
                card.style.display = show ? 'flex' : 'none';
            });
        });
    });

    // ── Package Detail Modal ──────────────────────────────────────
    const pkgModal      = $('#pkgModal');
    const pkgModalTitle = $('#pkgModalTitle');
    const pkgModalBody  = $('#pkgModalBody');
    const closePkgModal = $('#closePkgModal');

    function openPkgModal(idx) {
        const pkg = packages[idx];
        if (!pkg || !pkgModal) return;

        pkgModalTitle.innerHTML = `<i class="fa-solid fa-plane" style="color:var(--primary)"></i> ${esc(pkg.title)}`;
        pkgModalBody.innerHTML = `
            <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:24px;">
                <span class="badge badge-gold">${esc(pkg.category)}</span>
                <span class="badge badge-cyan"><i class="fa-regular fa-clock"></i> ${esc(pkg.duration)}</span>
                <span style="font-size:18px;font-weight:800;font-family:'Outfit',sans-serif;color:var(--primary);display:flex;align-items:center;">${esc(pkg.price)} <small style="font-size:12px;color:var(--text-sub);margin-left:4px;">${esc(pkg.label)}</small></span>
            </div>

            <h4 style="font-size:15px;font-weight:700;margin-bottom:12px;color:var(--primary);">
                <i class="fa-solid fa-circle-check"></i> What's Included
            </h4>
            <ul style="padding-left:18px;color:var(--text-sub);margin-bottom:24px;display:flex;flex-direction:column;gap:8px;">
                ${pkg.highlights.map(h => `<li style="font-size:14px;line-height:1.6;">${esc(h)}</li>`).join('')}
            </ul>

            <h4 style="font-size:15px;font-weight:700;margin-bottom:12px;color:var(--accent);">
                <i class="fa-solid fa-map-location-dot"></i> Tour Itinerary
            </h4>
            <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:28px;">
                ${pkg.itinerary.map(it => `
                    <div style="display:flex;gap:14px;align-items:flex-start;padding:12px;background:var(--bg-glass);border:1px solid var(--border);border-radius:var(--r-sm);">
                        <span style="font-size:12px;font-weight:700;color:var(--primary);background:var(--primary-soft);padding:4px 10px;border-radius:var(--r-full);white-space:nowrap;">${esc(it.day)}</span>
                        <span style="font-size:13px;color:var(--text-sub);line-height:1.6;">${esc(it.detail)}</span>
                    </div>
                `).join('')}
            </div>

            <button class="btn btn-primary btn-full btn-lg modal-book-btn" data-title="${esc(pkg.title)}" data-price="${esc(pkg.price)} ${esc(pkg.label)}">
                <i class="fa-brands fa-whatsapp"></i> Reserve This Package on WhatsApp
            </button>
        `;

        pkgModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Book button inside modal
        pkgModalBody.querySelector('.modal-book-btn')?.addEventListener('click', (e) => {
            const title = e.currentTarget.dataset.title;
            const price = e.currentTarget.dataset.price;
            pkgModal.classList.remove('active');
            document.body.style.overflow = '';
            $('#contactScope').value  = title + ' (' + price + ')';
            $('#contactDetails').value = `Hi Cholojai Tours! I'd like to book "${title}" (${price}). Please share availability and dates.`;
            $('#contact').scrollIntoView({ behavior: 'smooth' });
            toast('✅ Package details pre-filled in the form below!');
        });
    }

    $$('.view-pkg-btn').forEach(btn => {
        btn.addEventListener('click', () => openPkgModal(parseInt(btn.dataset.pkg)));
    });

    closePkgModal?.addEventListener('click', () => {
        pkgModal?.classList.remove('active');
        document.body.style.overflow = '';
    });

    // ── Budget Estimator ──────────────────────────────────────────
    const calcDest   = $('#calcDest');
    const calcPax    = $('#calcPax');
    const addonChecks = $$('.addon-check');
    const sumDest    = $('#sumDest');
    const sumAddons  = $('#sumAddons');
    const sumPax     = $('#sumPax');
    const totalEl    = $('#totalAmount');

    function formatBDT(n) {
        // Use Bangladeshi comma style: 1,00,000
        return '৳' + n.toLocaleString('en-IN');
    }

    function calcBudget() {
        if (!calcDest || !calcPax) return;

        const base   = parseInt(calcDest.value) || 0;
        const paxMul = parseFloat(calcPax.value) || 1;
        const destName = calcDest.options[calcDest.selectedIndex]?.dataset.name || '';
        const paxName  = calcPax.options[calcPax.selectedIndex]?.text || '';

        let addonsSum = 0;
        addonChecks.forEach((chk, i) => {
            const wrap = document.getElementById(`addon-wrap-${i}`);
            if (chk.checked) {
                addonsSum += parseInt(chk.value) || 0;
                wrap?.classList.add('active');
            } else {
                wrap?.classList.remove('active');
            }
        });

        const total = Math.round((base + addonsSum) * paxMul);

        if (sumDest)   sumDest.textContent   = destName.split('(')[0].trim();
        if (sumAddons) sumAddons.textContent  = formatBDT(addonsSum);
        if (sumPax)    sumPax.textContent     = paxName.split('[')[0].trim();
        if (totalEl)   totalEl.textContent    = formatBDT(total);
    }

    calcDest?.addEventListener('change', calcBudget);
    calcPax?.addEventListener('change', calcBudget);
    addonChecks.forEach(chk => chk.addEventListener('change', calcBudget));
    calcBudget(); // initial render

    // Reserve button
    $('#reserveBtn')?.addEventListener('click', () => {
        const destName = calcDest?.options[calcDest.selectedIndex]?.dataset.name || 'Tour Package';
        const total    = totalEl?.textContent || '৳0';
        const paxName  = calcPax?.options[calcPax.selectedIndex]?.text.split('[')[0].trim() || 'Solo';

        if ($('#contactScope'))  $('#contactScope').value  = `${destName} — ${total} (${paxName})`;
        if ($('#contactDetails')) $('#contactDetails').value = `Hi Cholojai Tours! I used the calculator and my estimated budget is ${total} for ${destName} (${paxName}). Please confirm availability.`;

        $('#contact').scrollIntoView({ behavior: 'smooth' });
        toast('✅ Estimate pre-filled in the booking form!');
    });

    // ── Contact / Booking Form ────────────────────────────────────
    const form = $('#contactForm');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();

        const name    = $('#contactName')?.value.trim();
        const contact = $('#contactContact')?.value.trim();
        const scope   = $('#contactScope')?.value.trim()   || 'General Tour Inquiry';
        const details = $('#contactDetails')?.value.trim() || 'No additional notes.';

        if (!name || !contact) {
            toast('❌ Please enter your name and WhatsApp number.');
            return;
        }

        const lead = {
            id:      Date.now(),
            date:    new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }),
            name,
            contact,
            scope,
            details,
        };

        leads.unshift(lead);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
        updateBadge();

        // Post to Vercel API (fire and forget)
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone: contact, destination: scope, budget: 'Booking Request', source: 'Cholojai Web Form' }),
        }).catch(() => {});

        toast('✅ Inquiry saved! Opening WhatsApp…');
        const text = `Hi Cholojai Tours! 👋\n\nName: *${name}*\nContact: ${contact}\nDestination: *${scope}*\n\nNotes: ${details}`;
        setTimeout(() => {
            openWA(text);
            form.reset();
        }, 900);
    });

    // ── Admin Leads Modal ─────────────────────────────────────────
    const adminModal  = $('#adminModal');
    const closeAdmin  = $('#closeAdminBtn');
    const leadsBody   = $('#leadsBody');
    const noLeadsMsg  = $('#noLeadsMsg');
    const leadsTable  = $('#leadsTable');
    const clearLeads  = $('#clearLeadsBtn');
    const exportLeads = $('#exportLeadsBtn');

    function renderLeads() {
        if (!leadsBody) return;
        leadsBody.innerHTML = '';

        if (leads.length === 0) {
            if (noLeadsMsg)  noLeadsMsg.style.display  = 'block';
            if (leadsTable)  leadsTable.style.display  = 'none';
        } else {
            if (noLeadsMsg)  noLeadsMsg.style.display  = 'none';
            if (leadsTable)  leadsTable.style.display  = 'table';

            leads.forEach(lead => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td style="white-space:nowrap;">${esc(lead.date)}</td>
                    <td><strong>${esc(lead.name)}</strong></td>
                    <td>${esc(lead.contact)}</td>
                    <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${esc(lead.scope)}">${esc(lead.scope)}</td>
                    <td><span class="tag" style="color:var(--emerald);border-color:rgba(16,185,129,0.3);">Active</span></td>
                    <td>
                        <button class="btn btn-ghost btn-sm wa-lead-btn" data-name="${esc(lead.name)}" data-contact="${esc(lead.contact)}" style="gap:6px;">
                            <i class="fa-brands fa-whatsapp" style="color:#25d366"></i> Chat
                        </button>
                    </td>
                `;
                leadsBody.appendChild(tr);
            });

            $$('.wa-lead-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    openWA(`Hi ${btn.dataset.name}! This is Cholojai Tours & Travels following up on your travel inquiry. How can we help you? 🌍`);
                });
            });
        }
    }

    function openAdmin() {
        renderLeads();
        adminModal?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    $('#openAdminBtn')?.addEventListener('click', openAdmin);
    $('#footerAdminBtn')?.addEventListener('click', openAdmin);
    closeAdmin?.addEventListener('click', () => {
        adminModal?.classList.remove('active');
        document.body.style.overflow = '';
    });

    clearLeads?.addEventListener('click', () => {
        if (!confirm('Clear all stored lead inquiries?')) return;
        leads = [];
        localStorage.removeItem(STORAGE_KEY);
        updateBadge();
        renderLeads();
        toast('🗑️ All leads cleared.');
    });

    exportLeads?.addEventListener('click', () => {
        if (leads.length === 0) { toast('No leads to export.'); return; }
        let csv = 'DATE\tNAME\tCONTACT\tDESTINATION\tDETAILS\n';
        leads.forEach(l => { csv += `${l.date}\t${l.name}\t${l.contact}\t${l.scope}\t${l.details}\n`; });
        const a   = Object.assign(document.createElement('a'), {
            href:     URL.createObjectURL(new Blob([csv], { type: 'text/plain;charset=utf-8' })),
            download: `cholojai_leads_${Date.now()}.txt`,
        });
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast('📥 Leads exported!');
    });

    // ── Close modals on backdrop click ───────────────────────────
    [adminModal, pkgModal].forEach(modal => {
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            $$('.modal.active').forEach(m => {
                m.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    });

    // ── Smooth nav link scrolling ─────────────────────────────────
    $$('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80;
                window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
            }
        });
    });

})();
