// --- Localization Dictionary ---
let currentLang = 'ar';
const i18n = {
    ar: {
        appTitle: 'نظام إدارة الطوارئ والإسعاف الذكي',
        appSubtitle: 'Emergency Rescue Finder System • Multi-Governorate Network',
        autoSim: 'محاكاة تلقائية',
        stopSim: 'إيقاف المحاكاة',
        themeBtn: 'تبديل المظهر',
        statCritical: 'حالات طوارئ حرجة',
        statNormal: 'حالات عادية / مستقرة',
        statFleet: 'سيارات إسعاف جاهزة',
        statCompleted: 'حالات تم إنقاذها',
        tabOverview: '🗺️ غرفة العمليات والخريطة',
        tabFleet: '🚑 أسطول الإسعاف',
        tabHistory: '📋 سجل الحالات',
        resetRoads: '🔄 تصفير الزحام',
        legHospital: 'مستشفى (Hospital)',
        legDistrict: 'حي / منطقة (District)',
        legShortest: 'أقصر مسار (Dijkstra)',
        legTraffic: 'زحمة (اضغطي على الطريق)',
        legBlocked: 'طريق مغلق',
        newReportTitle: 'تسجيل بلاغ طوارئ جديد',
        lblPatient: 'اسم الحالة / المريض',
        lblLocation: 'المنطقة / الحي',
        lblSeverity: 'درجة الخطورة (الأولوية)',
        btnAddCase: '➕ إضافة لطابور الأولوية',
        pqTitle: 'طابور الأولوية المباشر',
        btnDispatch: '🚑 إرسال إسعاف للأعلى أولوية',
        btnDispatchRow: '🚑 إخراج إسعاف',
        fleetTitle: 'أسطول الإسعاف',
        btnAddAmb: '➕ إضافة وحدة إسعاف',
        fleetDesc: 'السيارة الموجودة في مقدمة الطابور تخرج فوراً عند الإرسال وتبقى غير متاحة طوال مدة الوصول بالدقائق الحقيقية، ثم تعود لنهاية الطابور.',
        historyTitle: 'سجل الحالات التي تم إنقاذها',
        sev1: 'حرجة جداً',
        sev2: 'متوسطة',
        sev3: 'عادية',
        ready: 'تجهيز للإخراج',
        standby: 'في الانتظار',
        dispatched: 'تم الخروج • مش متاح',
        minutes: 'دقيقة',
        mapPrefix: 'خريطة '
    },
    en: {
        appTitle: 'Emergency Rescue Finder System',
        appSubtitle: 'Smart Dispatch Network • C# Data Structures UI',
        autoSim: 'Auto Simulation',
        stopSim: 'Stop Simulation',
        themeBtn: 'Switch Theme',
        statCritical: 'Critical Emergency Cases',
        statNormal: 'Normal / Stable Cases',
        statFleet: 'Ready Ambulances',
        statCompleted: 'Rescued Cases',
        tabOverview: '🗺️ Command Map & Dispatch',
        tabFleet: '🚑 Ambulance Fleet',
        tabHistory: '📋 Case History',
        resetRoads: '🔄 Reset Traffic',
        legHospital: 'Hospital Node',
        legDistrict: 'District / Area Node',
        legShortest: 'Shortest Path (Dijkstra)',
        legTraffic: 'Heavy Traffic (Click Road)',
        legBlocked: 'Blocked Road',
        newReportTitle: 'Register New Emergency',
        lblPatient: 'Patient / Case Name',
        lblLocation: 'District / Area',
        lblSeverity: 'Severity Level (Priority)',
        btnAddCase: '➕ Enqueue in Priority Queue',
        pqTitle: 'Live Priority Queue',
        btnDispatch: '🚑 Dispatch Highest Priority',
        btnDispatchRow: '🚑 Dispatch',
        fleetTitle: 'Ambulance Queue',
        btnAddAmb: '➕ Add Ambulance Unit',
        fleetDesc: 'The unit at the Front dispatches immediately and stays unavailable for the full route duration in real minutes before returning to Rear.',
        historyTitle: 'Processed Case History',
        sev1: 'Critical',
        sev2: 'Medium',
        sev3: 'Normal',
        ready: 'Prepared',
        standby: 'Standby',
        dispatched: 'Dispatched • Unavailable',
        minutes: 'min',
        mapPrefix: 'Map of '
    }
};

