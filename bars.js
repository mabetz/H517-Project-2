var svg2= d3.select("#svg2")

 var MAX_BAR_HEIGHT_AGE = 200;

 BAR_WIDTH=20;
var textcenter=BAR_WIDTH/2;

 var yaxis_adjust_age=MAX_BAR_HEIGHT_AGE-140;
 var agebar_start= 0;
 var max_bar_value_age=80

 var bar_age_yScale = d3.scale.linear()
            .domain([0,max_bar_value_age])
            .range([MAX_BAR_HEIGHT_AGE, 0]);

 var bar_age_hScale = d3.scale.linear()
             .domain([0, max_bar_value_age])
             .range([0, MAX_BAR_HEIGHT_AGE]);

 var yAxis_age = d3.svg.axis()
           .scale(bar_age_yScale)
           .orient("left")
           .ticks(4);

   svg2.append("g")
        .attr("class", "age axis")
        .attr("transform", "translate(130,"+yaxis_adjust_age+")")
        .call(yAxis_age);
//Age X axis
 var age_xScale = d3.scale.ordinal()
                 .domain(["<1", "1-4",
                          "5-14", "15-24",
                          "25-34", "35-44",
                          "45-54", "55-64",
                          "65-74", "75-84",
                          ">=85", ""])
                 .rangePoints([0, 11*(BAR_WIDTH+5)]);

 var xAxis_age = d3.svg.axis()
               .scale(age_xScale)
               .orient("bottom")

 svg2.append("g")
     .attr("class", "x axis")
     .attr("transform", "translate(130,265)")
     .call(xAxis_age)
     .selectAll("text")
       .attr("x", 10)
       .style("text-anchor","start");


////////////////////////////////////////////////////////
///////////FUNCTION Age group bar

 function infoage(id,agegroup, x_value){
 svg2.select(id)
     .selectAll('rect')
     .data(ppl)
     .enter()
     .append("rect")
     .attr("stroke","black")
     .attr("fill", "gold")
     .attr('height',function(d){
           return bar_age_hScale(d3.sum(ppl, function(d) {
                             return d.age==agegroup;
                         })
                       );
                     })
     .attr('width', function(d){return BAR_WIDTH;})
     .attr("x", x_value)
     .attr("y", function(d){
           return agebar_start + bar_age_yScale(d3.sum(ppl, function(d) {
                               return d.age==agegroup;
                           })
                         );
                     })
     .on("click",function(data){
        if (!d3.select(this).classed("selected")) {
          d3.select(this).classed("selected", true)
          d3.select(this).transition().attr("fill","lightgray")

          //update map
          d3.selectAll("circle")
            .transition()
            .duration(5)
            .filter(function(d){return d.Age==agegroup})
              //.style("fill", "lightblue")
              .attr("r",0);

        }
        else{
          d3.select(this).classed("selected", false);
          d3.select(this).transition().attr("fill","gold");

          //update map
          d3.selectAll("circle")
            .transition()
            .duration(5)
            .filter(function(d){return d.Age==agegroup})
              //.style("fill", "red")
              .attr("r",3)
              }
          })

       //txt agegroup total
       svg2.select(id).selectAll("text")
          .data(ppl)
          .enter()
          .append("text")
          .text(
                 d3.sum(ppl, function(d) {
                     return d.age==agegroup;

              })
            )
          .attr("text-anchor", "middle")
          .attr("x", (x_value+textcenter))
          .attr("y", function(d){
                        return (agebar_start-5) + bar_age_yScale(d3.sum(ppl, function(d) {
                            return d.age==agegroup;
                          })
                        );
                      })
          .attr("font-family", "sans-serif")
          .attr("font-size", "11px")
          .attr("fill", "blue");


   }

//////////////////Draw Age charts
function AgeChart()
{
  start=100
  space=BAR_WIDTH+5
  infoage("#agechart0","<1Year",start);

  infoage("#agechart1","1-4Years",start + space);

  infoage("#agechart2","5-14Years",start + 2*space);

  infoage("#agechart3","15-24Years",start + 3*space);

  infoage("#agechart4","25-34Years",start + 4*space,);

  infoage("#agechart5","35-44Years",start + 5*space,);

  infoage("#agechart6","45-54Years",start + 6*space,);

  infoage("#agechart7","55-64Years",start + 7*space,);

  infoage("#agechart8","65-74Years",start + 8*space,);

  infoage("#agechart9","75-84Years",start + 9*space,);

  infoage("#agechart10",">=85Years",start + 10*space);
}
