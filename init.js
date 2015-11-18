/* ------- Data -------*/
var populationData = dataSet.usPopulation.data;
var diversityData = dataSet.ethnicDiversityGoogle.data;
var unrulyPassengerData = dataSet.unrulyPassengers.data;
var bitcoinData = dataSet.bitcoinTransactions.data;

$(document).ready(function(){

    $(".barChart").click(function(event) {
      event.preventDefault();
       $("svg").remove();
       makeBarChart(unrulyPassengerData);
       // makeSimpleBarChart(unrulyPassengerData);
       $(".title").text("Unruly Passenger Data, 1995-2015");
    });

    $(".areaChart").click(function(event) {
      event.preventDefault();
       $("svg").remove();
       makeAreaChart(bitcoinData);
       $(".title").text("Bitcoin Transactions, 2009-2015");
    });

    $(".pieChart").click(function(event) {
      event.preventDefault();
      $("svg").remove();
      makePieChart(diversityData);
      $(".title").text("Major Religions of the World by Number of Followers");
    });

    $(".tree").click(function(event) {
      event.preventDefault();
      $("svg").remove();
      makeTree();
      $(".title").text("");
    });

     $(".growTree").click(function(event) {
      event.preventDefault();
      $("svg").remove();
      regenerate(true);
      $(".title").text("");
    });

    $(".regenerate").click(function(event) {
    event.preventDefault();
    regenerate();
    });
});
