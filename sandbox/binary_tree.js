// Tree configuration
var branches = [];
var seed = {'index': 0, 
            'x': 420, 
            'y': 600, 
            'angle': 0, 
            'length': 130, 
            'depth':0};
var leftAngleDelta = -0.5; 
var rightAngleDelta = 0.5; 
var lengthDelta = 0.8; 
var random = 0.7;
var maxDepth = 10;

// Return endpoint of branch
function endPoint(b) {
  var x = b.x + b.length * Math.sin( b.angle );
  var y = b.y - b.length * Math.cos( b.angle );
  return {'x': x, 'y': y};
}

function createBranch(branch, end, randomAngle, angleDelta) {
  return {
    'index' : branches.length,
    'x' : end.x,
    'y' : end.y,
    'angle' : branch.angle + angleDelta + randomAngle,
    'length' : branch.length * lengthDelta,
    'depth' : branch.depth + 1,
    'parent' : branch.index
  }
}

function createTree(branch) {
  var end = endPoint(branch)
  var randomAngle;
  var newBranch;

  branches.push(branch);

  if (branch.depth === maxDepth) {
    return;
  }

  // generate left sub tree
  randomAngle = random * Math.random() - random * 0.5;
  newBranch = createBranch(branch, end, randomAngle, leftAngleDelta); 
  createTree(newBranch);

  // generate right sub tree
  randomAngle = random * Math.random() - random * 0.5;
  newBranch = createBranch(branch, end, randomAngle, rightAngleDelta);
  createTree(newBranch);
}

function regenerate(initialise) {
  branches = [];
  createTree(seed);
  initialise ? create() : updateTree();
}

// D3
function x1(d) {return d.x;}
function y1(d) {return d.y;}
function x2(d) {return endPoint(d).x;}
function y2(d) {return endPoint(d).y;}
function highlightParents(d) {
  var colour = d3.event.type === 'mouseover' ? 'green' : '#777';
  var depth = d.depth;
  for(var i = 0; i <= depth; i++) {
    d3.select('#id-'+parseInt(d.index)).style('stroke', colour);
    d = branches[d.parent];
  } 
}

function create() {
  d3.select('svg')
    .selectAll('line')
    .data(branches)
    .enter()
    .append('line')
    .attr('x1', x1)
    .attr('y1', y1)
    .attr('x2', x2)
    .attr('y2', y2)
    .style('stroke-width', function(d) {return parseInt(maxDepth + 1 - d.depth) + 'px';})
    .attr('id', function(d) {return 'id-'+d.index;})
    .on('mouseover', highlightParents)
    .on('mouseout', highlightParents);
}

function updateTree() {
  d3.select('svg')
    .selectAll('line')
    .data(branches)
    .transition()
    .attr('x1', x1)
    .attr('y1', y1)
    .attr('x2', x2)
    .attr('y2', y2);
}

d3.selectAll('.regenerate')
  .on('click', regenerate);

regenerate(true);