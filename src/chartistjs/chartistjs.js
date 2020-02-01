d3.csv('../../cars-sample.csv').then(function (data) {
  // store our data, group it by manufacturer
  cars = { labels: [], series: [[], [], [], [], []] }

  data.sort(compare);

  data.forEach(function (d) {
    weight = parseInt(d['Weight'])
    mpg = parseInt(d['MPG'])
    manufacturer = d["Manufacturer"]

    // skip things that arent numbers
    if (!isNaN(mpg)) {
      cars.labels.push(weight)

      // chartist is weird and wants an even number of elements in each series
      // so, push null to all series outside of the one being filled
      if (manufacturer == "bmw") {
        cars.series[0].push(mpg)

        cars.series[1].push(null)
        cars.series[2].push(null)
        cars.series[3].push(null)
        cars.series[4].push(null)
      }
      else if (manufacturer == "mercedes") {
        cars.series[1].push(mpg)

        cars.series[0].push(null)
        cars.series[2].push(null)
        cars.series[3].push(null)
        cars.series[4].push(null)
      }
      else if (manufacturer == "toyota") {
        cars.series[2].push(mpg)

        cars.series[0].push(null)
        cars.series[1].push(null)
        cars.series[3].push(null)
        cars.series[4].push(null)
      }
      else if (manufacturer == "honda") {
        cars.series[3].push(mpg)

        cars.series[0].push(null)
        cars.series[1].push(null)
        cars.series[2].push(null)
        cars.series[4].push(null)
      }
      else if (manufacturer == "ford") {
        cars.series[4].push(mpg)

        cars.series[0].push(null)
        cars.series[1].push(null)
        cars.series[2].push(null)
        cars.series[3].push(null)
      }
    }
  });

  // define options for our chart, such as axis logic, scaling, and plugins
  var options = {
    showLine: false,
    axisX: {
      labelInterpolationFnc: function (value, index) {
        return index % 13 === 0 ? value : null;
      }
    },
    width: '500px',
    height: '500px',
    plugins: [
      Chartist.plugins.ctAxisTitle({
        axisX: {
          axisTitle: 'Weight',
          axisClass: 'ct-axis-title',
          offset: {
            x: 0,
            y: 32
          },
          textAnchor: 'middle'
        },
        axisY: {
          axisTitle: 'MPG',
          axisClass: 'ct-axis-title',
          offset: {
            x: 0,
            y: 0
          },
          textAnchor: 'middle',
          flipTitle: false
        }
      })
    ]

  };

  var chart = new Chartist.Line('.ct-chart', cars, options, null);

  // now color the points and adjust their size
  chart.on('draw', function (data) {
    if (data.type === 'point') {
      var circle = new Chartist.Svg('circle', {
        cx: data.x,
        cy: data.y,
        r: data.x / 50,
        fill: determineFill(data.seriesIndex),
      });

      data.element.replace(circle);
    }
  });
});

// this function determines the fill of the circle based on the series it is in
function determineFill(seriesIndex) {
  if (seriesIndex == 0) {
    return "rgba(255, 0, 0, 0.5)"
  } else if (seriesIndex == 1) {
    return "rgba(0, 0, 255, 0.5)"
  } else if (seriesIndex == 2) {
    return "rgba(255, 192, 203, 0.5)"
  } else if (seriesIndex == 3) {
    return "rgba(0, 255, 0, 0.5)"
  } else {
    return "rgba(191, 255, 0, 0.5)"
  }
}

// used to sort our data by weight
function compare(a, b) {
  if (a['Weight'] < b['Weight']) return -1;
  if (a['Weight'] > b['Weight']) return 1;
  return 0;
}
