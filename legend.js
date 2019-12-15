//LEGEND
var legend_element=[1,1]
legend=d3.select("#legend")

////////////////////
//Gender: male
legend.select("#i_deaths").selectAll("circle")
    .data(legend_element)
    .enter()
    .append("circle")
    .attr("cx", 110)
    .attr("cy", 25)
    .attr("r",4)
    .attr("stroke","black")
    .attr("fill","blue")
//Gender: female
  legend.select("#non_i_deaths").selectAll("circle")
      .data(legend_element)
      .enter()
      .append("circle")
      .attr("cx", 300)
      .attr("cy", 25)
      .attr("r",4)
      .attr("stroke","black")
      .attr("fill","red")