// --- Selected Regions Database ---
const governoratesData = {
    cairo: {
        nameAr: 'القاهرة',
        nameEn: 'Cairo',
        nodes: [
            { id: 'H1', ar: 'مستشفى القصر العيني', en: 'Kasr Al-Ainy Hospital', type: 'hospital', x: 110, y: 180 },
            { id: 'H2', ar: 'مستشفى عين شمس التخصصي', en: 'Ain Shams Specialized', type: 'hospital', x: 470, y: 85 },
            { id: 'H3', ar: 'مستشفى مدينة نصر التخصصي', en: 'Nasr City Hospital', type: 'hospital', x: 485, y: 270 },
            { id: 'N1', ar: 'وسط البلد / التحرير', en: 'Downtown / Tahrir', type: 'district', x: 245, y: 165 },
            { id: 'N2', ar: 'مصر الجديدة', en: 'Heliopolis', type: 'district', x: 380, y: 120 },
            { id: 'N3', ar: 'مدينة نصر', en: 'Nasr City', type: 'district', x: 375, y: 245 },
            { id: 'N4', ar: 'المعادي', en: 'Maadi', type: 'district', x: 185, y: 335 },
            { id: 'N5', ar: 'التجمع الخامس', en: 'Fifth Settlement', type: 'district', x: 510, y: 355 }
        ],
        edges: [
            { from: 'H1', to: 'N1', weight: 4, state: 'normal' },
            { from: 'H1', to: 'N4', weight: 6, state: 'normal' },
            { from: 'N1', to: 'N2', weight: 5, state: 'normal' },
            { from: 'N1', to: 'N3', weight: 6, state: 'normal' },
            { from: 'N2', to: 'H2', weight: 3, state: 'normal' },
            { from: 'N2', to: 'N3', weight: 4, state: 'normal' },
            { from: 'N3', to: 'H3', weight: 3, state: 'normal' },
            { from: 'N3', to: 'N4', weight: 7, state: 'normal' },
            { from: 'H3', to: 'N5', weight: 5, state: 'normal' },
            { from: 'N4', to: 'N5', weight: 8, state: 'normal' }
        ],
        ambulances: [
            { id: 'CAI-01', callSign: 'إسعاف القاهرة 01' },
            { id: 'CAI-02', callSign: 'إسعاف القاهرة 02' },
            { id: 'CAI-03', callSign: 'إسعاف القاهرة 03' }
        ],
        queue: [
            { id: 'EMG-101', patient: 'أحمد كمال', phone: '01011223344', bloodType: 'O+', locationId: 'N3', severity: 1, seq: 1 },
            { id: 'EMG-102', patient: 'سلمى حسن', phone: '01122334455', bloodType: 'A+', locationId: 'N4', severity: 3, seq: 2 }
        ]
    },

    giza: {
        nameAr: 'الجيزة',
        nameEn: 'Giza',
        nodes: [
            { id: 'H1', ar: 'مستشفى أم المصريين', en: 'Om El-Masryeen Hosp.', type: 'hospital', x: 290, y: 230 },
            { id: 'H2', ar: 'مستشفى الشيخ زايد التخصصي', en: 'Sheikh Zayed Specialized', type: 'hospital', x: 100, y: 100 },
            { id: 'H3', ar: 'مستشفى 6 أكتوبر الجامعي', en: '6th October Univ. Hosp.', type: 'hospital', x: 115, y: 315 },
            { id: 'N1', ar: 'الدقي والمهندسين', en: 'Dokki & Mohandessin', type: 'district', x: 430, y: 120 },
            { id: 'N2', ar: 'الهرم وفيصل', en: 'Haram & Faisal', type: 'district', x: 350, y: 310 },
            { id: 'N3', ar: 'الشيخ زايد', en: 'Sheikh Zayed', type: 'district', x: 215, y: 125 },
            { id: 'N4', ar: '6 أكتوبر', en: '6th of October', type: 'district', x: 205, y: 265 },
            { id: 'N5', ar: 'البدرشين', en: 'El-Badrashein', type: 'district', x: 485, y: 340 }
        ],
        edges: [
            { from: 'H2', to: 'N3', weight: 3, state: 'normal' },
            { from: 'N3', to: 'N1', weight: 6, state: 'normal' },
            { from: 'N3', to: 'N4', weight: 4, state: 'normal' },
            { from: 'H3', to: 'N4', weight: 3, state: 'normal' },
            { from: 'N4', to: 'N2', weight: 5, state: 'normal' },
            { from: 'N1', to: 'H1', weight: 4, state: 'normal' },
            { from: 'H1', to: 'N2', weight: 3, state: 'normal' },
            { from: 'N2', to: 'N5', weight: 7, state: 'normal' }
        ],
        ambulances: [
            { id: 'GIZ-01', callSign: 'إسعاف الجيزة 01' },
            { id: 'GIZ-02', callSign: 'إسعاف الجيزة 02' }
        ],
        queue: [
            { id: 'EMG-201', patient: 'محمود طارق', phone: '01233445566', bloodType: 'B+', locationId: 'N2', severity: 1, seq: 1 }
        ]
    },

    dakahlia: {
        nameAr: 'الدقهلية',
        nameEn: 'Dakahlia',
        nodes: [
            { id: 'H1', ar: 'مستشفى المنصورة الجامعي', en: 'Mansoura Univ. Hospital', type: 'hospital', x: 260, y: 170 },
            { id: 'H2', ar: 'مستشفى طلخا المركزي', en: 'Talkha Central Hospital', type: 'hospital', x: 155, y: 115 },
            { id: 'H3', ar: 'مستشفى ميت غمر العام', en: 'Mit Ghamr General Hosp.', type: 'hospital', x: 280, y: 345 },
            { id: 'N1', ar: 'حي الجامعة (المنصورة)', en: 'University Dist. (Mansoura)', type: 'district', x: 350, y: 130 },
            { id: 'N2', ar: 'المنصورة الجديدة', en: 'New Mansoura', type: 'district', x: 95, y: 230 },
            { id: 'N3', ar: 'دكرنس', en: 'Dekernes', type: 'district', x: 470, y: 165 },
            { id: 'N4', ar: 'السنبلاوين', en: 'El-Sinbellawein', type: 'district', x: 410, y: 280 }
        ],
        edges: [
            { from: 'H2', to: 'H1', weight: 3, state: 'normal' },
            { from: 'H2', to: 'N2', weight: 7, state: 'normal' },
            { from: 'H1', to: 'N1', weight: 2, state: 'normal' },
            { from: 'N1', to: 'N3', weight: 5, state: 'normal' },
            { from: 'H1', to: 'N4', weight: 5, state: 'normal' },
            { from: 'N4', to: 'H3', weight: 5, state: 'normal' },
            { from: 'N3', to: 'N4', weight: 4, state: 'normal' }
        ],
        ambulances: [
            { id: 'DAK-01', callSign: 'إسعاف الدقهلية 01' },
            { id: 'DAK-02', callSign: 'إسعاف الدقهلية 02' },
            { id: 'DAK-03', callSign: 'إسعاف الدقهلية 03' }
        ],
        queue: [
            { id: 'EMG-301', patient: 'يوسف السيد', phone: '01544556677', bloodType: 'O-', locationId: 'N2', severity: 1, seq: 1 },
            { id: 'EMG-302', patient: 'مريم هاني', phone: '01055667788', bloodType: 'AB+', locationId: 'N1', severity: 3, seq: 2 }
        ]
    },

    alex: {
        nameAr: 'الإسكندرية',
        nameEn: 'Alexandria',
        nodes: [
            { id: 'H1', ar: 'المستشفى الرئيسي الجامعي (الميري)', en: 'Alex Main Univ. Hospital', type: 'hospital', x: 230, y: 210 },
            { id: 'H2', ar: 'مستشفى شرق المدينة', en: 'Sharq El-Madina Hosp.', type: 'hospital', x: 430, y: 120 },
            { id: 'H3', ar: 'مستشفى العامرية العام', en: 'Amreya General Hosp.', type: 'hospital', x: 95, y: 320 },
            { id: 'N1', ar: 'محطة الرمل', en: 'Raml Station', type: 'district', x: 210, y: 120 },
            { id: 'N2', ar: 'سموحة وسيدي جابر', en: 'Smouha & Sidi Gaber', type: 'district', x: 325, y: 175 },
            { id: 'N3', ar: 'المنتزه والمعمورة', en: 'Montaza & Maamoura', type: 'district', x: 515, y: 80 },
            { id: 'N4', ar: 'العجمي', en: 'Agami', type: 'district', x: 115, y: 210 }
        ],
        edges: [
            { from: 'N1', to: 'H1', weight: 3, state: 'normal' },
            { from: 'N1', to: 'N2', weight: 4, state: 'normal' },
            { from: 'H1', to: 'N2', weight: 3, state: 'normal' },
            { from: 'N2', to: 'H2', weight: 4, state: 'normal' },
            { from: 'H2', to: 'N3', weight: 4, state: 'normal' },
            { from: 'H1', to: 'N4', weight: 6, state: 'normal' },
            { from: 'N4', to: 'H3', weight: 5, state: 'normal' }
        ],
        ambulances: [
            { id: 'ALX-01', callSign: 'إسعاف إسكندرية 01' },
            { id: 'ALX-02', callSign: 'إسعاف إسكندرية 02' },
            { id: 'ALX-03', callSign: 'إسعاف إسكندرية 03' }
        ],
        queue: [
            { id: 'EMG-401', patient: 'نورهان سامي', phone: '01266778899', bloodType: 'A-', locationId: 'N3', severity: 2, seq: 1 }
        ]
    },

    damietta: {
        nameAr: 'دمياط ودمياط الجديدة',
        nameEn: 'Damietta & New Damietta',
        nodes: [
            { id: 'H1', ar: 'مستشفى دمياط التخصصي', en: 'Damietta Specialized Hosp.', type: 'hospital', x: 390, y: 120 },
            { id: 'H2', ar: 'مستشفى الأزهر الجامعي (دمياط الجديدة)', en: 'Al-Azhar Univ. Hosp. (New Damietta)', type: 'hospital', x: 145, y: 215 },
            { id: 'H3', ar: 'مستشفى كفر سعد المركزي', en: 'Kafr Saad Central Hosp.', type: 'hospital', x: 350, y: 330 },
            { id: 'N1', ar: 'دمياط الجديدة (الحي الأول والثاني)', en: 'New Damietta (1st & 2nd Dist.)', type: 'district', x: 195, y: 120 },
            { id: 'N2', ar: 'الحي الثالث والرابع (دمياط الجديدة)', en: '3rd & 4th Districts (New Damietta)', type: 'district', x: 255, y: 195 },
            { id: 'N3', ar: 'الحي المتميز والجامعة (دمياط الجديدة)', en: 'Distinguished & Univ. Zone', type: 'district', x: 120, y: 315 },
            { id: 'N4', ar: 'شارع البحر', en: 'El-Bahr Street', type: 'district', x: 310, y: 95 },
            { id: 'N5', ar: 'رأس البر', en: 'Ras El-Bar', type: 'district', x: 485, y: 80 },
            { id: 'N6', ar: 'وسط دمياط', en: 'Downtown Damietta', type: 'district', x: 385, y: 225 },
            { id: 'N7', ar: 'فارسكور', en: 'Faraskour', type: 'district', x: 495, y: 295 }
        ],
        edges: [
            { from: 'N1', to: 'H2', weight: 3, state: 'normal' },
            { from: 'N1', to: 'N2', weight: 2, state: 'normal' },
            { from: 'N1', to: 'N4', weight: 4, state: 'normal' },
            { from: 'N2', to: 'H2', weight: 3, state: 'normal' },
            { from: 'N2', to: 'N3', weight: 4, state: 'normal' },
            { from: 'H2', to: 'N3', weight: 3, state: 'normal' },
            { from: 'N4', to: 'H1', weight: 3, state: 'normal' },
            { from: 'N4', to: 'N5', weight: 4, state: 'normal' },
            { from: 'H1', to: 'N5', weight: 4, state: 'normal' },
            { from: 'H1', to: 'N6', weight: 2, state: 'normal' },
            { from: 'N2', to: 'N6', weight: 5, state: 'normal' },
            { from: 'N6', to: 'H3', weight: 4, state: 'normal' },
            { from: 'N6', to: 'N7', weight: 5, state: 'normal' },
            { from: 'H3', to: 'N7', weight: 4, state: 'normal' }
        ],
        ambulances: [
            { id: 'DAM-01', callSign: 'إسعاف دمياط الجديدة 01' },
            { id: 'DAM-02', callSign: 'إسعاف دمياط 02' },
            { id: 'DAM-03', callSign: 'إسعاف دمياط 03' }
        ],
        queue: [
            { id: 'EMG-501', patient: 'آية محمد', phone: '01077889900', bloodType: 'O+', locationId: 'N2', severity: 1, seq: 1 },
            { id: 'EMG-502', patient: 'رامي عادل', phone: '01188990011', bloodType: 'B-', locationId: 'N4', severity: 3, seq: 2 }
        ]
    }
};

