

//firebase 

    var config = {
        apiKey: "AIzaSyABwlWV-t6MeBRMvnmmC-cTrW0SMnLr3Mo",
        authDomain: "train-schedules-45d04.firebaseapp.com",
        databaseURL: "https://train-schedules-45d04.firebaseio.com",
        projectId: "train-schedules-45d04",
        storageBucket: "train-schedules-45d04.appspot.com",
        messagingSenderId: "433844151468"
      };
                         
      firebase.initializeApp(config);
      var database = firebase.database();

  //initial variables

  var trainName = "";
  var desintation = "";
  var firstTimeTrain = "";
  var frequency = "";
  var updatedTime = "";
 
//var currentTime = moment();
function displayTime () {
  var currentTime = moment().format("hh:mm:ss");
  $("#currenttime").text(currentTime);

}
setInterval(displayTime, 1000);


//$("#currenttime").text("CURRENT TIME: " + displayTime(setInterval));

  // 2. Button for adding train
$("#button").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
     trainName = $("#tNameInput").val().trim();
     desintation = $("#desInput").val().trim();
     firstTimeTrain = $("#firstTrainTimeInput").val().trim();
     frequency = $("#frequencyInput").val().trim();
  
    
      var firstTimeConverted = moment(firstTimeTrain, "HH:mm:ss").subtract(1, "years");
    console.log(firstTimeConverted);
     

     
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    
    
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);
    

    
    var minsAway = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minsAway);
     
    
    
    var nextTrain = moment().add(minsAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm:ss"));
    
    
  
    

    // Creates variables to connect to firebase
    var newTrainObj = {
      trainName: trainName,
      desintation: desintation,
      firstTimeTrain: firstTimeTrain,
      frequency: frequency
    };
  
    // Uploads train data to the database
    database.ref().push(newTrainObj);
  
    // Logs everything to console
    console.log(newTrainObj.trainName);
    console.log(newTrainObj.desintation);
    console.log(newTrainObj.firstTimeTrain);
    console.log(newTrainObj.frequency);
    $("#desInput").val("");
    $("#firstTrainTimeInput").val("");
   // $("#start-input").val("");
    $("#frequencyInput").val("");




//// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
     trainName = childSnapshot.val().trainName;
     desintation = childSnapshot.val().desintation;
     firstTimeTrain = childSnapshot.val().firstTimeTrain;
     frequency = childSnapshot.val().frequency;
  
    });
    // train Info
    console.log(trainName);
    console.log(desintation);
    console.log(firstTimeTrain);
    console.log(frequency);
  

   //adding to the html
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(desintation),
      $("<td>").text(frequency),
      $("<td>").text(nextTrain),
      $("<td>").text(minsAway)
      
    );
  
    // Append the new row to the table
    $(".table > tbody").append(newRow);
  
  database.ref().on("value", function(snapshot){

console.log(snapshot.val(), " value snapshot")

  })

});




displayTime();
 

