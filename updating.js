function link_ppl(link){

  ppl2=ppl.filter(function(d){return d[4]==link[1]})

  ppl2_not=ppl.filter(function(d){return d[4]!=link[1]})
//max gender value between m and f
  max_gen_value=d3.max([d3.sum(ppl2, function(d) {
                      return d[3]=="1";
                    }),d3.sum(ppl2, function(d) {
                                            return d[3]=="0";
                                          })])

  //gender bar scale
  gen_yScale.domain([0,2+max_gen_value]);

  gen_hScale.domain([0, 2+max_gen_value]);

  d3.select("#barchart").selectAll("rect")
    .transition()
    .duration(500)
    .attr("fill","black")

  d3.select(this)
    .transition()
    .duration(500)
    .attr("fill", "orange");

  d3.select('#ppl').selectAll("circle")
    .transition()
    .duration(1000)
    .attr("r", 3)
    .attr("stroke","black")
    .attr("stroke-width","0.5px")
    .attr("opacity",1)
    .filter(function(data){return data[4]!=link[1]})
      .attr("r", 0.5)
      .attr("stroke","gray")
      .attr("stroke-width","2px")
      .attr("opacity", .2);

  d3.select('#genderchart').selectAll("rect")
    .data(ppl)
    .transition()
    .duration(1000)
      .attr('height',function(d){
                      return gen_hScale(d3.sum(ppl2, function(d) {
                          return d[3]=="1";
                        })
                      );
                    })
      .attr("y", function(d){
                      return genbar_start + gen_yScale(d3.sum(ppl2, function(d) {
                        return d[3]=="1";
                        })
                      );
                  })

  //UPDATE txt female total
                  var gender_f_sum=d3.sum(ppl2, function(d) {
                      return d[3]=="1"})

                if (gender_f_sum>0){
                  svg2.select("#gentxt_f").selectAll("text")
                     .data(ppl)
                     .transition()
                     .duration(1000)
                     .text(gender_f_sum)
                     .attr("text-anchor", "middle")
                     .attr("x", 35)
                     .attr("y", function(d){
                                   return (genbar_start-5) + gen_yScale(d3.sum(ppl2, function(d) {
                                       return d[3]=="1";
                                     })
                                   );
                                 })
                     .attr("font-family", "sans-serif")
                     .attr("font-size", "11px")
                     .attr("fill", "blue");
                   } else {
                     svg2.select("#gentxt_f").selectAll("text")
                        .data(ppl)
                        .transition()
                        .duration(1000)
                        .text('')
                        .attr("text-anchor", "middle")
                        .attr("x", 35)
                        .attr("y", function(d){
                                      return (genbar_start-5) + gen_yScale(d3.sum(ppl2, function(d) {
                                          return d[3]=="1";
                                        })
                                      );
                                    })
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "11px")
                        .attr("fill", "blue");
                   }

  d3.select('#genderchart2').selectAll("rect")
      .data(ppl)
      .transition()
      .duration(1000)
      .attr('height',function(d){
                      return gen_hScale(d3.sum(ppl2, function(d) {
                          return d[3]=="0";
                        })
                      );
                    })
      .attr("y", function(d){
                      return genbar_start + gen_yScale(d3.sum(ppl2, function(d) {
                        return d[3]=="0";
                        })
                      );
                  });

                  //UPDATE txt male total
                  var gender_m_sum=d3.sum(ppl2, function(d) {
                      return d[3]=="0"})

                if (gender_m_sum>0){
                  svg2.select("#gentxt_m").selectAll("text")
                     .data(ppl)
                     .transition()
                     .duration(1000)
                     .text(
                            d3.sum(ppl2, function(d) {
                                return d[3]=="0";

                         })
                       )
                     .attr("text-anchor", "middle")
                     .attr("x", 100)
                     .attr("y", function(d){
                                   return (genbar_start-5) + gen_yScale(d3.sum(ppl2, function(d) {
                                       return d[3]=="0";
                                     })
                                   );
                                 })
                     .attr("font-family", "sans-serif")
                     .attr("font-size", "11px")
                     .attr("fill", "blue");
                   } else {
                     svg2.select("#gentxt_m").selectAll("text")
                        .data(ppl)
                        .transition()
                        .duration(1000)
                        .text('')
                        .attr("text-anchor", "middle")
                        .attr("x", 100)
                        .attr("y", function(d){
                                      return (genbar_start-5) + gen_yScale(d3.sum(ppl2, function(d) {
                                          return d[3]=="0";
                                        })
                                      );
                                    })
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "11px")
                        .attr("fill", "blue");
                   }


    infoage_update("#agechart0","0",ppl2);


    infoage_update("#agechart1","1",ppl2);


    infoage_update("#agechart2","2",ppl2);


    infoage_update("#agechart3","3",ppl2);


    infoage_update("#agechart4","4",ppl2);


    infoage_update("#agechart5","5",ppl2);


                  //Update Y axis
                  svg2.select(".y.axis")
                      .transition()
                      .duration(1000)
                    .call(yAxis_gen);

                    svg2.select(".age.axis")
                        .transition()
                        .duration(1000)
                      .call(yAxis_age);

                      //x y position
                      var xPosition_bar = 1100;//parseFloat(d3.select(this).attr("x"))+500;
                      var yPosition_bar = 300;//parseFloat(d3.select(this).attr("y"))-10;

                      //Update the tooltip position and value
                      d3.select("#tooltip")
                        .style("left", xPosition_bar + "px")
                        .style("top", yPosition_bar + "px")
                        .select("#value")
                        .text(link[2] + ": " + link[0] + " Death(s)"
                          );

                      //Show the tooltip
                      d3.select("#tooltip").classed("hidden", false);

        ///////////Gender bar link

        function gender_minimize(id,gender){
                      svg2.select(id)
                      .on("click",function(data){

                              d3.select('#ppl').selectAll("circle")
                                .transition()
                                .duration(0)
                                .filter(function(d){return d[3]!=gender & d[4]==link[1]})
                                .attr("r",0.5)
                                .attr("stroke","gray")
                                .attr("stroke-width","2px")
                                .attr("opacity", .2)
                                })
                      .on("mouseout",function(data){

                              d3.select('#ppl').selectAll("circle")
                                .transition()
                                .duration(0)
                                .filter(function(d){return d[3]!=gender & d[4]==link[1]})
                                .attr("r",3)
                                .attr("stroke","black")
                                .attr("stroke-width","0.5px")
                                .attr("opacity",1)
                            })
                      }
            gender_minimize("#genderchart",1);
            gender_minimize("#genderchart2",0);

