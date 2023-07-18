fetch("./test.json")
    .then(response => response.json())
    .then(data => {
        const groupData = {};
        data.forEach(entry => {
            const date = entry.datetime.split(" ")[0];
            if (entry.sentiment === "Irrelevant") {
                if (!groupData[date]) {
                    groupData[date] = 0;
                }
                groupData[date]++;
            }
        });
        
        const labels = Object.keys(groupData);
        const irrelevant = labels.map(date => groupData[date] || 0);
        const canvas = document.getElementById("irrelevantByDate");
        const chart = new Chart(canvas, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Irrelevant",
                    data: irrelevant,
                    fill: false,
                    borderColor: "rgba(110, 177, 214, 1)",
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