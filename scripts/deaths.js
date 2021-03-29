const svg = d3.select('#container').attr('transform', 'translate(10, 10)')

d3.csv('../data/deaths.csv').then((data) => {
  const newData = Array.from(
    d3.group(data, (d) => d.Entity),
    ([country, info]) => ({
      country,
      info,
    })
  )
  dataViz(newData)
})

const dataViz = (vizData) => {
  // console.log(vizData)

  const vizYear = 2016,
    vizCauseOfDeath = 'Cardiovascular diseases'

  d3.select('body')
    .insert('div', ':first-child')
    .classed('title', true)
    .html(`World Deaths - ${vizYear} - ${vizCauseOfDeath}`)

  // filters vizData by year
  const filterDataByYear = (data, year) => {
    let results = []
    data.forEach((item) => {
      item.info.forEach((i) => {
        if (
          +i.Year === year &&
          i.Entity !== 'Andean Latin America' &&
          i.Entity !== 'Central African Republic' &&
          i.Entity !== 'Central America & Caribbean' &&
          i.Entity !== 'Central Asia' &&
          i.Entity !== 'Central Europe' &&
          i.Entity !== 'Central Europe, Eastern Europe, and Central Asia' &&
          i.Entity !== 'Central Latin America' &&
          i.Entity !== 'Central Sub-Saharan Africa' &&
          i.Entity !== 'East Asia' &&
          i.Entity !== 'Eastern Europe' &&
          i.Entity !== 'Eastern Sub-Saharan Africa' &&
          i.Entity !== 'High SDI' &&
          i.Entity !== 'High-income' &&
          i.Entity !== 'High-income Asia Pacific' &&
          i.Entity !== 'High-middle SDI' &&
          i.Entity !== 'Latin America and Caribbean' &&
          i.Entity !== 'Low SDI' &&
          i.Entity !== 'Low-middle SDI' &&
          i.Entity !== 'Middle East & North Africa' &&
          i.Entity !== 'Middle SDI' &&
          i.Entity !== 'North Africa and Middle East' &&
          i.Entity !== 'North America' &&
          i.Entity !== 'South America' &&
          i.Entity !== 'South Asia' &&
          i.Entity !== 'Southeast Asia' &&
          i.Entity !== 'Southeast Asia, East Asia, and Oceania' &&
          i.Entity !== 'Southern Latin America' &&
          i.Entity !== 'Southern Sub-Saharan Africa' &&
          i.Entity !== 'Sub-Saharan Africa' &&
          i.Entity !== 'Tropical Latin America' &&
          i.Entity !== 'Western Europe' &&
          i.Entity !== 'Western Sub-Saharan Africa' &&
          i.Entity !== 'World' &&
          i.Entity !== 'World (excluding China)'
        )
          results.push(i)
      })
    })
    return results
  }

  const newData = filterDataByYear(vizData, vizYear)
  console.log(newData)

  const svgGroups = svg.selectAll('g').data(newData).enter().append('g')

  const maxX = d3.max(newData, (d) => +d[vizCauseOfDeath])
  // console.log(maxX)
  const scaleX = d3.scaleLinear().domain([0, maxX]).range([0, 990])

  svgGroups
    .append('rect')
    .each((d) => console.log(d[vizCauseOfDeath]))
    .attr('transform', (d, i) => `translate(10, ${i * 10 + 10})`)
    .attr('height', 10)
    .attr('width', (d) => scaleX(d[vizCauseOfDeath]))
    .attr('fill', 'black')

  svgGroups
    .append('text')
    .attr('transform', (d, i) => `translate(15, ${i * 10 + 18})`)
    // .attr('alignment-baseline', 'middle')
    .attr('font-size', 10)
    .attr('fill', 'gray')
    .each((d) => console.log(d))
    .text((d) => d.Entity)
  // .append('text')
  // .attr('transform', (d, i) => `translate(10, ${i * 15 + 15})`)
  // .text(
  //   (d) =>
  //     `In ${d.Year}, ${
  //       Number(d[vizCauseOfDeath])
  //         ? Math.floor(+d[vizCauseOfDeath])
  //         : d[vizCauseOfDeath] === ''
  //         ? '0'
  //         : d[vizCauseOfDeath]
  //     } people died by execution in ${d.Entity}`
  // )
}

/*

DATA

Age: All Ages (Number): ""
Alcohol use disorders: ""
Alzheimer disease and other dementias: "4810.833683712643"
Cardiovascular diseases: "144.5037469282267"
Chronic kidney disease: "10366.124291797547"
Chronic respiratory diseases: "8216.00097494153"
Cirrhosis and other chronic liver diseases: ""
Code: "AFG"
Conflict and terrorism: ""
Deaths: ""
Diabetes mellitus: ""
Diarrheal diseases: ""
Digestive diseases: ""
Drowning: ""
Drug use disorders: ""
Entity: "Afghanistan"
Environmental heat and cold exposure: ""
Exposure to forces of nature: ""
Fire, heat, and hot substances: ""
HIV/AIDS: ""
Hepatitis: ""
Interpersonal violence: ""
Intestinal infectious diseases: "1930.0471197273198"
Lower respiratory infections: "53532.68049507392"
Malaria: ""
Maternal disorders: ""
Meningitis: "29066.442137435646"
Neonatal disorders: ""
Neoplasms: ""
Number of executions (Amnesty International): "15"
Nutritional deficiencies: ""
Parkinson disease: ""
Poisonings: ""
Protein-energy malnutrition: "400.81106488371825"
Road injuries: ""
Self-harm: ""
Sex: Both: ""
Terrorism (deaths): "2494.128056651257"
Tuberculosis: ""
Year: "2007"

*/
