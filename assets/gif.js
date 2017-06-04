$(document).ready(function() {

// Creating an array of strings for the buttons//
  var topics = ["Happy", "Sad", "Angry", "Disgusted", "Laughter", "Tired",
  "Hungry", "Excited", "Bored", "Confused",];

// Calling the renderButtons function to display the intial buttons on the page
  renderButtons();

  // This function handles events when the submit button is clicked in the form
  $("#add-gif").on("click", function(event) {
    event.preventDefault();
    // Grabs the input from the textbox
    var topic = $("#gif-input").val().trim();
    // The emotion from the textbox gets added to array
    topics.push(topic);
    // Calling renderButtons which handles the processing of the gif array and generates button
    renderButtons();
    $("#gif-input").val("");
  });

  // Adding click event listeners to buttons and calling the displayGif function
  $("#buttons").on("click", ".butn", displayGif);



// Creating a function for the GET REQUEST from giphy.com//
  function displayGif() {

        var topic = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=10&rating=&api_key=dc6zaTOxFJmzC";

        // Create a GET REQUEST
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          $("#gifselection").empty();
            response.data.forEach((function(image) {
              $("#gifselection").prepend('<p>Rating:"' + image.rating + '"</p>');
              var gifImage = $("<img>");
              gifImage.addClass("gifs");
              gifImage.attr("src", image.images.fixed_height_still.url);
              gifImage.attr("data-still", image.images.fixed_height_still.url);
              gifImage.attr("data-animate", image.images.fixed_height.url);
              gifImage.attr("data-state", "still");
              $("#gifselection").prepend(gifImage);
            }))
            // Creates an event listener for the gifs to animate on click
            $(".gifs").on("click", function() {
                  var state = $(this).attr("data-state");
                    if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                    } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                    }
            });

        });
  }

// Function for displaying gifs buttons
  function renderButtons() {

// Delete the gif prior to adding new gif
      $("#buttons").empty();
      // Loop through the array of gifs
      for (var i = 0; i < topics.length; i++) {
        // Creating a button tag
        var newButton = $("<button>");
        // Adds a class to button
        newButton.addClass("butn");
        // Added a data-attribute
        newButton.attr("data-name", topics[i]);
        // Provided the initial button text
        newButton.text(topics[i]);
        // Added the button to the buttons div
        $("#buttons").append(newButton);
      }
  }
});
