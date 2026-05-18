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

// ==================== LOCALSTORAGE & HISTORY ====================
function saveToLocalStorage() {
    localStorage.setItem('ntt_simulator_data', JSON.stringify({
        resolvedCount, 
        escalatedCount, 
        totalScore, 
        historyData
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

function renderHistory() {
    const list = document.getElementById('history-list');
    if (!list) {
        console.error("Element #history-list not found!");
        return;
    }

    list.innerHTML = "";

    if (historyData.length === 0) {
        list.innerHTML = `<li class="text-slate-500 text-center py-8">No incidents resolved yet.<br>Resolve or escalate some incidents to see the history.</li>`;
        return;
    }

    historyData.forEach(item => {
        const li = document.createElement('li');
        li.className = `p-4 rounded-2xl bg-slate-800 border-l-4 flex justify-between ${item.action === "Resolved" ? "border-emerald-500" : "border-orange-500"}`;
        li.innerHTML = `
            <div>
                <span class="font-mono text-yellow-300">${item.ticket}</span><br>
                <span class="text-slate-300">${item.title}</span>
            </div>
            <div class="text-right">
                <div class="text-xs text-slate-500">${item.date}</div>
                <span class="font-semibold ${item.action === "Resolved" ? "text-emerald-400" : "text-orange-400"}">
                    ${item.action}
                </span>
            </div>
        `;
        list.appendChild(li);
    });
}

// ==================== BASIC FUNCTIONS ====================
function updateDashboard() {
    document.getElementById("resolved-count").textContent = resolvedCount;
    document.getElementById("escalated-count").textContent = escalatedCount;
    document.getElementById("score-count").textContent = totalScore;
}

function generateTicketId() {
    const num = Math.floor(1000 + Math.random() * 9000);
    return `INC-2026-${num}`;
}

function clearTerminal() {
    const output = document.getElementById("terminal-output");
    if (output) output.innerHTML = "";
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

// ==================== NEW INCIDENT ====================
function loadNewIssue() {
    currentIssue = issues[Math.floor(Math.random() * issues.length)];
    currentTicketId = generateTicketId();

    document.getElementById("ticket-id").textContent = currentTicketId;
    document.getElementById("problema-titulo").textContent = currentIssue.title;
    document.getElementById("severity").textContent = currentIssue.severity;
    document.getElementById("descricao-problema").textContent = currentIssue.description;

    document.getElementById("solucao-panel").classList.add("hidden");
    clearTerminal();
    addLog("=== New incident loaded ===", "text-yellow-300");
    addLog(`Ticket: ${currentTicketId}`, "text-yellow-300");
}

// ==================== DIAGNOSTIC ====================
function runDiagnostic() {
    if (!currentIssue) {
        alert("Please load an incident first!");
        return;
    }

    clearTerminal();
    addLog("Running automatic diagnostic...", "text-yellow-300");
   
    setTimeout(() => addLog("Checking connection...", "text-blue-400"), 600);
    setTimeout(() => addLog("Analyzing IP configuration...", "text-blue-400"), 1400);
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
    totalScore += currentIssue.severity === "High" ? 25 : 20;

    historyData.unshift({
        ticket: currentTicketId,
        title: currentIssue.title,
        action: "Resolved",
        date: new Date().toLocaleString('en-US')
    });

    updateDashboard();
    renderHistory();
    saveToLocalStorage();

    addLog(`✅ ${currentTicketId} resolved successfully!`, "text-emerald-400");
    alert(`Incident ${currentTicketId} marked as Resolved!`);
    
    document.getElementById("solucao-panel").classList.add("hidden");
    setTimeout(loadNewIssue, 1200);
}

function escalateIncident() {
    if (!currentIssue) return;

    escalatedCount++;
    totalScore += 8;

    historyData.unshift({
        ticket: currentTicketId,
        title: currentIssue.title,
        action: "Escalated",
        date: new Date().toLocaleString('en-US')
    });

    updateDashboard();
    renderHistory();
    saveToLocalStorage();

    addLog(`↑ ${currentTicketId} escalated to L2`, "text-orange-400");
    alert(`Incident ${currentTicketId} has been escalated!`);
    
    document.getElementById("solucao-panel").classList.add("hidden");
    setTimeout(loadNewIssue, 1200);
}

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    setTimeout(loadNewIssue, 800);
});

// ==================== RESET PROGRESS ====================
function resetProgress() {
    if (confirm("Are you sure you want to reset all progress?\nThis will clear scores, counters and history.\n\nThis action cannot be undone.")) {
        localStorage.removeItem('ntt_simulator_data');
        
        resolvedCount = 0;
        escalatedCount = 0;
        totalScore = 0;
        historyData = [];
        
        updateDashboard();
        renderHistory();
        
        alert("✅ All progress has been reset!");
        
        // Recarrega um novo incidente
        setTimeout(loadNewIssue, 300);
    }
}
