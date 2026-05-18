// =============================================
// Network Troubleshooting Simulator
// Christian Silva - 2026
// =============================================

let currentIssue = null;
let currentTicketId = null;

let resolvedCount = 0;
let escalatedCount = 0;
let totalScore = 0;

// ==================== INCIDENTS ====================
const issues = [
    {
        id: 1,
        title: "User with no internet connection",
        description: "Employee reports they cannot access any website. Other users on the same network are working normally.",
        severity: "High",
        solution: "Check network cable / Wi-Fi / DHCP. Recommended: ipconfig /release and ipconfig /renew."
    },
    {
        id: 2,
        title: "Very slow network / high latency",
        description: "Users are complaining that the internet is extremely slow.",
        severity: "Medium",
        solution: "Check bandwidth usage, possible congestion or router issue."
    },
    {
        id: 3,
        title: "Cannot access printer",
        description: "User cannot print. Other services are working normally.",
        severity: "Low",
        solution: "Check if the printer is turned on, on the same network and drivers are up to date."
    }
];

// ==================== LOCALSTORAGE ====================
function saveToLocalStorage() {
    const data = {
        resolvedCount,
        escalatedCount,
        totalScore,
        history: document.getElementById('history-list')?.innerHTML || ""
    };
    localStorage.setItem('ntt_simulator_data', JSON.stringify(data));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('ntt_simulator_data');
    if (!saved) return;

    const data = JSON.parse(saved);
    resolvedCount = data.resolvedCount || 0;
    escalatedCount = data.escalatedCount || 0;
    totalScore = data.totalScore || 0;

    const historyEl = document.getElementById('history-list');
    if (historyEl && data.history) historyEl.innerHTML = data.history;

    updateDashboard();
}

// ==================== BASIC FUNCTIONS ====================
function generateTicketId() {
    const num = Math.floor(1000 + Math.random() * 9000);
    return `INC-2026-${num}`;
}

function updateDashboard() {
    document.getElementById("resolved-count").textContent = resolvedCount;
    document.getElementById("escalated-count").textContent = escalatedCount;
    const scoreEl = document.getElementById("score-count");
    if (scoreEl) scoreEl.textContent = totalScore;
}

function addLog(text, color = "text-emerald-300") {
    const output = document.getElementById("terminal-output");
    if (!output) return;
    const line = document.createElement("div");
    line.className = `log-line ${color}`;
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

function clearTerminal() {
    const output = document.getElementById("terminal-output");
    if (output) output.innerHTML = "";
}

// ==================== NEW INCIDENT ====================
function loadNewIssue() {
    currentIssue = issues[Math.floor(Math.random() * issues.length)];
    currentTicketId = generateTicketId();

    document.getElementById("ticket-id").textContent = currentTicketId;
    document.getElementById("problema-titulo").textContent = currentIssue.title;
    document.getElementById("severity").textContent = currentIssue.severity;
    document.getElementById("descricao-problema").textContent = currentIssue.description;

    clearTerminal();
    addLog("=== New incident loaded ===", "text-yellow-300");
    addLog(`Ticket: ${currentTicketId}`, "text-yellow-300");

    document.getElementById("solucao-panel").classList.add("hidden");
}

// ==================== DIAGNOSTIC ====================
function runDiagnostic() {
    if (!currentIssue) {
        alert("Please load an incident first!");
        return;
    }

    clearTerminal();
    addLog("Running automatic diagnostic...", "text-yellow-300");
   
    setTimeout(() => {
        addLog("Checking connection...", "text-blue-400");
    }, 600);

    setTimeout(() => {
        addLog("Analyzing IP configuration...", "text-blue-400");
    }, 1400);

    setTimeout(() => {
        addLog("Diagnostic completed!", "text-emerald-400");
        showSolution();
    }, 2200);
}

function showSolution() {
    const panel = document.getElementById("solucao-panel");
    document.getElementById("solution-title").textContent = currentIssue.title;
    document.getElementById("solution-text").textContent = currentIssue.solution || "Recommended solution.";
    panel.classList.remove("hidden");
}

// ==================== RESOLVE / ESCALATE ====================
function markAsResolved() {
    if (!currentIssue) return;

    resolvedCount++;
    totalScore += currentIssue.severity === "High" ? 25 : currentIssue.severity === "Critical" ? 30 : 15;
   
    updateDashboard();
    saveToLocalStorage();

    addLog(`✅ ${currentTicketId} resolved successfully!`, "text-emerald-400");
    alert(`Incident ${currentTicketId} marked as Resolved!`);
   
    document.getElementById("solucao-panel").classList.add("hidden");
    setTimeout(loadNewIssue, 1500);
}

function escalateIncident() {
    if (!currentIssue) return;

    escalatedCount++;
    totalScore += 8;
   
    updateDashboard();
    saveToLocalStorage();

    addLog(`↑ ${currentTicketId} escalated to L2`, "text-orange-400");
    alert(`Incident ${currentTicketId} has been escalated!`);
   
    document.getElementById("solucao-panel").classList.add("hidden");
    setTimeout(loadNewIssue, 1500);
}

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    updateDashboard();
   
    setTimeout(() => {
        loadNewIssue();
    }, 800);
});
