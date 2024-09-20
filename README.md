# Create 加油 ("jiā yóu") Calendar

Google Web app for batch creating a calendar of events that cycles the words "J Day," "I Day," "A Day," "Y Day," "O Day," and "U Day," except on weekends and holidays. Modify as needed, and back up your calendars before you run the app. These events are not recurring events, so without a batch script one would need to create these events manually.

## Visual Example

<img src="screenshots/calendarForm.png" alt="screenshot of calendar form" width="800"><br>Form for creating "JIA YOU" calendar of events.

<img src="screenshots/calendar.png" alt="screenshot of calendar" width="800"><br>"JIA YOU" calendar of events was created.

## Getting Started

1. Go to [Google Apps Script](https://script.google.com/), and create a new project.
2. Copy and paste [the script](./Code.gs) into the editor, and save the file.
3. Run the script to acquire authorization.
4. Create an HTML file, and name it "Index."
5. Copy and paste [the markup text](./Index.html) into the editor, and save the file.
6. Deploy the project as a Web app, and open the assigned URL.
7. Modify the calendar name, time zone, and public holiday calendar. (**_Must name it differently from the owner name, otherwise the app will not create the calendar._**)
8. Add any exceptions to the holiday schedule, any half-days, and any extra holidays. (Exceptions tell the script to create events on these holidays; half-days tell the script to repeat this event once; and extra holidays tell the script _not_ to create events on these non-holidays.)
9. Modify the start and end months. (If the start month is greater than the end month, then the calendar will roll over to the new year.)
10. Optionally perform a dry run to test the Web app before running it in production. Consult logs for output.
11. Press submit. (Requires another authorization. **_Note also that creating calendars is subject to a [use limit](https://support.google.com/a/answer/2905486?hl=en)._**)

<hr>
Made with &heartsuit; in Visual Studio Code
