// bar chart without svg

var shuffleData = function() {
  var result = [];
  for (var i = 0; i < 25; i++) {      
    var newNumber = Math.round(Math.random() * 30); 
    result = result.concat(newNumber);
  }
  return result;
}
     
function update() {

  dataset = shuffleData();

  d3.select("body").selectAll("div")
    .data(dataset)
    .enter()
    .append("div")
    .attr("class", "bar")
    .style("height", function(d) {
      var barHeight = d * 5;  //Scale up by factor of 5
      return barHeight + "px";
    });
}

// update();