console.log("Initializing D3 script");

const margin = { top: 20, right: 30, bottom: 40, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3.select("div#plot")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const x = d3.scaleTime().range([0, width]);
const y = d3.scaleLinear().domain([0, 2000000]).range([height, 0]);

const color = d3.scaleOrdinal(d3.schemeCategory10);

svg.append("g")
  .attr("transform", `translate(0,${height})`)
  .attr("class", "x-axis");

svg.append("g")
  .attr("class", "y-axis");

const tooltip = d3.select("#tooltip");

// Load data
d3.csv("project_edited_dataset.csv").then(data => {
  // Parse the date and filter for subway ridership
  const parseDate = d3.timeParse("%d/%m/%Y");
  data.forEach(d => {
    d.date = parseDate(d.Date);
    d.ridership = +d["Subways..Total.Estimated.Ridership"];
    d.season = d.Season;
  });

  console.log("Data loaded:", data);

  function update(selectedSeason) {
    const filteredData = data.filter(d => d.season === selectedSeason);
    console.log("Filtered data for season:", selectedSeason, filteredData);

    // Scale domain debugging
    if (filteredData.length > 0) {
      x.domain(d3.extent(filteredData, d => d.date));
      svg.select(".x-axis")
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b %Y")).ticks(6))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

      y.domain([0, d3.max(filteredData, d => d.ridership)]);
      svg.select(".y-axis")
        .call(d3.axisLeft(y));

      console.log("X domain:", x.domain());
      console.log("Y domain:", y.domain());
    } else {
      console.warn("No data for the selected season:", selectedSeason);
      return;
    }

    // Draw line
    svg.selectAll(".line").remove();
    svg.append("path")
      .datum(filteredData)
      .attr("fill", "none")
      .attr("stroke", color(selectedSeason))
      .attr("stroke-width", 2)
      .attr("class", "line")
      .attr("d", d3.line()
        .x(d => x(d.date))
        .y(d => y(d.ridership))
      );

    // Tooltip interaction
    svg.selectAll(".dot").remove();
    svg.selectAll(".dot")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", d => x(d.date))
      .attr("cy", d => y(d.ridership))
      .attr("r", 5)
      .attr("fill", color(selectedSeason))
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip.html(`Date: ${d3.timeFormat("%b %d, %Y")(d.date)}<br>Ridership: ${d.ridership}`)
          .style("left", (event.pageX + 5) + "px")
          .style("top", (event.pageY - 5) + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(200).style("opacity", 0);
      });
  }

  // Initial plot
  update("Winter");

  // Update plot on dropdown change
  d3.select("#seasonSelect").on("change", function () {
    const selectedSeason = d3.select(this).property("value");
    update(selectedSeason);
  });
}).catch(error => {
  console.error("Error loading data:", error);
});
