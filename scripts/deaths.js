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
  console.log(vizData)

  const vizYear = 2016,
    vizCauseOfDeath = 'Number of executions (Amnesty International)'

  // filters vizData by year
  const filterDataByYear = (data, year) => {
    const results = []
    data.forEach((item) => {
      item.info.forEach((i) => {
        if (+i.Year === year) results.push(i)
      })
    })
    return results
  }

  svg
    .selectAll('g')
    .data(filterDataByYear(vizData, vizYear))
    .enter()
    .append('g')

  d3.selectAll('g')
    .append('text')
    .classed('elTexto', true)
    .attr('transform', (d, i) => `translate(10, ${i * 15 + 15})`)
    .text(
      (d) =>
        `In ${d.Year}, ${
          Number(d[vizCauseOfDeath])
            ? Math.floor(+d[vizCauseOfDeath])
            : d[vizCauseOfDeath] === ''
            ? '0'
            : d[vizCauseOfDeath]
        } people died by execution in ${d.Entity}`
    )
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