// --- Active State ---
let currentGovKey = 'damietta';
let caseCounter = 700;
let activeShortestPath = [];
let simInterval = null;
let activeDispatches = [];
let orOrders = [];
let arrivalHideTimer = null;

// Rescued cases history
let linkedListHistory = [
    {
        id: 'EMG-099',
        patient: 'كريم عادل',
        phone: '01099887766',
        bloodType: 'O+',
        govAr: 'القاهرة',
        govEn: 'Cairo',
        severity: 1,
        hospital: 'مستشفى القصر العيني',
        ambulance: 'إسعاف القاهرة 01',
        eta: 4,
        time: '10:30 PM'
    }
];

function getCurrentGov() {
    return governoratesData[currentGovKey];
}

function getGovActiveDispatches(govKey = currentGovKey) {
    return activeDispatches.filter(d => d.govKey === govKey);
}

function showArrivalMessage(msg, temporary = true) {
    const box = document.getElementById('arrivalMessageBox');
    if (!box) return;

    if (!msg) {
        box.textContent = '';
        box.style.display = 'none';
        return;
    }

    box.textContent = msg;
    box.style.display = 'block';

    if (arrivalHideTimer) {
        clearTimeout(arrivalHideTimer);
        arrivalHideTimer = null;
    }

    if (temporary) {
        arrivalHideTimer = setTimeout(() => {
            box.textContent = '';
            box.style.display = 'none';
        }, 6000);
    }
}

