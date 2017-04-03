var config = {
    apiKey: "AIzaSyBBQeoNXfm5oykLqU0AndMbOBEHjIVb_9M",
    authDomain: "new-project-43208.firebaseapp.com",
    databaseURL: "https://new-project-43208.firebaseio.com",
    storageBucket: "new-project-43208.appspot.com",
    messagingSenderId: "527096113666"
};

firebase.initializeApp(config);
  
var database = firebase.database();


$("#add-train").click(function() {
  var trainName = $("#name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  var firstTrainTime = $("#first-train-input").val()

  var firstTrainTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
  console.log(firstTrainTimeConverted);

  var currentTime = moment()
  console.log(currentTime);
  var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
  var timeRemainder = diffTime % frequency;
  var minutesTillNextTrain = frequency - timeRemainder;
  var nextTrain = moment().add(minutesTillNextTrain, "minutes");
  var nextTrainFormatted = moment(nextTrain).format("hh:mm");

  event.preventDefault();

  database.ref().push({
    dataTrainName: trainName,
    dataDestination: destination,
    dataFrequency: frequency, 
    dataNextTrain: nextTrainFormatted,
    dataMinutesTillNextTrain: minutesTillNextTrain

  });

});

database.ref().on("child_added", function(childSnapshot) {
  var trainName2 = childSnapshot.val().dataTrainName;
  var destination2 = childSnapshot.val().dataDestination;
  // var firstTrain2 = childSnapshot.val().dataFirstTrain;
  var frequency2 = childSnapshot.val().dataFrequency;
  var nextTrain2 = childSnapshot.val().dataNextTrain;
  var minutesTillNextTrain2 = childSnapshot.val().dataMinutesTillNextTrain;
  var tableRow = $("<tr>")
  tableRow.append("<td>" + trainName2 + "</td>");
  tableRow.append("<td>" + destination2 + "</td>");
  // tableRow.append("<td>" + firstTrain2 + "</td>");
  tableRow.append("<td>" + frequency2 + "</td>");
  tableRow.append("<td>" + nextTrain2 + "</td>");
  tableRow.append("<td>" + minutesTillNextTrain2 + "</td>");


  $("tbody").append(tableRow)
});
