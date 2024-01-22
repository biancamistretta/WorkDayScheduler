$(function () {
  // Listener for click events on the save button
  $(".saveBtn").on("click", function () {
    // Get the id of the corresponding time-block
    var timeBlockId = $(this).closest(".time-block").attr("id");

    // Get the user input from the textarea within this time-block
    var userInput = $(this).siblings(".description").val();

    // Save the user input in local storage using the time-block id as a key
    localStorage.setItem(timeBlockId, userInput);
  });

  // Function to apply the past, present, or future class to each time block
  function updateHourClasses() {
    // Get the current hour using Day.js
    var currentHour = dayjs().hour();

    // Loop through each time-block
    $(".time-block").each(function () {
      // Get the hour from the time-block id
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      // Compare with the current hour and apply classes accordingly
      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Call the function to apply initial classes
  updateHourClasses();

  // Display the current date in the header of the page
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));
  
  // Get any user input that was saved in localStorage and set textarea values
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var savedInput = localStorage.getItem(timeBlockId);
    if (savedInput) {
      $(this).find(".description").val(savedInput);
    }
  });
});
