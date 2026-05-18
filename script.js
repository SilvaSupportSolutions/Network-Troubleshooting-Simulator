// =============================================
// Network Troubleshooting Simulator
// Christian Silva - 2026
// =============================================

let currentIssue = null;
let currentTicketId = null;

let resolvedCount = 0;
let escalatedCount = 0;
let totalScore = 0;

// ==================== INCIDENTES ====================
const issues = [
    {
        id: 1,
        title: "Usuário sem conexão à internet",
        description: "Colaborador relata que não consegue acessar nenhum site. Outros usuários na mesma rede estão normais.",
        severity: "High",
        solution: "Verificar cabo de rede / Wi-Fi / DHCP. Recomendado: ipconfig /release e ipconfig /renew."
    },
    {
        id: 2,
        title: "Rede muito lenta / alto latency",
        description: "Usuários reclamam que a internet está extremamente lenta.",
        severity: "Medium",
        solution: "Verificar utilização de banda, possível congestionamento ou problema no roteador."
    },
    {
        id: 3,
        title: "Não consegue acessar impressora",
        description: "Usuário não consegue imprimir. Outros serviços funcionam.",
        severity: "Low",
        solution: "Verificar se a impressora está ligada, mesma rede e drivers atualizados."
    }
    // Caso queira adicione mais incidentes aqui se quiser
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

// ==================== FUNÇÕES BÁSICAS PROJETO ====================
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

function addToHistory(action) {
    const historyList = document.getElementById('history-list');
    if (!historyList) return;
    
    const item = document.createElement("li");
    item.className = "text-sm py-1 border-l-2 border-yellow-500 pl-3";
    item.textContent = `${new Date().toLocaleTimeString('pt-BR')} - ${currentTicketId} → ${action}`;
    historyList.appendChild(item);
}

// ==================== ADICIONA NOVO INCIDENTE ====================
function loadNewIssue() {
    currentIssue = issues[Math.floor(Math.random() * issues.length)];
    currentTicketId = generateTicketId();

    document.getElementById("ticket-id").textContent = currentTicketId;
    document.getElementById("problema-titulo").textContent = currentIssue.title;
    document.getElementById("severity").textContent = currentIssue.severity;
    document.getElementById("descricao-problema").textContent = currentIssue.description;

    clearTerminal();
    addLog("=== Novo incidente carregado ===", "text-yellow-300");
    addLog(`Ticket: ${currentTicketId}`, "text-yellow-300");

    // Esconde o painel de solução
    document.getElementById("solucao-panel").classList.add("hidden");
}

// ==================== IRÁ EFETUAR O DIAGNÓSTICO ====================
function runDiagnostic() {
    if (!currentIssue) {
        alert("Carregue um incidente primeiro!");
        return;
    }

    clearTerminal();
    addLog("Executando diagnóstico automático...", "text-yellow-300");
    
    setTimeout(() => {
        addLog("Verificando conexão...", "text-blue-400");
    }, 600);

    setTimeout(() => {
        addLog("Analisando configurações de IP...", "text-blue-400");
    }, 1400);

    setTimeout(() => {
        addLog("Diagnóstico concluído!", "text-emerald-400");
        showSolution();
    }, 2200);
}

function showSolution() {
    const panel = document.getElementById("solucao-panel");
    document.getElementById("solution-title").textContent = currentIssue.title;
    document.getElementById("solution-text").textContent = currentIssue.solution || "Solução recomendada.";
    panel.classList.remove("hidden");
}

// ==================== AQUI DEVE RESOLVER / ESCALONAR ====================
function markAsResolved() {
    if (!currentIssue) return;

    resolvedCount++;
    totalScore += currentIssue.severity === "High" ? 25 : currentIssue.severity === "Critical" ? 30 : 15;
    
    updateDashboard();
    addToHistory("Resolved");
    saveToLocalStorage();

    addLog(`✅ ${currentTicketId} resolvido com sucesso!`, "text-emerald-400");
    alert(`Incidente ${currentTicketId} marcado como Resolvido!`);
    
    document.getElementById("solucao-panel").classList.add("hidden");
    setTimeout(loadNewIssue, 1500);
}

function escalateIncident() {
    if (!currentIssue) return;

    escalatedCount++;
    totalScore += 8;
    
    updateDashboard();
    addToHistory("Escalated");
    saveToLocalStorage();

    addLog(`↑ ${currentTicketId} escalonado para N2`, "text-orange-400");
    alert(`Incidente ${currentTicketId} escalonado!`);
    
    document.getElementById("solucao-panel").classList.add("hidden");
    setTimeout(loadNewIssue, 1500);
}

// ==================== INICIALIZAÇÃO DO SISTEMA ====================
document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    updateDashboard();
    
    setTimeout(() => {
        loadNewIssue();
    }, 800);
});