function createOrOrder(dispatchObj) {
    const hospName = dispatchObj.hospital
        ? (currentLang === 'ar' ? dispatchObj.hospital.ar : dispatchObj.hospital.en)
        : (currentLang === 'ar' ? 'غرفة العمليات المركزية' : 'Central Operating Room');
    const isCritical = dispatchObj.caseItem.severity === 1;
    const blood = dispatchObj.caseItem.bloodType || 'O+';

    return {
        id: `OR-${dispatchObj.caseItem.id}`,
        govKey: dispatchObj.govKey,
        caseId: dispatchObj.caseItem.id,
        patient: dispatchObj.caseItem.patient,
        bloodType: blood,
        severity: dispatchObj.caseItem.severity,
        isCritical,
        hospital: hospName,
        ambulance: dispatchObj.ambulance.callSign,
        eta: dispatchObj.eta,
        remainingEta: dispatchObj.remainingEta,
        status: 'preparing',
        note: isCritical
            ? `🚨 حالة حرجة: تجهيز فوري لغرفة العمليات وتحضير أكياس دم (${blood}) قبل وصول المريض!`
            : `تجهيز غرفة العمليات لاستقبال الحالة مع تأكيد فصيلة الدم (${blood}).`
    };
}

function renderOperatingRoomOrders() {
    const listEl = document.getElementById('orOrdersList');
    const badgeEl = document.getElementById('orOrdersBadge');
    const govOrders = orOrders.filter(o => o.govKey === currentGovKey && o.status === 'preparing');

    if (badgeEl) badgeEl.textContent = govOrders.length;
    if (!listEl) return;

    if (govOrders.length === 0) {
        listEl.innerHTML = '';
        return;
    }

    listEl.innerHTML = govOrders.map(order => {
        return `
      <div class="or-order-item ${order.isCritical ? 'or-critical' : ''}">
        <div class="or-order-top">
          <div>
            <strong>🏥 ${order.hospital}</strong> • <span>المريض: <strong>${order.patient}</strong> (${order.caseId})</span>
          </div>
          <span class="blood-alert-tag">🩸 فصيلة الدم: ${order.bloodType}</span>
        </div>
        <div style="font-size: 0.83rem;">${order.note}</div>
        <div style="font-size: 0.78rem; color: var(--text-secondary); display:flex; justify-content:space-between; flex-wrap:wrap; gap:6px;">
          <span>🚑 بواسطة: ${order.ambulance}</span>
          <span style="color:#f59e0b; font-weight:700;">⏳ جاري التجهيز (وصول الإسعاف خلال ${order.remainingEta} ${i18n[currentLang].minutes})</span>
        </div>
      </div>
    `;
    }).join('');
}

function changeGovernorate() {
    const select = document.getElementById('govSelect');
    currentGovKey = select.value;
    populateLocations();
    renderAll();

    const govActive = getGovActiveDispatches(currentGovKey);
    if (govActive.length > 0) {
        activeShortestPath = govActive[govActive.length - 1].path;
        renderMap();
        return;
    }

    const ordered = getOrderedPriorityQueue();
    if (ordered.length > 0) {
        previewRouteTo(ordered[0].locationId);
    } else {
        const firstDistrict = getCurrentGov().nodes.find(n => n.type === 'district');
        if (firstDistrict) previewRouteTo(firstDistrict.id);
    }
}

// --- Dijkstra Algorithm ---
function getEdgeCost(edge) {
    if (edge.state === 'blocked') return Infinity;
    if (edge.state === 'traffic') return edge.weight * 2;
    return edge.weight;
}

function runDijkstra(startId, targetId) {
    const gov = getCurrentGov();
    const dist = {};
    const prev = {};
    const visited = new Set();

    gov.nodes.forEach(n => dist[n.id] = Infinity);
    dist[startId] = 0;

    while (visited.size < gov.nodes.length) {
        let current = null;
        let best = Infinity;
        for (const id in dist) {
            if (!visited.has(id) && dist[id] < best) {
                best = dist[id];
                current = id;
            }
        }
        if (!current || current === targetId) break;
        visited.add(current);

        gov.edges.forEach(e => {
            let neighbor = null;
            if (e.from === current) neighbor = e.to;
            else if (e.to === current) neighbor = e.from;
            if (!neighbor || visited.has(neighbor)) return;

            const cost = getEdgeCost(e);
            if (cost === Infinity) return;
            const alt = dist[current] + cost;
            if (alt < dist[neighbor]) {
                dist[neighbor] = alt;
                prev[neighbor] = current;
            }
        });
    }

    if (dist[targetId] === Infinity) return { path: [], cost: Infinity };
    const path = [];
    let step = targetId;
    while (step) {
        path.unshift(step);
        step = prev[step];
    }
    return { path, cost: dist[targetId] };
}

function findNearestHospitalRoute(targetNodeId) {
    const gov = getCurrentGov();
    const hospitals = gov.nodes.filter(n => n.type === 'hospital');
    let bestResult = { hospital: hospitals[0], path: [], cost: Infinity };

    hospitals.forEach(h => {
        const res = runDijkstra(h.id, targetNodeId);
        if (res.cost < bestResult.cost) {
            bestResult = { hospital: h, path: res.path, cost: res.cost };
        }
    });
    return bestResult;
}

