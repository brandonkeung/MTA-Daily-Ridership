// Load the data and render the bar chart
const margin = { top: 20, right: 30, bottom: 50, left: 60 },
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

const svg = d3.select("#plot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Add a text element for displaying the date
const dateText = svg.append("text")
    .attr("x", width / 2)
    .attr("y", -10)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("font-weight", "bold")
    .text("");

// Parse the data
function loadData() {
    d3.csv("data_for_interactive.csv").then(data => {
        data.forEach(d => {
            d.Date = new Date(d.Date);
            d["Subways: Total Estimated Ridership"] = +d["Subways: Total Estimated Ridership"];
            d["Buses: Total Estimated Ridership"] = +d["Buses: Total Estimated Ridership"];
            d["LIRR: Total Estimated Ridership"] = +d["LIRR: Total Estimated Ridership"];
            d["Metro-North: Total Estimated Ridership"] = +d["Metro-North: Total Estimated Ridership"];
        });
        createChart(data);
    });
}

function createChart(data) {
    const categories = [
        "Subways: Total Estimated Ridership",
        "Buses: Total Estimated Ridership",
        "LIRR: Total Estimated Ridership",
        "Metro-North: Total Estimated Ridership"
    ];

    const x = d3.scaleBand()
        .domain(categories)
        .range([0, width])
        .padding(0.2);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d3.max(categories, cat => d[cat]))])
        .nice()
        .range([height, 0]);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.selectAll("rect")
        .data(categories.map(cat => ({ category: cat, value: data[0][cat] })))
        .join("rect")
        .attr("x", d => x(d.category))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.value))
        .attr("fill", "steelblue")
        .on("mouseover", (event, d) => {
            tooltip.transition().duration(200).style("opacity", .9);
            tooltip.html(`${d.category}: ${d.value}`)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", () => tooltip.transition().duration(500).style("opacity", 0));

    // Animation setup
    let dayIndex = 0;
    let intervalId;

    function updateChart() {
        if (dayIndex >= data.length) {
            clearInterval(intervalId); // Stop the animation
            return;
        }

        const dayData = data[dayIndex];

        // Update bars
        const bars = svg.selectAll("rect")
            .data(categories.map(cat => ({ category: cat, value: dayData[cat] })));

        bars.join("rect")
            .transition()
            .duration(20)
            .attr("y", d => y(d.value))
            .attr("height", d => height - y(d.value));

        // Update date text
        dateText.text(dayData.Date.toDateString());

        dayIndex++;
    }

    // Add button for animation
    d3.select("#plot")
        .append("button")
        .text("Start Animation")
        .on("click", () => {
            if (!intervalId) { // Prevent multiple intervals
                intervalId = setInterval(updateChart, 40);
            }
        });
}

loadData();
