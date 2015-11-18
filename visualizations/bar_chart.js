//PART 1: BAR CHART
var makeBarChart = function(data) {

  // console.log("length before",data.length);

  //data sorted from earliest year to latest year
  var dataset = _.sortBy(data, function(item) {
                return parseInt(moment(item[0]).format('YYYY'));
                });
  //need a way to scale the population down for size
  //find min and max of usPopulation data
  var max = _.max(dataset, function(item) {return item[1];});
  var min = _.min(dataset, function(item) {return item[1];});

  var yScale = d3.scale.linear()
                 .domain([min[1], max[1]])
                 .range([30, 300]);

  //SVG settings
  var w = 960;
  var h = 500;
  var barPadding = 1;

  //base SVG
  var svg = d3.select("body")
              .append("svg")
              .attr("width", w)
              .attr("height", h)

  //HOVER
  var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {
                return d[1] + " unruly passengers";
                // return "<strong>Frequency:</strong> <span style='color:red'>" + "Hello" + "</span>";
              });

  svg.call(tip);
  //Add bar chart rectangles to svg

  // console.log("width", w/dataset.length);

  svg.selectAll("rect")
     .data(dataset)
     .enter()
     .append("rect")
     //Need these two attributes prior to animating
     .attr("x", function(d, i) {
      return i * (w/dataset.length)
     })
     .attr("y", function (d, i) {
        return h- yScale(d[1])*1.25;
      })
     .attr("width", w/dataset.length)
     .attr("height", 0)
     //ANIMATION
     .transition()
     .duration(400)
     .delay(function (d, i) {
        return i * 50;
      })
     .attr("x", function(d, i) {
      return i * (w/dataset.length)
     })
     .attr("y", function (d, i) {
        return h- yScale(d[1]*1.25);
      })
     .attr("height", function(d, i) {
      return yScale(d[1])*1.25;
      })
     .attr("width", w/dataset.length)
     .attr("fill", "#6b486b");

  //Add text elements to bar rectangles
  svg.selectAll("text")
     .data(dataset)
     .enter()
     .append("text")
     .text(function (d) {
        return moment(d[0]).format('YYYY');
     })
     .attr("text-anchor", "middle")
     .attr("x", function(d, i) {
      return i * (w / dataset.length) + (w / dataset.length) / 2;
     })
     .attr("y", function(d) {
      return h - (yScale(d[1])*1.25)+ 10;
     })
     .attr("font-family", "sans-serif")
     .attr("font-size", "11px")
     .attr("fill", "white")
     .on('mouseover', tip.show)
     .on('mouseout', tip.hide)
}