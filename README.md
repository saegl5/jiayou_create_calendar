# Create 加油 ("jiā yóu") Calendar

Google Apps Script for batch creating a calendar of events that cycles the words "J Day," "I Day," "A Day," "Y Day," "O Day," and "U Day," except on weekends and holidays. Modify as needed.

## Getting Started

1. Go to [Google Apps Script](https://script.google.com/), and create a new project.
2. Copy and paste [the script](./Code.gs) into the editor.
3. Modify the calendar name. (By default, it is "JIA YOU.")
4. Modify the time zone. (By default, it is `'America/Los_Angeles'` Consult [IANA's Time Zone Database](https://www.iana.org/time-zones) for time zone IDs of other locations.)
5. Modify the public holiday calendar. (By default, it is for US. Specifically, `'en.usa#holiday@group.v.calendar.google.com'`. Consult [dhoeric's GitHub Gist](https://gist.github.com/dhoeric/76bd1c15168ee0ee61ad3bf1730dcb65#file-cal-csv) for calendar IDs of other countries.)
6. Add any exceptions to the holiday schedule. (By default, Halloween, Election Day, and Veterans Day are exceptions. This will tell the script to create events on these holidays.)
7. Add any extra holidays. (By default, Thanksgiving Break and Winter Holiday Break are extra holidays. This will tell the script *not* to create events on these non-holidays.)
8. Modify start and end months. (By default, `startMonth = 9;` and `endMonth = 12;` for September through December.)
9. Save and run the script. (Requires authorization.)

<hr>
Made with &heartsuit; in Visual Studio Code