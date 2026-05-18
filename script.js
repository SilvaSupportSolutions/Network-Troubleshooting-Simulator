// Network Troubleshooting Simulator
// Christian Silva - Uninter 2026
// Prática realista de suporte N1/N2

let currentIssue = null;
let currentTicketId = null;
let currentStatus = "Open";
let resolvedCount = 0;
let escalatedCount = 0;
let score = 0; // Nova: pontuação simples

const issues = [ /* Neste caso mantive os 5 cenários, mas caso queira você pode adicionar mais */ 
    // ... (mesmo array de issues, sem alteração)
];

function generateTicketId() {
    const random = Math.floor(1000 + Math.random() * 9000);
    return `INC-${new Date().getFullYear()}-${random}`;
}

function saveToLocalStorage() {
    localStorage.setItem('ntt_incidents', JSON.stringify({
        resolved: resolvedCount,
        escalated: escalatedCount,
        score: score,
        history: document.getElementById('history-list').innerHTML
    }));
}

function loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('ntt_incidents'));
    if (data) {
        resolvedCount = data.resolved || 0;
        escalatedCount = data.escalated || 0;
        score = data.score || 0;
        if (data.history) document.getElementById('history-list').innerHTML = data.history;
        updateDashboard();
    }
}

// Funções addLog, clearTerminal, updateDashboard permanecem parecidas, mas preferi adicionar mais variedade de cores e mensagens.

function addLog(text, color = "text-emerald-300") {
    const output = document.getElementById("terminal-output");
    if (!output) return;

    const line = document.createElement("div");
    line.className = `log-line ${color}`;
    line.innerHTML = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

// ... (executeCommand, executeQuickCommand, runDiagnostic foram mantidos com pequenos ajustes feitos)

function markAsResolved() {
    if (!currentIssue) return;
    
    currentStatus = "Resolved";
    resolvedCount++;
    score += currentIssue.severity === "Critical" ? 25 : 
             currentIssue.severity === "High" ? 20 : 15;
    
    updateDashboard();
    addToHistory("Resolved");
    addLog(`✓ Incident ${currentTicketId} resolved successfully! (+${currentIssue.severity === "Critical" ? 25 : 20} pts)`, "text-emerald-400");
    
    saveToLocalStorage();
    alert(`Incident ${currentTicketId} resolved!`);
    closeSolution();
}

function escalateIncident() {
    if (!currentIssue) return;
    
    currentStatus = "Escalated";
    escalatedCount++;
    score += 5; // gera pequeno ganho por escalar corretamente
    
    updateDashboard();
    addToHistory("Escalated");
    addLog(`↑ Incident ${currentTicketId} escalated to L2.`, "text-orange-400");
    
    saveToLocalStorage();
}

// Final:
document.addEventListener("DOMContentLoaded", function () {
    updateDashboard();
    loadFromLocalStorage();
    
    // Ira carregar um incidente após 800ms
    setTimeout(loadNewIssue, 800);
});
