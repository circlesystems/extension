
var tableData = [
  {
    domain: "google.com",
    date: "23/02/2024 5:12:21",
    username: "example@gmail.com",
    password: "adjnla",
    action: "edit",
  },
  {
    domain: "yahoo.com",
    date: "23/02/2024 5:12:21",
    username: "user@yahoo.com",
    password: "ajklfkjl",
    action: "edit",
  },
];

var people_data = [
  ["<input type='checkbox'>", "abc@gmail.com"],
  ["<input type='checkbox'>", "abc@gmail.com"],
  ["<input type='checkbox'>", "abc@gmail.com"],
];
// Add data to the table
var groupsData = [
  ["<input type='checkbox'>", "Group001"],
  ["<input type='checkbox'>", "Group001"],
  ["<input type='checkbox'>", "Group001"],
];

document.addEventListener("DOMContentLoaded", function () {
  createPswds(tableData)
});
function createPswds(data, newprops) {
  var password_table = document.getElementById("password_table");
  if (password_table) {
    var password = new DataTable(password_table, {
      ...newprops,
      pagingType: "simple_numbers",
      pageLength: 4,
      destroy: true,
      searching: true,
      lengthChange: true,
      retrieve: true,
      oLanguage: {
        Search: "",
      },
      pagingType: "simple_numbers",
      dom: '<"toolbar d-flex px-3 pswds_toolbar  px-md-4 justify-content-center justify-content-lg-end justify-content-center  gap-3  flex-wrap align-items-center" ipfB> ',
      language: {
        searchPlaceholder: "Search",
        info: "Showing _TOTAL_ entries",
        searchBuilder: {
          value: "Option",
        },
        paginate: {
          first: "&laquo;",
          previous: "&lt;",
          next: "&gt;",
          last: "&raquo;",
        },
      },

      buttons: [
        {
          text: `Import`,
          className: 'btn btn-outline-primary', // Use className instead of class
          action: function (e, dt, node, config) {
            // Trigger the modal opening
            $("#importModal").modal("show");
          },
        },
        {
          text: `Export`,
          className: 'btn btn-outline-primary', // Use className instead of class
          action: function (e, dt, node, config) {
            // Trigger the modal opening
            $("#exportModal").modal("show");
          },
        },

        {
          text: `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.75 8.75H16.25V11.25H13.75V8.75ZM13.75 13.75H16.25V21.25H13.75V13.75ZM15 2.5C8.1 2.5 2.5 8.1 2.5 15C2.5 21.9 8.1 27.5 15 27.5C21.9 27.5 27.5 21.9 27.5 15C27.5 8.1 21.9 2.5 15 2.5ZM15 25C9.4875 25 5 20.5125 5 15C5 9.4875 9.4875 5 15 5C20.5125 5 25 9.4875 25 15C25 20.5125 20.5125 25 15 25Z" fill="#41B8B6"/>
            </svg> 
            `,
          class: "info-btn",
          attr: {
            titie: 'add a new contact',
            id: 'info-btn',
            'data-bs-toggle': "modal",
            'data-bs-target': "#pswdRules"
          }
        },
      ],
      info: true,
      initComplete: function () {
        $(document).ready(function () {
          $(".dt-paging-button").not(".active").hide();
        });
        const s = document.getElementById("dt-search-1");
        if (s) {
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
          $("#dt-search-1")
            .addClass("form-control rounded search_input")
            .attr("placeholder", "Search");
          $("#password_table_wrapper").addClass("table");
        }

        $(document)
          .off("click", ".edit-button")
          .on("click", ".edit-button", function () {
            var rowData = password.row($(this).closest("tr")).data();
            var index = password.row($(this).closest("tr")).index();
            editNote(rowData, index);
          });

        $(document)
          .off("click", ".delete-button")
          .on("click", ".delete-button", function () {
            var rowData = password.row($(this).closest("tr")).data();
            var index = password.row($(this).closest("tr")).index();
            deleteNote(rowData, index);
          });

        $(document)
          .off("click", ".share-button")
          .on("click", ".share-button", function () {
            var rowData = password.row($(this).closest("tr")).data();
            var index = password.row($(this).closest("tr")).index();
            shareNote(rowData, index);
          });
      },
      drawCallback: function (settings) {
        var api = this.api();
        var pageInfo = api.page.info();
        var targetLink = $('a[aria-current="page"]');
        targetLink.text(+pageInfo.page + 1 + " of " + pageInfo.pages);
        // Get all buttons with class btn-secondary
        var buttons = document.querySelectorAll('.btn.btn-secondary');

        // Loop through each button and remove the class
        buttons.forEach(function (button) {
          button.classList.remove('btn-secondary');
        });

      },
      columns: [
        { data: "domain", title: "Domain Name",className:  "text-start px-5 pt-4 pb-3",  },
        { data: "date", title: "Date" , className: "text-start px-4 pt-4 pb-3"  },
        {
          data: "username",
          className: "text-start px-5 pt-4 pb-3",
          title: "User Name",
          render: function (data, type, row) {
            return `<button class="border-0 bg-transparent" onclick="copyData('${data}')"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.041 2.16797L10.291 2.16797C9.09935 2.16797 8.12435 3.14297 8.12435 4.33464L8.12435 17.3346C8.12435 18.5263 9.09935 19.5013 10.291 19.5013L20.041 19.5013C21.2327 19.5013 22.2077 18.5263 22.2077 17.3346L22.2077 4.33464C22.2077 3.14297 21.2327 2.16797 20.041 2.16797ZM20.041 17.3346H10.291L10.291 4.33464L20.041 4.33464L20.041 17.3346ZM3.79102 16.2513L3.79102 14.0846H5.95768V16.2513H3.79102ZM3.79102 10.293H5.95768V12.4596H3.79102L3.79102 10.293ZM11.3743 21.668H13.541V23.8346H11.3743V21.668ZM3.79102 20.043V17.8763H5.95768V20.043H3.79102ZM5.95768 23.8346C4.76602 23.8346 3.79102 22.8596 3.79102 21.668H5.95768V23.8346ZM9.74935 23.8346H7.58268V21.668H9.74935V23.8346ZM15.166 23.8346V21.668H17.3327C17.3327 22.8596 16.3577 23.8346 15.166 23.8346ZM5.95768 6.5013V8.66797H3.79102C3.79102 7.4763 4.76602 6.5013 5.95768 6.5013Z" fill="#5F5F5F"/>
          </svg>
          </button> ${data}`;
          },
        },
        {
          data: "password",
          title: "Password",
          className: "text-start px-5 pt-4 pb-3 ",
          render: function (data, type, row) {
            return `<button class="border-0 bg-transparent" onclick="copyData('${data}')"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.041 2.16797L10.291 2.16797C9.09935 2.16797 8.12435 3.14297 8.12435 4.33464L8.12435 17.3346C8.12435 18.5263 9.09935 19.5013 10.291 19.5013L20.041 19.5013C21.2327 19.5013 22.2077 18.5263 22.2077 17.3346L22.2077 4.33464C22.2077 3.14297 21.2327 2.16797 20.041 2.16797ZM20.041 17.3346H10.291L10.291 4.33464L20.041 4.33464L20.041 17.3346ZM3.79102 16.2513L3.79102 14.0846H5.95768V16.2513H3.79102ZM3.79102 10.293H5.95768V12.4596H3.79102L3.79102 10.293ZM11.3743 21.668H13.541V23.8346H11.3743V21.668ZM3.79102 20.043V17.8763H5.95768V20.043H3.79102ZM5.95768 23.8346C4.76602 23.8346 3.79102 22.8596 3.79102 21.668H5.95768V23.8346ZM9.74935 23.8346H7.58268V21.668H9.74935V23.8346ZM15.166 23.8346V21.668H17.3327C17.3327 22.8596 16.3577 23.8346 15.166 23.8346ZM5.95768 6.5013V8.66797H3.79102C3.79102 7.4763 4.76602 6.5013 5.95768 6.5013Z" fill="#5F5F5F"/>
            </svg>
            </button> ******`;
          },
        },
        {
          title: "Action",
          orderable: false,
          searchable: false,
          className: 'text-nowrap  dt-center text-start px-5 pt-4 pb-3  target',
          defaultContent: `  <td class="d-flex  text-center justify-content-center ">
                        <button type="button" class="close border-0 pe-0 bg-transparent" id="edit-button"    data-bs-toggle="modal"
                            data-bs-target="#edit">
                            <img src="./assests/images/Icons-edit.png" />
                        </button>
                        </div>
                        <button type="button" class="close border-0 pe-0  bg-transparent" data-bs-toggle="modal"
                            data-bs-target="#delete">
                            <img src="./assests/images/delete.png" />
                        </button>
                        </div>
                        <button type="button" class="share-button close border-0 pe-0  bg-transparent">
                    <img src="./assests/images/share.png" />
                </button>
                        </div>
                    </td>`,
        },
      ],
      columnDefs: [
        { className: "f_1", targets: [0] },
        { className: "f_2", type: "date-dd-mm-yyyy", targets: [1] },
        { className: "f_3", targets: [2] },
        { className: "f_4", targets: [3] },
      ],
    });

    password.rows.add(data).draw();
    var tableRows = document.querySelectorAll("#password_table tbody tr");
    tableRows.forEach(function (row) {
      row.style.width = "100vw !important";
    });

  }

}
document.addEventListener("DOMContentLoaded", function () {
  var actions_groups_table = $("#actions_groups_table");
  if (actions_groups_table.length) {
    // Initialize DataTable for Actions and Groups
    var actions_groups = actions_groups_table.DataTable({
      // paging: false,
      lengthChange: false,
      dom: '<"toolbar d-flex bg_lightgray py-3 px-4 justify-content-between flex-row-reverse align-items-center"f>',
      info: false,
      initComplete: function () {
        $(".dt-paging-button").not("active").hide();
        const s = $("#dt-search-3");
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
          $("#dt-search-3")
            .addClass("form-control rounded search_input")
            .attr("placeholder", "Search");
          $("#notes_table_wrapper").addClass("table");
        }
      },
      columns: [
        {
          title: "Actions",
          responsive: true,
          orderable: false,
          searchable: false,
          className: "dt-center",
        },
        { title: "Group" },
      ],
      columnDefs: [
        { className: "f_1", targets: [0] },
        { className: "f_2", targets: [1] },
      ],
    });

    actions_groups.rows.add(groupsData).draw();
    // Add a button to select all checkboxes in the "Actions" column
    var selectAllCheckbox = $(
      '<div class="d-flex gap-3"><input type="checkbox"> <span>Select All</span></div>'
    );

    selectAllCheckbox.find('input[type="checkbox"]').on("change", function () {
      var isChecked = $(this).prop("checked");
      actions_groups_table
        .find('tbody tr input[type="checkbox"]')
        .prop("checked", isChecked);
    });

    actions_groups_table.parent().find(".toolbar").append(selectAllCheckbox);
  }
});

