document.addEventListener('DOMContentLoaded', () => {
    
    // ---------------------------------------------------------------------------
    // 1. SPA Navigation Logic (Smooth Section Switching)
    // ---------------------------------------------------------------------------
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('pageTitle');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get target section ID and title text
            const targetId = item.getAttribute('data-target');
            const newTitle = item.querySelector('span').textContent;

            // 1. Update Navigation Active State
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // 2. Update Header Title
            if (targetId === 'section-dashboard') {
                pageTitle.textContent = 'Algorithmic Overview';
            } else {
                pageTitle.textContent = newTitle;
            }

            // 3. Smoothly switch sections
            sections.forEach(sec => {
                // Remove active class from all
                sec.classList.remove('active');
                sec.style.display = 'none';
                
                // Add active class to target (with slight timeout to trigger CSS animation)
                if (sec.id === targetId) {
                    sec.style.display = 'flex';
                    // Small delay ensures display:flex is registered before opacity animates
                    setTimeout(() => {
                        sec.classList.add('active');
                    }, 10);
                }
            });
        });
    });

    // ---------------------------------------------------------------------------
    // 2. Real-Time UTC Clock Component
    // ---------------------------------------------------------------------------
    const liveClockElement = document.getElementById('liveClock');

    function updateClock() {
        const now = new Date();
        const hours = String(now.getUTCHours()).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');
        liveClockElement.textContent = `${hours}:${minutes}:${seconds} UTC`;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // ---------------------------------------------------------------------------
    // 3. System Active Toggle Logic
    // ---------------------------------------------------------------------------
    const systemToggle = document.getElementById('systemToggle');
    const toggleStatusText = document.getElementById('toggleStatusText');

    systemToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            toggleStatusText.textContent = "Active";
            toggleStatusText.style.color = "var(--text-main)";
        } else {
            toggleStatusText.textContent = "Paused";
            toggleStatusText.style.color = "var(--accent-warning)";
        }
    });

    // ---------------------------------------------------------------------------
    // 4. Data Population for Recent Executions
    // ---------------------------------------------------------------------------
    const executionsData = [
        { timestamp: "12:32:14", pair: "EUR/USD", setup: "FVG Mitigation", size: "1.50", entryPrice: "1.08542", exitPrice: "1.08890", result: "+$522.00", isWin: true },
        { timestamp: "11:15:40", pair: "GBP/USD", setup: "Order Block (OB)", size: "1.00", entryPrice: "1.26410", exitPrice: "1.26120", result: "-$290.00", isWin: false },
        { timestamp: "09:45:02", pair: "USD/JPY", setup: "Liquidity Sweep", size: "2.00", entryPrice: "151.420", exitPrice: "151.850", result: "+$860.00", isWin: true }
    ];

    const tableBody = document.getElementById('executionsTableBody');

    function renderExecutionsTable(data) {
        tableBody.innerHTML = '';
        data.forEach(exec => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${exec.timestamp}</td>
                <td><strong>${exec.pair}</strong></td>
                <td><span style="color: var(--accent-primary); font-weight: 500;">${exec.setup}</span></td>
                <td>${exec.size}</td>
                <td>${exec.entryPrice}</td>
                <td>${exec.exitPrice}</td>
                <td style="color: ${exec.isWin ? 'var(--accent-green)' : 'var(--accent-danger)'}; font-weight: 700;">${exec.result}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    renderExecutionsTable(executionsData);

    // Refresh Feed Simulation
    const refreshTableBtn = document.getElementById('refreshTableBtn');
    refreshTableBtn.addEventListener('click', () => {
        refreshTableBtn.innerHTML = '<i class="fa-solid fa-rotate fa-spin"></i> Syncing...';
        setTimeout(() => {
            const randomizedData = [...executionsData].sort(() => Math.random() - 0.5);
            renderExecutionsTable(randomizedData);
            refreshTableBtn.innerHTML = '<i class="fa-solid fa-rotate"></i> Refresh Feed';
        }, 500);
    });
});
