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
        statCompleted: 'حالات تم إنقاذها (Linked List)',
        tabOverview: '🗺️ غرفة العمليات والخريطة',
        tabFleet: '🚑 أسطول الإسعاف (Queue)',
        tabHistory: '📋 سجل الحالات (Linked List)',
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
        fleetTitle: 'أسطول الإسعاف',
        btnAddAmb: '➕ إضافة وحدة إسعاف',
        fleetDesc: 'السيارة الموجودة في مقدمة الطابور (Front) تخرج فوراً عند الإرسال، ثم تعود لنهاية الطابور (Rear).',
        historyTitle: 'سجل الحالات التي تم إنقاذها',
        sev1: 'حرجة جداً',
        sev2: 'متوسطة',
        sev3: 'عادية',
        ready: 'جاهزة (Front)',
        standby: 'في الانتظار',
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
        statCompleted: 'Rescued Cases (Linked List)',
        tabOverview: '🗺️ Command Map & Dispatch',
        tabFleet: '🚑 Ambulance Fleet (Queue)',
        tabHistory: '📋 Case History (Linked List)',
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
        fleetTitle: 'Ambulance Queue',
        btnAddAmb: '➕ Add Ambulance Unit',
        fleetDesc: 'The unit at the Front of the queue dispatches first and re-enters at the Rear.',
        historyTitle: 'Processed Case History',
        sev1: 'Critical',
        sev2: 'Medium',
        sev3: 'Normal',
        ready: 'Next (Front)',
        standby: 'Queued',
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
            { id: 'EMG-101', patient: 'أحمد كمال', locationId: 'N3', severity: 1, seq: 1 },
            { id: 'EMG-102', patient: 'سلمى حسن', locationId: 'N4', severity: 3, seq: 2 }
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
            { id: 'EMG-201', patient: 'محمود طارق', locationId: 'N2', severity: 1, seq: 1 }
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
            { id: 'EMG-301', patient: 'يوسف السيد', locationId: 'N2', severity: 1, seq: 1 },
            { id: 'EMG-302', patient: 'مريم هاني', locationId: 'N1', severity: 3, seq: 2 }
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
            { id: 'EMG-401', patient: 'نورهان سامي', locationId: 'N3', severity: 2, seq: 1 }
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
            { id: 'EMG-501', patient: 'آية محمد', locationId: 'N2', severity: 1, seq: 1 },
            { id: 'EMG-502', patient: 'رامي عادل', locationId: 'N4', severity: 3, seq: 2 }
        ]
    }
};

// --- Active State ---
let currentGovKey = 'cairo';
let caseCounter = 700;
let activeShortestPath = [];
let simInterval = null;

