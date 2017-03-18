$(document).ready(function(){ 

   // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDEbalBn0bHimxsjw8l8rDHeMib-3I6kKg",
    authDomain: "trainschedule-1da51.firebaseapp.com",
    databaseURL: "https://trainschedule-1da51.firebaseio.com",
    storageBucket: "trainschedule-1da51.appspot.com",
    messagingSenderId: "1062844166826"
  };
  firebase.initializeApp(config);
  // reference the database //
  var database = firebase.database();


 $("#submit").on("click", function(){
var firstTime = $('#time').val().trim();
var trainName = $('#train-name').val().trim();
var destination = $('#destination').val().trim();
 //  frequency in minutes // 
var frequency = $('#frequency').val().trim();
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
var minutesNextTrain = "";
var currentTime = moment();
var diffTime = currentTime.diff(moment(firstTimeConverted),"minutes");
var tRemainder = diffTime % frequency;
var minutesTillTrain = frequency - tRemainder;
var nextTrain = moment().add(minutesTillTrain, "minutes");
var nextTrainFormatted = moment(nextTrain).format("HH:mm");




// create object for train data // 

var train = {
trainName: trainName,
destination: destination,
firstTime: firstTime,
frequency: frequency,
nextTrainFormatted: nextTrainFormatted,
minutesTillTrain: minutesTillTrain
}
database.ref().push(train);
console.log(train);
	// clear input boxes when user presses submit button //
	$("#train-name").val('');
	$('#destination').val('');
	$("#time").val('');
	$("#frequency").val('');

}); // End of click Function //

// At the initial load, get a snapshot of the current data. //
 database.ref().on("child_added", function(childSnapshot) {
// Need to know when first train arrives and then how often // 

      var childTrainName = childSnapshot.val().trainName;
	  var childDestination = childSnapshot.val().destination;
	  var childTime = childSnapshot.val().firstTime;
	  var childFrequency = childSnapshot.val().frequency;
	  var childNextFormatted = childSnapshot.val().nextTrainFormatted;
	  var childMinutesTillTrain = childSnapshot.val().minutesTillTrain;


	  $("#table").append(
        "<tr><td>" + childTrainName + "</td><td>" + childDestination 
        + "</td><td>" + childFrequency + "</td><td>" 
        + childNextFormatted + "</td><td>"
        + childMinutesTillTrain + "</td></tr>");



// If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);

});// End of Database Ref // 

 
});// End of Document Ready // 

