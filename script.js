// Network Troubleshooting Simulator
// Christian Silva - Uninter 2026
// N1/N2 support practice project

let currentIssue = null;
let currentTicketId = null;
let currentStatus = "Open";

let resolvedCount = 0;
let escalatedCount = 0;

const issues = [
    {
        id: 1,
        title: "IP Address Conflict Detected",
        severity: "High",
        category: "Network",
        description: "Several devices are using the same IP address. This is causing intermittent network interruptions.",
        commands: {
            ipconfig: "IPv4 Address: 192.168.1.45\nSubnet Mask: 255.255.255.0\nGateway: 192.168.1.1\n\nWarning: IP address conflict detected!",
            ping: "Ping 8.8.8.8: Average time 138ms with packet loss",
            tracert: "Hop 1: 192.168.1.1 - OK\nHop 2: Timeout..."
        },
        solution: "Release and renew the IP address using ipconfig /release and ipconfig /renew. After that, verify if DHCP is correctly configured on the router."
    },
    {
        id: 2,
        title: "DNS Failure",
        severity: "Medium",
        category: "Network",
        description: "Websites are not loading by domain name, but direct IP access is working correctly.",
        commands: {
            ipconfig: "DNS Servers: 192.168.1.1, 8.8.8.8",
            nslookup: "Server: 192.168.1.1\nName: google.com\nAddresses: 142.250.190.78",
            ping: "Ping google.com failed. Ping by IP address is working."
        },
        solution: "Run ipconfig /flushdns and change the DNS servers to 8.8.8.8 and 8.8.4.4."
    },
    {
        id: 3,
        title: "Slow Internet / High Latency",
        severity: "High",
        category: "Performance",
        description: "The connection speed is much lower than usual and websites are taking too long to load.",
        commands: {
            ping: "Average time: 285ms - Packet loss: 17%",
            tracert: "High latency detected starting from hop 4."
        },
        solution: "Check the Wi-Fi channel, restart the router, and test the connection again using an Ethernet cable."
    },
    {
        id: 4,
        title: "Gateway Unreachable",
        severity: "Critical",
        category: "Infrastructure",
        description: "The router cannot be accessed. There is no internet connection on any device.",
        commands: {
            ping: "Ping 192.168.1.1: Destination host unreachable"
        },
        solution: "Restart the router and check the network cables."
    },
    {
        id: 5,
        title: "Printer Offline",
        severity: "Low",
        category: "Printer",
        description: "The printer appears as offline even though it is connected to the network.",
        commands: {
            ping: "Ping printer 192.168.1.50: OK"
        },
        solution: "Clear the print queue and restart the Print Spooler service."
    }
];

function generateTicketId() {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return "INC-2026-" + randomNumber;
}

