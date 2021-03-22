import { data } from '../data/nmPop2019.js'

d3.select('svg').selectAll('g').data(data).enter().append('g')
;(function () {
  let scale = 0.002
  d3.selectAll('g')
    .append('rect')
    .attr('width', (d) => d.population * scale)
    .attr('height', 50)
    .attr('fill', 'darkblue')
    .attr('transform', (d, i) => `translate(0, ${i * 55})`)
})()

d3.selectAll('g')
  .append('text')
  .text((d) => d.name)
  .attr('dy', '28')
  .attr('dx', '2')
  .attr('fill', 'white')
  .attr('transform', (d, i) => `translate(0, ${i * 55})`)

d3.selectAll('rect')

d3.selectAll('rect').transition().duration(2000).style('fill', 'orange')

const changeColorBack = () => {
  d3.selectAll('rect').transition().duration(2000).style('fill', 'darkblue')
}

setTimeout(changeColorBack, 2000)
