fetch("./test.json")
    .then(response => response.json())
    .then(data => {
        const groupData = {};
        data.forEach(entry => {
            const date = entry.datetime.split(" ")[0];
            if (entry.sentiment === "Neutral") {
                if (!groupData[date]) {
                    groupData[date] = 0;
                }
                groupData[date]++;
            }
        });
        
        const labels = Object.keys(groupData);
        const neutral = labels.map(date => groupData[date] || 0);
        const canvas = document.getElementById("neutralByDate");
        const chart = new Chart(canvas, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Neutral",
                    data: neutral,
                    fill: false,
                    borderColor: "rgba(255, 229, 5, 1)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });