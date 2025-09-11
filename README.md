# Create 加油 Calendar

加油 is a common Chinese expression consisting of two characters, pronounced *jiā yóu* in Mandarin; it is often used as an encouragement.

Create 加油 Calendar is a Google Web app for creating a calendar of individual events that cycles the words "J Day," "I Day," "A Day," "Y Day," "O Day," and "U Day," except on weekends and holidays. Modify as needed, and back up your calendars before you run the app. Without an app script, one would need to create these events manually.

_Suggestion: Run this script in a summer before an upcoming school year; this is because the script will create events starting in the current year._

## Visual Example

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="screenshots/calendarFormDark.png">
  <source media="(prefers-color-scheme: light)" srcset="screenshots/calendarForm.png">
  <img src="screenshots/calendarForm.png" alt="screenshot of calendar form" width="500" style="display: block; margin-left: 0; margin-right: auto;">
</picture><p>Form for creating "JIA YOU" calendar of events. (Username is hidden.)<br><br>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="screenshots/calendarDark.png">
  <source media="(prefers-color-scheme: light)" srcset="screenshots/calendar.png">
  <img src="screenshots/calendar.png" alt="screenshot of calendar" width="800" style="display: block; margin-left: 0; margin-right: auto;">
</picture>"JIA YOU" calendar of events was created.

## Prerequisite

Access to [Google Apps Script](https://script.google.com/)

## Getting Started

### Build and Deploy

1. Go to [Google Apps Script](https://script.google.com/), and create a new project.
2. Copy and paste [the script](./Code.gs) into the editor, and save the file.
3. Run the script to acquire authorization.
4. Create an HTML file, and name it "Index."
5. Copy and paste [the markup text](./Index.html) into the editor, and save the file.
6. Repeat steps 4-5 to create [Script.html](./Script.html) and [Style.html](./Style.html)
7. Deploy the project as a Web app, and open the assigned URL.

### How to Use

8. Check the username to ensure that you opened the URL in the correct account.
9. Modify the calendar name and time zone.
10. Add any exceptions to the U.S. holiday schedule, any repeated-letter days, and any extra holidays. (Consult [Google Calendar](https://calendar.google.com/calendar/) for the U.S. holiday schedule. Exceptions tell the app script to create events on these holidays; repeated days tell the app script to repeat previous day; and extra holidays tell the app script _not_ to create events on these non-holidays. Order does _not_ matter.)
11. Specify a date range by inputting a start date and end date.
12. Optionally mark weekly cycles (e.g., "J Day (Wk 1)"), and you can customize the string.
13. Optionally perform a dry run to test the Web app before running it in production. Consult logs for output.
14. Press submit. (Requires another authorization. **_Note also that creating calendars is subject to a [use limit](https://support.google.com/a/answer/2905486?hl=en)._**)

## Next Steps

- If you deploy the Web app such that it executes as `User accessing the web app` where `Anyone with Google account` can access it, then you can share the URL for them to create a calendar in their own account. (You may wish to hide the dry run option.)
- Consult the [Web app for adding events](https://github.com/saegl5/jiayou_add_events).
- You can extend the app script to create a calendar cycling any letters or words and in any language. Feel free to fork, too!
- You can also export the calendar directly from [Google Calendar](https://calendar.google.com/calendar/) and can import it into another calendar on your smartphone. ~~~Alternative: Check out Jonathan Hsieh's [AileenBot](https://account.aileenbot.com/)~~ (being sunsetted), and subscribe to community events. ('Whatever way makes it easier for you to keep track of today's letter...)

## Known Issues

Periodically, new holidays are added to a U.S. calendar (e.g., Jan 9 2025 to observe the passing of former President Jimmy Carter) in the middle of a school year. Although one can simply recreate the (one) calendar, users who referenced the original calendar&mdash;to [add events on its letter days](https://github.com/saegl5/jiayou_add_events)&mdash;would have to recreate all of their events. One might wish to develop a school policy on how to handle such exceptions, for example manually deleting that letter day and manually creating a makeup day.

<hr>
Made with &heartsuit; in Visual Studio Code

<br>

A special thank you to [Chi (David) Yu](https://github.com/yuchild) and [James Armstrong](https://github.com/jmarmstrong1207). Chi contributed the idea of developing the app using Google Apps Script, and James contributed recurring events and regular expressions.
