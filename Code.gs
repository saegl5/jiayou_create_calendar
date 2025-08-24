// ** WARNING **
// If the script below is modified improperly, running it may cause irrevocable damage.
// The script below comes with absolutely no warranty. Use it at your own risk.

function doGet() {
  return HtmlService.createHtmlOutputFromFile("Index");
}

function createCalendar(
  calendarName,
  timeZone,
  holidayExceptions,
  halfDays,
  extraHolidays,
  startMonth,
  endMonth,
  dryRun
) {
  var holidayCalendar = "en.usa#holiday@group.v.calendar.google.com";

  // handle exceptions first
  if (
    holidayExceptions.includes(";") ||
    halfDays.includes(";") ||
    extraHolidays.includes(";")
  ) {
    return "Use comma-separated dates!";
  }

  // Split strings into lists of dates, in case we might encounter exceptions
  holidayExceptions = holidayExceptions.split(/,\s*/);
  for (var i = 0; i < holidayExceptions.length; i++) {
    holidayExceptions[i] = new Date(holidayExceptions[i]);
  }
  if (
    holidayExceptions.length > 1 &&
    holidayExceptions[0].getFullYear() !== holidayExceptions[1].getFullYear() &&
    holidayExceptions[0].getFullYear() !== holidayExceptions[1].getFullYear()-1
    // checks first two items because likely users will use a consistent style for additional dates
  )
    return "Use accepted date formats!";

  halfDays = halfDays.split(/,\s*/);
  for (var j = 0; j < halfDays.length; j++) {
    halfDays[j] = new Date(halfDays[j]);
  }
  if (
    halfDays.length > 1 &&
    halfDays[0].getFullYear() !== halfDays[1].getFullYear() &&
    halfDays[0].getFullYear() !== halfDays[1].getFullYear()-1
    // checks first two items because likely users will use a consistent style for additional dates
  )
    return "Use accepted date formats!";

  extraHolidays = extraHolidays.split(/,\s*/);
  for (var k = 0; k < extraHolidays.length; k++) {
    extraHolidays[k] = new Date(extraHolidays[k]);
  }
  if (
    extraHolidays.length > 1 &&
    extraHolidays[0].getFullYear() !== extraHolidays[1].getFullYear() &&
    extraHolidays[0].getFullYear() !== extraHolidays[1].getFullYear()-1
    // checks first two items because likely users will use a consistent style for additional dates
  )
    return "Use accepted date formats!";

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


  // var firstEvent = 0; // for first event, to which subsequent events will be chained
  // var eventJSeries = ""; // for chaining events
  // var eventISeries = ""; // for chaining events
  // var eventASeries = ""; // for chaining events
  // var eventYSeries = ""; // for chaining events
  // var eventOSeries = ""; // for chaining events
  // var eventUSeries = ""; // for chaining events


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
      if (halfDay === "yes") {
        word += " (Repeat)"; // note the repeated day
        halfDay = "no"; // reset
      }
      if (!dryRun) {
        // createEvent();
        Utilities.sleep(1000); // mitigate use limit
        calendar.createAllDayEvent(word, date);
      }

      // function nested to align with Web app for adding events
      // TODO: REDUCE CODE CLUTTER
      // function createEvent() {
        // if (firstEvent < 6) { // Create first days for each 6 days j,i,a,y,o,u
          // switch (word) {
            // case "J Day":
              // eventJSeries = calendar.createAllDayEventSeries(word, date, CalendarApp.newRecurrence().addDate(date));
              // break;
            // case "I Day":
              // eventISeries = calendar.createAllDayEventSeries(word, date, CalendarApp.newRecurrence().addDate(date));
              // break;
            // case "A Day":
              // eventASeries = calendar.createAllDayEventSeries(word, date, CalendarApp.newRecurrence().addDate(date));
              // break;
            // case "Y Day":
              // eventYSeries = calendar.createAllDayEventSeries(word, date, CalendarApp.newRecurrence().addDate(date));
              // break;
            // case "O Day":
              // eventOSeries = calendar.createAllDayEventSeries(word, date, CalendarApp.newRecurrence().addDate(date));
              // break;
            // case "U Day":
              // eventUSeries = calendar.createAllDayEventSeries(word, date, CalendarApp.newRecurrence().addDate(date));
              // break;
          // }
          // firstEvent++;
        // } // chain subsequent event to first event
        // else
          // switch (word) {
            // case "J Day":
              // eventJSeries.setRecurrence(CalendarApp.newRecurrence().addDate(date), date);
              // break;
            // case "I Day":
              // eventISeries.setRecurrence(CalendarApp.newRecurrence().addDate(date), date);
              // break;
            // case "A Day":
              // eventASeries.setRecurrence(CalendarApp.newRecurrence().addDate(date), date);
              // break;
            // case "Y Day":
              // eventYSeries.setRecurrence(CalendarApp.newRecurrence().addDate(date), date);
              // break;
            // case "O Day":
              // eventOSeries.setRecurrence(CalendarApp.newRecurrence().addDate(date), date);
              // break;
            // case "U Day":
              // eventUSeries.setRecurrence(CalendarApp.newRecurrence().addDate(date), date);
              // break;
          // }
        // return null;
      // }

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
        // halfDay = "no"; // reset
        // then skip to repeat letter day
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
