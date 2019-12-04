
var svg2= d3.select("#svg2")

 var MAX_BAR_HEIGHT = 150;

 BAR_WIDTH=20;
var textcenter=BAR_WIDTH/2;

 var yaxis_adjust=MAX_BAR_HEIGHT+215;
 var weekbar_start= 0;
 var max_bar_value=90;

 var bar_yScale = d3.scale.linear()
            .domain([0,max_bar_value])
            .range([MAX_BAR_HEIGHT, 0]);

 var bar_hScale = d3.scale.linear()
             .domain([0, max_bar_value])
             .range([0, MAX_BAR_HEIGHT]);

 var yAxis_age = d3.svg.axis()
           .scale(bar_yScale)
           .orient("left")
           .ticks(4);

   svg2.append("g")
        .attr("class", "age axis")
        .attr("transform", "translate(130,"+yaxis_adjust+")")
        .call(yAxis_age);
//Age X axis
 var age_xScale = d3.scale.ordinal()
                 .domain(["Monday", "Tuesday",
                          "Wednesday", "Thursday",
                          "Friday", "Saturday",
                          "Sunday", ""])
                 .rangePoints([0, 7*(BAR_WIDTH+5)]);

 var xAxis_age = d3.svg.axis()
               .scale(age_xScale)
               .orient("bottom")

 svg2.append("g")
     .attr("class", "x axis")
     .attr("transform", "translate(130,520)")
     .call(xAxis_age)
     .selectAll("text")
       .attr("x", 10)
       .style("text-anchor","start")
       .attr("transform","translate(0,40),rotate(-45)");

////////////////////////////////////////////////////////
///////////FUNCTION Age group bar

 function c_week_bars(id,group, x_value){
 svg2.select(id)
     .selectAll('rect')
     .data(ppl)
     .enter()
     .append("rect")
     .attr("stroke","black")
     .attr("fill", "gold")
     .attr('height',function(d){
           return bar_hScale(d3.sum(ppl, function(d) {
                             return d.day==group;
                         })
                       );
                     })
     .attr('width', function(d){return BAR_WIDTH;})
     .attr("x", x_value)
     .attr("y", function(d){
           return weekbar_start + bar_yScale(d3.sum(ppl, function(d) {
                               return d.day==group;
                           })
                         );
                     })
     .attr("class","w_bar")
     .on("click",function(data){
        if (!d3.select(this).classed("selected")) {
          d3.select(this).classed("selected", true)
          d3.select(this).transition().attr("fill","lightgray")

          //update map
          d3.selectAll("circle")
            .transition()
            .duration(5)
            .filter(function(d){return d.Day==group})
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
            .filter(function(d){return d.Day==group})
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
                     return d.day==group;
              })
            )
          .attr("text-anchor", "middle")
          .attr("x", (x_value+textcenter))
          .attr("y", function(d){
                        return (weekbar_start-5) + bar_yScale(d3.sum(ppl, function(d) {
                            return d.day==group;
                          })
                        );
                      })
          .attr("font-family", "sans-serif")
          .attr("font-size", "11px")
          .attr("fill", "blue");
   }

//////////////////Draw Age charts
function Weekday_Chart()
{
  start=100
  space=BAR_WIDTH+5
  c_week_bars("#MON","MONDAY",start);

  c_week_bars("#TUES","TUESDAY",start + space);

  c_week_bars("#WED","WEDNESDAY",start + 2*space);

  c_week_bars("#THURS","THURSDAY",start + 3*space);

  c_week_bars("#FRI","FRIDAY",start + 4*space,);

  c_week_bars("#SAT","SATURDAY",start + 5*space,);

  c_week_bars("#SUN","SUNDAY",start + 6*space,);
}