// People Data table for share popup
document.addEventListener("DOMContentLoaded", function () {
  var people_table = $("#people_table");
  if (people_table.length) {
    // Initialize DataTable for People
    var people = people_table.DataTable({

      lengthChange: true,
      orderable: false,
      searchable: false,
      pagingType: "simple_numbers",
      dom: '<"toolbar d-flex bg_lightgray py-3 px-4 justify-content-between flex-row-reverse align-items-center"f>',
      info: false,
      initComplete: function () {
        $(".dt-paging-button").not("active").hide();
        const s = $("#dt-search-5");
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
          $("#dt-search-5")
            .addClass("form-control rounded search_input")
            .attr("placeholder", "Search");
          $("#notes_table_wrapper").addClass("table");
        }
      },

      columns: [
        {
          title: "Actions",
          orderable: false,
          searchable: false,
          className: "dt-center",
        },
        { title: "Email" }, // Change title to Name for People table
      ],
      columnDefs: [
        { className: "f_1", targets: [0] },
        { className: "f_2", targets: [1] },
      ]
    });

    people.rows.add(people_data).draw();

    // Add a button to select all checkboxes in the "Actions" column for People table
    var selectAllCheckboxPeople = $(
      '<div class="d-flex gap-3"><input type="checkbox"> <span>Select All</span></div>'
    );

    selectAllCheckboxPeople
      .find('input[type="checkbox"]')
      .on("change", function () {
        var isChecked = $(this).prop("checked");
        people_table
          .find('tbody tr input[type="checkbox"]')
          .prop("checked", isChecked);
      });

    people_table.parent().find(".toolbar").append(selectAllCheckboxPeople);
  }
});


function clickInput() {
  document.getElementById('fileInput').click();
}
function handleFileUpload() {
  var fileInput = document.getElementById('fileInput');
  var file = fileInput.files[0];
  if (file.name.toLowerCase().endsWith('.csv')) {
    var reader = new FileReader();

    reader.onload = function (event) {
      var csvData = event.target.result;
      console.log(csvData)
      updateDataTable(csvData);
    };

    reader.readAsText(file);
  } else {
    alert('Please select a CSV file.');
  }
}

function updateDataTable(csvData) {
  var newData = parseCSV(csvData);
  var password_table = $("#password_table");
  if (password_table.length) {
    var password = password_table.DataTable();
    if (password) {
      console.log('chal gya')
      createPswds(newData, { destroy: true });
      $('#importModal').modal('hide')
    }
  }
}
function parseCSV(csvData) {
  var lines = csvData.split('\n');
  var newData = [];

  for (var i = 0; i < lines.length; i++) {
    var currentLine = lines[i].split(',');
    newData.push(currentLine.map(item => item.trim()));
    newData.shift()
  }

  return newData;
}


// function parseCSV(csvData) {
//   var lines = csvData.split('\n');
//   var headers = lines[0].split(',');
//   var newData = [];

//   for (var i = 1; i < lines.length; i++) {
//       var obj = {};
//       var currentLine = lines[i].split(',');

