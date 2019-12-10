function updating(data){
  //output max value of weekday barcharts
  max_week_value=d3.max([
                      d3.sum(myData, function(d){
                        return d.day=="MONDAY";}),
                      d3.sum(myData, function(d){
                        return d.day=="TUESDAY";}),
                      d3.sum(myData, function(d){
                        return d.day=="WEDNESDAY";}),
                      d3.sum(myData, function(d){
                        return d.day=="THURSDAY";}),
                      d3.sum(myData, function(d){
                        return d.day=="FRIDAY";}),
                      d3.sum(myData, function(d){
                        return d.day=="SATURDAY";}),
                      d3.sum(myData, function(d){
                        return d.day=="SUNDAY";})])

  //weekday bar scale update
  bar_yScale.domain([0,5+max_week_value]);

  bar_hScale.domain([0, 5+max_week_value]);

  //age bar scale update
  bar_age_yScale.domain([0,5+max_week_value]);

  bar_age_hScale.domain([0, 5+max_week_value]);

  d3.selectAll("circle")
    .transition()
    .duration(500)
    .attr("r",3)
    .filter(function(d){
        return parseDate(date1.value) > parseDateCSV(d.Date) || parseDateCSV(d.Date) > parseDate(date2.value);
    })
      .attr("r",0);

  ////////////////////////////////////////////////////////
  ///////////FUNCTION Update Weekday Chart //////////////

   function c_week_bars_update(id,group){
   d3.select(id)
       .selectAll('rect')
       .data(ppl)
       .transition()
       .duration(500)
       .attr("stroke","black")
       .attr("fill", "gold")
       .attr('height',function(d){
             return bar_hScale(d3.sum(myData, function(d) {
                               return d.day==group;
                           })
                         );
                       })
       .attr("y", function(d){
             return weekbar_start + bar_yScale(d3.sum(myData, function(d) {
                                 return d.day==group;
                             })
                           );
                       })
       // .on("click",function(data){
       //    if (!d3.select(this).classed("selected")) {
       //      d3.select(this).classed("selected", true)
       //      d3.select(this).transition().attr("fill","lightgray")
       //
       //      //update map
       //      d3.selectAll("circle")
       //        .transition()
       //        .duration(10)
       //        .filter(function(d){return d.Day==group})
       //          //.style("fill", "lightblue")
       //          .attr("r",0);
       //
       //    }
       //    else{
       //      d3.select(this).classed("selected", false);
       //      d3.select(this).transition().attr("fill","gold");
       //
       //      //update map
       //      d3.selectAll("circle")
       //        .transition()
       //        .duration(10)
       //        .filter(function(d){return d.Day==group})
       //          //.style("fill", "red")
       //          .attr("r",3)
       //          }
       //      })


         //txt agegroup total
         svg2.select(id).selectAll("text")
            .data(ppl)
            .transition()
            .duration(500)
            .text(
                   d3.sum(myData, function(d) {
                       return d.day==group;
                })
              )
            .attr("y", function(d){
                          return (weekbar_start-5) + bar_yScale(d3.sum(myData, function(d) {
                              return d.day==group;
                            })
                          );
                        });

     }

    c_week_bars_update("#MON","MONDAY");

    c_week_bars_update("#TUES","TUESDAY");

    c_week_bars_update("#WED","WEDNESDAY");

    c_week_bars_update("#THURS","THURSDAY");

    c_week_bars_update("#FRI","FRIDAY");

    c_week_bars_update("#SAT","SATURDAY");

    c_week_bars_update("#SUN","SUNDAY");

    //Update Y axis

    //////////////////////////////////////////////////


     function infoage_update(id,agegroup){
     d3.select(id)
         .selectAll('rect')
         .data(ppl)
         .transition()
         .duration(500)
         .attr("stroke","black")
         .attr("fill", "gold")
         .attr('height',function(d){
               return bar_age_hScale(d3.sum(myData, function(d) {
                                 return d.age==agegroup;
                             })
                           );
                         })
         .attr("y", function(d){
               return agebar_start + bar_age_yScale(d3.sum(myData, function(d) {
                                   return d.age==agegroup;
                               })
                             );
                         })
         // .on("click",function(data){
         //    if (!d3.select(this).classed("selected")) {
         //      d3.select(this).classed("selected", true)
         //      d3.select(this).transition().attr("fill","lightgray")
         //
         //      //update map
         //      d3.selectAll("circle")
         //        .transition()
         //        .duration(5)
         //        .filter(function(d){return d.Age==agegroup})
         //          //.style("fill", "lightblue")
         //          .attr("r",0);
         //
         //    }
         //    else{
         //      d3.select(this).classed("selected", false);
         //      d3.select(this).transition().attr("fill","gold");
         //
         //      //update map
         //      d3.selectAll("circle")
         //        .transition()
         //        .duration(5)
         //        .filter(function(d){return d.Age==agegroup})
         //          //.style("fill", "red")
         //          .attr("r",3)
         //          }
         //      })

           //txt agegroup total
           svg2.select(id).selectAll("text")
              .data(ppl)
              .transition()
              .duration(500)
              .text(
                     d3.sum(myData, function(d) {
                         return d.age==agegroup;

                  })
                )
              .attr("y", function(d){
                            return (agebar_start-5) + bar_age_yScale(d3.sum(myData, function(d) {
                                return d.age==agegroup;
                              })
                            );
                          })

       }

    //////////////////Draw Age charts

      infoage_update("#agechart0","<1Year");

      infoage_update("#agechart1","1-4Years");

      infoage_update("#agechart2","5-14Years");

      infoage_update("#agechart3","15-24Years");

      infoage_update("#agechart4","25-34Years");

      infoage_update("#agechart5","35-44Years");

      infoage_update("#agechart6","45-54Years");

      infoage_update("#agechart7","55-64Years");

      infoage_update("#agechart8","65-74Years");

      infoage_update("#agechart9","75-84Years");

      infoage_update("#agechart10",">=85Years");


//y axis Update

      svg2.select(".week.axis")
          .transition()
          .duration(1000)
          .call(yAxis_week);

      svg2.select(".age.axis")
          .transition()
          .duration(1000)
          .call(yAxis_age);

}
