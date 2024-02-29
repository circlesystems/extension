$(document).ready(function () {
  // Initialize DataTable with Buttons extension
  var table = $("#table-data").DataTable({
    pageLength: 10,
    // paging: false,

    order: [[3, "desc"]],
    lengthChange: true,
    // aoColumnDefs: [
    //   {
    //     bSortable: true,
    //     aTargets: "-all",
    //   },
    // ],
    // pageInfo: false,
    order: [[0, "asc"]],
    bLengthChange: true,
    bFilter: true,
    dom: "t",
    // dom: '<"top">ct<"top"p><"clear">',
  });
  // Function to update the page number display
  function updatePageNumber() {
    var pageInfo = table.page.info();
    var currentPage = pageInfo.page + 1; // DataTables pages are zero-based
    var totalPages = pageInfo.pages;
    $("#page-number").text(currentPage + " of " + totalPages);
  }
  // Initial page number display
  updatePageNumber();

  $("#previous-page").click(function () {
    table.page("previous").draw("page");
    updatePageNumber();
  });

  // Next page button click event
  $("#next-page").click(function () {
    table.page("next").draw("page");
    updatePageNumber();
  });
  // Function to update the number of entries displayed
  function updateEntriesCount() {
    var pageInfo = table.page.info();
    var entriesInfo = pageInfo.end - pageInfo.start;
    // var totalEntries = pageInfo.recordsTotal;
    $("#show-entries").text(`${entriesInfo} entries`);
  }

  // Initial entries count display
  updateEntriesCount();

  // Event listener for page change
  table.on("draw", function () {
    updateEntriesCount();
  });
  $("#search-table").keyup(function () {
    table.search(this.value).draw();
  });

  // Event listener for edit button
  $("#table-data").on("click", ".edit-Button", function () {
    // Get the row data
    var $row = $(this).closest("tr");
    var rowData = $row.find("td:first").text();

    // Prompt the user to enter the new value
    var newValue = prompt("Enter the new value:", rowData);

    // If the user entered a new value
    if (newValue !== null) {
      // Update the table cell with the new value
      $row.find("td:first").text(newValue);
    }
  });

  // Event listener for delete button
  $("#table-data").on("click", ".delete-button", function () {
    // Get the row to be deleted
    var rowToDelete = $(this).closest("tr");
    // Show confirmation dialog or perform delete directly
    if (confirm("Are you sure you want to delete this row?")) {
      // Delete the row
      rowToDelete.remove();
    }
  });

  // Event listener for export button

  // Event listener for export button
  $("#export-data").click(function () {
    // Convert table data to CSV format
    var csvContent = "data:text/csv;charset=utf-8,";
    $("#table-data")
      .find("tr")
      .each(function () {
        var rowData = [];
        $(this)
          .find("td")
          .each(function () {
            rowData.push($(this).text());
          });
        csvContent += rowData.join(",") + "\n";
      });

    // Create a link and trigger download
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();
  });

  // Event listener for import button
  $("#import-data").change(function (event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
      var importedPasswords = e.target.result.split("\n");
      $("#table-data tbody").empty(); // Clear existing table data

      importedPasswords.forEach(function (password) {
        var htmlRow =
          "<tr><td>" +
          password +
          "</td><td><button class='btn btn-success'>edit</button><button class='btn btn-danger'>Delete</button></td></tr>";
        $("#table-data tbody").append(htmlRow);
      });
    };

    reader.readAsText(file); // Read the file as text
  });

  //  my work on export button

  document.getElementById("process-btn").addEventListener("click", function () {
    var fileInput = document.getElementById("csv-file");
    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
      var contents = e.target.result;
      processCSV(contents);
    };

    reader.readAsText(file);
  });

  function processCSV(contents) {
    // Split contents by lines
    var lines = contents.split("\n");

    // Initialize an array to hold the data
    var data = [];

    // Process each line
    lines.forEach(function (line) {
      var rowData = line.split(","); // Assuming CSV is comma-separated
      var username = rowData[0];
      var password = rowData[1]; // Assuming the password is in the second column

      // Push an array containing username and password into the data array
      data.push([username, password]);
    });

    // Clear existing data in the DataTable
    table.clear().draw();

    // Add the new data and redraw the table
    table.rows.add(data).draw();
  }
});
