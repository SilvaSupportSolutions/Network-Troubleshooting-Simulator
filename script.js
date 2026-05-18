// =============================================
// Network Troubleshooting Simulator
// Christian Silva - 2026
// =============================================

let currentIssue = null;
let currentTicketId = null;

let resolvedCount = 0;
let escalatedCount = 0;
let totalScore = 0;

let historyData = [];

// ==================== INCIDENTS ====================
const issues = [ /* seus incidents aqui */ ];

// ==================== LOCALSTORAGE ====================
function saveToLocalStorage() {
    localStorage.setItem('ntt_simulator_data', JSON.stringify({
        resolvedCount, escalatedCount, totalScore, historyData
    }));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('ntt_simulator_data');
    if (saved) {
        const data = JSON.parse(saved);
        resolvedCount = data.resolvedCount || 0;
        escalatedCount = data.escalatedCount || 0;
        totalScore = data.totalScore || 0;
        historyData = data.historyData || [];
    }
    updateDashboard();
    renderHistory();
}

// ==================== RENDER HISTORY ====================
function renderHistory() {
    const historyList = document.getElementById('history-list');
    if (!historyList) {
        console.warn("Element #history-list not found!");
        return;
    }

    historyList.innerHTML = "";

    if (historyData.length === 0) {
        historyList.innerHTML = `<li class="text-slate-500 text-center py-8">No incidents in history yet.<br>Resolve or escalate some incidents.</li>`;
        return;
    }

    historyData.forEach(item => {
        const li = document.createElement('li');
        li.className = `flex justify-between items-center p-4 rounded-2xl bg-slate-800 border-l-4 ${item.action === "Resolved" ? "border-emerald-500" : "border-orange-500"}`;
        li.innerHTML = `
            <div>
                <span class="font-mono text-yellow-300">${item.ticket}</span><br>
                <span class="text-slate-300">${item.title}</span>
            </div>
            <div class="text-right text-sm">
                <div class="text-slate-500">${item.date}</div>
                <span class="font-medium ${item.action === "Resolved" ? "text-emerald-400" : "text-orange-400"}">
                    ${item.action}
                </span>
            </div>
        `;
        historyList.appendChild(li);
    });
}

// ==================== OUTRAS FUNÇÕES (resumido) ====================
function updateDashboard() {
    document.getElementById("resolved-count").textContent = resolvedCount;
    document.getElementById("escalated-count").textContent = escalatedCount;
    document.getElementById("score-count").textContent = totalScore;
}

// ... (mantenha as funções loadNewIssue, runDiagnostic, showSolution, markAsResolved, escalateIncident)

function markAsResolved() {
    if (!currentIssue) return;
    // ... lógica de resolved

    historyData.unshift({
        ticket: currentTicketId,
        title: currentIssue.title,
        action: "Resolved",
        date: new Date().toLocaleString('en-US')
    });

    updateDashboard();
    renderHistory();
    saveToLocalStorage();
    // ...
}

function escalateIncident() {
    if (!currentIssue) return;
    // ... lógica de escalate

    historyData.unshift({
        ticket: currentTicketId,
        title: currentIssue.title,
        action: "Escalated",
        date: new Date().toLocaleString('en-US')
    });

    updateDashboard();
    renderHistory();
    saveToLocalStorage();
    // ...
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    setTimeout(loadNewIssue, 600);
});
