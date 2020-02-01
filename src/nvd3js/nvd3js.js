cars = [{
  key: 'BMW',
  values: []
}, {
  key: 'Mercedes',
  values: []
}, {
  key: 'Toyota',
  values: []
}, {
  key: 'Honda',
  values: []
}, {
  key: 'Ford',
  values: []
}]

// get the size of the points
function getSize(weight) {
  return weight / 2000.0;
}

d3v5.csv('../../cars-sample.csv').then(function (data) {
  data.forEach(function (d) {
    weight = parseInt(d['Weight'])
    mpg = parseInt(d['MPG'])

    // skip things that arent numbers
    if (!isNaN(mpg)) {
      switch (d['Manufacturer']) {
        case "bmw":
          cars[0].values.push({
            x: weight,
            y: mpg,
            size: getSize(weight),
            shape: "circle"
          })
          break;
        case "mercedes":
          cars[1].values.push({
            x: weight,
            y: mpg,
            size: getSize(weight),
            shape: "circle"
          })
          break;
        case "toyota":
          cars[2].values.push({
            x: weight,
            y: mpg,
            size: getSize(weight),
            shape: "circle"
          })
          break;
        case "honda":
          cars[3].values.push({
            x: weight,
            y: mpg,
            size: getSize(weight),
            shape: "circle"
          })
          break;
        case "ford":
          cars[4].values.push({
            x: weight,
            y: mpg,
            size: getSize(weight),
            shape: "circle"
          })
          break;
        default:
      }
    }
  });

  nv.addGraph(function () {
    var chart = nv.models.scatterChart()
      .showDistX(true)
      .showDistY(true)
      .color(d3.scale.category10().range());

    // configure height and width
    chart.height(600).width(600);

    // tooltip config
    chart.tooltipContent(function (key) {
      return '<h3>' + key.point.x + ", " + key.point.y + '</h3>';
    });

    // axis settings
    chart.xAxis.tickFormat(d3.format('.02f'));
    chart.yAxis.tickFormat(d3.format('.02f'));

    // axis labels
    chart.xAxis
      .axisLabel('Weight')
      .axisLabelDistance(0);

    chart.yAxis
      .axisLabel('MPG')
      .axisLabelDistance(0);

    // draw chart
    d3.select('#chart svg')
      .datum(cars)
      .transition().duration(350)
      .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });
});
