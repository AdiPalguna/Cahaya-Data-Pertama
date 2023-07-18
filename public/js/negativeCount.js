fetch("./test.json")
    .then(response => response.json())
    .then(data => {
        const negativeBySource = {};
        data.forEach(item => {
            if (item.sentiment === "Negative") {
                if (!negativeBySource[item.source]) {
                    negativeBySource[item.source] = 1;
                } else {
                    negativeBySource[item.source]++;
                }
            }
        });
        
        const sources = Object.keys(negativeBySource);
        const negativeSentiments = Object.values(negativeBySource);
        
        const ctx = document.getElementById("negativeCount").getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: sources,
                datasets: [{
                    label: "Negative",
                    data: negativeSentiments,
                    backgroundColor: "rgba(255, 0, 0, 0.2)",
                    borderColor: "rgba(255, 0, 0, 1)",
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