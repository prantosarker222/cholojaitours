// Apex Digital Studio & Portfolio Interactive Logic
document.addEventListener('DOMContentLoaded', () => {

    // Auto Backend API URL detection (Supports Vercel serverless + local Python server)
    const API_URL = (window.location.protocol === 'file:' || (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
        ? 'http://localhost:8080/api/leads'
        : '/api/leads';

    // State management
    let inquiries = JSON.parse(localStorage.getItem('apex_inquiries') || '[]');
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
    const savedTheme = localStorage.getItem('apex_theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            themeToggleBtn.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem('apex_theme', isLight ? 'light' : 'dark');
            showToast(isLight ? '☀️ Light Theme Enabled' : '🌙 Dark Theme Enabled');
        });
    }

    // --- 2. Interactive Scope & Cost Estimator ---
    function calculateEstimate() {
        if (!calcProjectType || !calcTimeline) return;

        const basePrice = parseInt(calcProjectType.value) || 0;
        const selectedOption = calcProjectType.options[calcProjectType.selectedIndex];
        const baseName = selectedOption ? selectedOption.getAttribute('data-name') : 'Custom Project';
        
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
        const timelineName = timelineOption ? timelineOption.text.split('[')[0].trim() : 'Standard';

        const subtotal = basePrice + addonsTotal;
        const finalTotal = Math.round(subtotal * timelineMultiplier);

        if (summaryBaseName) summaryBaseName.innerText = baseName;
        if (summaryAddonsPrice) summaryAddonsPrice.innerText = `$${addonsTotal.toLocaleString()}`;
        if (summaryTimelineName) summaryTimelineName.innerText = timelineName;
        if (calcTotalPrice) calcTotalPrice.innerText = `$${finalTotal.toLocaleString()}`;
    }

    if (calcProjectType) calcProjectType.addEventListener('change', calculateEstimate);
    if (calcTimeline) calcTimeline.addEventListener('change', calculateEstimate);
    addonChecks.forEach(chk => chk.addEventListener('change', calculateEstimate));

    if (lockEstimateBtn) {
        lockEstimateBtn.addEventListener('click', () => {
            const selectedOption = calcProjectType.options[calcProjectType.selectedIndex];
            const baseName = selectedOption ? selectedOption.getAttribute('data-name') : 'Web Project';
            const estimate = calcTotalPrice ? calcTotalPrice.innerText : '$3,700';

            const scopeInput = document.getElementById('contactScope');
            const detailsInput = document.getElementById('contactDetails');
            
            if (scopeInput) scopeInput.value = `${baseName} (${estimate})`;
            if (detailsInput) detailsInput.value = `Hi Apex Studio! I generated an estimate of ${estimate} for ${baseName}. Let's align on scope.`;

            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            showToast('✅ Estimate applied to proposal form below!');
        });
    }

    // --- 3. Portfolio Filter Tabs ---
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

    // --- 4. Case Study Modals ---
    const caseStudies = [
        {
            title: "Cholojai Travel & Visa Platform",
            category: "Web Application / Automation",
            challenge: "The client needed a high-converting web platform to replace manual WhatsApp inquiries with automated lead capture, price estimates, and CSV lead persistence.",
            solution: "Built a sleek dark-mode glassmorphism web application integrated with an instant budget calculator, lead tracking dashboard, and serverless Python backend API.",
            results: ["340% Increase in qualified client leads", "Sub-second load speed", "Over 5,000 active monthly visitors"],
            tech: ["JavaScript HTML5/CSS3", "Python HTTP Server", "Vercel Functions"]
        },
        {
            title: "AI Prospect Scraper & Leads Bot",
            category: "AI & Automation",
            challenge: "Manual B2B lead research took hours of copy-pasting prospect names, email data, and social links.",
            solution: "Engineered an autonomous scraping pipeline utilizing headless requests, regex pattern matching, and Firebase API endpoints to generate structured lead lists.",
            results: ["10,000+ Prospect records parsed/hr", "Zero downtime operation", "Direct CSV export integration"],
            tech: ["Python 3", "Async Web Crawlers", "OpenAI Data Structuring"]
        },
        {
            title: "Apex Cloud Financial Dashboard",
            category: "SaaS & Fintech UI/UX",
            challenge: "Legacy financial dashboards suffered from clunky navigation and slow page renders.",
            solution: "Designed a responsive glassmorphism dashboard with real-time telemetry charts, component caching, and smooth micro-animations.",
            results: ["99.8% User satisfaction score", "Lighthouse 100 Performance", "Adopted by 4 Enterprise Clients"],
            tech: ["React.js", "Tailwind CSS", "Recharts"]
        }
    ];

    document.querySelectorAll('.view-case-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.getAttribute('data-project')) || 0;
            const project = caseStudies[index];
            if (!project || !caseStudyModal) return;

            caseModalTitle.innerHTML = `<i class="fa-solid fa-folder-open" style="color: var(--primary);"></i> ${escapeHtml(project.title)}`;
            caseModalBody.innerHTML = `
                <div style="margin-bottom: 20px;">
                    <span class="badge">${escapeHtml(project.category)}</span>
                </div>
                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--primary); margin-bottom: 8px;"><i class="fa-solid fa-triangle-exclamation"></i> The Challenge</h4>
                    <p style="color: var(--text-muted);">${escapeHtml(project.challenge)}</p>
                </div>
                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--secondary); margin-bottom: 8px;"><i class="fa-solid fa-lightbulb"></i> The Solution</h4>
                    <p style="color: var(--text-muted);">${escapeHtml(project.solution)}</p>
                </div>
                <div style="margin-bottom: 20px;">
                    <h4 style="color: var(--accent-emerald); margin-bottom: 8px;"><i class="fa-solid fa-chart-line"></i> Key Metrics & Impact</h4>
                    <ul style="padding-left: 20px; color: var(--text-muted);">
                        ${project.results.map(r => `<li style="margin-bottom: 4px;">${escapeHtml(r)}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h4 style="margin-bottom: 8px;"><i class="fa-solid fa-gears"></i> Tech Stack</h4>
                    <div style="display:flex; gap: 8px; flex-wrap:wrap;">
                        ${project.tech.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
                    </div>
                </div>
            `;

            caseStudyModal.classList.add('active');
        });
    });

    if (closeCaseModalBtn) {
        closeCaseModalBtn.addEventListener('click', () => {
            if (caseStudyModal) caseStudyModal.classList.remove('active');
        });
    }

    // --- 5. Contact & Proposal Submission ---
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contactName').value.trim();
            const contact = document.getElementById('contactContact').value.trim();
            const scope = document.getElementById('contactScope').value.trim() || 'General Inquiry';
            const details = document.getElementById('contactDetails').value.trim() || 'No additional notes.';

            if (!name || !contact) {
                showToast('❌ Please provide your Name and Contact details!');
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
            localStorage.setItem('apex_inquiries', JSON.stringify(inquiries));
            updateInquiryBadge();

            // Send to Backend CSV Server
            sendInquiryToBackend({
                name: name,
                phone: contact,
                destination: scope,
                budget: 'Proposal Request',
                source: 'Apex Studio Contact Form'
            });

            showToast('✅ Proposal submitted successfully! Opening WhatsApp...');

            const text = `Hi Apex Studio! My name is *${name}* (${contact}). I would like to discuss a project for *${scope}*. Notes: ${details}`;
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
                console.log('✅ Lead saved to backend CSV database:', result.lead_id);
            }
        } catch (err) {
            console.log('Backend server offline or CORS fallback; saved locally in browser state.');
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
                    <td><span class="tag" style="color:var(--primary); font-weight:700;">Active Inquiry</span></td>
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
                    openWhatsAppWithText(`Hi ${n}! This is Apex Studio following up on your project inquiry.`);
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
            if (confirm('Clear all stored client inquiries?')) {
                inquiries = [];
                localStorage.removeItem('apex_inquiries');
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
            let content = "DATE\tNAME\tCONTACT\tSCOPE\tDETAILS\n";
            inquiries.forEach(i => {
                content += `${i.date}\t${i.name}\t${i.contact}\t${i.scope}\t${i.details}\n`;
            });

            const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", `apex_inquiries_${Date.now()}.txt`);
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
