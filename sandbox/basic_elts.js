var canvas = d3.select("body")
              .append("svg")
              .attr("width", 500)
              .attr("height", 500);

var circle = canvas.append("circle")
                   .attr('cx', 250)
                   .attr('cy', 250)
                   .attr('r', 50)
                   .attr("fill", "red");

var rect = canvas.append("rect")
                 .attr("width", 100)
                 .attr("height", 50);

var line = canvas.append("line")
                 .attr("x1", 0)
                 .attr("y1", 100)
                 .attr("x2", 400)
                 .attr("y2", 400)
                 .attr("stroke", "blue")
                 .attr("stroke-width", 10);


var dataset = [ 5, 10, 15, 20, 25 ];
  d3.select("body").selectAll("p")
    .data(dataset)
    .enter()
    .append("p")
    .text(function(d) { return d; })
    .style("color", function(d) {
        if (d > 15) {   //Threshold of 15
          return "red";
        } else {
          return "black";
        }
    });

//cool circles

var dataset = [ 5, 10, 15, 20, 25 ];

var w = 500;
var h = 100;

var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

var circles = svg.selectAll("circle")
                 .data(dataset)
                 .enter()
                 .append("circle");


//visualize the cirlces
circles.attr("cx", function(d, i) {
        return (i * 50) + 25;
        })
        .attr("cy", h/2)
        .attr("r", function(d) { return d;})
        .attr("fill", "yellow")
        .attr("stroke", "orange")
        .attr("stroke-width", function(d) { return d/2; });