// --- Map Rendering ---
function renderMap() {
    const gov = getCurrentGov();
    const svg = document.getElementById('cityMap');
    svg.innerHTML = '';

    const govName = currentLang === 'ar' ? gov.nameAr : gov.nameEn;
    document.getElementById('currentGovTitle').textContent = `${i18n[currentLang].mapPrefix}${govName}`;

    gov.edges.forEach((edge, idx) => {
        const n1 = gov.nodes.find(n => n.id === edge.from);
        const n2 = gov.nodes.find(n => n.id === edge.to);

        const isOnShortest = activeShortestPath.some((id, i) =>
            i < activeShortestPath.length - 1 &&
            ((activeShortestPath[i] === edge.from && activeShortestPath[i + 1] === edge.to) ||
                (activeShortestPath[i] === edge.to && activeShortestPath[i + 1] === edge.from))
        );

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', n1.x);
        line.setAttribute('y1', n1.y);
        line.setAttribute('x2', n2.x);
        line.setAttribute('y2', n2.y);
        line.classList.add('road-line');
        if (edge.state === 'traffic') line.classList.add('traffic');
        if (edge.state === 'blocked') line.classList.add('blocked');
        if (isOnShortest) line.classList.add('shortest-path');
        line.onclick = () => cycleRoadState(idx);
        svg.appendChild(line);

        const midX = (n1.x + n2.x) / 2;
        const midY = (n1.y + n2.y) / 2;

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', midX - 15);
        rect.setAttribute('y', midY - 10);
        rect.setAttribute('width', 30);
        rect.setAttribute('height', 20);
        rect.setAttribute('rx', 6);
        rect.classList.add('road-weight-bg');
        svg.appendChild(rect);

        const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        txt.setAttribute('x', midX);
        txt.setAttribute('y', midY);
        txt.classList.add('road-weight-text');
        txt.textContent = edge.state === 'blocked' ? '✖' : `${getEdgeCost(edge)}m`;
        svg.appendChild(txt);
    });

    gov.nodes.forEach(node => {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.classList.add('node-circle');
        g.onclick = () => previewRouteTo(node.id);

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.x);
        circle.setAttribute('cy', node.y);
        circle.setAttribute('r', node.type === 'hospital' ? 18 : 13);
        circle.setAttribute('fill', node.type === 'hospital' ? '#ec4899' : '#f472b6');
        circle.setAttribute('stroke', '#fff');
        circle.setAttribute('stroke-width', '2.5');
        g.appendChild(circle);

        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        icon.setAttribute('x', node.x);
        icon.setAttribute('y', node.y + 4);
        icon.setAttribute('text-anchor', 'middle');
        icon.setAttribute('font-size', node.type === 'hospital' ? '14' : '11');
        icon.textContent = node.type === 'hospital' ? '🏥' : '📍';
        g.appendChild(icon);

        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', node.x);
        label.setAttribute('y', node.y + 31);
        label.classList.add('node-label');
        label.textContent = currentLang === 'ar' ? node.ar : node.en;
        g.appendChild(label);

        svg.appendChild(g);
    });

    getGovActiveDispatches(currentGovKey).forEach((disp, dIdx) => {
        const totalSteps = Math.max(1, disp.path.length - 1);
        const elapsedRatio = Math.min(1, (disp.eta - disp.remainingEta) / Math.max(1, disp.eta));
        const stepIdx = Math.min(disp.path.length - 1, Math.floor(elapsedRatio * totalSteps));
        const nodeId = disp.path[stepIdx];
        const currentNode = gov.nodes.find(n => n.id === nodeId);
        if (currentNode) {
            const ambIcon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            ambIcon.setAttribute('x', currentNode.x + (dIdx * 16));
            ambIcon.setAttribute('y', currentNode.y - 22);
            ambIcon.setAttribute('text-anchor', 'middle');
            ambIcon.setAttribute('font-size', '22');
            ambIcon.textContent = '🚑';
            svg.appendChild(ambIcon);
        }
    });
}

function cycleRoadState(idx) {
    const gov = getCurrentGov();
    const order = ['normal', 'traffic', 'blocked'];
    gov.edges[idx].state = order[(order.indexOf(gov.edges[idx].state) + 1) % order.length];
    const ordered = getOrderedPriorityQueue();
    if (ordered.length > 0) previewRouteTo(ordered[0].locationId);
    else renderMap();
}

function resetRoads() {
    getCurrentGov().edges.forEach(e => e.state = 'normal');
    const ordered = getOrderedPriorityQueue();
    if (ordered.length > 0) previewRouteTo(ordered[0].locationId);
    else renderMap();
}

function previewRouteTo(locationId) {
    const gov = getCurrentGov();
    const result = findNearestHospitalRoute(locationId);
    const banner = document.getElementById('routeBanner');
    const routeText = document.getElementById('routeText');
    const routeEta = document.getElementById('routeEta');

    if (result.cost === Infinity) {
        activeShortestPath = [];
        banner.classList.add('alert');
        routeText.textContent = currentLang === 'ar'
            ? '⚠️ جميع الطرق المؤدية لهذا الموقع مغلقة حالياً!'
            : '⚠️ All roads to this location are currently blocked!';
        routeEta.textContent = '∞';
    } else {
        activeShortestPath = result.path;
        banner.classList.remove('alert');
        const names = result.path.map(id => {
            const n = gov.nodes.find(x => x.id === id);
            return currentLang === 'ar' ? n.ar : n.en;
        }).join(' ➔ ');
        routeText.textContent = `${currentLang === 'ar' ? 'أقصر مسار:' : 'Shortest Path:'} ${names}`;
        routeEta.textContent = `${result.cost} ${i18n[currentLang].minutes}`;
    }
    renderMap();
}

// --- Priority Queue ---
function getOrderedPriorityQueue() {
    const q = getCurrentGov().queue;
    return [...q].sort((a, b) => a.severity - b.severity || a.seq - b.seq);
}

function addNewCase() {
    const gov = getCurrentGov();
    const nameInput = document.getElementById('patientInput');
    const phoneInput = document.getElementById('phoneInput');
    const bloodSelect = document.getElementById('bloodSelect');
    const locId = document.getElementById('locationSelect').value;
    const sev = parseInt(document.getElementById('severitySelect').value, 10);

    const patientName = nameInput.value.trim() || (currentLang === 'ar' ? `حالة طارئة #${caseCounter + 1}` : `Emergency #${caseCounter + 1}`);
    const phone = (phoneInput?.value || '').trim() || (currentLang === 'ar' ? 'غير مسجل' : 'N/A');
    const bloodType = bloodSelect?.value || 'O+';

    caseCounter++;

    gov.queue.push({
        id: `EMG-${caseCounter}`,
        patient: patientName,
        phone,
        bloodType,
        locationId: locId,
        severity: sev,
        seq: caseCounter
    });

    nameInput.value = '';
    if (phoneInput) phoneInput.value = '';
    renderAll();
    previewRouteTo(locId);
}

function updateDispatchStatus() {
    const statusEl = document.getElementById('liveDispatchStatus');
    const dispatchBtn = document.getElementById('dispatchBtn');
    const gov = getCurrentGov();
    const ordered = getOrderedPriorityQueue();
    const govActive = getGovActiveDispatches(currentGovKey);

    if (dispatchBtn) {
        dispatchBtn.disabled = ordered.length === 0 || gov.ambulances.length === 0;
    }

    if (!statusEl) return;

    const nextUp = ordered[0];
    const nextText = nextUp
        ? (currentLang === 'ar' ? ` • الحالة المجهزة التالية: ${nextUp.patient}` : ` • Next prepared: ${nextUp.patient}`)
        : '';

    if (govActive.length === 0) {
        statusEl.textContent = ordered.length > 0
            ? (currentLang === 'ar'
                ? `✅ جاهز للإرسال: الحالة المجهزة (${ordered[0].patient}) • الحالات في الطابور: ${ordered.length}`
                : `✅ Ready: Prepared case (${ordered[0].patient}) • Queued: ${ordered.length}`)
            : (currentLang === 'ar'
                ? 'ℹ️ لا توجد حالات منتظرة في الطابور حالياً.'
                : 'ℹ️ No pending cases in queue right now.');
        return;
    }

    const activeSummary = govActive.map(d => {
        const totalEtaText = `${d.eta} ${i18n[currentLang].minutes}`;
        const remEtaText = `${d.remainingEta} ${i18n[currentLang].minutes}`;
        const bloodLabel = d.caseItem.bloodType || 'O+';
        return currentLang === 'ar'
            ? `🚑 ${d.ambulance.callSign} تم الخروج إلى (${d.caseItem.patient} • 🩸 ${bloodLabel}) • مش متاح • المدة: ${totalEtaText} • لسا قد إيه: ${remEtaText} • تم إرسال أمر لغرفة العمليات`
            : `🚑 ${d.ambulance.callSign} dispatched to (${d.caseItem.patient} • 🩸 ${bloodLabel}) • Unavailable • ETA: ${totalEtaText} • Left: ${remEtaText} • OR order sent`;
    }).join(' | ');

    statusEl.textContent = `${activeSummary}${nextText}`;
}

function dispatchCaseById(caseId = null) {
    const gov = getCurrentGov();
    const ordered = getOrderedPriorityQueue();
    if (ordered.length === 0 || gov.ambulances.length === 0) return;

    const targetCase = caseId
        ? ordered.find(c => c.id === caseId) || ordered[0]
        : ordered[0];

    gov.queue = gov.queue.filter(c => c.id !== targetCase.id);

    const amb = gov.ambulances.shift();
    const routeInfo = findNearestHospitalRoute(targetCase.locationId);
    const path = routeInfo.path && routeInfo.path.length > 0 ? routeInfo.path : [targetCase.locationId];
    const targetNode = gov.nodes.find(n => n.id === targetCase.locationId);
    const targetLocName = targetNode ? (currentLang === 'ar' ? targetNode.ar : targetNode.en) : targetCase.locationId;
    const etaMinutes = routeInfo.cost === Infinity ? 1 : Math.max(1, routeInfo.cost);

    activeShortestPath = path;

    const banner = document.getElementById('routeBanner');
    const routeText = document.getElementById('routeText');
    const routeEta = document.getElementById('routeEta');
    if (banner && routeText && routeEta) {
        banner.classList.remove('alert');
        const names = path.map(id => {
            const n = gov.nodes.find(x => x.id === id);
            return n ? (currentLang === 'ar' ? n.ar : n.en) : id;
        }).join(' ➔ ');
        routeText.textContent = `${currentLang === 'ar' ? 'مسار الإسعاف:' : 'Dispatch Path:'} ${names}`;
        routeEta.textContent = `${etaMinutes} ${i18n[currentLang].minutes}`;
    }

    const dispatchObj = {
        govKey: currentGovKey,
        caseItem: targetCase,
        targetLocName,
        ambulance: amb,
        hospital: routeInfo.hospital,
        path,
        eta: etaMinutes,
        remainingEta: etaMinutes,
        timerId: null
    };

    const orOrder = createOrOrder(dispatchObj);
    orOrders.unshift(orOrder);

    dispatchObj.timerId = setInterval(() => {
        if (dispatchObj.remainingEta > 1) {
            dispatchObj.remainingEta--;
            orOrder.remainingEta = dispatchObj.remainingEta;
            renderMap();
            renderAmbulanceQueue();
            renderOperatingRoomOrders();
            updateDispatchStatus();
        } else {
            clearInterval(dispatchObj.timerId);
            dispatchObj.remainingEta = 0;
            orOrder.remainingEta = 0;
            orOrder.status = 'entered_or';
            orOrders = orOrders.filter(o => o.id !== orOrder.id);
            activeDispatches = activeDispatches.filter(d => d !== dispatchObj);

            const targetGov = governoratesData[dispatchObj.govKey] || getCurrentGov();
            targetGov.ambulances.push(dispatchObj.ambulance);

            const hospName = dispatchObj.hospital
                ? (currentLang === 'ar' ? dispatchObj.hospital.ar : dispatchObj.hospital.en)
                : (currentLang === 'ar' ? 'أقرب مستشفى' : 'Nearest Hospital');

            linkedListHistory.unshift({
                id: dispatchObj.caseItem.id,
                patient: dispatchObj.caseItem.patient,
                phone: dispatchObj.caseItem.phone || 'غير مسجل',
                bloodType: dispatchObj.caseItem.bloodType || 'O+',
                govAr: targetGov.nameAr,
                govEn: targetGov.nameEn,
                severity: dispatchObj.caseItem.severity,
                hospital: hospName,
                ambulance: dispatchObj.ambulance.callSign,
                eta: dispatchObj.eta,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });

            renderAll();
            syncRescuedCasesToJson(linkedListHistory);

            const arrivalMsg = `✅ تم وصول المريض (${dispatchObj.caseItem.patient} • 🩸 ${dispatchObj.caseItem.bloodType || 'O+'}) إلى ${hospName} ودخل غرفة العمليات، وتم تسجيله في حالات تم إنقاذها.`;
            showArrivalMessage(arrivalMsg, true);
        }
    }, 60000);

    activeDispatches.push(dispatchObj);
    renderAll();
}

