// Modify the time zone, holiday calendar, start month, and end month as desired

var myCalendarName = "JIA YOU";
var myTimeZone = "America/Los_Angeles";
var myHolidayCalendar = "en.usa#holiday@group.v.calendar.google.com";
var myHolidayExceptions = [ // still create events on these holidays
  new Date("October 31, 2024"), // Halloween
  new Date("November 5, 2024"), // Election Day (General Election)
  new Date("November 11, 2024") // Veterans Day
];
var myExtraHolidays = [ // don't create events on these non-holidays
  new Date("November 25, 2024"), // Thanksgiving Break
  new Date("November 26, 2024"), // Thanksgiving Break
  new Date("November 27, 2024"), // Thanksgiving Break
  new Date("December 23, 2024"), // Winter Holiday Break
  new Date("December 26, 2024"), // Winter Holiday Break
  new Date("December 27, 2024"), // Winter Holiday Break
  new Date("December 30, 2024") // Winter Holiday Break
];
var myStartMonth = 9;
var myEndMonth = 12;



// ** WARNING **
// If the script below is modified improperly, running it may cause irrevocable damage.
// The script below comes with absolutely no warranty. Use it at your own risk.

function createCalendar() {
  // Create a new calendar named "JIA YOU"
  var calendar = CalendarApp.createCalendar(myCalendarName);
  
  // Set its time zone
  calendar.setTimeZone(myTimeZone);

  // Define the words to cycle through
  var words = [ "J &nbsp; Day", 
                "I &nbsp; Day", 
                "A &nbsp; Day", 
                "Y &nbsp; Day", 
                "O &nbsp; Day", 
                "U &nbsp; Day" ]; // Added extra spacing
  
  // Define the start and end months
  var startMonth = myStartMonth;
  var endMonth = myEndMonth;
  var year = new Date().getFullYear(); // Current year
  
  // Get the holidays for the current year (adjust as needed for your location)
  var holidays = getHolidays(year);
  
  // Event counter
  var eventIndex = 0;
  
  // Loop through each month
  for (var month = startMonth; month <= endMonth; month++) {
    // Determine the number of days in the month
    var daysInMonth = new Date(year, month, 0).getDate();
    
    // Loop through each day of the month
    for (var day = 1; day <= daysInMonth; day++) {
      var date = new Date(year, month - 1, day);
      
      // Check if the day is a weekend (Saturday or Sunday)
      if (date.getDay() == 0 || date.getDay() == 6) {
        continue;
      }
      
      // Check if the day is a holiday
      if (isHoliday(date, holidays)) {
        continue;
      }
      
      // Create an event with the current word
      var word = words[eventIndex % words.length];
      calendar.createAllDayEvent(word, date);

      Logger.log("Created " + word + " on " + date + "!");
      
      // Increment the event counter
      eventIndex++;
    }
  }
}

// Function to check if a date is a holiday
function isHoliday(date, holidays) {
  for (var i = 0; i < holidays.length; i++) {
    if (holidays[i].getTime() === date.getTime()) {
      return true;
    }
  }
  return false;
}

// Function to get holidays
function getHolidays(year) {
  var holidays = myExtraHolidays;
  var calendar = CalendarApp.getCalendarById(myHolidayCalendar);
  var start = new Date(year, 0, 1); // Start from January 1st
  var end = new Date(year, 12, 31); // End on December 31st
  
  var events = calendar.getEvents(start, end);
  var match = "no";
  
  for (var i = 0; i < events.length; i++) {
    for (var j = 0; j < myHolidayExceptions.length; j++) {
      if ((events[i].getAllDayStartDate()).toDateString() === myHolidayExceptions[j].toDateString()) {
        match = "yes";
        continue;
      }
    }
    if (match === "yes") {
      match = "no" // reset
      // then skip
    }
    else {
      holidays.push(events[i].getAllDayStartDate());
    }
  }
  
  return holidays;
}