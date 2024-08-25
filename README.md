# 加油 ("jiā yóu")

Google Apps Script for creating a calendar of events that cycles the words "J Day," "I Day," "A Day," "Y Day," "O Day," and "U Day," except on weekends and holidays. Modify as needed.

## Getting Started

1. Go to [Google Apps Script](https://script.google.com/), and create a new project.
2. Copy and paste [the script](./Code.gs) into the editor.
3. Modify the time zone. (By default, it is `'America/Los_Angeles'` Consult [IANA's Time Zone Database](https://www.iana.org/time-zones) for time zone IDs of other locations.)
4. Modify start and end months. (By default, `startMonth = 9;` and `endMonth = 12;` for September through December.)
5. Modify the public holiday calendar. (By default, it is for US. Specifically, `'en.usa#holiday@group.v.calendar.google.com'`. Consult [
dhoeric's GitHub Gist](https://gist.github.com/dhoeric/76bd1c15168ee0ee61ad3bf1730dcb65#file-cal-csv) for calendar IDs of other countries.)
6. Save and run the script. (Requires authorization.)