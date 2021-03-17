// SELECTION AND MANIPULATION

// d3.select('h1')
//   .style('color', 'orange')
//   .attr('class', 'coolness')
//   .text('changed text')

// d3.select('body')
//   .append('p')
//   .text('This is the best paragraph... everybody knows this')
//   .style('font-size', '2rem')
// d3.select('body')
//   .append('p')
//   .text('This paragraph is okay')
//   .style('font-size', '1.8rem')
// d3.select('body')
//   .append('p')
//   .text('This paragraph likes to nay-say everything')
//   .style('font-size', '1.6rem')

// d3.selectAll('p').style('color', '#4891ff')

// DATA LOADING AND BINDING
// var dataset = [1, 2, 3, 4, 5]

// d3.select('body')
//   .selectAll('p')
//   .data(dataset)
//   .enter()
//   .append('p')
//   .text((d) => `Paragraphical giraffical ${d}`)

// A SIMPLE BAR CHART
// let dataset = [80, 120, 40, 121, 56, 99, 30, 40, 77, 160, 120] // large dataset
// let dataset = [1, 3, 5, 9, 2, 7, 3, 4, 1, 10, 3] // small dataset

// let svgWidth = 500,
//   svgHeight = 300,
//   barPadding = 5
// let barWidth = svgWidth / dataset.length

// let svg = d3.select('svg').attr('width', svgWidth).attr('height', svgHeight)

// // SCALING
// let yScale = d3
//   .scaleLinear()
//   .domain([0, d3.max(dataset)])
//   .range([0, svgHeight])

// // BARCHART CREATION
// let barChart = svg
//   .selectAll('rect')
//   .data(dataset)
//   .enter()
//   .append('rect')
//   .attr('y', (d) => svgHeight - yScale(d))
//   .attr('height', (d) => yScale(d))
//   .attr('width', barWidth - barPadding)
//   .attr('transform', (d, i) => {
//     let translate = [barWidth * i, 0]
//     return `translate(${translate})`
//   })

// // CREATING LABELS
// let text = svg
//   .selectAll('text')
//   .data(dataset)
//   .enter()
//   .append('text')
//   .text((d) => d)
//   .attr('y', (d) => svgHeight - d - 2)
//   .attr('x', (i) => barWidth * i)

// AXES
// axes methods
// d3.axisTop()
// d3.axisRight()
// d3.axisBottom()
// d3.axisLeft()

// let dataset = [80, 120, 40, 121, 56, 99, 30, 40, 77, 160, 120] // large dataset
// let dataset = [1, 3, 5, 9, 2, 7, 3, 4, 1, 10, 3] // small dataset

// let svgWidth = 500,
//   svgHeight = 300,
//   barPadding = 5
// let barWidth = svgWidth / dataset.length

// let svg = d3.select('svg').attr('width', svgWidth).attr('height', svgHeight)

// // SCALING
// let xScale = d3
//   .scaleLinear()
//   .domain([0, d3.max(dataset)])
//   .range([0, svgWidth])

// let yScale = d3
//   .scaleLinear()
//   .domain([0, d3.max(dataset)])
//   .range([0, svgHeight])

// let x_axis = d3.axisBottom().scale(xScale)
// let y_axis = d3.axisLeft().scale(yScale)

// svg.append('g').attr('transform', 'translate(50, 10)').call(y_axis)

// let xAxisTranslate = svgHeight - 20

// svg
//   .append('g')
//   .attr('transform', `translate(50, ${xAxisTranslate})`)
//   .call(x_axis)

// CREATING SVG ELEMENTS
// let svgWidth = 600,
//   svgHeight = 500
// let svg = d3
//   .select('svg')
//   .attr('width', svgWidth)
//   .attr('height', svgHeight)
//   .attr('class', 'svg-container')

// let line = svg
//   .append('line')
//   .attr('x1', 100)
//   .attr('x2', 500)
//   .attr('y1', 50)
//   .attr('y2', 50)
//   .attr('stroke', 'orange')
//   .attr('stroke-width', '3')

// let rect = svg
//   .append('rect')
//   .attr('x', 100)
//   .attr('y', 100)
//   .attr('width', 200)
//   .attr('height', 100)
//   .attr('fill', '#F4009E')

// let circle = svg
//   .append('circle')
//   .attr('cx', 200)
//   .attr('cy', 300)
//   .attr('r', 80)
//   .attr('fill', '#7CE763')

// API to fetch historical data of Bitcoin Price Index
const api =
  'https://api.coindesk.com/v1/bpi/historical/close.json?start=2021-01-01&end=2021-03-16'

document.addEventListener('DOMContentLoaded', (e) => {
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      let parsedData = parseData(data)
      drawChart(parsedData)
    })
    .catch((err) => console.log(err))
})

const parseData = (data) => {
  let arr = []
  for (let i in data.bpi) {
    arr.push({
      date: new Date(i),
      value: +data.bpi[i],
    })
  }
  return arr
}

const drawChart = (data) => {
  let svgWidth = 600,
    svgHeight = 400
  let margin = { top: 20, right: 20, bottom: 30, left: 50 }
  let width = svgWidth - margin.left - margin.right
  let height = svgHeight - margin.top - margin.bottom

  let svg = d3.select('svg').attr('width', svgWidth).attr('height', svgHeight)

  let g = svg
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  let x = d3.scaleTime().rangeRound([0, width])

  let y = d3.scaleLinear().rangeRound([height, 0])

  let line = d3
    .line()
    .x((d) => x(d.date))
    .y((d) => y(d.value))
  x.domain(d3.extent(data, (d) => d.date))
  y.domain(d3.extent(data, (d) => d.value))

  g.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .select('.domain')
    .remove()

  g.append('g')
    .call(d3.axisLeft(y))
    .append('text')
    .attr('fill', '#000')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '0.71em')
    .attr('text-anchor', 'end')
    .text('Price ($)')

  g.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('stroke-width', 1.5)
    .attr('d', line)
}
