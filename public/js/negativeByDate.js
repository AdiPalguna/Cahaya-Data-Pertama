fetch("./test.json")
    .then(response => response.json())
    .then(data => {
        const groupData = {};
        data.forEach(entry => {
            const date = entry.datetime.split(" ")[0];
            if (entry.sentiment === "Negative") {
                if (!groupData[date]) {
                    groupData[date] = 0;
                }
                groupData[date]++;
            }
        });
        
        const labels = Object.keys(groupData);
        const negative = labels.map(date => groupData[date] || 0);
        const canvas = document.getElementById("negativeByDate");
        const chart = new Chart(canvas, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Negative",
                    data: negative,
                    fill: false,
                    borderColor: "rgba(255, 0, 0, 1)",
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