function dispatchHighestPriority() {
    dispatchCaseById(null);
}

function renderPriorityQueue() {
    const gov = getCurrentGov();
    const container = document.getElementById('priorityQueueList');
    const ordered = getOrderedPriorityQueue();
    document.getElementById('pqCountBadge').textContent = ordered.length;

    container.innerHTML = ordered.map((item, idx) => {
        const loc = gov.nodes.find(n => n.id === item.locationId);
        const locName = loc ? (currentLang === 'ar' ? loc.ar : loc.en) : item.locationId;
        const sevText = i18n[currentLang][`sev${item.severity}`];
        const prepLabel = idx === 0
            ? `<span style="font-size:0.74rem; color:var(--pink-light); font-weight:700;">(${currentLang === 'ar' ? 'تجهيز للإخراج التالي' : 'Prepared Next'})</span>`
            : '';
        const noAmbulance = gov.ambulances.length === 0;

        return `
      <div class="case-card sev-${item.severity}" style="cursor:pointer" onclick="previewRouteTo('${item.locationId}')">
        <div>
          <strong>${item.patient}</strong> <small style="color:var(--text-muted)">(${item.id})</small> ${prepLabel}
          <div style="font-size:0.8rem; color:var(--text-secondary);">
            📍 ${locName} • 📞 ${item.phone || '-'} • 🩸 ${item.bloodType || 'O+'}
          </div>
        </div>
        <div class="case-actions" onclick="event.stopPropagation()">
          <button class="btn btn-success" ${noAmbulance ? 'disabled' : ''} onclick="dispatchCaseById('${item.id}')">
            ${i18n[currentLang].btnDispatchRow}
          </button>
          <span class="severity-pill">${sevText}</span>
        </div>
      </div>
    `;
    }).join('');
}

// --- Fleet & History ---
function addAmbulanceUnit() {
    const gov = getCurrentGov();
    const num = gov.ambulances.length + getGovActiveDispatches(currentGovKey).length + 1;
    gov.ambulances.push({
        id: `${currentGovKey.toUpperCase()}-0${num}`,
        callSign: currentLang === 'ar' ? `إسعاف ${gov.nameAr} 0${num}` : `Ambulance 0${num}`
    });
    renderAll();
}

function renderAmbulanceQueue() {
    const container = document.getElementById('ambulanceQueueContainer');
    if (!container) return;

    const govActive = getGovActiveDispatches(currentGovKey);
    let html = '';

    govActive.forEach(disp => {
        const totalEtaText = `${disp.eta} ${i18n[currentLang].minutes}`;
        const remEtaText = `${disp.remainingEta} ${i18n[currentLang].minutes}`;

        html += `
      <div class="amb-card dispatched-card">
        <div style="font-size:1.8rem;">🚨</div>
        <strong>${disp.ambulance.callSign}</strong>
        <div style="font-size:0.75rem; color:var(--text-muted);">${disp.ambulance.id}</div>
        <span class="amb-status dispatched">${i18n[currentLang].dispatched}</span>
        <div class="amb-mission-text">
          ${currentLang === 'ar'
                ? `الحالة: <strong>${disp.caseItem.patient}</strong> (🩸 ${disp.caseItem.bloodType || 'O+'})<br/>الوجهة: ${disp.targetLocName}<br/>مدة المسار: <strong>${totalEtaText}</strong> • لسا قد إيه: <strong>${remEtaText}</strong>`
                : `Case: <strong>${disp.caseItem.patient}</strong> (🩸 ${disp.caseItem.bloodType || 'O+'})<br/>Destination: ${disp.targetLocName}<br/>Route ETA: <strong>${totalEtaText}</strong> • Left: <strong>${remEtaText}</strong>`}
        </div>
      </div>
    `;
    });

    html += getCurrentGov().ambulances.map((amb, idx) => {
        const isPreparedNext = idx === 0;
        const cardClass = isPreparedNext ? 'amb-card next-in-queue' : 'amb-card';
        const statusLabel = isPreparedNext ? i18n[currentLang].ready : i18n[currentLang].standby;

        return `
      <div class="${cardClass}">
        <div style="font-size:1.8rem;">🚑</div>
        <strong>${amb.callSign}</strong>
        <div style="font-size:0.75rem; color:var(--text-muted);">${amb.id}</div>
        <span class="amb-status">${statusLabel}</span>
      </div>
    `;
    }).join('');

    container.innerHTML = html;
}

function renderHistory() {
    const container = document.getElementById('linkedListContainer');
    const query = (document.getElementById('historySearch')?.value || '').toLowerCase();

    const filtered = linkedListHistory.filter(c =>
        c.patient.toLowerCase().includes(query) ||
        (c.phone || '').toLowerCase().includes(query) ||
        (c.bloodType || '').toLowerCase().includes(query) ||
        c.hospital.toLowerCase().includes(query) ||
        c.govAr.toLowerCase().includes(query) ||
        c.govEn.toLowerCase().includes(query) ||
        c.id.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = filtered.map(item => {
        const badgeColor = item.severity === 1 ? 'var(--red-emergency)' : 'var(--green-normal)';
        const govDisplay = currentLang === 'ar' ? item.govAr : item.govEn;
        return `
      <div class="ll-node">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong>${item.patient}</strong>
          <span style="width:10px; height:10px; border-radius:50%; background:${badgeColor};"></span>
        </div>
        <div style="font-size:0.78rem; color:var(--text-secondary); margin-top:4px;">
          📞 ${item.phone || '-'} • 🩸 <strong>${item.bloodType || 'O+'}</strong><br/>
          🌍 <strong>${govDisplay}</strong> • 🏥 ${item.hospital}<br/>
          🚑 ${item.ambulance} • ⏱️ ${item.eta}m • 🕒 ${item.time}
        </div>
      </div>
    `;
    }).join('');
}

// --- Controls ---
function updateStats() {
    const gov = getCurrentGov();
    const activeCountInGov = getGovActiveDispatches(currentGovKey).length;
    document.getElementById('criticalCount').textContent = gov.queue.filter(c => c.severity === 1).length;
    document.getElementById('normalCount').textContent = gov.queue.filter(c => c.severity >= 2).length;
    document.getElementById('fleetCount').textContent = gov.ambulances.length + activeCountInGov;
    document.getElementById('historyCount').textContent = linkedListHistory.length;
}

function populateLocations() {
    const gov = getCurrentGov();
    const select = document.getElementById('locationSelect');
    select.innerHTML = gov.nodes.filter(n => n.type === 'district')
        .map(d => `<option value="${d.id}">${currentLang === 'ar' ? d.ar : d.en}</option>`).join('');
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    document.getElementById('themeIcon').textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
}

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.getElementById('langLabel').textContent = currentLang === 'ar' ? 'English' : 'العربية';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[currentLang][key]) el.textContent = i18n[currentLang][key];
    });

    populateLocations();
    renderAll();
    const ordered = getOrderedPriorityQueue();
    if (ordered.length > 0) previewRouteTo(ordered[0].locationId);
}

