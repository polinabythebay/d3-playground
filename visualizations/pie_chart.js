var makePieChart = function(data) {

/* ------- SETUP -------*/

  var yellow = '#b58900';
  var orange = '#cb4b16';
  var red = '#dc322f';
  var magenta = '#d33682';
  var violet = '#6c71c4';
  var blue = '#268bd2';
  var cyan = '#2aa198';
  var green = '859900';

  var width = 960;
  var height = 500;
  var radius = Math.min(width, height)/2.5;
  // var color = d3.scale.category10();
  var color = d3.scale.ordinal()
    .range([orange, red, magenta, violet, blue, cyan, green, yellow]);
    // .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#6b486b"]);

  //BASE SVG
  var svg = d3.select("body")
              .append("svg")
              .attr("width", width)
              .attr("height", height)
              .append("g")
              .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

  //BASE PIE
  var pie = d3.layout.pie()
              .sort(null)
              .value(function (d) {
                return d[1];
              });

  //BASE ARC
  var arc = d3.svg.arc()
              .outerRadius(radius)
              .innerRadius(radius*0.5);


/* ------- PIE SLICES -------*/

  //SETUP
  var arcs = svg.selectAll("g.arc")
                .data(pie(data))
                .enter()
                .append("g")
                .attr("class", "arc")
                //CSS: show tooltip
                .on("mouseover", function(d) {
                  d3.select("#tooltip")
                    .style("left", d3.event.pageX + "px")
                    .style("top", d3.event.pageY + "px")
                    .style("opacity", 1)
                    .select("#value")
                    .text(d.data[0]);})
                //CSS: hide tooltip
                .on("mouseout", function() {
                  d3.select("#tooltip")
                    .style("opacity",0)});
   
  //DRAW
  arcs.append("path")
      .attr("d", arc)
      .style("fill", function(d, i) {
        return color(i);
      });

/* ------- TEXT LABELS -------*/

  arcs.append("text")
      .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";
      })
      .attr("text-anchor", "middle")
      .text(function(d) {
        return d.data[1] + "%";
      });

}
