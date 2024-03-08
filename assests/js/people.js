// Add data to the People table
var people_data = [
  ["<input type='checkbox'>", "abc@gmail.com"],
  ["<input type='checkbox'>", "abc@gmail.com"],
  ["<input type='checkbox'>", "abc@gmail.com"],
  ["<input type='checkbox'>", "abc@gmail.com"],
  ["<input type='checkbox'>", "abc@gmail.com"],
  ["<input type='checkbox'>", "abc@gmail.com"],
  ["<input type='checkbox'>", "abc@gmail.com"],
  ["<input type='checkbox'>", "abc@gmail.com"],
  ["<input type='checkbox'>", "abc@gmail.com"],
];
// Add data to the table
var groupsData = [
  ["<input type='checkbox'>", "Group001"],
  ["<input type='checkbox'>", "Group001"],
  ["<input type='checkbox'>", "Group001"],
  ["<input type='checkbox'>", "Group001"],
  ["<input type='checkbox'>", "Group001"],
  ["<input type='checkbox'>", "Group001"],
  ["<input type='checkbox'>", "Group001"],
  ["<input type='checkbox'>", "Group001"],
  ["<input type='checkbox'>", "Group001"],
  ["<input type='checkbox'>", "Group001"],
];
var groups_list=[
    ["abc@gmail.com"],
  ["abc@gmail.com"],
  ["abc@gmail.com"],
  ["abc@gmail.com"],
  ["abc@gmail.com"],
  ["abc@gmail.com"],
]
var data = [
  ["abc@gmail.com"],
  ["abc@gmail.com"],
  ["abc@gmail.com"],
  ["abc@gmail.com"],
  ["abc@gmail.com"],
  ["abc@gmail.com"],
];
// Main table for People Screen
document.addEventListener("DOMContentLoaded", function () {
  var notes_table = document.getElementById("notes_table");
  if (notes_table) {
    var notes = new DataTable(notes_table, {
      responsive: false,
      paging: true,
      lengthChange: true,
      pagingType: "simple_numbers",
      dom: '<"toolbar d-flex justify-content-lg-end justify-content-center  gap-3 px-3 flex-wrap align-items-center "ipfB>',
      buttons: [
        {
          text: `Group`,
          action: function (e, dt, node, config) {
            $("#share").modal("show");
          },
        },
        {
          text: `Invite`,
          action: function (e, dt, node, config) {
            $("#add").modal("show");
          },
        },
      ],
      info: true,
      initComplete: function () {
        $(".dt-paging-button").not("active").hide();
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
          $("#notes_table_wrapper").addClass("table");
        }
        var api = this.api();
        var pageInfo = api.page.info();
        console.log(pageInfo.page + 1 + " of " + +pageInfo.pages + 1);
        var targetLink = $('a[aria-current="page"]');
        targetLink.text(pageInfo.page + 1 + " of " + +pageInfo.pages + 1);
        // Attach event listener for edit button
        // Event delegation to handle clicks on custom buttons
        // $(document)
        //   .off("click", ".edit-button")
        //   .on("click", ".edit-button", function () {
        //     var rowData = notes.row($(this).closest("tr")).data();
        //     var index = notes.row($(this).closest("tr")).index();
        //     editGroup(rowData, index);
        //   });

        // $(document)
        //   .off("click", ".delete-button")
        //   .on("click", ".delete-button", function () {
        //     var rowData = notes.row($(this).closest("tr")).data();
        //     var index = notes.row($(this).closest("tr")).index();
        //     deleteNote(rowData, index);
        //   });

        // $(document)
        //   .off("click", ".share-button")
        //   .on("click", ".share-button", function () {
        //     var rowData = notes.row($(this).closest("tr")).data();
        //     var index = notes.row($(this).closest("tr")).index();
        //     shareNote(rowData, index);
        //   });
      },
      language: {
        search: "Search records:",
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
      drawCallback: function (settings) {
        var api = this.api();
        var pageInfo = api.page.info();
        console.log(+pageInfo.page + 1 + " of " + +pageInfo.pages);
        var targetLink = $('a[aria-current="page"]');
        targetLink.text(+pageInfo.page + 1 + " of " + +pageInfo.pages);
      },
      columns: [
        { title: "Email" },
        {
          title: "Actions",
          orderable: false,
          searchable: false,
          className: "dt-center",
          defaultContent: `  
                    <button type="button" class="edit-button close border-0 pe-0 pe-lg-2 bg-transparent">
                        <img src="./assests/images/edit.png" />
                    </button>
                    <button type="button" class="delete-button close border-0 pe-0 pe-lg-2 bg-transparent">
                        <img src="./assests/images/delete.png" />
                    </button>
                    <button type="button" class="share-button close border-0 pe-0 pe-lg-2 bg-transparent">
                        <img src="./assests/images/share.png" />
                    </button>`,
        },
      ],
    });

    notes.rows.add(data).draw();
    var tableRows = document.querySelectorAll("#notes_table tbody tr");
    tableRows.forEach(function (row) {
      row.style.width = "100vw !important"; // Set the desired width here
    });
  }
});

