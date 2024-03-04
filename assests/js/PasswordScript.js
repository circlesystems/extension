const tableData = [{ password: "amirsaeed" }, { password: "askfd" }];

// Function to generate table rows dynamically
function generateTableRows() {
  const tbody = document.querySelector("#table-data tbody");
  let rowsHTML = "";
  tableData.forEach((data) => {
    rowsHTML += `
        <tr>
          <td>${data.password}</td>
          <td>
          <button class="btn " id="edit-button" data-bs-toggle="modal" data-bs-target="#editModal">
          <img src="./assests//images/Icons-edit.png" alt="Edit" />
      </button>
      <!-- Bootstrap Modal for Edit -->
      <div class="modal fade popup" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down modal-sm custom-width-edit"> <!-- Adjust size by changing modal-lg to modal-sm, modal-md, or custom size -->
            <div class="modal-content  ">
              <div class="d-flex flex-row popup-heading ">
                  <h5 class="modal-title flex-grow-1 text-start" id="exportModalLabel" style="padding-left:10px">Password Note</h5>
                  <button type="button" class="btn-close bg-light close-button "  data-bs-dismiss="modal" aria-label="Close" style="padding-top: 20px; padding-left: 20px;"></button>
                </div>
                
              <div class="modal-body">
                <p class="text-start">Note:</p>
                
                  
                 <input class="edit-input" placeholder="enter note" >

                    </input>
                  
                    </div>
                    <button type="button" class="btn confirm-button " id="edit-comfirm-button" >Save</button>
                
                
                
                </div>
          </div>
        </div>
        <!-- Delete Button -->
        <button class="btn "  id="delete-button" data-bs-toggle="modal" data-bs-target="#deleteModal">
            <img src="./assests/images/delete.png" alt="Delete" />
</button>

            <div class="modal fade popup" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down  custom-width-edit"> 
                  <div class="modal-content ">
                    <div class="d-flex flex-row popup-heading container ">
                        <h5 class="modal-title flex-grow-1 text-start " id="exportModalLabel" style="color: rgb(123, 123, 125);">Confirm Delete</h5>
                        <button type="button" class="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close" style="padding-top: 20px; padding-left: 20px;"></button>
                      </div>
                      <div class="model-body">
                    <div class="popup-delete-card bg-light ">
                        
                        <p class=" d-flex align-items-sm-start">Are you certain wish to delete this password?</p>
                     <p class="text-start"> Note:</p>
                      <p class="text-start">
    
                        This is <span  style="font-weight: bold;">will remove the password for all users </span>with whom it is be shared.Once deleted this action can't be undone.
                  
                    </p>
                    
                        
                      </div>
                    </div>
                      <div class="d-flex flex-row justify-content-between delete-buttons">
                      <button type="button" class="btn delete-button  " >yes,Delete</button>
                      <button type="button" class="btn delete-button" style="background-color: #41B8B6!important;" onclick="hideModal()";} >Don't Delete</button>
                    </div> 
                  </div>
                </div>
              </div>
              <button class="btn" id="share-button" >
                            <img src="./assests/images/share.png" alt="Share" />
                          </button>
          </td>
        </tr>
      `;
  });
  tbody.innerHTML = rowsHTML;
}

function hideModal() {
  $("#deleteModal").modal("hide");
}
// Function to initialize DataTable