//
function infoage_minimize(id,agegroup, x_value, barcolor){
            svg2.select(id)
                .selectAll('rect')

                .on("click",function(data){

                          d3.select(this)
                            .transition()
                            .duration(10)
                            .attr("stroke","orange")
                            .attr("stroke-width",5);;

                          d3.select('#ppl').selectAll("circle")
                            .transition()
                            .duration(0)
                            .filter(function(d){return d[2]!=agegroup & d[4]==link[1]})
                              .attr("r",0.5)
                              .attr("stroke","gray")
                              .attr("stroke-width","2px")
                              .attr("opacity", .2)
                            })

                .on("mouseout",function(){

                      d3.select(this)
                            .transition()
                            .duration(10)
                            .attr("stroke","black")
                            .attr("stroke-width",1);;

                      d3.select('#ppl').selectAll("circle")
                        .transition()
                        .duration(0)
                        .filter(function(d){return d[2]!=agegroup & d[4]==link[1]})
                          .attr("r",3)
                          .attr("stroke","black")
                          .attr("stroke-width","0.5px")
                          .attr("opacity",1)
                  })
                }
                infoage_minimize("#agechart0","0",330, color_group1);


              infoage_minimize("#agechart1","1",385, color_group2);


              infoage_minimize("#agechart2","2",440, color_group3);


                infoage_minimize("#agechart3","3",495, color_group4);


                infoage_minimize("#agechart4","4",550, color_group5);

                infoage_minimize("#agechart5","5",605, color_group6);




}// end of link