function addLog(text, color = "text-emerald-300") {
    const output = document.getElementById("terminal-output");

    if (!output) return;

    const line = document.createElement("div");
    line.className = "log-line " + color;
    line.innerHTML = text;

    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

function clearTerminal() {
    const terminal = document.getElementById("terminal-output");

    if (terminal) {
        terminal.innerHTML = "";
    }
}

function updateDashboard() {
    const resolvedElement = document.getElementById("resolved-count");
    const escalatedElement = document.getElementById("escalated-count");

    if (resolvedElement) {
        resolvedElement.textContent = resolvedCount;
    }

    if (escalatedElement) {
        escalatedElement.textContent = escalatedCount;
    }
}

function addToHistory(status) {
    const historyList = document.getElementById("history-list");

    if (!historyList || !currentIssue || !currentTicketId) return;

    const item = document.createElement("li");

    item.textContent =
        currentTicketId +
        " | " +
        currentIssue.title +
        " | " +
        currentIssue.severity +
        " | " +
        status;

    historyList.appendChild(item);
}

function executeCommand() {
    const input = document.getElementById("cmd-input");

    if (!input) return;

    const command = input.value.trim().toLowerCase();

    if (command === "") return;

    addLog("C:&gt; " + command, "text-yellow-300");

    if (!currentIssue) {
        addLog("No issue loaded yet...", "text-orange-400");
        input.value = "";
        return;
    }

    if (command.includes("ipconfig")) {
        addLog(currentIssue.commands.ipconfig || "IP configuration is normal.", "text-sky-300");

    } else if (command.includes("ping")) {
        addLog(currentIssue.commands.ping || "Ping test completed successfully.", "text-sky-300");

    } else if (command.includes("tracert")) {
        addLog(currentIssue.commands.tracert || "Trace route completed successfully.", "text-sky-300");

    } else if (command.includes("nslookup")) {
        addLog(currentIssue.commands.nslookup || "DNS lookup completed successfully.", "text-sky-300");

    } else if (command.includes("flushdns")) {
        addLog("DNS cache cleared successfully.", "text-emerald-400");

    } else if (command.includes("netstat")) {
        addLog("TCP 192.168.1.45:443 ESTABLISHED\nTCP 192.168.1.45:80 TIME_WAIT", "text-sky-300");

    } else if (command.includes("arp")) {
        addLog("192.168.1.1 dynamic\n192.168.1.50 dynamic", "text-sky-300");

    } else if (command.includes("route print")) {
        addLog("Default Gateway: 192.168.1.1", "text-sky-300");

    } else {
        addLog("Command not recognized.", "text-slate-400");
    }

    input.value = "";
}

function executeQuickCommand(command) {
    const input = document.getElementById("cmd-input");

    if (!input) return;

    input.value = command;
    executeCommand();
}

function runDiagnostic() {
    if (!currentIssue) {
        alert("Please select an issue first.");
        return;
    }

    clearTerminal();
    addLog("=== STARTING DIAGNOSTIC ===", "text-yellow-400");

    setTimeout(function () {
        addLog("Checking network adapters...", "text-slate-400");
    }, 600);

    setTimeout(function () {
        addLog(currentIssue.commands.ipconfig || "IP configuration is normal.", "text-emerald-300");
    }, 1400);

    setTimeout(function () {
        addLog("Testing connectivity...", "text-slate-400");
    }, 2100);

    setTimeout(function () {
        addLog(currentIssue.commands.ping || "Ping test completed successfully.", "text-emerald-300");
        showSolution();
    }, 2900);
}

function showSolution() {
    const solutionText = document.getElementById("solucao-texto");
    const solutionPanel = document.getElementById("solucao-panel");

    if (solutionText && currentIssue) {
        solutionText.innerHTML = currentIssue.solution;
    }

    if (solutionPanel) {
        solutionPanel.classList.remove("hidden");
    }
}

function closeSolution() {
    const solutionPanel = document.getElementById("solucao-panel");

    if (solutionPanel) {
        solutionPanel.classList.add("hidden");
    }
}

function markAsResolved() {
    if (!currentIssue) return;

    currentStatus = "Resolved";

    const statusElement = document.getElementById("status");

    if (statusElement) {
        statusElement.textContent = currentStatus;
    }

    resolvedCount++;
    updateDashboard();
    addToHistory("Resolved");

    addLog("Issue resolved successfully: " + currentTicketId, "text-emerald-400");

    alert("Incident resolved successfully.");
    closeSolution();
}

function escalateIncident() {
    if (!currentIssue) return;

    currentStatus = "Escalated";

    const statusElement = document.getElementById("status");

    if (statusElement) {
        statusElement.textContent = currentStatus;
    }

    escalatedCount++;
    updateDashboard();
    addToHistory("Escalated");

    addLog(
        "Incident escalated to Network Support Team: " + currentTicketId,
        "text-orange-400"
    );
}

function loadNewIssue() {
    const random = Math.floor(Math.random() * issues.length);

    currentIssue = issues[random];
    currentTicketId = generateTicketId();
    currentStatus = "Open";

    const titleElement = document.getElementById("problema-titulo");
    const descriptionElement = document.getElementById("descricao-problema");
    const ticketElement = document.getElementById("ticket-id");
    const severityElement = document.getElementById("severity");
    const statusElement = document.getElementById("status");

    if (titleElement) {
        titleElement.textContent = currentIssue.title;
    }

    if (descriptionElement) {
        descriptionElement.textContent = currentIssue.description;
    }

    if (ticketElement) {
        ticketElement.textContent = currentTicketId;
    }

    if (severityElement) {
        severityElement.textContent = currentIssue.severity;
    }

    if (statusElement) {
        statusElement.textContent = currentStatus;
    }

    closeSolution();
    clearTerminal();

    addLog("New issue loaded. Start troubleshooting.", "text-yellow-300");
}

document.addEventListener("DOMContentLoaded", function () {
    updateDashboard();

    setTimeout(function () {
        loadNewIssue();
    }, 850);
});
