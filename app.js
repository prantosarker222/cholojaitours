// Cholojai Tours & Travels Interactive Logic
document.addEventListener('DOMContentLoaded', () => {

    // Auto Backend API URL detection (Supports Vercel serverless + local Python server)
    const API_URL = (window.location.protocol === 'file:' || (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
        ? 'http://localhost:8080/api/leads'
        : '/api/leads';

    // State management
    let inquiries = JSON.parse(localStorage.getItem('cholojai_inquiries') || '[]');
    updateInquiryBadge();

    // DOM Elements
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const calcProjectType = document.getElementById('calcProjectType');
    const calcTimeline = document.getElementById('calcTimeline');
    const addonChecks = document.querySelectorAll('.addon-check');
    
    const summaryBaseName = document.getElementById('summaryBaseName');
    const summaryAddonsPrice = document.getElementById('summaryAddonsPrice');
    const summaryTimelineName = document.getElementById('summaryTimelineName');
    const calcTotalPrice = document.getElementById('calcTotalPrice');
    const lockEstimateBtn = document.getElementById('lockEstimateBtn');

    const contactForm = document.getElementById('contactForm');
    const adminModal = document.getElementById('adminModal');
    const openAdminBtn = document.getElementById('openAdminBtn');
    const footerAdminBtn = document.getElementById('footerAdminBtn');
    const closeAdminBtn = document.getElementById('closeAdminBtn');
    const inquiriesTableBody = document.getElementById('inquiriesTableBody');
    const noInquiriesMsg = document.getElementById('noInquiriesMsg');
    const clearInquiriesBtn = document.getElementById('clearInquiriesBtn');
    const exportInquiriesBtn = document.getElementById('exportInquiriesBtn');

    const caseStudyModal = document.getElementById('caseStudyModal');
    const closeCaseModalBtn = document.getElementById('closeCaseModalBtn');
    const caseModalTitle = document.getElementById('caseModalTitle');
    const caseModalBody = document.getElementById('caseModalBody');

    // --- 1. Theme Toggle Logic ---
    const savedTheme = localStorage.getItem('cholojai_theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            themeToggleBtn.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem('cholojai_theme', isLight ? 'light' : 'dark');
            showToast(isLight ? '☀️ Light Mode Enabled' : '🌙 Dark Mode Enabled');
        });
    }

    // --- 2. Interactive Tour Budget Estimator ---
    function calculateEstimate() {
        if (!calcProjectType || !calcTimeline) return;

        const basePrice = parseInt(calcProjectType.value) || 0;
        const selectedOption = calcProjectType.options[calcProjectType.selectedIndex];
        const baseName = selectedOption ? selectedOption.getAttribute('data-name') : 'Tour Package';
        
        let addonsTotal = 0;
        addonChecks.forEach(chk => {
            const card = chk.closest('.check-card');
            if (chk.checked) {
                addonsTotal += parseInt(chk.value) || 0;
                if (card) card.classList.add('active');
            } else {
                if (card) card.classList.remove('active');
            }
        });

        const timelineMultiplier = parseFloat(calcTimeline.value) || 1.0;
        const timelineOption = calcTimeline.options[calcTimeline.selectedIndex];
        const timelineName = timelineOption ? timelineOption.text.split('[')[0].trim() : 'Solo Traveler';

        const subtotal = basePrice + addonsTotal;
        const finalTotal = Math.round(subtotal * timelineMultiplier);

        if (summaryBaseName) summaryBaseName.innerText = baseName;
        if (summaryAddonsPrice) summaryAddonsPrice.innerText = `৳${addonsTotal.toLocaleString()}`;
        if (summaryTimelineName) summaryTimelineName.innerText = timelineName;
        if (calcTotalPrice) calcTotalPrice.innerText = `৳${finalTotal.toLocaleString()}`;
    }

    if (calcProjectType) calcProjectType.addEventListener('change', calculateEstimate);
    if (calcTimeline) calcTimeline.addEventListener('change', calculateEstimate);
    addonChecks.forEach(chk => chk.addEventListener('change', calculateEstimate));

    if (lockEstimateBtn) {
        lockEstimateBtn.addEventListener('click', () => {
            const selectedOption = calcProjectType.options[calcProjectType.selectedIndex];
            const baseName = selectedOption ? selectedOption.getAttribute('data-name') : 'Tour Package';
            const estimate = calcTotalPrice ? calcTotalPrice.innerText : '৳14,500';

            const scopeInput = document.getElementById('contactScope');
            const detailsInput = document.getElementById('contactDetails');
            
            if (scopeInput) scopeInput.value = `${baseName} (${estimate})`;
            if (detailsInput) detailsInput.value = `Hi Cholojai Tours! I calculated a tour budget of ${estimate} for ${baseName}. Please confirm package availability and itinerary details.`;

            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            showToast('✅ Tour selection applied to booking form below!');
        });
    }

    // --- 3. Package Filter Tabs ---
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const btn = e.currentTarget;
            filterTabs.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 4. Package Details Modals ---
    const tourPackages = [
        {
            title: "Cox's Bazar & St. Martin Island Cruise",
            category: "Domestic Bangladesh Tour",
            duration: "3 Days / 2 Nights",
            price: "৳8,500 per person",
            highlights: [
                "4-Star Beachfront Hotel Stay in Cox's Bazar",
                "St. Martin Island Luxury Bay Cruise Ticket",
                "Complimentary Buffet Breakfast & Seafood Dinner",
                "Inani Beach, Himchari & Laboni Beach Sightseeing",
                "AC Bus Transportation from Dhaka to Cox's Bazar"
            ],
            itinerary: "Day 1: Arrival & Inani Beach Tour. Day 2: St. Martin Island Cruise & Scuba Diving. Day 3: Shopping & Departure."
        },
        {
            title: "Sajek Valley & Bandarban Cloud Adventure",
            category: "Domestic Hill Tracks Tour",
            duration: "3 Days / 2 Nights",
            price: "৳6,800 per person",
            highlights: [
                "Konglak Pahar & Helipad Hilltop Cottage Stay",
                "Chander Gari Open-Air Jeep Safari across Hills",
                "Ruilui Para Tribal Culture Experience & Barbecue",
                "Bandarban Nilgiri, Chimbuk Hill & Boga Lake Sightseeing",
                "Professional Tour Guide & Armed Escort Security"
            ],
            itinerary: "Day 1: Khagrachari to Sajek Valley. Day 2: Konglak Peak Sunrise & Bandarban Transit. Day 3: Nilgiri Cloud View & Return."
        },
        {
            title: "Kashmir Paradise & Houseboat Experience",
            category: "International Himalayan Tour",
            duration: "5 Days / 4 Nights",
            price: "৳28,500 per person",
            highlights: [
                "Dal Lake Traditional Deluxe Houseboat Stay",
                "Shikara Boat Ride across Dal Lake & Floating Market",
                "Gulmarg Snow Gondola Cable Car Ride (Phase 1 & 2)",
                "Pahalgam Betaab Valley & Chandanwari Tour",
                "Full Indian Tourist Visa Application Assistance"
            ],
            itinerary: "Day 1: Srinagar Airport Pick & Houseboat Check-in. Day 2: Gulmarg Snow Adventure. Day 3: Pahalgam Valley. Day 4: Srinagar Mughal Gardens. Day 5: Departure."
        },
        {
            title: "Dubai & Abu Dhabi Grand Luxury Tour",
            category: "International Middle East Package",
            duration: "5 Days / 4 Nights",
            price: "৳45,000 per person",
            highlights: [
                "4-Star City Hotel Stay in Bur Dubai / Deira",
                "Desert Safari 4x4 Dune Bashing with BBQ Dinner & Belly Dance",
                "Burj Khalifa At The Top 124th Floor Observation Ticket",
                "Abu Dhabi Grand Mosque & Sheikh Zayed Palace Tour",
                "30-Day Express UAE Tourist E-Visa Included"
            ],
            itinerary: "Day 1: Dubai Airport Transfer & Marina Cruise. Day 2: Half Day City Tour & Desert Safari. Day 3: Abu Dhabi Day Trip. Day 4: Burj Khalifa & Dubai Mall. Day 5: Departure."
        },
        {
            title: "Thailand & Phuket Island Gateway",
            category: "South East Asia Tour",
            duration: "5 Days / 4 Nights",
            price: "৳32,000 per person",
            highlights: [
                "Bangkok 4-Star Hotel & Phuket Beach Resort Stay",
                "Phi Phi Island Speedboat Tour with Buffet Lunch",
                "Coral Island Water Sports & Snorkeling",
                "Bangkok Temples, Safari World & Shopping Tour",
                "Express Thailand Tourist E-Visa Approval"
            ],
            itinerary: "Day 1: Arrive Bangkok & Flight to Phuket. Day 2: Phi Phi & Maya Bay Speedboat. Day 3: Bangkok City & Safari World. Day 4: Shopping at Pratunam. Day 5: Departure."
        },
        {
            title: "Executive Umrah & Pilgrimage Package",
            category: "Religious Pilgrimage Package",
            duration: "10 Days",
            price: "৳1,15,000 per person",
            highlights: [
                "Makkah 5-Star Hotel Stay within 150 Meters of Haram",
                "Madinah 5-Star Hotel Stay near Masjid al-Nabawi",
                "Express Umrah Visa Approval & Insurance Coverage",
                "Round-trip Flight Ticket via Biman / Saudi Airlines",
                "Private AC Bus Transport for Makkah & Madinah Ziyarat"
            ],
            itinerary: "5 Nights Makkah Mukarramah + 4 Nights Madinah Munawwarah with Guided Ziyarat Tours."
        }
    ];

    document.querySelectorAll('.view-case-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.getAttribute('data-project')) || 0;
            const project = tourPackages[index];
            if (!project || !caseStudyModal) return;

            caseModalTitle.innerHTML = `<i class="fa-solid fa-plane" style="color: var(--primary);"></i> ${escapeHtml(project.title)}`;
            caseModalBody.innerHTML = `
                <div style="margin-bottom: 20px; display:flex; gap: 12px; align-items:center; flex-wrap:wrap;">
                    <span class="badge">${escapeHtml(project.category)}</span>
                    <span class="badge badge-emerald"><i class="fa-solid fa-clock"></i> ${escapeHtml(project.duration)}</span>
                    <span class="tag" style="color: var(--primary); font-weight:700; font-size: 14px;">${escapeHtml(project.price)}</span>
                </div>
                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--primary); margin-bottom: 8px;"><i class="fa-solid fa-star"></i> Package Inclusions & Highlights</h4>
                    <ul style="padding-left: 20px; color: var(--text-muted);">
                        ${project.highlights.map(h => `<li style="margin-bottom: 6px;">${escapeHtml(h)}</li>`).join('')}
                    </ul>
                </div>
                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--secondary); margin-bottom: 8px;"><i class="fa-solid fa-map-location-dot"></i> Tour Itinerary Overview</h4>
                    <p style="color: var(--text-muted);">${escapeHtml(project.itinerary)}</p>
                </div>
                <button class="btn btn-primary btn-block modal-book-now-btn" data-title="${escapeHtml(project.title)}" data-price="${escapeHtml(project.price)}">
                    <i class="fa-brands fa-whatsapp"></i> Reserve This Package Now
                </button>
            `;

            caseStudyModal.classList.add('active');

            const modalBookBtn = caseModalBody.querySelector('.modal-book-now-btn');
            if (modalBookBtn) {
                modalBookBtn.addEventListener('click', () => {
                    const title = modalBookBtn.getAttribute('data-title');
                    const price = modalBookBtn.getAttribute('data-price');
                    caseStudyModal.classList.remove('active');
                    
                    const scopeInput = document.getElementById('contactScope');
                    const detailsInput = document.getElementById('contactDetails');
                    if (scopeInput) scopeInput.value = `${title} (${price})`;
                    if (detailsInput) detailsInput.value = `Hi Cholojai Tours! I would like to book the ${title} package (${price}). Please contact me with dates.`;

                    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                    showToast('✅ Package details copied to booking form!');
                });
            }
        });
    });

    if (closeCaseModalBtn) {
        closeCaseModalBtn.addEventListener('click', () => {
            if (caseStudyModal) caseStudyModal.classList.remove('active');
        });
    }

    // --- 5. Contact & Booking Submission ---
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contactName').value.trim();
            const contact = document.getElementById('contactContact').value.trim();
            const scope = document.getElementById('contactScope').value.trim() || 'General Tour Inquiry';
            const details = document.getElementById('contactDetails').value.trim() || 'No specific notes.';

            if (!name || !contact) {
                showToast('❌ Please provide your Name and Mobile/WhatsApp number!');
                return;
            }

            const newInquiry = {
                id: Date.now(),
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                name: name,
                contact: contact,
                scope: scope,
                details: details
            };

            // Save locally
            inquiries.unshift(newInquiry);
            localStorage.setItem('cholojai_inquiries', JSON.stringify(inquiries));
            updateInquiryBadge();

            // Send to Backend API Server
            sendInquiryToBackend({
                name: name,
                phone: contact,
                destination: scope,
                budget: 'Tour Booking Request',
                source: 'Cholojai Tours Web Form'
            });

            showToast('✅ Booking inquiry submitted! Opening WhatsApp...');

            const text = `Hi Cholojai Tours! My name is *${name}* (${contact}). I would like to book / inquire about *${scope}*. Travel Notes: ${details}`;
            setTimeout(() => {
                openWhatsAppWithText(text);
                contactForm.reset();
            }, 800);
        });
    }

    // Async Backend API Poster
    async function sendInquiryToBackend(data) {
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (result.success) {
                console.log('✅ Lead saved to backend database:', result.lead_id);
            }
        } catch (err) {
            console.log('Backend API offline or CORS fallback; saved locally in browser state.');
        }
    }

    // --- 6. Admin Inquiries Dashboard Modal ---
    function renderInquiriesTable() {
        if (!inquiriesTableBody) return;
        inquiriesTableBody.innerHTML = '';

        if (inquiries.length === 0) {
            if (noInquiriesMsg) noInquiriesMsg.style.display = 'block';
            document.querySelector('.table-responsive').style.display = 'none';
        } else {
            if (noInquiriesMsg) noInquiriesMsg.style.display = 'none';
            document.querySelector('.table-responsive').style.display = 'block';

            inquiries.forEach(inq => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${escapeHtml(inq.date)}</td>
                    <td><strong>${escapeHtml(inq.name)}</strong></td>
                    <td>${escapeHtml(inq.contact)}</td>
                    <td>${escapeHtml(inq.scope)}</td>
                    <td><span class="tag" style="color:var(--primary); font-weight:700;">Confirmed Lead</span></td>
                    <td>
                        <button class="btn btn-secondary btn-sm chat-inq-btn" data-contact="${inq.contact}" data-name="${inq.name}">
                            <i class="fa-brands fa-whatsapp"></i> Chat
                        </button>
                    </td>
                `;
                inquiriesTableBody.appendChild(tr);
            });

            document.querySelectorAll('.chat-inq-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const c = e.currentTarget.getAttribute('data-contact');
                    const n = e.currentTarget.getAttribute('data-name');
                    openWhatsAppWithText(`Hi ${n}! This is Cholojai Tours & Travels following up on your tour package inquiry.`);
                });
            });
        }
    }

    function updateInquiryBadge() {
        const badge = document.getElementById('inquiryBadge');
        if (badge) badge.innerText = inquiries.length;
    }

    if (openAdminBtn) openAdminBtn.addEventListener('click', () => { renderInquiriesTable(); adminModal.classList.add('active'); });
    if (footerAdminBtn) footerAdminBtn.addEventListener('click', () => { renderInquiriesTable(); adminModal.classList.add('active'); });
    if (closeAdminBtn) closeAdminBtn.addEventListener('click', () => { adminModal.classList.remove('active'); });

    window.addEventListener('click', (e) => {
        if (e.target === adminModal) adminModal.classList.remove('active');
        if (e.target === caseStudyModal) caseStudyModal.classList.remove('active');
    });

    if (clearInquiriesBtn) {
        clearInquiriesBtn.addEventListener('click', () => {
            if (confirm('Clear all stored traveler inquiries?')) {
                inquiries = [];
                localStorage.removeItem('cholojai_inquiries');
                updateInquiryBadge();
                renderInquiriesTable();
                showToast('Inquiries cleared.');
            }
        });
    }

    if (exportInquiriesBtn) {
        exportInquiriesBtn.addEventListener('click', () => {
            if (inquiries.length === 0) {
                showToast('No inquiries to export.');
                return;
            }
            let content = "DATE\tTRAVELER_NAME\tCONTACT\tDESTINATION_SCOPE\tDETAILS\n";
            inquiries.forEach(i => {
                content += `${i.date}\t${i.name}\t${i.contact}\t${i.scope}\t${i.details}\n`;
            });

            const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", `cholojai_leads_${Date.now()}.txt`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // --- Helpers ---
    function openWhatsAppWithText(text) {
        const phone = "8801700000000";
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
    }

    function showToast(message) {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.innerText = message;
            toast.style.display = 'block';
            setTimeout(() => {
                toast.style.display = 'none';
            }, 3200);
        }
    }

    function escapeHtml(text) {
        return text ? text.replace(/[&<>"']/g, function(m) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            }[m];
        }) : '';
    }

    // Initial calculation call
    calculateEstimate();
});
