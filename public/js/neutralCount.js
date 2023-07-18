fetch("./test.json")
    .then(response => response.json())
    .then(data => {
        const neutralBySource = {};
        data.forEach(item => {
            if (item.sentiment === "Neutral") {
                if (!neutralBySource[item.source]) {
                    neutralBySource[item.source] = 1;
                } else {
                    neutralBySource[item.source]++;
                }
            }
        });
        
        const sources = Object.keys(neutralBySource);
        const neutralSentiments = Object.values(neutralBySource);
        
        const ctx = document.getElementById("neutralCount").getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: sources,
                datasets: [{
                    label: "Neutral",
                    data: neutralSentiments,
                    backgroundColor: "rgba(255, 229, 5, 0.2)",
                    borderColor: "rgba(255, 229, 5, 1)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        stepSize: 1
                    }
                }
            }
        });
    });