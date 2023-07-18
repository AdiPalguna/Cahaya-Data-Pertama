fetch("./test.json")
    .then(response => response.json())
    .then(data => {
        const positiveBySource = {};
        data.forEach(item => {
            if (item.sentiment === "Positive") {
                if (!positiveBySource[item.source]) {
                    positiveBySource[item.source] = 1;
                } else {
                    positiveBySource[item.source]++;
                }
            }
        });
        
        const sources = Object.keys(positiveBySource);
        const positiveSentiments = Object.values(positiveBySource);
        
        const ctx = document.getElementById("positiveCount").getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: sources,
                datasets: [{
                    label: "Positive",
                    data: positiveSentiments,
                    backgroundColor: "rgba(72,191,83, 0.2)",
                    borderColor: "rgba(72,191,83, 1)",
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