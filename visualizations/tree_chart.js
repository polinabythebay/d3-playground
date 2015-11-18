var makeTree= function() {

  var height = 500;
  var width = 960;

  /* ------- SETUP -------*/
  var tree = d3.layout.tree()
                      .size([height-100, width-350]);

  var treeSVG = d3.select("body")
             .append("svg")
             .attr("width", width)
             .attr("height", height)
             .append("g")
             .attr("transform", "translate(50, 50)");

  d3.json("data/test.json", function (data) {

  var nodes = tree.nodes(data);
  var links = tree.links(nodes);
  var diagonal = d3.svg.diagonal()
                       .projection(function (d) {
                          return [d.y, d.x];
                        });

/* ------- TREE NODES -------*/

  //SETUP
  treeSVG.selectAll(".link")
        .data(links)
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("fill", "none")
        .attr("stroke", "#ADADAD")
        .attr("d", diagonal);

  var node = treeSVG.selectAll(".node")
                   .data(nodes)
                   .enter()
                   .append("g")
                   .attr("class", "node")
                   .attr("transform", function(d) {
                      return "translate(" + d.y + "," + d.x + ")";
                    });

  // DRAW circles
  node.append("circle")
      .attr("r", 5)
      .attr("fill", "#268bd2");


/* ------- TEXT LABELS -------*/

  node.append("text")
      .text(function (d) {
          return d.word;
      })
      // .attr("text-anchor", "start")
      .attr("font-family", "sans-serif")
      // .attr("font-size", "50px")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
  });
}