//       if (currentLine.length !== headers.length) {
//           continue;
//       }

//       for (var j = 0; j < headers.length; j++) {
//           obj[headers[j]] = currentLine[j] ? currentLine[j].trim() : '';
//       }

//       newData.push(obj);
//   }

//   return { headers, newData };
// }

// ! export the data in cvs file
document.addEventListener("DOMContentLoaded", function () {
  $(document).ready(function () {
    $("#export_data").on("click", function () {
      var table = $("#password_table").DataTable();
      var header = table.columns().header().toArray();
      var headerRow = header.map(function (th) {
        return $(th).text().trim();
      });

      // Get the table data
      var data = table.data().toArray();
      var allData = [headerRow].concat(data);
      var csvContent =
        "data:text/csv;charset=utf-8," +
        allData.map((e) => (Array.isArray(e) ? e.join(",") : e)).join("\n");
      var blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      var link = document.createElement("a");
      if (link.download !== undefined) {
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "table_data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.log("Your browser does not support this feature");
      }
    });
  });
})

const hideModal = (id) => {
  $(id).modal("hide");
};

// ! delete note
const deleteNote = (rowData, index) => {
  $("#delete").modal("show");

  $("#deleteConfirmBtn").on("click", function () {
    tableData.splice(index, 1);
    $("#password_table").DataTable().clear().rows.add(tableData).draw();
    $("#delete").modal("hide");
  });
};

//? edit password in table

const editNote = (rowData, index) => {
  let count = 0;
  $("#edit").modal("show");

  var editNoteDesc = $("#editNoteDescription");
  console.log(editNoteDesc);
  if (editNoteDesc.length >= 4) {
    editNoteDesc.val(rowData[3]);
    $("#saveEditBtn").on("click", function () {
      var newDescription = editNoteDesc.val();
      const newItem = [newDescription];
      console.log(newItem);

      const updatedData = tableData.map((item, ind) => {
        return ind === index ? newItem : item;
      });
      count++;
      data = updatedData;
      console.log(data, count);
      $("#password_table").DataTable().clear().rows.add(updatedData).draw();
      $("#edit").modal("hide");
    });
  }
};

//! copy text
function copyData(data) {
  // Create a textarea element to hold the data temporarily
  var textarea = document.createElement("textarea");
  // Set the value of the textarea to the data passed as parameter
  textarea.value = data;
  // Append the textarea to the document body
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  alert("Password Copied!")
}

//* Function to share note
const shareNote = (rowData, index) => {
  // Implement your logic to share the note here using the rowData
  console.log("Sharing note:", rowData, index);
  $("#share").modal("show");
  $(".fileName").text(rowData.domain);
  $("#date").text(rowData.date);
  $("#user").text(rowData.username);

  console.log(rowData);
};

const showalert = () => {
  $("#share").modal("hide");
  $("#NoteShared").modal("show");
};
