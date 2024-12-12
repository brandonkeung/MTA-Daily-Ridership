// Dimensions and margins
const w = 800;
const h = 500;
const margin = { top: 50, right: 50, bottom: 50, left: 70 };
const innerWidth = w - margin.left - margin.right;
const innerHeight = h - margin.top - margin.bottom;

// Append SVG container
const svg = d3.select("div#plot")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

const g = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Scales
const xScale = d3.scaleTime().range([0, innerWidth]);
const yScale = d3.scaleLinear().range([innerHeight, 0]);

// Axes
const xAxisGroup = g.append("g")
  .attr("transform", `translate(0, ${innerHeight})`);
const yAxisGroup = g.append("g");

// Line generator
const line = d3.line()
  .x(d => xScale(new Date(d.Date)))
  .y(d => yScale(d["Subways: Total Estimated Ridership"]));

// Tooltip
const tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

// Load Data
d3.csv("./data_for_interactive.csv").then(data => {
  // Check if data is loading correctly
  if (!data || data.length === 0) {
    console.error("Data failed to load or is empty.");
    return;
  }

  // Parse data
  data.forEach(d => {
    d.Date = new Date(d.Date);
    d["Subways: Total Estimated Ridership"] = +d["Subways: Total Estimated Ridership"];
  });

  // Set scales' domains
  xScale.domain(d3.extent(data, d => d.Date));
  yScale.domain([0, d3.max(data, d => d["Subways: Total Estimated Ridership"])]);

  // Draw line
  g.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", line);

  // Add axes
  xAxisGroup.call(d3.axisBottom(xScale));
  yAxisGroup.call(d3.axisLeft(yScale));

  // Add points for interactivity
  g.selectAll(".point")
    .data(data)
    .enter().append("circle")
    .attr("class", "point")
    .attr("cx", d => xScale(d.Date))
    .attr("cy", d => yScale(d["Subways: Total Estimated Ridership"]))
    .attr("r", 3)
    .attr("fill", "red")
    .on("mouseover", (event, d) => {
      tooltip.transition().duration(200).style("opacity", 1);
      tooltip.html(`Date: ${d.Date.toLocaleDateString()}<br>Ridership: ${d["Subways: Total Estimated Ridership"]}`)
        .style("left", (event.pageX + 5) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", () => {
      tooltip.transition().duration(500).style("opacity", 0);
    });
}).catch(error => {
  console.error("Error loading or processing data:", error);
});
