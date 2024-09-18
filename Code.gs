// Create 加油 ("jiā yóu") Calendar
// Modify the following event settings, then press |> Run

// Event settings
var myCalendarName = "JIA YOU"; // Must name it differently from the owner name
var myTimeZone = "America/Los_Angeles"; // Other examples: America/New_York, America/Chicago, America/Denver
// Consult https://www.iana.org/time-zones for time zone IDs of other locations
var myHolidayCalendar = "en.usa#holiday@group.v.calendar.google.com";
// Consult https://gist.github.com/dhoeric/76bd1c15168ee0ee61ad3bf1730dcb65#file-cal-csv for calendar IDs of other countries
var myHolidayExceptions = [
  // still create events on these holidays
  "Oct 31 2024", // Halloween
  "Nov 5 2024", // Election Day (General Election)
  "Nov 11 2024", // Veterans Day
];
var myHalfDays = [
  // repeat this event once
  "Nov 22 2024",
];
var myExtraHolidays = [
  // don't create events on these non-holidays
  "Nov 25 2024", // Thanksgiving Break
  "Nov 26 2024", // Thanksgiving Break
  "Nov 27 2024", // Thanksgiving Break
  "Dec 23 2024", // Winter Holiday Break
  "Dec 26 2024", // Winter Holiday Break
  "Dec 27 2024", // Winter Holiday Break
  "Dec 30 2024", // Winter Holiday Break
];
// Accepted date formats: Mmm DD YYYY, MM/DD/YYYY, DD Mmm YYYY
// Why not accept YYYY/MM/DD ? Because it defaults to Coordinated Universal Time
var myStartMonth = "9"; // September
var myEndMonth = "12"; // December
// If myStartMonth > myEndMonth, then the calendar will roll over to the new year
var myDryRun = false; // test script before running it in production





// -----------------------------------------------------------------------------------
// ** WARNING **
// If the script below is modified improperly, running it may cause irrevocable damage.
// The script below comes with absolutely no warranty. Use it at your own risk.

function createCalendar() {
  // Create a new calendar
  if (!myDryRun) {
    var calendar = CalendarApp.createCalendar(myCalendarName); // built-in function

    // Set its time zone
    calendar.setTimeZone(myTimeZone);
  }

  // Define the words to cycle through
  var words = ["J Day", "I Day", "A Day", "Y Day", "O Day", "U Day"];

  // Define the start and end months
  var startMonth = parseInt(myStartMonth);
  var endMonth = parseInt(myEndMonth);
  var year = new Date().getFullYear(); // Current year

  // No need to split strings into lists of dates, but process them
  for (var i = 0; i < myHolidayExceptions.length; i++) {
    myHolidayExceptions[i] = new Date(myHolidayExceptions[i]);
  }

  for (var j = 0; j < myHalfDays.length; j++) {
    myHalfDays[j] = new Date(myHalfDays[j]);
  }

  for (var k = 0; k < myExtraHolidays.length; k++) {
    myExtraHolidays[k] = new Date(myExtraHolidays[k]);
  }

  // Get the holidays starting the current year
  var holidays = getHolidays(year);

  // Event counter
  var eventIndex = 0;

  // Allow roll over
  if (startMonth > endMonth) {
    endMonth += 12;
  }

  // Loop through each month
  for (var month = startMonth; month <= endMonth; month++) {
    // Determine the number of days in the month
    if (month <= 12) {
      var daysInMonth = new Date(year, month, 0).getDate();
    } else {
      // roll over
      var daysInMonth = new Date(year + 1, month % 12, 0).getDate();
    }

    // Loop through each day of the month
    for (var day = 1; day <= daysInMonth; day++) {
      if (month <= 12) {
        var date = new Date(year, month - 1, day);
      } else {
        // roll over
        var date = new Date(year + 1, (month % 12) - 1, day);
      }

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
      if (!myDryRun) {
        calendar.createAllDayEvent(word, date);
      }

      // Log which words were created
      Logger.log("Created " + word + " on " + date + "!");

      // Unless an event is a half-day, increment the event counter
      var halfDay = "no";
      for (var l = 0; l < myHalfDays.length; l++) {
        if (date.toDateString() === myHalfDays[l].toDateString()) {
          halfDay = "yes";
          continue;
        }
      }
      if (halfDay === "yes") {
        halfDay = "no"; // reset
        // then skip
      } else {
        eventIndex++;
      }
    }
  }
  Logger.log("Calendar created!");
  return null;
}

// Function to check if a date is a holiday
function isHoliday(date, holidays) {
  for (var m = 0; m < holidays.length; m++) {
    if (holidays[m].getTime() === date.getTime()) {
      return true;
    }
  }
  return false;
}

// Function to get holidays
function getHolidays(year) {
  var holidays = myExtraHolidays;
  var calendar = CalendarApp.getCalendarById(myHolidayCalendar);
  var start = new Date(year, 0, 1); // Start from January 1st of current year
  var end = new Date(year + 1, 12, 31); // End on December 31st of next year (roll over)

  var events = calendar.getEvents(start, end);

  // Exempt these holidays
  var match = false;
  for (var n = 0; n < events.length; n++) {
    for (var o = 0; o < myHolidayExceptions.length; o++) {
      if (
        events[n].getAllDayStartDate().toDateString() ===
        myHolidayExceptions[o].toDateString()
      ) {
        match = true;
        continue;
      }
    }
    if (match === true) {
      match = false; // reset
      // then skip
    } else {
      holidays.push(events[n].getAllDayStartDate());
    }
  }

  return holidays;
}
