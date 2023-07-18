fetch("./test.json")
    .then(response => response.json())
    .then(data => {
        const irrelevantBySource = {};
        data.forEach(item => {
            if (item.sentiment === "Irrelevant") {
                if (!irrelevantBySource[item.source]) {
                    irrelevantBySource[item.source] = 1;
                } else {
                    irrelevantBySource[item.source]++;
                }
            }
        });
        
        const sources = Object.keys(irrelevantBySource);
        const irrelevantSentiments = Object.values(irrelevantBySource);
        
        const ctx = document.getElementById("irrelevantCount").getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: sources,
                datasets: [{
                    label: "Irrelevant",
                    data: irrelevantSentiments,
                    backgroundColor: "rgba(110, 177, 214, 0.2)",
                    borderColor: "rgba(110, 177, 214, 1)",
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