/* ==========================================================================
   QuantSMC - Quantitative Trading Dashboard Script
   Functionality: Real-time clock, dynamic execution table injection, UI toggles
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ---------------------------------------------------------------------------
    // 1. Real-Time UTC Clock Component
    // ---------------------------------------------------------------------------
    const liveClockElement = document.getElementById('liveClock');

    function updateClock() {
        const now = new Date();
        const hours = String(now.getUTCHours()).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');
        liveClockElement.textContent = `${hours}:${minutes}:${seconds} UTC`;
    }

    // Initialize clock immediately and set interval every 1 second
    updateClock();
    setInterval(updateClock, 1000);


    // ---------------------------------------------------------------------------
    // 2. System Active Toggle Component
    // ---------------------------------------------------------------------------
    const systemToggle = document.getElementById('systemToggle');
    const toggleStatusText = document.getElementById('toggleStatusText');

    systemToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            toggleStatusText.textContent = "System Active";
            toggleStatusText.style.color = "var(--text-main)";
        } else {
            toggleStatusText.textContent = "System Paused";
            toggleStatusText.style.color = "var(--accent-warning)";
        }
    });


    // ---------------------------------------------------------------------------
    // 3. Dynamic Recent Executions Data Source & Table Population
    // ---------------------------------------------------------------------------
    const executionsData = [
        {
            timestamp: "12:32:14",
            pair: "EUR/USD",
            setup: "FVG Mitigation",
            size: "1.50",
            entryPrice: "1.08542",
            exitPrice: "1.08890",
            result: "+$522.00",
            isWin: true
        },
        {
            timestamp: "11:15:40",
            pair: "GBP/USD",
            setup: "Order Block (OB)",
            size: "1.00",
            entryPrice: "1.26410",
            exitPrice: "1.26120",
            result: "-$290.00",
            isWin: false
        },
        {
            timestamp: "09:45:02",
            pair: "USD/JPY",
            setup: "Liquidity Sweep + FVG",
            size: "2.00",
            entryPrice: "151.420",
            exitPrice: "151.850",
            result: "+$860.00",
            isWin: true
        },
        {
            timestamp: "08:12:35",
            pair: "AUD/USD",
            setup: "FVG Equilibrium",
            size: "1.25",
            entryPrice: "0.65210",
            exitPrice: "0.65480",
            result: "+$337.50",
            isWin: true
        },
        {
            timestamp: "06:50:18",
            pair: "EUR/GBP",
            setup: "Institutional OB",
            size: "1.00",
            entryPrice: "0.85640",
            exitPrice: "0.85510",
            result: "+$162.50",
            isWin: true
        }
    ];

    const tableBody = document.getElementById('executionsTableBody');

    function renderExecutionsTable(data) {
        tableBody.innerHTML = ''; // Clear existing records

        data.forEach(exec => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${exec.timestamp}</td>
                <td><strong>${exec.pair}</strong></td>
                <td><span class="badge-setup">${exec.setup}</span></td>
                <td>${exec.size}</td>
                <td>${exec.entryPrice}</td>
                <td>${exec.exitPrice}</td>
                <td><span class="${exec.isWin ? 'badge-result-win' : 'badge-result-loss'}">${exec.result}</span></td>
            `;

            tableBody.appendChild(row);
        });
    }

    // Initial render call
    renderExecutionsTable(executionsData);


    // ---------------------------------------------------------------------------
    // 4. Interactive Refresh Button Simulation
    // ---------------------------------------------------------------------------
    const refreshTableBtn = document.getElementById('refreshTableBtn');

    refreshTableBtn.addEventListener('click', () => {
        // Visual feedback state
        refreshTableBtn.innerHTML = '<i class="fa-solid fa-rotate fa-spin"></i> Syncing Feed...';
        
        setTimeout(() => {
            // Shuffle/simulate feed updates for dynamic UI feel
            const randomizedData = [...executionsData].sort(() => Math.random() - 0.5);
            renderExecutionsTable(randomizedData);
            
            refreshTableBtn.innerHTML = '<i class="fa-solid fa-rotate"></i> Refresh Feed';
        }, 600);
    });

});