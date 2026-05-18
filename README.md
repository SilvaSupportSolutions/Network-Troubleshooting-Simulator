# Network Troubleshooting Simulator

I created this project to practice troubleshooting scenarios that are common in help desk and technical support environments.

The simulator focuses on simple N1/N2 support situations such as DNS failures, IP conflicts, high latency, unreachable gateways, and printer connectivity issues.

I built this project while studying Systems Analysis and Development and learning more about troubleshooting workflows, incident handling, and front-end development.

Why This Project?

Rather than building another generic CRUD, I created a realistic Network Troubleshooting Simulator.

This project allows me to practice real-world technical support skills (incident analysis, diagnostics, and escalation) while also improving my front-end development abilities by building a functional and visually appealing tool.

## Project Overview

This project simulates common support incidents using a browser-based interface.

The main idea was to create something closer to a real support workflow instead of building another generic CRUD or to-do application.

The simulator includes a terminal-style interface, automatic diagnostics, simulated command outputs, incident tracking, escalation handling, and a small dashboard.

## Features

* Simulated network incidents
* Automatic diagnostic workflow
* Terminal-style command interface
* Quick command execution
* Ticket ID generation
* Severity classification
* Incident status tracking
* Resolution and escalation actions
* Incident history log
* Dashboard with incident counters

## Current Incident Scenarios

The simulator currently includes:

* IP address conflict
* DNS failure
* Slow internet / high latency
* Gateway unreachable
* Printer offline

Each scenario contains simulated command outputs and a recommended troubleshooting solution.

## Supported Commands

The terminal supports simulated versions of common troubleshooting commands:

* `ipconfig`
* `ping`
* `tracert`
* `nslookup`
* `ipconfig /flushdns`
* `netstat`
* `arp`
* `route print`

These commands are simulated and were added for learning and demonstration purposes.

## Technologies Used

* HTML5
* CSS3
* JavaScript
* Tailwind CSS
* Font Awesome

## Screenshots

### Home Dashboard



## How to Run

1. Download or clone the repository.
2. Open the HTML file in your browser.
3. Click on **New Incident**.
4. Use the terminal or quick command buttons.
5. Run the automatic diagnostic.
6. Resolve or escalate the incident.

## Project Structure

```text
Network-Troubleshooting-Simulator/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## Future Improvements

* Save incident history using localStorage
* Add more troubleshooting scenarios
* Add SLA status tracking


## What I Learned

- Real incident handling workflow (basic ITIL)
- How to simulate diagnostics with JavaScript
- Using localStorage for data persistence
- Designing "work tool" interfaces (terminal style)


## About

This project was developed by Christian Silva as a technical support and front-end practice project.

The main focus of the project is troubleshooting logic, incident handling, and support workflow simulation.
