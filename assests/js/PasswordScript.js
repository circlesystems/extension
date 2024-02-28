const dataSet = [
  ["Tiger Nixon"],
  ["Garrett Winters"],
  ["Ashton Cox"],
  ["Cedric Kelly"],
];

$(document).ready(function () {
  // Initialize DataTable with Buttons extension
  var table = $("#example").DataTable({
    columns: [
      {
        title: function () {
          const title = document.createElement("p");
          title.textContent = "Password";
          title.style.fontWeight = "bold";
          title.style.textAlign = "center";
          return title;
        },
      },
      {
        title: function () {
          const title = document.createElement("p");
          title.textContent = "Action";
          title.style.fontWeight = "bold";
          title.style.textAlign = "center";
          return title;
        },
      },
      // Adding a column for action buttons
    ],

    data: dataSet,
    paging: false, // Disable pagination
    info: false, // Disable table information
    searching: false, // Disable search field
    columnDefs: [
      {
        targets: -1,
        orderable: false,
        searchable: false,
        render: function (data, type, full, meta) {
          return `
          <button type="button" class="btn  editButton" data-index="${meta.row}"><img src="./assests/images/edit.png" alt="Edit"/></button>
          <button type="button" class="btn deleteButton" data-index="${meta.row}"><img src="./assests/images/delete.png" alt="Delete"/></button>
        `;
        },
      },
    ],
  });

  // Add event listener to each edit button
  $("#example").on("click", ".editButton", function () {
    var rowIndex = $(this).data("index");
    var newValue = prompt("Enter new value for the column:");
    if (newValue !== null) {
      table.cell(rowIndex, 0).data(newValue).draw();
    }
  });

  // Add event listener to each delete button
  $("#example").on("click", ".deleteButton", function () {
    var rowIndex = $(this).data("index");
    table.row(rowIndex).remove().draw();
  });

  // Event listener for custom search input
  $("#customSearchInput").on("input", function () {
    var searchText = $(this).val();
    table.search(searchText).draw();
  });
});
