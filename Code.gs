// ** WARNING **
// If the script below is modified improperly, running it may cause irrevocable damage.
// The script below comes with absolutely no warranty. Use it at your own risk.

function doGet() {
  return HtmlService.createHtmlOutputFromFile("Index");
}

function createCalendar(
  calendarName,
  timeZone,
  startMonth,
  endMonth,
  dryRun
) {
  var holidayCalendar = "en.usa#holiday@group.v.calendar.google.com";
  var holidayExceptions =
  [
    "Apr 21 2025", 
    "Mar 17 2025", 
    "Feb 14 2025", 
    "Oct 31 2024", 
    "Nov 5 2024", 
    "Nov 11 2024", 
    "May 1 2025", 
    "May 5 2025"
  ];
  var halfDays = 
  [
    "Nov 22 2024", 
    "Nov 1 2024", 
    "Nov 8 2024", 
    "Jan 24 2025", 
    "Mar 21 2025", 
    "Mar 28 2025", 
    "Jun 6 2025"
  ]
  var extraHolidays =
  [
    "Oct 10 2024", "Oct 11 2024", 
    "Nov 1 2024", "Nov 8 2024", "Nov 25 2024", "Nov 26 2024", "Nov 27 2024", "Nov 28 2024", "Nov 29 2024", 
    "Dec 23 2024", "Dec 26 2024", "Dec 27 2024", "Dec 30 2024", "Dec 24 2024", "Dec 25 2024", "Dec 31 2024", 
    "Jan 1 2025", "Jan 2 2025", "Jan 3 2025", "Jan 20 2025", "Jan 27 2025", "Jan 28 2025", "Jan 29 2025", 
    "Feb 17 2025", "Feb 18 2025", "Feb 19 2025", "Feb 20 2025", "Feb 21 2025", 
    "Mar 10 2025", "Mar 11 2025", 
    "Apr 14 2025", "Apr 15 2025", "Apr 16 2025", "Apr 17 2025", "Apr 17 2025", "Apr 18 2025", 
    "May 26 2025"
  ];

  // Convert the strings to date objects
  for (var i = 0; i < holidayExceptions.length; i++) {
    holidayExceptions[i] = new Date(holidayExceptions[i]);
  }

  for (var j = 0; j < halfDays.length; j++) {
    halfDays[j] = new Date(halfDays[j]);
  }

  for (var k = 0; k < extraHolidays.length; k++) {
    extraHolidays[k] = new Date(extraHolidays[k]);
  }

  // Otherwise, create a new calendar
  if (!dryRun) {
    var calendar = CalendarApp.createCalendar(calendarName); // built-in function

    // Set its time zone
    calendar.setTimeZone(timeZone);
  }

  // Define the words to cycle through
  var words = ["J Day", "I Day", "A Day", "Y Day", "O Day", "U Day"];

  // Define the start and end months
  var startMonth = parseInt(startMonth);
  var endMonth = parseInt(endMonth);
  var year = new Date().getFullYear(); // Current year

  // Get the holidays starting the current year
  var holidays = getHolidays(
    year,
    holidayCalendar,
    holidayExceptions,
    extraHolidays
  );

  // Event counter
  var eventIndex = 0;

  // Allow roll over
  if (startMonth > endMonth) {
    endMonth += 12;
  }


  var firstEvent = 0; // for first event, to which subsequent events will be chained
  var eventJSeries = ""; // for chaining events
  var eventISeries = ""; // for chaining events
  var eventASeries = ""; // for chaining events
  var eventYSeries = ""; // for chaining events
  var eventOSeries = ""; // for chaining events
  var eventUSeries = ""; // for chaining events



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
      if (!dryRun) {
        createEvent();
      }

      // function nested to align with Web app for adding events
      function createEvent() {
        if (firstEvent < 6) { // Create first days for each 6 days j,i,a,y,o,u
          switch (word) {
            case "J Day":
              eventJSeries = calendar.createAllDayEventSeries(word, date, CalendarApp.newRecurrence().addDate(date));
              break;
            case "I Day":
              eventISeries = calendar.createAllDayEventSeries(word, date, CalendarApp.newRecurrence().addDate(date));
              break;
            case "A Day":
              eventASeries = calendar.createAllDayEventSeries(word, date, CalendarApp.newRecurrence().addDate(date));
              break;
            case "Y Day":
              eventYSeries = calendar.createAllDayEventSeries(word, date, CalendarApp.newRecurrence().addDate(date));
              break;
            case "O Day":
              eventOSeries = calendar.createAllDayEventSeries(word, date, CalendarApp.newRecurrence().addDate(date));
              break;
            case "U Day":
              eventUSeries = calendar.createAllDayEventSeries(word, date, CalendarApp.newRecurrence().addDate(date));
              break;
          }
          firstEvent++;
        } // chain subsequent event to first event
        else
          switch (word) {
            case "J Day":
              eventJSeries.setRecurrence(CalendarApp.newRecurrence().addDate(date), date);
              break;
            case "I Day":
              eventISeries.setRecurrence(CalendarApp.newRecurrence().addDate(date), date);
              break;
            case "A Day":
              eventASeries.setRecurrence(CalendarApp.newRecurrence().addDate(date), date);
              break;
            case "Y Day":
              eventYSeries.setRecurrence(CalendarApp.newRecurrence().addDate(date), date);
              break;
            case "O Day":
              eventOSeries.setRecurrence(CalendarApp.newRecurrence().addDate(date), date);
              break;
            case "U Day":
              eventUSeries.setRecurrence(CalendarApp.newRecurrence().addDate(date), date);
              break;
          }
        return null;
      }

      // Log which words were created
      Logger.log("Created " + word + " on " + date + "!");

      // Unless an event is a half-day, increment the event counter
      var halfDay = "no";
      for (var l = 0; l < halfDays.length; l++) {
        if (date.toDateString() === halfDays[l].toDateString()) {
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
  return "Calendar created! Go to your Google Calendar...";
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
function getHolidays(year, holidayCalendar, holidayExceptions, extraHolidays) {
  var holidays = extraHolidays;
  var calendar = CalendarApp.getCalendarById(holidayCalendar);
  var start = new Date(year, 0, 1); // Start from January 1st of current year
  var end = new Date(year + 1, 12, 31); // End on December 31st of next year (roll over)

  var events = calendar.getEvents(start, end);

  // Exempt these holidays
  var match = false;
  for (var n = 0; n < events.length; n++) {
    for (var o = 0; o < holidayExceptions.length; o++) {
      if (
        events[n].getAllDayStartDate().toDateString() ===
        holidayExceptions[o].toDateString()
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