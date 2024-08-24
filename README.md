# 加油 ("jiayou")

Google Apps Script for creating a calendar of events that cycles the letters "j" "i" "a" "y" "o" "u," except on weekends and holidays. Modify as needed.

## Getting Started

1. Go to [Google Apps Script](https://script.google.com/), and create a new project.
2. Copy and paste [the script](./Code.gs) into the editor.
3. Modify the `startMonth` and `endMonth`. (By default, `startMonth = 9;` and `endMonth = 12;` for September through December.)
4. Modify the public holiday calendar. (By default, it is for US. Specifically, `'en.usa#holiday@group.v.calendar.google.com'`. Consult [
dhoeric's GitHub Gist](https://gist.github.com/dhoeric/76bd1c15168ee0ee61ad3bf1730dcb65#file-cal-csv) for calendarIDs of other countries.)
5. Save and run the script. (Requires authorization.)