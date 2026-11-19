// --- Localization Dictionary ---
let currentLang = 'ar';
const i18n = {
    ar: {
        appTitle: 'نظام إدارة الطوارئ والإسعاف الذكي',
        appSubtitle: 'Emergency Rescue Finder System • C# Data Structures Dashboard',
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
        mapTitle: 'خريطة المدينة وأقصر مسار',
        resetRoads: '🔄 تصفير الزحام',
        legHospital: 'مستشفى (Hospital)',
        legDistrict: 'حي / تقاطع (District)',
        legShortest: 'أقصر مسار (Dijkstra)',
        legTraffic: 'زحمة (اضغطي على الطريق)',
        legBlocked: 'طريق مغلق',
        newReportTitle: 'تسجيل بلاغ طوارئ جديد',
        lblPatient: 'اسم الحالة / المريض',
        lblLocation: 'موقع البلاغ (Node)',
        lblSeverity: 'درجة الخطورة (الأولوية)',
        btnAddCase: '➕ إضافة لطابور الأولوية',
        pqTitle: 'طابور الأولوية المباشر',
        btnDispatch: '🚑 إرسال إسعاف للأعلى أولوية',
        fleetTitle: 'ترتيب دور سيارات الإسعاف المتاحة',
        btnAddAmb: '➕ إضافة وحدة إسعاف',
        fleetDesc: 'السيارة الموجودة في مقدمة الطابور (Front) تخرج فوراً عند الإرسال، ثم تعود لنهاية الطابور (Rear).',
        historyTitle: 'سجل الحالات التي تم التعامل معها',
        sev1: 'حرجة جداً',
        sev2: 'متوسطة',
        sev3: 'عادية',
        ready: 'جاهزة (Front)',
        standby: 'في الانتظار',
        minutes: 'دقيقة'
    },
    en: {
        appTitle: 'Emergency Rescue Finder System',
        appSubtitle: 'Smart Dispatch Command Center • C# Data Structures UI',
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
        mapTitle: 'City Graph & Shortest Path',
        resetRoads: '🔄 Reset Traffic',
        legHospital: 'Hospital Node',
        legDistrict: 'District Node',
        legShortest: 'Shortest Path (Dijkstra)',
        legTraffic: 'Heavy Traffic (Click Road)',
        legBlocked: 'Blocked Road',
        newReportTitle: 'Register New Emergency',
        lblPatient: 'Patient / Case Name',
        lblLocation: 'Incident Location (Node)',
        lblSeverity: 'Severity Level (Priority)',
        btnAddCase: '➕ Enqueue in Priority Queue',
        pqTitle: 'Live Priority Queue',
        btnDispatch: '🚑 Dispatch Highest Priority',
        fleetTitle: 'Available Ambulance Queue Order',
        btnAddAmb: '➕ Add Ambulance Unit',
        fleetDesc: 'The unit at the Front of the queue dispatches first and re-enters at the Rear.',
        historyTitle: 'Processed Emergency Case History',
        sev1: 'Critical',
        sev2: 'Medium',
        sev3: 'Normal',
        ready: 'Next (Front)',
        standby: 'Queued',
        minutes: 'min'
    }
};

// --- Graph Data ---
const nodes = [
    { id: 'H1', ar: 'مستشفى النور', en: 'Al-Noor Hospital', type: 'hospital', x: 100, y: 80 },
    { id: 'H2', ar: 'مستشفى الشفاء', en: 'Al-Shifa Hospital', type: 'hospital', x: 500, y: 95 },
    { id: 'H3', ar: 'مستشفى الحياة', en: 'Al-Hayat Hospital', type: 'hospital', x: 470, y: 320 },
    { id: 'N1', ar: 'ميدان التحرير', en: 'Tahrir Square', type: 'district', x: 280, y: 135 },
    { id: 'N2', ar: 'حي الزهور', en: 'Al-Zohour Dist.', type: 'district', x: 130, y: 255 },
    { id: 'N3', ar: 'المنطقة المركزية', en: 'Central Zone', type: 'district', x: 320, y: 250 },
    { id: 'N4', ar: 'كورنيش النيل', en: 'Nile Corniche', type: 'district', x: 210, y: 345 }
];