// Call the functions to generate table rows and initialize DataTable
generateTableRows();
// initializeDataTable();
$(document).ready(function () {
  // Initialize DataTable with Buttons extension
  var table = $("#table-data").DataTable({
    pageLength: 4,
    // paging: false,

    order: [[3, "desc"]],
    lengthChange: true,

    order: [[0, "asc"]],
    bLengthChange: true,
    bFilter: true,
    dom: "t",
  });

  // Function to update the page number display
  function updatePageNumber() {
    var pageInfo = table.page.info();
    var currentPage = pageInfo.page + 1;
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

  $("#table-data").on("click", ".edit-Button", function () {
    // Get the row data
    var $row = $(this).closest("tr");
    var rowData = $row.find("td:first").text();

    // Fill the input field in the modal with the current value
    $("#editModal .edit-input").val(rowData);

    // Open the edit modal
    $("#editModal").modal("show");
  });

  // Function to handle saving the edited value
  $("#edit-comfirm-button").on("click", function () {
    var $row = $(this).closest("tr");
    var rowData = $row.find("td:first").text();
    // Get the edited value from the input field inside the modal
    var newValue = $("#editModal .edit-input").val();
    console.log(newValue);
    // Update the appropriate cell in the table with the new value
    if (newValue !== null) {
      // Update the table cell with the new value
      $row.find("td:first").text(newValue);
    }

    // Close the modal
    $("#editModal").modal("hide");
  });

  // Event listener for delete button
  // Event listener for the delete button
  $("#table-data").on("click", ".delete-button", function () {
    // Get the row data
    var row = $(this).closest("tr");

    // Store the row data in a data attribute of the delete modal
    $("#deleteModal").data("deleteRow", row);

    // Open the delete modal
    $("#deleteModal").modal("show");
  });

  // Event listener for the delete confirmation button inside the delete modal
  $("#deleteModal").on("click", ".delete-button", function () {
    // Retrieve the stored row data from the delete modal
    var row = $("#deleteModal").data("deleteRow");

    // Remove the row from the DataTable and redraw
    table.row(row).remove().draw();

    // Close the delete modal
    $("#deleteModal").modal("hide");
  });

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
    $("#exportModal").modal("hide");
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
  // sorting the table

  function toggleSorting() {
    var columnIndex = 0; // Set the column index for sorting
    var currentOrder = table.order()[0]; // Get the current sorting order
    var newOrder = currentOrder[1] === "asc" ? "desc" : "asc"; // Toggle sorting order

    // Apply the new sorting order to the table
    table.order([[columnIndex, newOrder]]).draw();
  }

  // Event listener for the sorting button
  document
    .getElementById("sorting-button")
    .addEventListener("click", function () {
      // Call the function to toggle sorting
      toggleSorting();
    });

  // Function to handle file upload
  function handleFileUpload() {
    var fileInput = document.getElementById("fileInput");
    var file = fileInput.files[0];
    if (file.name.toLowerCase().endsWith(".csv")) {
      var reader = new FileReader();

      // FileReader onload event
      reader.onload = function (event) {
        var csvData = event.target.result;
        var data = parseCSV(csvData);
        updateGrid(data);
      };

      // Read the uploaded file as text
      reader.readAsText(file);
    } else {
      alert("Please select a CSV file.");
    }
  }

  // Function to parse CSV data
  function parseCSV(csvData) {
    var lines = csvData.split("\n");
    var result = [];

    // Assuming the first row contains column headers
    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentLine = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        // Convert 'true'/'false' to boolean if applicable
        var value = currentLine[j].trim();
        if (value.toLowerCase() === "true") {
          obj[headers[j]] = true;
        } else if (value.toLowerCase() === "false") {
          obj[headers[j]] = false;
        } else {
          obj[headers[j]] = currentLine[j];
        }
      }

      result.push(obj);
    }

    return result;
  }

  // Function to update the grid (example)
  function updateGrid(data) {
    // Implement grid update logic here
    console.log("Parsed CSV data:", data);
    // Example: update a table with the parsed data
  }

  function parseCSV(csvData) {
    var lines = csvData.split("\n");
    var result = [];

    // Assuming the first row contains column headers
    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentLine = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        // Convert 'true'/'false' to boolean if applicable
        var value = currentLine[j].trim();
        if (value.toLowerCase() === "true") {
          obj[headers[j]] = true;
        } else if (value.toLowerCase() === "false") {
          obj[headers[j]] = false;
        } else {
          obj[headers[j]] = currentLine[j];
        }
      }

      result.push(obj);
    }

    return result;
  }

  function updateGrid(data) {
    // Implement grid update logic here
    console.log("Parsed CSV data:", data);
    // Example: update a table with the parsed data
  }
});
