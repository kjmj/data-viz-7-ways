// dimensions and margins of graph
var margin = { top: 10, right: 30, bottom: 60, left: 60 },
  width = 600 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

// create an svg
var svg = d3.select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// read in data
d3.csv("../../cars-sample.csv", function (data) {

  // clean the data by removing things that arent numbers
  cleaned = []
  data.forEach(d => {
    mpg = parseInt(d['MPG'])

    // skip things that arent numbers
    if (!isNaN(mpg)) {
      cleaned.push(d)
    }
  });

  // x axis
  var x = d3.scaleLinear()
    .domain([1500, 5000])
    .range([0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // text label for the x axis
  svg.append("text")
    .attr("transform",
      "translate(" + (width / 2) + " ," +
      (height + margin.top + 30) + ")")
    .style("text-anchor", "middle")
    .text("Weight");

  // y axis
  var y = d3.scaleLinear()
    .domain([5, 50])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // text label for the y axis
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("MPG");

  // gridlines in x axis function
  function make_x_gridlines() {
    return d3.axisBottom(x)
      .ticks(7)
  }

  // gridlines in y axis function
  function make_y_gridlines() {
    return d3.axisLeft(y)
      .ticks(7)
  }

  // add the X gridlines
  svg.append("g")
    .attr("class", "grid")
    .attr("transform", "translate(0," + height + ")")
    .call(make_x_gridlines()
      .tickSize(-height)
      .tickFormat("")
    )

  // // add the Y gridlines
  svg.append("g")
    .attr("class", "grid")
    .call(make_y_gridlines()
      .tickSize(-width)
      .tickFormat("")
    )

  // add the points
  svg.append('g')
    .selectAll("dot")
    .data(cleaned)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x(d["Weight"]); })
    .attr("cy", function (d) { return y(d["MPG"]); })
    .attr("r", function (d) { return parseInt(x(d["Weight"]) / 20); })
    .style("fill", function (d) { return determineFill(d['Manufacturer']); })
})

// determine the fill based on manufacturer
function determineFill(manufacturer) {
  switch (manufacturer) {
    case "bmw":
      return "rgba(255, 0, 0, 0.5)"
    case "mercedes":
      return "rgba(0, 0, 255, 0.5)"
    case "toyota":
      return "rgba(255, 192, 203, 0.5)"
    case "honda":
      return "rgba(0, 255, 0, 0.5)"
    case "ford":
      return "rgba(191, 255, 0, 0.5)"
  }


}