let edges = [
    { from: 'H1', to: 'N1', weight: 4, state: 'normal' },
    { from: 'H1', to: 'N2', weight: 5, state: 'normal' },
    { from: 'N1', to: 'H2', weight: 5, state: 'normal' },
    { from: 'N1', to: 'N3', weight: 4, state: 'normal' },
    { from: 'N2', to: 'N3', weight: 3, state: 'normal' },
    { from: 'N2', to: 'N4', weight: 4, state: 'normal' },
    { from: 'N3', to: 'H3', weight: 4, state: 'normal' },
    { from: 'N3', to: 'N4', weight: 3, state: 'normal' },
    { from: 'N4', to: 'H3', weight: 5, state: 'normal' }
];

// --- Data Structures State ---
let caseCounter = 102;
let priorityQueue = [
    { id: 'EMG-101', patient: 'أحمد كمال', locationId: 'N3', severity: 1, seq: 1 },
    { id: 'EMG-102', patient: 'منى إبراهيم', locationId: 'N2', severity: 3, seq: 2 }
];

let ambulanceQueue = [
    { id: 'AMB-01', callSign: 'إسعاف 01', base: 'H1' },
    { id: 'AMB-02', callSign: 'إسعاف 02', base: 'H2' },
    { id: 'AMB-03', callSign: 'إسعاف 03', base: 'H3' }
];

let linkedListHistory = [
    {
        id: 'EMG-100',
        patient: 'كريم عادل',
        locationId: 'N1',
        severity: 1,
        hospital: 'مستشفى النور',
        ambulance: 'إسعاف 01',
        eta: 4,
        time: '10:30 PM'
    }
];

let activeShortestPath = [];
let simInterval = null;

// --- Dijkstra Algorithm ---
function getEdgeCost(edge) {
    if (edge.state === 'blocked') return Infinity;
    if (edge.state === 'traffic') return edge.weight * 2;
    return edge.weight;
}

