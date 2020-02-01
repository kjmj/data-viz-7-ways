d3.csv('../../cars-sample.csv').then(function (data) {
  bmw = []
  mercedes = []
  toyota = []
  honda = []
  ford = []

  // read in data by manufacturer
  data.forEach(function (d) {
    weight = parseInt(d['Weight'])
    mpg = parseInt(d['MPG'])

    // skip things that arent numbers
    if (!isNaN(mpg)) {
      switch (d['Manufacturer']) {
        case "bmw":
          bmw.push({ x: weight, y: mpg })
          break;
        case "mercedes":
          mercedes.push({ x: weight, y: mpg })
          break;
        case "toyota":
          toyota.push({ x: weight, y: mpg })
          break;
        case "honda":
          honda.push({ x: weight, y: mpg })
          break;
        case "ford":
          ford.push({ x: weight, y: mpg })
          break;
        default:
      }
    }
  });

  var ctx = document.getElementById('chart').getContext('2d');
  var scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'BMW',
        data: bmw,
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        pointRadius: getSizes(bmw),
      },
      {
        label: 'Mercedes',
        data: mercedes,
        backgroundColor: "rgba(0, 0, 255, 0.5)",
        pointRadius: getSizes(mercedes),
      },
      {
        label: 'Toyota',
        data: toyota,
        backgroundColor: "rgba(255, 192, 203, 0.5)",
        pointRadius: getSizes(toyota),
      },
      {
        label: 'Honda',
        data: honda,
        backgroundColor: "rgba(0, 255, 0, 0.5)",
        pointRadius: getSizes(honda),
      },
      {
        label: 'Ford',
        data: ford,
        backgroundColor: "rgba(191, 255, 0, 0.5)",
        pointRadius: getSizes(ford),

      }]
    },
    options: {
      scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom',
          scaleLabel: {
            display: true,
            labelString: 'Weight'
          }
        }],
        yAxes: [{
          type: 'linear',
          position: 'left',
          scaleLabel: {
            display: true,
            labelString: 'MPG'
          }
        }]
      }
    },
  });
});

// determine the size of each point on the chart
function getSizes(dataset) {
  return dataset.map(f => f.x).map(f => f / 500)
}
