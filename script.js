// Network Troubleshooting Simulator
// Christian Silva - Uninter 2026
// N1/N2 support practice project

let currentIssue = null;
let currentTicketId = null;
let currentStatus = "Open";

let resolvedCount = 0;
let escalatedCount = 0;
let totalScore = 0;   // Pontuação Nova

const issues = [ /* ... Aqui mantenha o array de issues */ ];

// ==================== LOCALSTORAGE ====================

function saveToLocalStorage() {
    const data = {
        resolvedCount: resolvedCount,
        escalatedCount: escalatedCount,
        totalScore: totalScore,
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

    const historyList = document.getElementById('history-list');
    if (historyList && data.history) {
        historyList.innerHTML = data.history;
    }

    updateDashboard();
}

// ==================== AS FUNÇÕES PRINCIPAIS ====================

function generateTicketId() {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return `INC-2026-${randomNumber}`;
}

function updateDashboard() {
    document.getElementById("resolved-count").textContent = resolvedCount;
    document.getElementById("escalated-count").textContent = escalatedCount;
    
    // Se você adicionou o score no HTML:
    const scoreEl = document.getElementById("score-count");
    if (scoreEl) scoreEl.textContent = totalScore;
}

function addLog(text, color = "text-emerald-300") {
    const output = document.getElementById("terminal-output");
    if (!output) return;

    const line = document.createElement("div");
    line.className = `log-line ${color}`;
    line.innerHTML = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

function clearTerminal() {
    const terminal = document.getElementById("terminal-output");
    if (terminal) terminal.innerHTML = "";
}

// ... (Continue com as funções executeCommand, executeQuickCommand, runDiagnostic, showSolution, etc. iguais)

function markAsResolved() {
    if (!currentIssue) return;

    currentStatus = "Resolved";
    resolvedCount++;
    totalScore += currentIssue.severity === "Critical" ? 30 : 
                  currentIssue.severity === "High" ? 25 : 15;

    updateDashboard();
    addToHistory("Resolved");
    saveToLocalStorage();

    addLog(`✅ Incident ${currentTicketId} resolved! (+${currentIssue.severity === "Critical" ? 30 : 25} pts)`, "text-emerald-400");
    
    alert(`Incident ${currentTicketId} resolved successfully!`);
    closeSolution();
}

function escalateIncident() {
    if (!currentIssue) return;

    currentStatus = "Escalated";
    escalatedCount++;
    totalScore += 8;

    updateDashboard();
    addToHistory("Escalated");
    saveToLocalStorage();

    addLog(`↑ Incident ${currentTicketId} escalated to L2.`, "text-orange-400");
}

// ==================== LOAD NEW ISSUE ====================

function loadNewIssue() {
    // ... (mantenha a função igual e só adicione no final:)
    closeSolution();
    clearTerminal();
    addLog("New issue loaded. Start troubleshooting.", "text-yellow-300");
}

// ==================== INICIALIZAÇÃO ====================

document.addEventListener("DOMContentLoaded", function () {
    loadFromLocalStorage();     // Carrega os dados salvos
    updateDashboard();

    setTimeout(() => {
        loadNewIssue();
    }, 800);
});
