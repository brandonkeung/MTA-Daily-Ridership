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
    .attr("y", 10)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("font-weight", "bold")
    .text("");

// Manually define the data for the first of each month
const data = [
    { Date: new Date("2020-03-01"), "Subways: Total Estimated Ridership": 2212965, "Buses: Total Estimated Ridership": 984908, "LIRR: Total Estimated Ridership": 86790, "Metro-North: Total Estimated Ridership": 55825 },
    { Date: new Date("2020-04-01"), "Subways: Total Estimated Ridership": 513481, "Buses: Total Estimated Ridership": 29373, "LIRR: Total Estimated Ridership": 10548, "Metro-North: Total Estimated Ridership": 9300 },
    { Date: new Date("2020-05-01"), "Subways: Total Estimated Ridership": 494549, "Buses: Total Estimated Ridership": 14893, "LIRR: Total Estimated Ridership": 6200, "Metro-North: Total Estimated Ridership": 9206 },
    { Date: new Date("2020-06-01"), "Subways: Total Estimated Ridership": 687162, "Buses: Total Estimated Ridership": 17833, "LIRR: Total Estimated Ridership": 34339, "Metro-North: Total Estimated Ridership": 16184 },
    { Date: new Date("2020-07-01"), "Subways: Total Estimated Ridership": 1120537, "Buses: Total Estimated Ridership": 32921, "LIRR: Total Estimated Ridership": 56505, "Metro-North: Total Estimated Ridership": 27770 },
    { Date: new Date("2020-08-01"), "Subways: Total Estimated Ridership": 842468, "Buses: Total Estimated Ridership": 16087, "LIRR: Total Estimated Ridership": 44405, "Metro-North: Total Estimated Ridership": 26261 },
    { Date: new Date("2020-09-01"), "Subways: Total Estimated Ridership": 1469274, "Buses: Total Estimated Ridership": 947758, "LIRR: Total Estimated Ridership": 76483, "Metro-North: Total Estimated Ridership": 36035 },
    { Date: new Date("2020-10-01"), "Subways: Total Estimated Ridership": 1809958, "Buses: Total Estimated Ridership": 1159859, "LIRR: Total Estimated Ridership": 86082, "Metro-North: Total Estimated Ridership": 42390 },
    { Date: new Date("2020-11-01"), "Subways: Total Estimated Ridership": 786675, "Buses: Total Estimated Ridership": 510820, "LIRR: Total Estimated Ridership": 29495, "Metro-North: Total Estimated Ridership": 22602 },
    { Date: new Date("2020-12-01"), "Subways: Total Estimated Ridership": 1706348, "Buses: Total Estimated Ridership": 1068627, "LIRR: Total Estimated Ridership": 73589, "Metro-North: Total Estimated Ridership": 35225 },
    { Date: new Date("2021-01-01"), "Subways: Total Estimated Ridership": 613692, "Buses: Total Estimated Ridership": 378288, "LIRR: Total Estimated Ridership": 28977, "Metro-North: Total Estimated Ridership": 14988 },
    { Date: new Date("2021-02-01"), "Subways: Total Estimated Ridership": 583230, "Buses: Total Estimated Ridership": 337228, "LIRR: Total Estimated Ridership": 8611, "Metro-North: Total Estimated Ridership": 12093 },
    { Date: new Date("2021-03-01"), "Subways: Total Estimated Ridership": 1696274, "Buses: Total Estimated Ridership": 1020837, "LIRR: Total Estimated Ridership": 74430, "Metro-North: Total Estimated Ridership": 36339 },
    { Date: new Date("2021-04-01"), "Subways: Total Estimated Ridership": 1841815, "Buses: Total Estimated Ridership": 1030209, "LIRR: Total Estimated Ridership": 77285, "Metro-North: Total Estimated Ridership": 38466 },
    { Date: new Date("2021-05-01"), "Subways: Total Estimated Ridership": 1515211, "Buses: Total Estimated Ridership": 818655, "LIRR: Total Estimated Ridership": 51067, "Metro-North: Total Estimated Ridership": 41395 },
    { Date: new Date("2021-06-01"), "Subways: Total Estimated Ridership": 2258831, "Buses: Total Estimated Ridership": 1230127, "LIRR: Total Estimated Ridership": 114759, "Metro-North: Total Estimated Ridership": 94923 },
    { Date: new Date("2021-07-01"), "Subways: Total Estimated Ridership": 2292461, "Buses: Total Estimated Ridership": 1104516, "LIRR: Total Estimated Ridership": 114363, "Metro-North: Total Estimated Ridership": 90018 },
    { Date: new Date("2021-08-01"), "Subways: Total Estimated Ridership": 1351294, "Buses: Total Estimated Ridership": 629963, "LIRR: Total Estimated Ridership": 66030, "Metro-North: Total Estimated Ridership": 51978 },
    { Date: new Date("2021-09-01"), "Subways: Total Estimated Ridership": 2294448, "Buses: Total Estimated Ridership": 1086148, "LIRR: Total Estimated Ridership": 118437, "Metro-North: Total Estimated Ridership": 90598 },
    { Date: new Date("2021-10-01"), "Subways: Total Estimated Ridership": 3162881, "Buses: Total Estimated Ridership": 1492942, "LIRR: Total Estimated Ridership": 140003, "Metro-North: Total Estimated Ridership": 116182 },
    { Date: new Date("2021-11-01"), "Subways: Total Estimated Ridership": 3034306, "Buses: Total Estimated Ridership": 1448304, "LIRR: Total Estimated Ridership": 158356, "Metro-North: Total Estimated Ridership": 131251 },
    { Date: new Date("2021-12-01"), "Subways: Total Estimated Ridership": 3326469, "Buses: Total Estimated Ridership": 1463384, "LIRR: Total Estimated Ridership": 163163, "Metro-North: Total Estimated Ridership": 136126 },
    { Date: new Date("2022-01-01"), "Subways: Total Estimated Ridership": 1027918, "Buses: Total Estimated Ridership": 350845, "LIRR: Total Estimated Ridership": 33980, "Metro-North: Total Estimated Ridership": 30341 },
    { Date: new Date("2022-02-01"), "Subways: Total Estimated Ridership": 2635083, "Buses: Total Estimated Ridership": 1127084, "LIRR: Total Estimated Ridership": 135255, "Metro-North: Total Estimated Ridership": 111424 },
    { Date: new Date("2022-03-01"), "Subways: Total Estimated Ridership": 3138181, "Buses: Total Estimated Ridership": 1435834, "LIRR: Total Estimated Ridership": 165769, "Metro-North: Total Estimated Ridership": 150787 },
    { Date: new Date("2022-04-01"), "Subways: Total Estimated Ridership": 3237107, "Buses: Total Estimated Ridership": 1411421, "LIRR: Total Estimated Ridership": 145251, "Metro-North: Total Estimated Ridership": 120557 },
    { Date: new Date("2022-05-01"), "Subways: Total Estimated Ridership": 1683953, "Buses: Total Estimated Ridership": 676070, "LIRR: Total Estimated Ridership": 64630, "Metro-North: Total Estimated Ridership": 62502 },
    { Date: new Date("2022-06-01"), "Subways: Total Estimated Ridership": 3381297, "Buses: Total Estimated Ridership": 1465383, "LIRR: Total Estimated Ridership": 178742, "Metro-North: Total Estimated Ridership": 159050 },
    { Date: new Date("2022-07-01"), "Subways: Total Estimated Ridership": 2827549, "Buses: Total Estimated Ridership": 1221837, "LIRR: Total Estimated Ridership": 151245, "Metro-North: Total Estimated Ridership": 117791 },
    { Date: new Date("2022-08-01"), "Subways: Total Estimated Ridership": 2739262, "Buses: Total Estimated Ridership": 1240007, "LIRR: Total Estimated Ridership": 151752, "Metro-North: Total Estimated Ridership": 138431 },
    { Date: new Date("2022-09-01"), "Subways: Total Estimated Ridership": 3114667, "Buses: Total Estimated Ridership": 1338287, "LIRR: Total Estimated Ridership": 186311, "Metro-North: Total Estimated Ridership": 140082 },
    { Date: new Date("2022-10-01"), "Subways: Total Estimated Ridership": 2032983, "Buses: Total Estimated Ridership": 758826, "LIRR: Total Estimated Ridership": 72081, "Metro-North: Total Estimated Ridership": 80394 },
    { Date: new Date("2022-11-01"), "Subways: Total Estimated Ridership": 3706707, "Buses: Total Estimated Ridership": 1501329, "LIRR: Total Estimated Ridership": 196102, "Metro-North: Total Estimated Ridership": 178425 },
    { Date: new Date("2022-12-01"), "Subways: Total Estimated Ridership": 3770495, "Buses: Total Estimated Ridership": 1459934, "LIRR: Total Estimated Ridership": 181825, "Metro-North: Total Estimated Ridership": 166856 },
    { Date: new Date("2023-01-01"), "Subways: Total Estimated Ridership": 1675507, "Buses: Total Estimated Ridership": 475226, "LIRR: Total Estimated Ridership": 67722, "Metro-North: Total Estimated Ridership": 66309 },
    { Date: new Date("2023-02-01"), "Subways: Total Estimated Ridership": 3682758, "Buses: Total Estimated Ridership": 1460146, "LIRR: Total Estimated Ridership": 184043, "Metro-North: Total Estimated Ridership": 169846 },
    { Date: new Date("2023-03-01"), "Subways: Total Estimated Ridership": 3780713, "Buses: Total Estimated Ridership": 1511792, "LIRR: Total Estimated Ridership": 192142, "Metro-North: Total Estimated Ridership": 176661 },
    { Date: new Date("2023-04-01"), "Subways: Total Estimated Ridership": 2283533, "Buses: Total Estimated Ridership": 842213, "LIRR: Total Estimated Ridership": 82140, "Metro-North: Total Estimated Ridership": 88096 },
    { Date: new Date("2023-05-01"), "Subways: Total Estimated Ridership": 3664755, "Buses: Total Estimated Ridership": 1465598, "LIRR: Total Estimated Ridership": 188566, "Metro-North: Total Estimated Ridership": 167178 },
    { Date: new Date("2023-06-01"), "Subways: Total Estimated Ridership": 3894167, "Buses: Total Estimated Ridership": 1457503, "LIRR: Total Estimated Ridership": 210483, "Metro-North: Total Estimated Ridership": 191410 },
    { Date: new Date("2023-07-01"), "Subways: Total Estimated Ridership": 2239529, "Buses: Total Estimated Ridership": 859295, "LIRR: Total Estimated Ridership": 120270, "Metro-North: Total Estimated Ridership": 99597 },
    { Date: new Date("2023-08-01"), "Subways: Total Estimated Ridership": 3598379, "Buses: Total Estimated Ridership": 1357252, "LIRR: Total Estimated Ridership": 221518, "Metro-North: Total Estimated Ridership": 199547 },
    { Date: new Date("2023-09-01"), "Subways: Total Estimated Ridership": 3196284, "Buses: Total Estimated Ridership": 1225370, "LIRR: Total Estimated Ridership": 202450, "Metro-North: Total Estimated Ridership": 152974 },
    { Date: new Date("2023-10-01"), "Subways: Total Estimated Ridership": 1995361, "Buses: Total Estimated Ridership": 669243, "LIRR: Total Estimated Ridership": 94222, "Metro-North: Total Estimated Ridership": 92724 },
    { Date: new Date("2023-11-01"), "Subways: Total Estimated Ridership": 4043524, "Buses: Total Estimated Ridership": 1369637, "LIRR: Total Estimated Ridership": 226067, "Metro-North: Total Estimated Ridership": 208249 },
    { Date: new Date("2023-12-01"), "Subways: Total Estimated Ridership": 3723171, "Buses: Total Estimated Ridership": 1226677, "LIRR: Total Estimated Ridership": 185151, "Metro-North: Total Estimated Ridership": 164628 },
    { Date: new Date("2024-01-01"), "Subways: Total Estimated Ridership": 1648734, "Buses: Total Estimated Ridership": 455965, "LIRR: Total Estimated Ridership": 82811, "Metro-North: Total Estimated Ridership": 73957 },
    { Date: new Date("2024-02-01"), "Subways: Total Estimated Ridership": 3814682, "Buses: Total Estimated Ridership": 1337508, "LIRR: Total Estimated Ridership": 214275, "Metro-North: Total Estimated Ridership": 189621 },
    { Date: new Date("2024-03-01"), "Subways: Total Estimated Ridership": 3573658, "Buses: Total Estimated Ridership": 1276428, "LIRR: Total Estimated Ridership": 181633, "Metro-North: Total Estimated Ridership": 157348 },
    { Date: new Date("2024-04-01"), "Subways: Total Estimated Ridership": 3321989, "Buses: Total Estimated Ridership": 1168598, "LIRR: Total Estimated Ridership": 208291, "Metro-North: Total Estimated Ridership": 180107 },
    { Date: new Date("2024-05-01"), "Subways: Total Estimated Ridership": 4032791, "Buses: Total Estimated Ridership": 1350660, "LIRR: Total Estimated Ridership": 230682, "Metro-North: Total Estimated Ridership": 205030 },
    { Date: new Date("2024-06-01"), "Subways: Total Estimated Ridership": 2446153, "Buses: Total Estimated Ridership": 848601, "LIRR: Total Estimated Ridership": 128555, "Metro-North: Total Estimated Ridership": 110948 },
    { Date: new Date("2024-07-01"), "Subways: Total Estimated Ridership": 3273546, "Buses: Total Estimated Ridership": 1156904, "LIRR: Total Estimated Ridership": 216906, "Metro-North: Total Estimated Ridership": 185943 },
    { Date: new Date("2024-08-01"), "Subways: Total Estimated Ridership": 3544663, "Buses: Total Estimated Ridership": 1208275, "LIRR: Total Estimated Ridership": 229131, "Metro-North: Total Estimated Ridership": 194439 },
    { Date: new Date("2024-09-01"), "Subways: Total Estimated Ridership": 1969350, "Buses: Total Estimated Ridership": 658803, "LIRR: Total Estimated Ridership": 120499, "Metro-North: Total Estimated Ridership": 95622 },
    { Date: new Date("2024-10-01"), "Subways: Total Estimated Ridership": 4179363, "Buses: Total Estimated Ridership": 1546620, "LIRR: Total Estimated Ridership": 247737, "Metro-North: Total Estimated Ridership": 218836 },
    { Date: new Date("2024-11-01"), "Subways: Total Estimated Ridership": 3780874, "Buses: Total Estimated Ridership": 1290003, "LIRR: Total Estimated Ridership": 213535, "Metro-North: Total Estimated Ridership": 185052 },
];

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
        .duration(100)
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
            intervalId = setInterval(updateChart, 200);
        }
    });