function runDijkstra(startId, targetId) {
    const dist = {};
    const prev = {};
    const visited = new Set();

    nodes.forEach(n => dist[n.id] = Infinity);
    dist[startId] = 0;

    while (visited.size < nodes.length) {
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

        edges.forEach(e => {
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
    const hospitals = nodes.filter(n => n.type === 'hospital');
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
    const svg = document.getElementById('cityMap');
    svg.innerHTML = '';

    edges.forEach((edge, idx) => {
        const n1 = nodes.find(n => n.id === edge.from);
        const n2 = nodes.find(n => n.id === edge.to);

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

    nodes.forEach(node => {
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
    const order = ['normal', 'traffic', 'blocked'];
    edges[idx].state = order[(order.indexOf(edges[idx].state) + 1) % order.length];
    const ordered = getOrderedPriorityQueue();
    if (ordered.length > 0) previewRouteTo(ordered[0].locationId);
    else renderMap();
}

function resetRoads() {
    edges.forEach(e => e.state = 'normal');
    const ordered = getOrderedPriorityQueue();
    if (ordered.length > 0) previewRouteTo(ordered[0].locationId);
    else renderMap();
}

function previewRouteTo(locationId) {
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
            const n = nodes.find(x => x.id === id);
            return currentLang === 'ar' ? n.ar : n.en;
        }).join(' ➔ ');
        routeText.textContent = `${currentLang === 'ar' ? 'أقصر مسار:' : 'Shortest Path:'} ${names}`;
        routeEta.textContent = `${result.cost} ${i18n[currentLang].minutes}`;
    }
    renderMap();
}

// --- Priority Queue ---
function getOrderedPriorityQueue() {
    return [...priorityQueue].sort((a, b) => a.severity - b.severity || a.seq - b.seq);
}

function addNewCase() {
    const nameInput = document.getElementById('patientInput');
    const locId = document.getElementById('locationSelect').value;
    const sev = parseInt(document.getElementById('severitySelect').value, 10);

    const patientName = nameInput.value.trim() || (currentLang === 'ar' ? `حالة طارئة #${caseCounter + 1}` : `Emergency #${caseCounter + 1}`);
    caseCounter++;

    priorityQueue.push({ id: `EMG-${caseCounter}`, patient: patientName, locationId: locId, severity: sev, seq: caseCounter });
    nameInput.value = '';
    renderAll();
    previewRouteTo(locId);
}

function dispatchHighestPriority() {
    const ordered = getOrderedPriorityQueue();
    if (ordered.length === 0) return;

    const topCase = ordered[0];
    priorityQueue = priorityQueue.filter(c => c.id !== topCase.id);

    const amb = ambulanceQueue.shift();
    ambulanceQueue.push(amb);

    const routeInfo = findNearestHospitalRoute(topCase.locationId);
    const hospName = currentLang === 'ar' ? routeInfo.hospital.ar : routeInfo.hospital.en;

    linkedListHistory.unshift({
        id: topCase.id,
        patient: topCase.patient,
        locationId: topCase.locationId,
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
    const container = document.getElementById('priorityQueueList');
    const ordered = getOrderedPriorityQueue();
    document.getElementById('pqCountBadge').textContent = ordered.length;

    container.innerHTML = ordered.map(item => {
        const loc = nodes.find(n => n.id === item.locationId);
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
    const num = ambulanceQueue.length + 1;
    ambulanceQueue.push({
        id: `AMB-0${num}`,
        callSign: currentLang === 'ar' ? `إسعاف 0${num}` : `Ambulance 0${num}`,
        base: 'H1'
    });
    renderAll();
}

function renderAmbulanceQueue() {
    const container = document.getElementById('ambulanceQueueContainer');
    container.innerHTML = ambulanceQueue.map((amb, idx) => `
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
        c.id.toLowerCase().includes(query)
    );

    let html = `<div class="ll-null" style="border:1px solid var(--pink-primary); color:var(--pink-light);">HEAD</div>`;
    filtered.forEach(item => {
        const badgeColor = item.severity === 1 ? 'var(--red-emergency)' : 'var(--green-normal)';
        html += `
      <div class="ll-arrow">${currentLang === 'ar' ? '⬅' : '➔'}</div>
      <div class="ll-node">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong>${item.patient}</strong>
          <span style="width:10px; height:10px; border-radius:50%; background:${badgeColor};"></span>
        </div>
        <div style="font-size:0.78rem; color:var(--text-secondary); margin-top:4px;">
          🏥 ${item.hospital}<br/>
          🚑 ${item.ambulance} • ⏱️ ${item.eta}m<br/>
          🕒 ${item.time}
        </div>
      </div>
    `;
    });
    html += `<div class="ll-arrow">${currentLang === 'ar' ? '⬅' : '➔'}</div><div class="ll-null">NULL</div>`;
    container.innerHTML = html;
}

// --- Controls ---
function updateStats() {
    document.getElementById('criticalCount').textContent = priorityQueue.filter(c => c.severity === 1).length;
    document.getElementById('normalCount').textContent = priorityQueue.filter(c => c.severity >= 2).length;
    document.getElementById('fleetCount').textContent = ambulanceQueue.length;
    document.getElementById('historyCount').textContent = linkedListHistory.length;
}

function populateLocations() {
    const select = document.getElementById('locationSelect');
    select.innerHTML = nodes.filter(n => n.type === 'district')
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
            const districts = ['N1', 'N2', 'N3', 'N4'];
            const randLoc = districts[Math.floor(Math.random() * districts.length)];
            const randSev = Math.random() > 0.5 ? 1 : 3;
            caseCounter++;
            priorityQueue.push({
                id: `EMG-${caseCounter}`,
                patient: currentLang === 'ar' ? `بلاغ آلي #${caseCounter}` : `Auto Alert #${caseCounter}`,
                locationId: randLoc,
                severity: randSev,
                seq: caseCounter
            });
            renderAll();
            previewRouteTo(randLoc);
        }, 4000);
    }
}

function renderAll() {
    updateStats();
    renderMap();
    renderPriorityQueue();
    renderAmbulanceQueue();
    renderHistory();
}

populateLocations();
renderAll();
previewRouteTo('N3');