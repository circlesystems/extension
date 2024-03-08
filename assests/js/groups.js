// Data table for editing group
document.addEventListener("DOMContentLoaded", function () {
  var eg_table = $("#eg_table");
  if (eg_table.length) {
    var cg = eg_table.DataTable({
      lengthChange: true,
      orderable: false,
      searchable: false,
      pagingType: "simple_numbers",
      dom: '<"toolbar d-flex bg_lightgray py-3 px-4 justify-content-between  align-items-center"f>',
      info: false,
      initComplete: editSearchUI,
      ordering: false,
      columns: [
        {
          title: "Select",
          data: null,
          render: function (data, type, row) {
            return '<input type="checkbox" class="select-checkbox">';
          },
          className: "dt-center",
        },
        {
          title: "Name",
          className: "dt-center",
        },
        {
          title: "Actions",
          className: "dt-center",
          render: function (data, type, row) {
            return "<button class='p_btn permissions-button'>Permissions</button>"; 
          },
        },
      ],
    });

    // Add dummy data
    cg.rows
      .add([
        [null, "abc@gmail.com", null],
        [null, "abc@gmail.com", null],
        [null, "abc@gmail.com", null],
        [null, "abc@gmail.com", null],
        [null, "abc@gmail.com", null],
        [null, "abc@gmail.com", null],
        [null, "abc@gmail.com", null],
      ])
      .draw();
    // Add event listener to checkboxes for selection
    eg_table.on("change", ".select-checkbox", function () {
      var row = $(this).closest("tr");
      if (this.checked) {
        row.addClass("selected");
      } else {
        row.removeClass("selected");
      }
    });
    // Add event listener to "Permissions" buttons
    eg_table.on("click", ".permissions-button", function () {
      var rowData = cg.row($(this).closest("tr")).data();
      mper_table(rowData); // Call mper_table function and pass row data
    });
  }
});
// Data table for creating group
document.addEventListener("DOMContentLoaded", function () {
  var cg_table = $("#cg_table");
  if (cg_table.length) {
    var cg = cg_table.DataTable({
      lengthChange: true,
      orderable: false,
      searchable: false,
      pagingType: "simple_numbers",
      dom: '<"toolbar d-flex bg_lightgray py-3 px-4 justify-content-between  align-items-center"f>',
      info: false,
      initComplete: function () {
        $(".dt-paging-button").not("active").hide();
        const s = $("#dt-search-7");
        if (s.length) {
          $(".dt-search")
            .append(
              `
                 <span class="input-group-text position-absolute search_icon ps-3" id="basic-addon1">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-search" viewBox="0 0 16 16">
                         <path
                             d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0">
                         </path>
                     </svg>
                 </span>
             `
            )
            .addClass(
              "dt-search position-relative justify-content-between  align-content-center  rounded p-0"
            );
          $("#dt-search-7")
            .addClass("form-control rounded search_input")
            .attr("placeholder", "Search");
          $("#notes_table_wrapper").addClass("table");
        }
      },
      columns: [
        {
          title: "Select",
          data: null,
          render: function (data, type, row) {
            return '<input type="checkbox" class="select-checkbox">';
          },
          orderable: false,
          searchable: false,
          className: "dt-center",
        },
        {
          title: "Name",
          className: "dt-center",
        },
      ],
    });

    // Add dummy data
    cg.rows
      .add([
        [null, "John"],
        [null, "Doe"],
        [null, "Jane"],
        // Add more rows as needed
      ])
      .draw();

    // Add event listener to checkboxes for selection
    cg_table.on("change", ".select-checkbox", function () {
      var row = $(this).closest("tr");
      if (this.checked) {
        row.addClass("selected");
      } else {
        row.removeClass("selected");
      }
    });
  }
});
const mper_table = (rowData) => {
  console.log("Edit permissions for " + rowData);
  $("#share").modal("hide");
  $("#edit_group").modal("hide");
  $('#mp_group').modal("show");
};
const confirmDelete=()=>{
  alert("deleted 1 row");
  $("#delete").modal("hide");
  $("#share").modal("show");
}
const cancelDelete=()=>{
  $("#share").modal("show");
  $("#delete").modal("hide");
}
const editGroup = (rowData, index) => {
  $("#share").modal("hide");
  $("#edit_group").modal("show");
};
function se_row(){
  $("#edit_group").modal("hide");
  $("#share").modal("show");
}
function create_group(){
  $("#create_group").modal("hide");
  $("#share").modal("show");
 
}
function editSearchUI() {
  $(".dt-paging-button").not("active").hide();
  const s = $("[id^='dt-search-']"); // Select elements with IDs starting with "dt-search-"
  if (s.length) {
      s.each(function() {
          var searchInput = $(this);
          searchInput.closest(".dt-search")
              .append(
                  `
                  <span class="input-group-text position-absolute search_icon ps-3" id="basic-addon1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                          class="bi bi-search" viewBox="0 0 16 16">
                          <path
                              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0">
                          </path>
                      </svg>
                  </span>
                  `
              )
              .addClass(
                  "dt-search position-relative justify-content-between  align-content-center  rounded p-0"
              );
          searchInput
              .addClass("form-control rounded search_input")
              .attr("placeholder", "Search");
          $("#notes_table_wrapper").addClass("table");
      });
  }
}
const deleteGroup=(rowData, index) => {
  console.log(rowData,index )
  $("#share").modal("hide");
  $("#delete").modal("show");
};