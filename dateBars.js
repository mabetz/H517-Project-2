var svg2= d3.select("#svg2");
var format = d3.time.format("%m/%d/%Y");

    //last source used is:https://bl.ocks.org/d3noob/8952219
// set the dimensions of the canvas
var margin = {top: -70, right: 670, bottom: -120, left: 750},
    width = 2000 - margin.left - margin.right,
    height = 5 - margin.top - margin.bottom;

 //////////https://www.slashdb.com/2018/02/15/howto-d3js/  this is not used
// set the ranges
// parse the date / time

var x = d3.time.scale().range([0, width]);

var y = d3.scale.linear().range([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5);



var movebar_side=40
var movebar_down=40


var graph = d3.csv("output_filtered_2015_to_2018_v5_DeathBar.csv", function(data) {
  data.forEach(function(d) {
    d.dates = format.parse(d.Date);
    d.deaths = +d.Deaths;
  });

//update on filter//////////////////
//var	parseDate = d3.time.format("%Y-%m-%d").parse;
//function getDates() {
//	   return [document.getElementById('date1').value, 
//                document.getElementById('date2').value];    
//}  
//
//function render(filterByDates) {
//
//	d3.select('svg').remove();
//
//	if(filterByDates) {
//        var date1 = parseDate(document.getElementById('date1').value);
//		var date2 = parseDate(document.getElementById('date2').value);
//            graph = graph.filter(function(d) {
//						return d.dates >= date1 && d.dates <= date2;
//            });
//        } 
 //////////////////////////////////// 
    
    
//for tooltip
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Date: </strong> <span style='color:red'>" + d.Date +"</span>";
  })
//////////////// 



svg2.call(tip);

  // scale the range of the data
  //x.domain(data.map(function(d) { return d.date; }));
  x.domain(d3.extent(data, function(d) { return d.dates; }));
  y.domain([0, d3.max(data, function(d) { return d.deaths; })]);

  // add axis
  svg2.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate("+movebar_side+"," + (height+movebar_down)+ ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg2.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .attr("transform","translate("+movebar_side+","+movebar_down+")")
      .append("text")
      .attr("y", -16)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      //.text("Number of Deaths")
        .attr("transform", "rotate(-90)" )
        .attr("dx", "-5em")
        .attr("dy", "-5em");


  // Add bar chart
  svg2.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
    .attr("fill", "steelblue")
      .attr("x", function(d) { return x(d.dates); })
      .attr("width", "1px")
      .attr("y", function(d) { return y(d.deaths); })
      .attr("height", function(d) { return height - y(d.deaths); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
      .attr("transform","translate("+movebar_side+","+movebar_down+")");
    
     ///added for update on filter     
      //}
    //render(false);
});

                   


