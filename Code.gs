// ** WARNING **
// If the script below is modified improperly, running it may cause irrevocable damage.
// The script below comes with absolutely no warranty. Use it at your own risk.

// SUGGESTION
// Run this script in a summer before an upcoming school year.
// This is because the script will create events starting in the current year.

function doGet() {
  return HtmlService.createHtmlOutputFromFile("Index").setTitle(
    'Create 加油 Calendar'
  );
}

// Used by Index.html for username
function getUsername() {
  return Session.getActiveUser().getEmail();
}

function createCalendar(
  calendarName,
  timeZone,
  holidayExceptions,
  halfDays,
  extraHolidays,
  // startMonth,
  // endMonth,
  start,
  end,
  dryRun
) {
  var holidayCalendar = "en.usa#holiday@group.v.calendar.google.com"; // calendar is hard-coded

  // handle exceptions first
  if (
    holidayExceptions.includes(";") ||
    halfDays.includes(";") ||
    extraHolidays.includes(";")
  ) {
    return "Use comma-separated dates!";
  }

  const regex = /^\d{4}-(\d{2})-(\d{2})$/; // regular expression for identifying a ISO-formatted date (YYYY-MM-DD)

  // Split strings into lists of dates, in case we might encounter exceptions
  holidayExceptions = holidayExceptions.split(/,\s*/);
  // permits any number of whitespace characters after the comma
  // FYI: ,\s* is a regular expression, delimited by /.../
  for (var i = 0; i < holidayExceptions.length; i++) {
    // test if date is ISO-formatted
    if (regex.test(holidayExceptions[i]) === true) {
      holidayExceptions[i] = new Date(holidayExceptions[i]);
      holidayExceptions[i] = adjustTime(holidayExceptions[i]);
    } else holidayExceptions[i] = new Date(holidayExceptions[i]); // don't adjust time zone
  }
  if (
    holidayExceptions.length > 1 &&
    holidayExceptions[0].getFullYear() !== holidayExceptions[1].getFullYear() &&
    holidayExceptions[0].getFullYear() !== holidayExceptions[1].getFullYear()-1 // could have two different years
    // holidayExceptions[0].getFullYear()-1 !== holidayExceptions[1].getFullYear()-1 // Previous year, keep in case you choose to recreate previous calendar next year
    // checks first two items because likely users will use a consistent style for additional dates
  )
    return "Use accepted date formats!";

  halfDays = halfDays.split(/,\s*/);
  // again, permits any number of whitespace characters after the comma
  for (var j = 0; j < halfDays.length; j++) {
    // test if date is ISO-formatted
    if (regex.test(halfDays[j]) === true) {
      halfDays[j] = new Date(halfDays[j]);
      halfDays[j] = adjustTime(halfDays[j]);
    } else halfDays[j] = new Date(halfDays[j]);
  }
  if (
    halfDays.length > 1 &&
    halfDays[0].getFullYear() !== halfDays[1].getFullYear() &&
    halfDays[0].getFullYear() !== halfDays[1].getFullYear()-1 // could have two different years
    // halfDays[0].getFullYear()-1 !== halfDays[1].getFullYear()-1 // Previous year, keep in case you choose to recreate previous calendar next year
    // checks first two items because likely users will use a consistent style for additional dates
  )
    return "Use accepted date formats!";

  extraHolidays = extraHolidays.split(/,\s*/);
  // again, permits any number of whitespace characters after the comma
  for (var k = 0; k < extraHolidays.length; k++) {
    // test if date is ISO-formatted
    if (regex.test(extraHolidays[k]) === true) {
      extraHolidays[k] = new Date(extraHolidays[k]);
      extraHolidays[k] = adjustTime(extraHolidays[k]);
    } else extraHolidays[k] = new Date(extraHolidays[k]);
  }
  if (
    extraHolidays.length > 1 &&
    extraHolidays[0].getFullYear() !== extraHolidays[1].getFullYear() &&
    extraHolidays[0].getFullYear() !== extraHolidays[1].getFullYear()-1 // could have two different years
    // extraHolidays[0].getFullYear()-1 !== extraHolidays[1].getFullYear()-1 // Previous year, keep in case you choose to recreate previous calendar next year
    // checks first two items because likely users will use a consistent style for additional dates
  )
    return "Use accepted date formats!";

  // Otherwise, create a new calendar
  if (!dryRun) {
    var calendar = CalendarApp.createCalendar(calendarName); // built-in function

    // Set its time zone
    calendar.setTimeZone(timeZone);

    // Set default color
    calendar.setColor(CalendarApp.Color.GRAY); // neutral color: #5A6986
  }

  // Define the words to cycle through
  var words = ["J Day", "I Day", "A Day", "Y Day", "O Day", "U Day"];

  // Define the start and end months
  // var startMonth = parseInt(startMonth);
  var startMonth;
  // var endMonth = parseInt(endMonth);
  var endMonth;
  var year = new Date().getFullYear(); // Current year
  // var year = new Date().getFullYear()-1; // Previous year, keep in case you choose to recreate previous calendar next year

  // Check for dates
  // if (start !== "") {, required now
  if (regex.test(start) === true) {
    start = new Date(start);
    start = adjustTime(start);
  } else start = new Date(start);
  startMonth = start.getMonth() + 1 // override startMonth, indices start at 0
  // }

  // if (end !== "") {, required now
  if (regex.test(end) === true) {
    end = new Date(end);
    end = adjustTime(end);
  } else end = new Date(end);
  endMonth = end.getMonth() + 1 // override endMonth, indices start at 0
  // }
  
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

  // CAUTION // 
  // ------- //
  // I advise against using eventSeries for creating the JIA YOU calendar //
  // Chaining events together may potentially disrupt AileenBot from reading the calendar events //
  // ------- //
  
  // chain subsequent events to the first event
  // var firstEvent = true;
  // all letter days are used
  // var eventSeries = [
    // "eventSeriesJ",
    // "eventSeriesI",
    // "eventSeriesA",
    // "eventSeriesY",
    // "eventSeriesO",
    // "eventSeriesU",
  // ];
  // breaking up the series like this helps mitigate issue #4
  // https://github.com/saegl5/jiayou_add_events/issues/4

  // not using a dictionary
  // var firstDate = []; // have multiple first dates
  // dateStartTime not used for all-day events
  // dateEndTime not used for all-day events

  // Loop through each month
  var month;
  var daysInMonth;
  for (month = startMonth; month <= endMonth; month++) {
    // Determine the number of days in the month
    if (month <= 12) {
      daysInMonth = new Date(year, month, 0).getDate();
    } else {
      // roll over
      daysInMonth = new Date(year + 1, month % 12, 0).getDate();
    }

    // Loop through each day of the month
    var day;
    if (month === startMonth && start !== "")
      day = start.getDate(); // override day
    else day = 1;
    if (month === endMonth && end !== "")
      daysInMonth = end.getDate(); // override daysInMonth
    // else // don't override daysInMonth, leaving "else" hanging confused web app

    for (day; day <= daysInMonth; day++) {
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

      // Check if the day is a half-day
      var halfDay = false;
      for (var l = 0; l < halfDays.length; l++) {
        if (date.toDateString() === halfDays[l].toDateString()) {
          halfDay = true;
          continue;
        }
      }
      if (halfDay === true) {
        eventIndex -= 1; // uncomment to repeat previous letter day
        // continue; // comment out to repeat previous letter day
      }

      // Create an event with the current word
      var word = words[eventIndex % words.length];
      if (halfDay === true) {
        word += " (Repeat)"; // uncomment to repeat previous letter day
      }
      if (!dryRun) {
        // createEvent(); // each letter day goes into a separate series
        Utilities.sleep(1000); // mitigate use limit
        calendar.createAllDayEvent(word, date);
      }
      
      // CAUTION // 
      // ------- //
      // Again, I advise against using eventSeries for creating the JIA YOU calendar //
      // Chaining events together may potentially disrupt AileenBot from reading the calendar events //
      // ------- //

      // function nested to align with Web app for adding events
      // function createEvent() { // Keeping events as recurring, for now, because recurring events are easier to modify and delete than individual ones
        // if (eventIndex === words.length) firstEvent = false;
        // if (firstEvent) {
          // Create the first letter day for each one: J, I, A, Y, O, and U
          // if (eventSeriesMap[word])
          // eventSeries[eventIndex] = calendar.createAllDayEventSeries(
            // word,
            // date,
            // CalendarApp.newRecurrence().addDate(date)
          // ); // all-day events
          // firstDate[eventIndex % words.length] = date; // all letter days are used, so it is easy to pair up firstDate with the letter
          // can't set firstEvent = false yet
        // } // chain subsequent event to first event
        // else {
          // if (eventSeriesMap[word])
          // eventSeries[eventIndex % words.length].setRecurrence(
            // CalendarApp.newRecurrence().addDate(date),
            // firstDate[eventIndex % words.length] // date of first event only
          // );
        // }
        // return null;
      // }

      // Log which words were created
      Logger.log("Created " + word + " on " + date + "!");

      // Even if an event is a half-day, increment the event counter
      // var halfDay = false;
      // for (var l = 0; l < halfDays.length; l++) {
      //   if (date.toDateString() === halfDays[l].toDateString()) {
      //     halfDay = true;
      //     continue;
      //   }
      // }
      if (halfDay === true) {
        halfDay = false; // reset
        // then skip
        eventIndex++; // originally skipped, keep comment for legacy, in fact I was supposed to repeat previous letter day not current one
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
  var start = new Date(year, 0, 1); // Start from January 1st of current year, different "start" variable
  var end = new Date(year + 1, 12, 31); // End on December 31st of next year (roll over), different "end" variable

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

// Function to adjust time for ISO-formatted date
function adjustTime(isoDate) {
  // Dates formatted as YYYY-MM-DD use Coordinated Universal Time, whereas dates formatted differently use local time
  // So, we will have to adjust ISO dates' time
  let timezoneOffset = isoDate.getTimezoneOffset(); // in minutes, varies depending on local time zone and daylight saving time (if observed)
  let adjustedTime = isoDate.getTime() + timezoneOffset * 60 * 1000; // milliseconds since January 1, 1970 00:00:00 + timezoneOffset in milliseconds
  let adjustedDate = new Date(adjustedTime);

  return adjustedDate;
}
