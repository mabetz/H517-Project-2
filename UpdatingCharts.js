////////////////////////////////////////////////////////
///////////FUNCTION Update Weekday Chart //////////////

function c_week_bars_update(id,group,agegroup){
weekbar_sum=d3.sum(myData, function(d) {
                  return d.day==group && d.age != agegroup;})

d3.select(id)
   .selectAll('rect')
   .transition()
   .duration(500)
   .attr("stroke","black")
   .attr("fill", "gold")
   .attr('height',function(d){
         return bar_hScale(d3.sum(myData, function(d) {
                           return d.day==group && d.age != agegroup;
                       })
                     );
                   })
   .attr("y", function(d){
         return weekbar_start + bar_yScale(d3.sum(myData, function(d) {
                             return d.day==group && d.age != agegroup;
                         })
                       );
                   });


     //txt agegroup total
     svg2.select(id).selectAll("text")
        .transition()
        .duration(500)
        .text(
               d3.sum(myData, function(d) {
                   return d.day==group && d.age != agegroup;
            })
          )
        .attr("y", function(d){
                      return (weekbar_start-5) + bar_yScale(d3.sum(myData, function(d) {
                          return d.day==group && d.age != agegroup;
                        })
                      );
                    })
        .attr("fill","blue")


 }

function infoage_update(id,agegroup, group){
  barsum=d3.sum(myData, function(d) {
                    return d.age==agegroup && d.day != group;
                })

    d3.select(id)
       .selectAll('rect')
       .transition()
       .duration(500)
       .attr("stroke","black")
       .attr("fill", "gold")
       .attr('height',function(d){
             return bar_age_hScale(d3.sum(myData, function(d) {
                               return d.age==agegroup && d.day != group;
                           })
                         );
                     })

       .attr("y", function(d){
             return agebar_start + bar_age_yScale(d3.sum(myData, function(d) {
                                 return d.age==agegroup && d.day != group;
                             })
                           );
                     })

     //txt agegroup total
     svg2.select(id).selectAll("text")
        .transition()
        .duration(500)
        .text(
               d3.sum(myData, function(d) {
                   return d.age==agegroup && d.day != group;

            })
          )
        .attr("y", function(d){
                      return (agebar_start-5) + bar_age_yScale(d3.sum(myData, function(d) {
                          return d.age==agegroup && d.day != group;
                        })
                      );
                    })
        .attr("fill","blue")

 }

function updating(){
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
    .attr("r",circle_r)
    .filter(function(d){
        var time1 =parseTime(document.getElementById('time1').value);
        var time2 =parseTime(document.getElementById('time2').value);
        var time_c=parseTimeCSV(d.Time) //

        if (time1>time2){
          return (parseDate(date1.value) > parseDateCSV(d.Date) || parseDateCSV(d.Date) > parseDate(date2.value)) ||
                 ((time_c.getHours()*100 +(time_c.getMinutes())) < (time1.getHours()*100 +(time1.getMinutes() )) &&
                 (time_c.getHours()*100 +(time_c.getMinutes())) > (time2.getHours()*100 +(time2.getMinutes())));

        }
        else{
          return (parseDate(date1.value) > parseDateCSV(d.Date) || parseDateCSV(d.Date) > parseDate(date2.value)) ||
               ((time_c.getHours()*100 +(time_c.getMinutes())) < (time1.getHours()*100 +(time1.getMinutes() )) || (time_c.getHours()*100 +(time_c.getMinutes())) > (time2.getHours()*100 +(time2.getMinutes())));
        }

      })
      .attr("r",0);


  c_week_bars_update("#MON","MONDAY");

  c_week_bars_update("#TUES","TUESDAY");

  c_week_bars_update("#WED","WEDNESDAY");

  c_week_bars_update("#THURS","THURSDAY");

  c_week_bars_update("#FRI","FRIDAY");

  c_week_bars_update("#SAT","SATURDAY");

  c_week_bars_update("#SUN","SUNDAY");

  //////////////////////////////////////////////////




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
