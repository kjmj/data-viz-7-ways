bmw =  {
  x: [],
  y: [],
  name: 'BMW',
  mode: 'markers',
  type: 'scatter',
  marker: { size: [], color: "rgba(255, 0, 0, 0.5)" }
}
mercedes =  {
  x: [],
  y: [],
  name: 'Mercedes',
  mode: 'markers',
  type: 'scatter',
  marker: { size: [], color: "rgba(0, 0, 255, 0.5)" }
}
toyota =  {
  x: [],
  y: [],
  name: 'Toyota',
  mode: 'markers',
  type: 'scatter',
  marker: { size: [], color: "rgba(255, 192, 203, 0.5)" }
}
honda =  {
  x: [],
  y: [],
  name: 'Honda',
  mode: 'markers',
  type: 'scatter',
  marker: { size: [], color: "rgba(0, 255, 0, 0.5)" }
}
ford =  {
  x: [],
  y: [],
  name: 'Ford',
  mode: 'markers',
  type: 'scatter',
  marker: { size: [], color: "rgba(191, 255, 0, 0.5)" }
}

// determine point size
function getSize(weight) {
  return weight / 150.0
}

d3.csv('../../cars-sample.csv').then(function (data) {
  data.forEach(function (d) {
    weight = parseInt(d['Weight'])
    mpg = parseInt(d['MPG'])

    // skip things that arent numbers
    if (!isNaN(mpg)) {
      switch (d['Manufacturer']) {
        case "bmw":
          bmw.x.push(weight)
          bmw.y.push(mpg)
          bmw.marker.size.push(getSize(weight))
          break;
        case "mercedes":
          mercedes.x.push(weight)
          mercedes.y.push(mpg)
          mercedes.marker.size.push(getSize(weight))
          break;
        case "toyota":
          toyota.x.push(weight)
          toyota.y.push(mpg)
          toyota.marker.size.push(getSize(weight))
          break;
        case "honda":
          honda.x.push(weight)
          honda.y.push(mpg)
          honda.marker.size.push(getSize(weight))
          break;
        case "ford":
          ford.x.push(weight)
          ford.y.push(mpg)
          ford.marker.size.push(getSize(weight))
          break;
        default:
      }
    }
  });

  var data = [bmw, mercedes, toyota, honda, ford];

  var layout = {
    title: 'Plotly.js',
    autosize: false,
    width: 600,
    height: 600,
    xaxis: {
      title: 'Weight',
      showgrid: false,
      zeroline: false
    },
    yaxis: {
      title: 'MPG',
      showline: false
    }
  };

  Plotly.newPlot('chart', data, layout);
});