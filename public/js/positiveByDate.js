fetch("./test.json")
    .then(response => response.json())
    .then(data => {
        const groupData = {};
        data.forEach(entry => {
            const date = entry.datetime.split(" ")[0];
            if (entry.sentiment === "Positive") {
                if (!groupData[date]) {
                    groupData[date] = 0;
                }
                groupData[date]++;
            }
        });
        
        const labels = Object.keys(groupData);
        const positive = labels.map(date => groupData[date] || 0);
        const canvas = document.getElementById("positiveByDate");
        const chart = new Chart(canvas, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Positive",
                    data: positive,
                    fill: false,
                    borderColor: "rgba(72, 191, 83, 1)",
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