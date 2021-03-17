// select all SVG circles
let circle = d3.selectAll('circle')

// alter all circles colors and radius
circle.style('fill', 'steelblue')
circle.attr('r', 30)

// set each circle's x-value to a random location
circle.attr('cx', () => Math.floor(Math.random() * 720))

// binding data to each circle
circle.data([32, 57, 112])

// data is now accessible as the first argument for attr and style functions
circle.attr('r', (d) => Math.sqrt(d)) // attr

circle.style(
  // style
  'fill',
  (d) =>
    `rgb(${Math.random() * d * 2},${Math.random() * d * 2},${
      Math.random() * d * 2
    })`
)

// the index is accessible as the second argument to each function
circle.attr('cx', (d, i) => i * 100 + 50)

////////////////////////////////////////////////////////////////////////////////

// appending missing elements from data
var svg = d3.select('svg') // select the SVG
circle = svg.selectAll('circle').data([32, 57, 112, 250]) // select all circle elements, then map data

// append new element with leftover data, then merge the groups
var circleEnter = circle.enter().append('circle').merge(circle)

// Entering elements are already bound to the data,
// so we can use data to compute attributes and styles,
// as well as set constant properties
circleEnter.attr('cy', 60)
circleEnter.attr('cx', (d, i) => i * 100 + 20)
circleEnter.attr('r', (d) => Math.sqrt(d))

////////////////////////////////////////////////////////////////////////////////

// modify elements with new (smaller) data set
circle = svg.selectAll('circle').data([32, 57]) // specify new data set
circle.exit().remove() // remove empty elements (because no data was assigned to them)

////////////////////////////////////////////////////////////////////////////////

// rebind the circles to new data while ensuring
// that existing circles are bound to the same value in the new data
circle = svg.selectAll('circle').data([32, 57, 233], (d) => d)

circle
  .enter()
  .append('circle')
  .attr('cy', 60)
  .attr('cx', (d, i) => i * 100 + 30)
  .attr('r', (d) => Math.sqrt(d))