// Singly Linked List for rescued cases
let linkedListHistory = [
    {
        id: 'EMG-099',
        patient: 'كريم عادل',
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

function changeGovernorate() {
    const select = document.getElementById('govSelect');
    currentGovKey = select.value;
    populateLocations();
    renderAll();

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
    const locId = document.getElementById('locationSelect').value;
    const sev = parseInt(document.getElementById('severitySelect').value, 10);

    const patientName = nameInput.value.trim() || (currentLang === 'ar' ? `حالة طارئة #${caseCounter + 1}` : `Emergency #${caseCounter + 1}`);
    caseCounter++;

    gov.queue.push({
        id: `EMG-${caseCounter}`,
        patient: patientName,
        locationId: locId,
        severity: sev,
        seq: caseCounter
    });

    nameInput.value = '';
    renderAll();
    previewRouteTo(locId);
}

function dispatchHighestPriority() {
    const gov = getCurrentGov();
    const ordered = getOrderedPriorityQueue();
    if (ordered.length === 0) return;

    const topCase = ordered[0];
    gov.queue = gov.queue.filter(c => c.id !== topCase.id);

    const amb = gov.ambulances.shift();
    gov.ambulances.push(amb);

    const routeInfo = findNearestHospitalRoute(topCase.locationId);
    const hospName = currentLang === 'ar' ? routeInfo.hospital.ar : routeInfo.hospital.en;

    linkedListHistory.unshift({
        id: topCase.id,
        patient: topCase.patient,
        govAr: gov.nameAr,
        govEn: gov.nameEn,
        severity: topCase.severity,
        hospital: hospName,
        ambulance: amb.callSign,
        eta: routeInfo.cost === Infinity ? 0 : routeInfo.cost,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    renderAll();
    const remaining = getOrderedPriorityQueue();
    if (remaining.length > 0) previewRouteTo(remaining[0].locationId);
    else {
        activeShortestPath = [];
        renderMap();
    }
}

function renderPriorityQueue() {
    const gov = getCurrentGov();
    const container = document.getElementById('priorityQueueList');
    const ordered = getOrderedPriorityQueue();
    document.getElementById('pqCountBadge').textContent = ordered.length;

    container.innerHTML = ordered.map(item => {
        const loc = gov.nodes.find(n => n.id === item.locationId);
        const locName = currentLang === 'ar' ? loc.ar : loc.en;
        const sevText = i18n[currentLang][`sev${item.severity}`];
        return `
      <div class="case-card sev-${item.severity}" style="cursor:pointer" onclick="previewRouteTo('${item.locationId}')">
        <div>
          <strong>${item.patient}</strong> <small style="color:var(--text-muted)">(${item.id})</small>
          <div style="font-size:0.8rem; color:var(--text-secondary);">📍 ${locName}</div>
        </div>
        <span class="severity-pill">${sevText}</span>
      </div>
    `;
    }).join('');
}

// --- Fleet & History ---
function addAmbulanceUnit() {
    const gov = getCurrentGov();
    const num = gov.ambulances.length + 1;
    gov.ambulances.push({
        id: `${currentGovKey.toUpperCase()}-0${num}`,
        callSign: currentLang === 'ar' ? `إسعاف ${gov.nameAr} 0${num}` : `Ambulance 0${num}`
    });
    renderAll();
}

function renderAmbulanceQueue() {
    const gov = getCurrentGov();
    const container = document.getElementById('ambulanceQueueContainer');
    container.innerHTML = gov.ambulances.map((amb, idx) => `
    <div class="amb-card ${idx === 0 ? 'next-in-queue' : ''}">
      <div style="font-size:1.8rem;">🚑</div>
      <strong>${amb.callSign}</strong>
      <div style="font-size:0.75rem; color:var(--text-muted);">${amb.id}</div>
      <span class="amb-status">${idx === 0 ? i18n[currentLang].ready : i18n[currentLang].standby}</span>
    </div>
  `).join('');
}

function renderHistory() {
    const container = document.getElementById('linkedListContainer');
    const query = (document.getElementById('historySearch')?.value || '').toLowerCase();

    const filtered = linkedListHistory.filter(c =>
        c.patient.toLowerCase().includes(query) ||
        c.hospital.toLowerCase().includes(query) ||
        c.govAr.toLowerCase().includes(query) ||
        c.govEn.toLowerCase().includes(query) ||
        c.id.toLowerCase().includes(query)
    );

    let html = `<div class="ll-null" style="border:1px solid var(--pink-primary); color:var(--pink-light);">HEAD</div>`;
    filtered.forEach(item => {
        const badgeColor = item.severity === 1 ? 'var(--red-emergency)' : 'var(--green-normal)';
        const govDisplay = currentLang === 'ar' ? item.govAr : item.govEn;
        html += `
      <div class="ll-arrow">${currentLang === 'ar' ? '⬅' : '➔'}</div>
      <div class="ll-node">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong>${item.patient}</strong>
          <span style="width:10px; height:10px; border-radius:50%; background:${badgeColor};"></span>
        </div>
        <div style="font-size:0.78rem; color:var(--text-secondary); margin-top:4px;">
          🌍 <strong>${govDisplay}</strong><br/>
          🏥 ${item.hospital}<br/>
          🚑 ${item.ambulance} • ⏱️ ${item.eta}m • 🕒 ${item.time}
        </div>
      </div>
    `;
    });
    html += `<div class="ll-arrow">${currentLang === 'ar' ? '⬅' : '➔'}</div><div class="ll-null">NULL</div>`;
    container.innerHTML = html;
}

// --- Controls ---
function updateStats() {
    const gov = getCurrentGov();
    document.getElementById('criticalCount').textContent = gov.queue.filter(c => c.severity === 1).length;
    document.getElementById('normalCount').textContent = gov.queue.filter(c => c.severity >= 2).length;
    document.getElementById('fleetCount').textContent = gov.ambulances.length;
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
            caseCounter++;
            gov.queue.push({
                id: `EMG-${caseCounter}`,
                patient: currentLang === 'ar' ? `بلاغ آلي #${caseCounter}` : `Auto Alert #${caseCounter}`,
                locationId: randNode.id,
                severity: randSev,
                seq: caseCounter
            });
            renderAll();
            previewRouteTo(randNode.id);
        }, 3500);
    }
}

function renderAll() {
    updateStats();
    renderMap();
    renderPriorityQueue();
    renderAmbulanceQueue();
    renderHistory();
}

// Initial Boot
populateLocations();
renderAll();
previewRouteTo('N3'); 