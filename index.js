// SELECTION AND MANIPULATION

// DOM Selection Methods
// d3.select()
// d3.selectAll()

d3.select('h1')
  .style('color', 'orange')
  .attr('class', 'coolness')
  .text('changed text')

d3.select('body')
  .append('p')
  .text('This is the best paragraph... everybody knows this')
  .style('font-size', '2rem')
d3.select('body')
  .append('p')
  .text('This paragraph is okay')
  .style('font-size', '1.8rem')
d3.select('body')
  .append('p')
  .text('This paragraph likes to nay-say everything')
  .style('font-size', '1.6rem')

d3.selectAll('p').style('color', '#4891ff')
