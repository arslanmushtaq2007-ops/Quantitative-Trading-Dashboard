/* ==========================================================================
   LiquidityLogic - Instantaneous Execution Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Instantaneous SPA Navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view-section');
    const pageTitle = document.getElementById('pageTitle');

    const titleMap = {
        'dashboard': 'Algorithmic Overview',
        'orderblocks': 'Order Block Matrix',
        'backtesting': 'Historical Simulation Lab',
        'settings': 'System Parameters'
    };

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            navButtons.forEach(b => b.classList.remove('active'));
            views.forEach(v => v.classList.remove('active'));

            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(`view-${targetId}`).classList.add('active');
            pageTitle.textContent = titleMap[targetId];
        });
    });

    // 2. High-Performance Clock
    const clockEl = document.getElementById('liveClock');
    function updateClock() {
        const now = new Date();
        clockEl.textContent = now.toISOString().substring(11, 19) + ' UTC';
    }
    updateClock();
    setInterval(updateClock, 1000);

    // 3. System Toggle
    const toggle = document.getElementById('systemToggle');
    const statusText = document.getElementById('systemStatusText');
    toggle.addEventListener('change', (e) => {
        statusText.textContent = e.target.checked ? "System Active" : "Execution Paused";
        statusText.style.color = e.target.checked ? "var(--text-primary)" : "var(--accent-orange)";
    });

    // 4. Data Population
    const tradeData = [
        { time: "12:32:14", asset: "EURUSD", pattern: "FVG Entry", vol: "1.50", entry: "1.08542", result: "+$522.00" },
        { time: "11:15:40", asset: "GBPUSD", pattern: "Bullish OB", vol: "1.00", entry: "1.26410", result: "-$290.00" },
        { time: "09:45:02", asset: "XAUUSD", pattern: "Liquidity Sweep", vol: "2.00", entry: "2041.50", result: "+$860.00" },
        { time: "08:12:35", asset: "AUDUSD", pattern: "FVG Mitigation", vol: "1.25", entry: "0.65210", result: "+$337.50" }
    ];

    const tbody = document.getElementById('executionBody');

    function renderTable(data) {
        let html = '';
        data.forEach(trade => {
            const isWin = trade.result.includes('+');
            html += `
                <tr>
                    <td class="font-mono text-secondary">${trade.time}</td>
                    <td><strong>${trade.asset}</strong></td>
                    <td><span class="setup-badge">${trade.pattern}</span></td>
                    <td class="font-mono">${trade.vol}</td>
                    <td class="font-mono">${trade.entry}</td>
                    <td class="${isWin ? 'result-win' : 'text-orange font-mono'}">${trade.result}</td>
                </tr>
            `;
        });
        tbody.innerHTML = html;
    }

    renderTable(tradeData);

    // 5. Refresh Simulation
    const refreshBtn = document.getElementById('refreshBtn');
    refreshBtn.addEventListener('click', () => {
        const icon = refreshBtn.querySelector('i');
        icon.classList.add('fa-spin');
        
        setTimeout(() => {
            const shuffled = [...tradeData].sort(() => Math.random() - 0.5);
            renderTable(shuffled);
            icon.classList.remove('fa-spin');
        }, 200);
    });
});
