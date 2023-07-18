fetch("./test.json")
    .then(response => response.json())
    .then(data => {
        const positive = data.filter(item => item.sentiment === "Positive");
        const negative = data.filter(item => item.sentiment === "Negative");
        const neutral = data.filter(item => item.sentiment === "Neutral");
        const irrelevant = data.filter(item => item.sentiment === "Irrelevant");

        const positiveCount = positive.length;
        const negativeCount = negative.length;
        const neutralCount = neutral.length;
        const irrelevantCount = irrelevant.length;

        const ctx = document.getElementById("sentimentChart").getContext("2d");
        const myChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Positive", "Negative", "Neutral", "Irrelevant"],
                datasets: [
                    {
                        label: "Sentiment",
                        data: [positiveCount, negativeCount, neutralCount, irrelevantCount],
                        backgroundColor: [
                            "rgba(72,191,83, 0.2)",
                            "rgba(255, 0, 0, 0.2)",
                            "rgba(255, 229, 5, 0.2)",
                            "rgba(110, 177, 214, 0.2)"
                        ],
                        borderColor: [
                            "rgba(72, 191, 83, 1)",
                            "rgba(255, 0, 0, 1)",
                            "rgba(255, 229, 5, 1)",
                            "rgba(110, 177, 214, 1)"
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        stepSize: 1
                    }
                }
            }
        });
    });