function switchTab(tabName, btn) {
    document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${tabName}`).classList.add('active');
    btn.classList.add('active');
    hideTechnicalBadgesAndLabels();
}

function toggleSimulation() {
    const btn = document.getElementById('simBtn');
    if (simInterval) {
        clearInterval(simInterval);
        simInterval = null;
        btn.innerHTML = `<span>⚡</span> <span>${i18n[currentLang].autoSim}</span>`;
    } else {
        btn.innerHTML = `<span>⏹️</span> <span>${i18n[currentLang].stopSim}</span>`;
        simInterval = setInterval(() => {
            const gov = getCurrentGov();
            const districts = gov.nodes.filter(n => n.type === 'district');
            const randNode = districts[Math.floor(Math.random() * districts.length)];
            const randSev = Math.random() > 0.5 ? 1 : 3;
            const bloods = ['O+', 'A+', 'B+', 'O-', 'AB+'];
            caseCounter++;
            gov.queue.push({
                id: `EMG-${caseCounter}`,
                patient: currentLang === 'ar' ? `بلاغ آلي #${caseCounter}` : `Auto Alert #${caseCounter}`,
                phone: `010${Math.floor(10000000 + Math.random() * 89999999)}`,
                bloodType: bloods[caseCounter % bloods.length],
                locationId: randNode.id,
                severity: randSev,
                seq: caseCounter
            });
            renderAll();
            previewRouteTo(randNode.id);
        }, 3500);
    }
}

function hideTechnicalBadgesAndLabels() {
    document.querySelectorAll('span, badge, small, div, button, p').forEach(el => {
        const txt = (el.textContent || '').trim();
        if (
            txt === 'Min-Heap Priority Queue' ||
            txt === 'Weighted Graph + Dijkstra' ||
            txt === 'HEAD' ||
            txt === 'NULL' ||
            txt === 'لا توجد أوامر نشطة لغرفة العمليات حالياً.' ||
            txt.includes('Min-Heap Priority Queue') ||
            txt.includes('Weighted Graph + Dijkstra') ||
            txt.includes('تنبيه فوري عند خروج الإسعاف')
        ) {
            if (el.children.length === 0) {
                el.style.display = 'none';
            }
        }
    });

    document.querySelectorAll('button, h1, h2, h3, h4, span, div, p').forEach(el => {
        if (el.children.length === 0 && el.textContent) {
            el.textContent = el.textContent
                .replace(/\s*\(Linked List\)/gi, '')
                .replace(/\s*\(Queue\)/gi, '')
                .replace(/\s*\(Front\)/gi, '')
                .trim();
        }
    });
}

const STORAGE_KEY = 'emergency_rescue_saved_state_v1';

function saveSystemState() {
    try {
        const activePreparingOrders = orOrders.filter(o => o.status === 'preparing');
        const payload = {
            currentGovKey,
            caseCounter,
            linkedListHistory,
            orOrders: activePreparingOrders,
            governoratesData
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
        console.warn('تعذر حفظ الحالة محلياً:', err);
    }
}

function loadSystemState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;

        const saved = JSON.parse(raw);

        if (saved.currentGovKey && governoratesData[saved.currentGovKey]) {
            currentGovKey = saved.currentGovKey;
            const govSelect = document.getElementById('govSelect');
            if (govSelect) govSelect.value = currentGovKey;
        }

        if (typeof saved.caseCounter === 'number') {
            caseCounter = saved.caseCounter;
        }

        if (Array.isArray(saved.linkedListHistory) && saved.linkedListHistory.length > 0) {
            linkedListHistory = saved.linkedListHistory;
        }

        if (Array.isArray(saved.orOrders)) {
            orOrders = saved.orOrders.filter(o => o.status === 'preparing');
        }

        if (saved.governoratesData && typeof saved.governoratesData === 'object') {
            Object.keys(saved.governoratesData).forEach((key) => {
                if (governoratesData[key] && Array.isArray(saved.governoratesData[key].queue)) {
                    governoratesData[key].queue = saved.governoratesData[key].queue;
                }
            });
        }
    } catch (err) {
        console.warn('تعذر استرجاع الحالة المحفوظة:', err);
    }
}

async function syncRescuedCasesToJson(casesList) {
    try {
        await fetch('/api/hospitals/rescued-cases', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(casesList || [])
        });
    } catch (err) {
        console.warn('تعذر مزامنة حالات تم إنقاذها مع JSON:', err);
    }
}

async function loadRescuedCasesFromJson() {
    try {
        const res = await fetch('/api/hospitals/rescued-cases');
        if (!res.ok) return;

        const serverCases = await res.json();
        if (Array.isArray(serverCases) && serverCases.length > 0) {
            linkedListHistory = serverCases;
            saveSystemState();
            renderHistory();
            updateStats();
            hideTechnicalBadgesAndLabels();
        }
    } catch (err) {
        console.warn('تعذر قراءة حالات تم إنقاذها من JSON:', err);
    }
}

function renderAll() {
    updateStats();
    renderMap();
    renderPriorityQueue();
    renderAmbulanceQueue();
    renderOperatingRoomOrders();
    renderHistory();
    updateDispatchStatus();
    hideTechnicalBadgesAndLabels();
    saveSystemState();
}

// تشغيل النظام عند فتح الصفحة واسترجاع البيانات المحفوظة
loadSystemState();
populateLocations();
renderAll();
loadRescuedCasesFromJson();
const initialTop = getOrderedPriorityQueue()[0];
if (initialTop) previewRouteTo(initialTop.locationId);