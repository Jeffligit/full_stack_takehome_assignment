**Assumptions Made**:
- Errors for all fields always have both `severity` and `message`.
- Nested Fields can nest infinitely but their field name are unique.
- Data ingested will all have a records list

**Approach**
On page load, call the API endpoint to retrieve data.

Process data by flattening nested fields that is not `errors`. 
- For each key of the object, if value is another object, recursively call the flattening function while ignoring the key (omitted the key of the the object value)

Using a set header/columns, for each of the records retrieve only data from the set header/columns.
Create a table using the list of data. For each record create the row and color according to the `errors` field of that row.
Add a button that shows a modal sending the `errors` field to the modal an show the error and message in a table inside the modal.
For all fields that are populated in the `errors` field additionally add a tooltip to the cell that displays the error message on hover.
All components were created using tailwindcss and made them as resusable as possible.

CSV export
- Created a function that reads in the data list and formats the data into csv format.
- The button will download this csv formatted string into a csv file.

**If I had more time**
For a better experience, paginate the table instead of endlessly adding more the existing table.

Change the modal so that clicking outside the modal closes the modal.

Instead of hard coding the list of headers in the table as a constant, determine all unique fields and include those columns even if certain records do not contain that column's data.