// Data table for groups list popup
document.addEventListener("DOMContentLoaded", function () {
  var people_table = $("#people_table");
  if (people_table.length) {
    // Initialize DataTable for People
    var people = people_table.DataTable({
      paging: true,
      lengthChange: true,
      orderable: false,
      searchable: false,
      pagingType: "simple_numbers",
      dom: '<"toolbar d-flex  gap-4 px-3  bg_lightgray py-3 px-1 px-lg-4 justify-content-between  align-items-center"fBip>',
      buttons: [
        {
          text: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/>
                    </svg>
                    Group`,
          action: function (e, dt, node, config) {
            $('#share').modal('hide');
            $("#create_group").modal("show");
          },
        },
      ],
      info: true,
      language: {
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
      drawCallback: function (settings) {
        var api = this.api();
        var pageInfo = api.page.info();
        console.log(+pageInfo.page + 1 + " of " + +pageInfo.pages);
        var targetLink = $('a[aria-current="page"]');
        targetLink.text(+pageInfo.page + 1 + " of " + +pageInfo.pages);
      },
      initComplete: function () {
        $(".dt-paging-button").not("active").hide();
        const s = $("#dt-search-5");
        if (s.length) {
          $(".dt-search")
            .append(
              `
                 <span class="input-group-text  position-absolute search_icon ps-3" id="basic-addon1">
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
          title: "Name",
          orderable: false,
          searchable: false,
          className: "dt-center",
        },
        {
          title: "Actions",
          orderable: false,
          searchable: false,
          className: "dt-center",
          defaultContent: `  
                    <button type="button" class="edit-group-button close border-0 pe-0 pe-lg-2 bg-transparent">
                        <img src="./assests/images/edit.png" />
                    </button>
                    <button type="button" class=" delete-group-btn close border-0 pe-0 pe-lg-2 bg-transparent">
                        <img src="./assests/images/delete.png" />
                    </button>
                    <button type="button" class="add-pswd-btn close border-0 pe-0 pe-lg-2 bg-transparent">
                    <img src="./assests/images/permissions.png" />
                </button>
                <button type="button" class="show-notes-button close border-0 pe-0 pe-lg-2 bg-transparent">
                <img src="./assests/images/Icons-edit.png" />
            </button>`
        }, 
      ],
    });
    people.rows.add(groups_list).draw();
  }
    people_table.on('click', '.edit-group-button', function() {
      var rowData = people.row($(this).parents('tr')).data();
      editGroup(rowData, people.row($(this).parents('tr')).index());
    });
    people_table.on('click', '.delete-group-btn', function() {
      var rowData = people.row($(this).parents('tr')).data();
      deleteGroup(rowData, people.row($(this).parents('tr')).index());
    });
    people_table.on('click', '.add-pswd-btn', function() {
      var rowData = people.row($(this).parents('tr')).data();
      showpswdList(rowData, people.row($(this).parents('tr')).index());
    });
    people_table.on('click', '.show-notes-button', function() {
      var rowData = people.row($(this).parents('tr')).data();
      showNotesModal(rowData, people.row($(this).parents('tr')).index());
    });
    people.rows.add(groups_list).draw();
  
});


// Function to share note
const shareNote = (rowData, index) => {
  // Implement your logic to share the note here using the rowData
  console.log("Sharing note:", rowData, index);
  $("#share").modal("show");
  $(".fileName").text(rowData[0]);
};
const showalert = () => {
  $("#share").modal("hide");
  $("#NoteShared").modal("show");
};



// Function to delete note
const deleteNote = (rowData, index) => {
  $("#delete").modal("show");

  $("#deleteConfirmBtn").on("click", function () {
    data.splice(index, 1);
    $("#notes_table").DataTable().clear().rows.add(data).draw();
    $("#delete").modal("hide");
  });
};

const hideModal = (id) => {
  $(id).modal("hide");
};
document.addEventListener("DOMContentLoaded", function () {
  var sendInviteBtn = document.getElementById("sendInvite");
  sendInviteBtn.addEventListener("click", function () {
    var container = document.getElementById("sendInviteContainer");
    $('#snd-btn').css("display", 'none');
    container.innerHTML = `
            <div class="pt-4">
                <p class="fs-class">Instructions</p>
                <div>
                    <b>Please share this URL with the person you are inviting.</b>
                    <p>They should paste it into their web browser. A QR code will then appear, which they should scan using the Circle App.</p> 
                </div>
                <div class="d-flex w-100 gap-0 b_light rounded-1 overflow-hidden">
                    <input disabled class="ps-4 border-0 flex-grow-1" value="https://circleaccess.circlesecurity.ai/login" id="inviteUrlInput"/>
                    <span class="bg_main cursor-pointer p-3" id="copyButton"><img src="./assests/images/copy_all.png" alt="copy img"/></span>
                </div>
            </div>
        `;

    // Add click event listener to the copy image
    var copyButton = document.getElementById("copyButton");
    copyButton.addEventListener("click", function () {
      // Get the value of the input field
      var inviteUrlInput = document.getElementById("inviteUrlInput");
      var inviteUrl = inviteUrlInput.value;

      navigator.clipboard.writeText(inviteUrl).then(
        function () {
          alert("Invite link copied to clipboard: " + inviteUrl);
          $("#add").modal("hide");
        },
        function (err) {
          console.error("Failed to copy URL to clipboard: ", err);
        }
      );
    });
  });
});
