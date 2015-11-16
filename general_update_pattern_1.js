var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
var width = 960;
var height = 500;

//set up HTML elements
var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(32," + (height/2) + ")");

function update(data) {
  //DATA JOIN
  //JOIN NEW DATA with old elements, if needed
  var text = svg.selectAll("text")
  //ADD A KEY TO THE DATA JOIN
                .data(data, function(d) { return d; });

  //UPDATE OLD ELEMENTS as needed
  text.attr("class", "update")
    //TRANSITION OCCURS in the update 
      .transition()
      .duration(750)
      .attr("x", function(d,i) { return i * 32; });

  //ENTER
  //CREATE NEW ELEMENTS as needed
  text.enter()
      .append("text")
      .attr("class", "enter")
      //PUT THIS IN ENTER & UPDATE
      // .attr("x", function(d, i) {return i * 32; })
      .attr("dy", ".35em")
      //TRANSITIONS are ticket, need to add a lot more
      //code than I thought
      .attr("y", -60)
      .attr("x", function(d, i) { return i * 32; })
      .style("fill-opacity", 1e-6)
      .text(function(d) { return d; })
      .transition()
      .duration(750)
      .attr("y", 0)
      .style("fill-opacity", 1);

  //ENTER AND UPDATE
  //operations on the UPDATE selection after appending the 
  //ENTER selection will apply to both selections

  //this gets changed
  //THIS SECTION ALREADY HAPPENED
  //text.attr("x", function(d, i) { return i * 32; });
      // .transition();

  //EXIT
  //remove old elements as needed

  text.exit()
      .attr("class", "exit")
      .transition()
      .duration(750)
      .attr("y", 60)
      .style("fill-opacity", 1e-6)
      .remove();
}

//initial display
//update(alphabet);

//set interval
// setInterval(function() {
//   update(d3.shuffle(alphabet)
//            .slice(0, Math.floor(Math.random() * 26))
//            .sort());
// }, 1500);
      

