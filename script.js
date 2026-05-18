// Network Troubleshooting Simulator
// Christian Silva - 2026

let currentIssue = null;
let currentTicketId = null;

let resolvedCount = 0;
let escalatedCount = 0;
let totalScore = 0;

// ==================== DADOS DOS INCIDENTES ====================
const issues = [
    {
        id: 1,
        title: "Usuário sem conexão à internet",
        description: "Colaborador relata que não consegue acessar nenhum site. Outros usuários na mesma rede estão normais.",
        severity: "High",
        commands: ["ipconfig", "ping 8.8.8.8", "ping google.com"]
    },
    {
        id: 2,
        title: "Rede lenta / alto latency",
        description: "Velocidade da internet está muito lenta. Testes mostram alto ping.",
        severity: "Medium",
        commands: ["ping 8.8.8.8", "tracert google.com"]
    },
    // Para adicionar novos incidentes aqui...
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

// ==================== FUNÇÕES BÁSICAS ====================
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

// ==================== NOVO INCIDENTE ====================
function loadNewIssue() {
    if (issues.length === 0) return;

    currentIssue = issues[Math.floor(Math.random() * issues.length)];
    currentTicketId = generateTicketId();
    currentStatus = "Open";

    // Aqui preenche os dados na tela
    document.getElementById("ticket-id").textContent = currentTicketId;
    document.getElementById("problema-titulo").textContent = currentIssue.title;
    document.getElementById("severity").textContent = currentIssue.severity;
    document.getElementById("descricao-problema").textContent = currentIssue.description;

    clearTerminal();
    addLog("=== Novo incidente carregado ===", "text-yellow-300");
    addLog(`Ticket: ${currentTicketId}`, "text-yellow-300");
    addLog("Descrição: " + currentIssue.title, "text-slate-300");

    // Fecha painel de solução se estiver aberto
    const solutionPanel = document.getElementById("solucao-panel");
    if (solutionPanel) solutionPanel.classList.add("hidden");
}

// ==================== INICIALIZAÇÃO ====================
document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    updateDashboard();
    
    // Irá carregar o primeiro incidente automaticamente
    setTimeout(() => {
        loadNewIssue();
    }, 600);
});
