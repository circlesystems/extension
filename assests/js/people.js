

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
var data = [
    ["abc@gmail.com"],
    ["abc@gmail.com"],
    ["abc@gmail.com"],
    ["abc@gmail.com"],
    ["abc@gmail.com"],
    ["abc@gmail.com"],




];
document.addEventListener("DOMContentLoaded", function () {
    var notes_table = document.getElementById("notes_table");
    if (notes_table) {
        var notes = new DataTable(notes_table, {
            responsive: false,
            paging: true,
            lengthChange: true,
            pagingType: 'simple_numbers',
            dom: '<"toolbar d-flex justify-content-lg-end justify-content-center  gap-3  flex-wrap align-items-center "ipfB>',
            buttons: [
                {
                    text: `Group`,
                    action: function (e, dt, node, config) {
                        $('#share').modal('show');
                    }
                    
                },
                {
                    text: `Invite`,
                    action: function (e, dt, node, config) {
                        $('#add').modal('show');
                    }
                    
                },
            ],
            info: true,
            "initComplete": function () {
                $('.dt-paging-button').not('active').hide();
                const s = document.getElementById("dt-search-1")
                if (s) {
                    $('.dt-search').append(`
                        <span class="input-group-text position-absolute search_icon ps-3" id="basic-addon1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-search" viewBox="0 0 16 16">
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0">
                                </path>
                            </svg>
                        </span>
                    `).addClass('dt-search position-relative justify-content-between  align-content-center  rounded p-0');
                    $('#dt-search-1').addClass('form-control rounded search_input').attr('placeholder', 'Search');
                    $('#notes_table_wrapper').addClass("table")
                }
                var api = this.api();
                var pageInfo = api.page.info();
                console.log((pageInfo.page + 1) + " of " + +pageInfo.pages + 1)
                var targetLink = $('a[aria-current="page"]');
                targetLink.text((pageInfo.page + 1) + " of " + +pageInfo.pages + 1);
                 // Attach event listener for edit button
                // Event delegation to handle clicks on custom buttons
                $(document).off('click', '.edit-button').on('click', '.edit-button', function () {
                    var rowData = notes.row($(this).closest('tr')).data();
                    var index = notes.row($(this).closest('tr')).index();
                    editNote(rowData, index);
                });

                $(document).off('click', '.delete-button').on('click', '.delete-button', function () {
                    var rowData = notes.row($(this).closest('tr')).data();
                    var index = notes.row($(this).closest('tr')).index();
                    deleteNote(rowData, index);
                });

                $(document).off('click', '.share-button').on('click', '.share-button', function () {
                    var rowData = notes.row($(this).closest('tr')).data();
                    var index = notes.row($(this).closest('tr')).index();
                    shareNote(rowData, index);
                });
            },
            language: {
                "search": "Search records:",
                info: "Showing _TOTAL_ entries",
                searchBuilder: {
                    value: 'Option'
                },
                paginate: {
                    first: '&laquo;',
                    previous: '&lt;',
                    next: '&gt;',
                    last: '&raquo;'
                }
            },
            "drawCallback": function (settings) {
                var api = this.api();
                var pageInfo = api.page.info();
                console.log((+pageInfo.page + 1) + " of " + (+pageInfo.pages))
                var targetLink = $('a[aria-current="page"]');
                targetLink.text((+pageInfo.page + 1) + " of " + (+pageInfo.pages));
               

            },
            columns: [
                { title: "Title" },
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
                    </button>`
                }
            ],
            
        });

        notes.rows.add(data).draw();
        var tableRows = document.querySelectorAll('#notes_table tbody tr');
        tableRows.forEach(function (row) {

            row.style.width = '100vw !important'; // Set the desired width here

        });
    }
    

});

// Group Data table for share popup
document.addEventListener("DOMContentLoaded", function () {
    var actions_groups_table = $('#actions_groups_table');
    if (actions_groups_table.length) {
        // Initialize DataTable for Actions and Groups
        var actions_groups = actions_groups_table.DataTable({
            // paging: false,
            lengthChange: false,
            dom: '<"toolbar d-flex bg_lightgray py-3 px-4 justify-content-between flex-row-reverse align-items-center"fb>',
            info: false,
            "initComplete": function () {
                $('.dt-paging-button').not('active').hide();
                const s = $("#dt-search-3")
                if (s.length) {
                    $('.dt-search').append(`
                            <span class="input-group-text position-absolute search_icon ps-3" id="basic-addon1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-search" viewBox="0 0 16 16">
                                    <path
                                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0">
                                    </path>
                                </svg>
                            </span>
                        `).addClass('dt-search position-relative justify-content-between  align-content-center  rounded p-0');
                    $('#dt-search-3').addClass('form-control rounded search_input').attr('placeholder', 'Search');
                    $('#notes_table_wrapper').addClass("table")
                }
            },
            buttons:[
                {text:"Create Group",
            
            }
            ],
            columns: [
                {
                    title: "Actions",
                    orderable: false,
                    searchable: false,
                    className: "dt-center",
                },
                { title: "Group" },
            ],
            
        });


        actions_groups.rows.add(groupsData).draw();
    }
});

// People Data table for share popup
document.addEventListener("DOMContentLoaded", function () {
    var people_table = $('#people_table');
    if (people_table.length) {
        // Initialize DataTable for People
        var people = people_table.DataTable({
            //  paging: false,
            lengthChange: true,
            orderable: false,
            searchable: false,
            pagingType: 'simple_numbers',
            dom: '<"toolbar d-flex bg_lightgray py-3 px-4 justify-content-between  align-items-center"fB>',
            buttons: [
                {
                    text: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/>
                    </svg>
                    Group`,
                    action: function (e, dt, node, config) {
                        // $('#share').modal('hide');
                        $('#create_group').modal('show');
                    }
                    
                }],
            info: false,
            "initComplete": function () {
                $('.dt-paging-button').not('active').hide();
                const s = $("#dt-search-5")
                if (s.length) {
                    $('.dt-search').append(`
                 <span class="input-group-text position-absolute search_icon ps-3" id="basic-addon1">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-search" viewBox="0 0 16 16">
                         <path
                             d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0">
                         </path>
                     </svg>
                 </span>
             `).addClass('dt-search position-relative justify-content-between  align-content-center  rounded p-0');
                    $('#dt-search-5').addClass('form-control rounded search_input').attr('placeholder', 'Search');
                    $('#notes_table_wrapper').addClass("table")
                }
            },
            columns: [
                {
                    title: "Name",
                    orderable: false,
                    searchable: false,
                    className: "dt-center",
                },
                { title: "Actions" }, // Change title to Name for People table
            ],
            columnDefs: [
                { className: "f_1", targets: [0] },
                { className: "f_2", targets: [1] }
            ]
        });


        people.rows.add(people_data).draw();

    }
   
})
// People Data table for creating popup
document.addEventListener("DOMContentLoaded", function () {
    var cg_table = $('#cg_table');
    if (cg_table.length) {
        var cg = cg_table.DataTable({
            lengthChange: true,
            orderable: false,
            searchable: false,
            pagingType: 'simple_numbers',
            dom: '<"toolbar d-flex bg_lightgray py-3 px-4 justify-content-between  align-items-center"f>',
            info: false,
            "initComplete": function () {
                $('.dt-paging-button').not('active').hide();
                const s = $("#dt-search-7")
                if (s.length) {
                    $('.dt-search').append(`
                 <span class="input-group-text position-absolute search_icon ps-3" id="basic-addon1">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="bi bi-search" viewBox="0 0 16 16">
                         <path
                             d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0">
                         </path>
                     </svg>
                 </span>
             `).addClass('dt-search position-relative justify-content-between  align-content-center  rounded p-0');
                    $('#dt-search-7').addClass('form-control rounded search_input').attr('placeholder', 'Search');
                    $('#notes_table_wrapper').addClass("table")
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
        cg.rows.add([
            [null, "John"],
            [null, "Doe"],
            [null, "Jane"],
            // Add more rows as needed
        ]).draw();

        // Add event listener to checkboxes for selection
        cg_table.on('change', '.select-checkbox', function () {
            var row = $(this).closest('tr');
            if (this.checked) {
                row.addClass('selected');
            } else {
                row.removeClass('selected');
            }
        });
    }
});

// Function to share note
const shareNote = (rowData, index) => {
    // Implement your logic to share the note here using the rowData
    console.log("Sharing note:", rowData, index);
    $('#share').modal('show');
    $('.fileName').text(rowData[0])
}
const showalert = () => {
    $('#share').modal('hide');
    $('#NoteShared').modal('show');
}

const editNote = (rowData, index) => {
    let count = 0;
    $('#edit').modal('show');
    var titleInput = $('#editNoteTitle');
    var editNoteDesc = $('#editNoteDescription');
    if (titleInput.length && editNoteDesc.length) {
        titleInput.val(rowData[0]);
        editNoteDesc.val(rowData[1]);
        $('#saveEditBtn').on('click', function () {
            var newTitle = titleInput.val();
            var newDescription = editNoteDesc.val();
            const newItem = [newTitle, newDescription];

            const updatedData = data.map((item, ind) => {
                return ind === index ? newItem : item;
            });
            count++;
            data = updatedData;
            console.log(data, count)
            $('#notes_table').DataTable().clear().rows.add(updatedData).draw();
            $('#edit').modal('hide');
        });
    }
    
}


// Function to delete note
const deleteNote = (rowData, index) => {
    $('#delete').modal('show');
   
    $('#deleteConfirmBtn').on('click', function () {
        data.splice(index, 1);
        $('#notes_table').DataTable().clear().rows.add(data).draw();
        $('#delete').modal('hide');
    });
}


const hideModal = (id) => {
    $(id).modal('hide');
}
document.addEventListener("DOMContentLoaded", function () {
    // Get the "Send Invite" button element
    var sendInviteBtn = document.getElementById("sendInvite");

    // Add a click event listener to the button
    sendInviteBtn.addEventListener("click", function () {
        // Get the parent container of the button
        var container = document.getElementById("sendInviteContainer");

        // Replace the content of the parent container with the desired content
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

            navigator.clipboard.writeText(inviteUrl).then(function () {
                alert("Invite link copied to clipboard: " + inviteUrl);
                $('#add').modal('hide');
            }, function (err) {
                console.error("Failed to copy URL to clipboard: ", err);
            });
        });
    });
});
