# Create 加油 ("jiā yóu") Calendar

Google Web app for creating a calendar of individual events that cycles the words "J Day," "I Day," "A Day," "Y Day," "O Day," and "U Day," except on weekends and holidays. Modify as needed, and back up your calendars before you run the app. Without an app script one would need to create these events manually.

## Visual Example

<img src="screenshots/calendarForm.png" alt="screenshot of calendar form" width="500"><br>Form for creating "JIA YOU" calendar of events.

<img src="screenshots/calendar.png" alt="screenshot of calendar" width="800"><br>"JIA YOU" calendar of events was created.

## Prerequisite

Access to [Google Apps Script](https://script.google.com/)

## Getting Started

1. Go to [Google Apps Script](https://script.google.com/), and create a new project.
2. Copy and paste [the script](./Code.gs) into the editor, and save the file.
3. Run the script to acquire authorization.
4. Create an HTML file, and name it "Index."
5. Copy and paste [the markup text](./Index.html) into the editor, and save the file.
6. Deploy the project as a Web app, and open the assigned URL.
7. Modify the calendar name and time zone. (**_Must name it differently from the owner name, otherwise the app will not create the calendar._**)
8. Add any exceptions to the U.S. holiday schedule, any half-days, and any extra holidays. (Exceptions tell the app script to create events on these holidays; half-days tell the app script to repeat this event once; and extra holidays tell the app script _not_ to create events on these non-holidays.)
9. Modify the start and end months. (If the start month is greater than the end month, then the calendar will roll over to the new year.)
10. Optionally perform a dry run to test the Web app before running it in production. Consult logs for output.
11. Press submit. (Requires another authorization. **_Note also that creating calendars is subject to a [use limit](https://support.google.com/a/answer/2905486?hl=en)._**)

## Next Steps

- If you deploy the Web app such that it executes as `User accessing the web app` where `Anyone with Google account` can access it, then you can share the URL for them to create a calendar in their own account. (You may wish to hide the dry run option.)
- Trim the calendar (e.g., delete letter days after Jun 12, if a school calendar ends on Jun 12)
- Consult the [Web app for adding events](https://github.com/saegl5/jiayou_add_events).
- You can extend the app script to create a calendar cycling any letters or words and in any language. Feel free to fork, too!
- You can also export the calendar directly from [Google Calendar](https://calendar.google.com/calendar/) and can import it into another calendar on your smartphone. ('Whatever way makes it easier for you to keep track of today's letter...)

## End-user instructions
Creating a JIAYOU calendar is very easy. The form is already filled out listing all of the holidays of the school year.

1. Fill out calendar name, timezone, and public holiday calendar
2. For almost everyone, you don't need to change anything else other than Start Month and End Month in the bottom. This changes when the JIAYOU calendar starts and ends.

<hr>
Made with &heartsuit; in Visual Studio Code
