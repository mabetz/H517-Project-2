function updating(){
  d3.selectAll("circle")
    .transition()
    .duration(10)
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
       .duration(100)
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


         //txt agegroup total
         svg2.select(id).selectAll("text")
            .data(ppl)
            .transition()
            .duration(100)
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

    //////////////////////////////////////////////////


     function infoage_update(id,agegroup){
     d3.select(id)
         .selectAll('rect')
         .data(ppl)
         .transition()
         .duration(100)
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

           //txt agegroup total
           svg2.select(id).selectAll("text")
              .data(ppl)
              .transition()
              .duration(100)
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

}
