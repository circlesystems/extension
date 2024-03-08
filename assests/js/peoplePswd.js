const pswds_list = [
    {
        isChecked: false,
        domain: "google.com",
        date: "23/02/2024 5:12:21",
        username: "example@gmail.com",
        password: "adjnla",
        action: "edit",
    },
    {
        isChecked: true,
        domain: "yahoo.com",
        date: "23/02/2024 5:12:21",
        username: "user@yahoo.com",
        password: "ajklfkjl",
        action: "edit",
    }]

const notes_list = [
    {
        isChecked: true,
        text: "",
        date: "23/02/2024 5:12:21",
        title: "Note1"
    },]
// Function to initialize the data table for groupPasswords
function showpswdList(rowdata, index) {
    console.log(rowdata, index);
    var gp_table = $("#group_pswds_table");
    var passwords = gp_table.DataTable({
        paging: true,
        lengthChange: true,
        orderable: false,
        searchable: false,
        pagingType: "simple_numbers",
        dom: '<"toolbar pt-2 d-flex flex-wrap align-items-center gap-1 justify-content-between"ftip>',
        info: true,
        initComplete: editSearchUI,
        columns: [
            {
                title: "Password",
                orderable: true,
                searchable: false,
                className: "dt-center",
                render: function (data, type, row) {
                    return `
                            <div class="ps-3 d-flex flex-column align-items-start justify-content-start py-3 align-items-start ">
                                <div>
                                    <span class="fileName">${row.domain}</span> |
                                    <span id="date">${row.date}</span>
                                </div>
                                <div>
                                    Username: <span id="user">${row.username}</span>
                                </div>
                                <div>Password:
                                    <span id="password">${row.password}</span>
                                </div>
                            </div>`;
                }
            },
            {
                title: "Actions",
                orderable: false,
                searchable: false,
                className: "dt-center",
                data: null,
                defaultContent: `<button type="button" class="revoke">Revoke</button>`
            },
        ],
    });

    passwords.rows.add(pswds_list).draw();
    $('#share').modal("hide");
    $('#group_pswds').modal("show");
}
// Function to show add pswd modal
function addPswdtoGroup() {

    var add_psw_table = $("#add_psw_table");
    var newpswd = add_psw_table.DataTable({
        paging: true,
        lengthChange: true,
        orderable: false,
        searchable: false,
        pagingType: "simple_numbers",
        dom: '<"toolbar pt-2 d-flex flex-wrap align-items-center gap-1 justify-content-between"ftip>',
        info: true,
        initComplete: editSearchUI,
        columns: [
            {
                title: "Action",
                orderable: false,
                searchable: false,
                className: "dt-center",
                render: function (data, type, row) {
                    var isChecked = row.isChecked ? "checked" : "";
                    return `<input type="checkbox" ${isChecked} disabled>`;
                }
            },
            {
                title: "Password",
                orderable: true,
                searchable: false,
                className: "dt-center",
                render: function (data, type, row) {
                    return `
                            <div class="ps-3 d-flex flex-column align-items-start justify-content-start py-3 align-items-start ">
                                <div>
                                    <span class="fileName">${row.domain}</span> |
                                    <span id="date">${row.date}</span>
                                </div>
                                <div>
                                    Username: <span id="user">${row.username}</span>
                                </div>
                                <div>Password:
                                    <span id="password">${row.password}</span>
                                </div>
                            </div>`;
                }
            }
        ],

    });

    newpswd.rows.add(pswds_list).draw();
    console.log('add chala')
    $('#group_pswds').modal('hide')
    $('#share').modal("hide");
    $('#add_psw').modal('show')

}
// Function to show notes list modal
function showNotesList() {

    var pn_list_table = $("#pn_list_table");
    var newnotes = pn_list_table.DataTable({
        paging: true,
        lengthChange: true,
        orderable: false,
        searchable: false,
        pagingType: "simple_numbers",
        dom: '<"toolbar pt-2 d-flex flex-wrap align-items-center gap-1 justify-content-between"ftip>',
        info: true,
        initComplete: editSearchUI,
        columns: [
            {
                title: "Notes",
                orderable: true,
                searchable: false,
                className: "dt-center",
                render: function (data, type, row) {
                    return `
                            <div class="ps-3 d-flex flex-column align-items-start justify-content-start py-3 align-items-start ">
                                <div>
                                    <span class="fileName">${row.domain}</span> |
                                    <span id="date">${row.date}</span>
                                </div>
                                <div>
                                    Username: <span id="user">${row.username}</span>
                                </div>
                                <div>Password:
                                    <span id="password">${row.password}</span>
                                </div>
                            </div>`;
                }
            },
            {
                title: "Actions",
                orderable: false,
                searchable: false,
                className: "dt-center",
                data: null,
                defaultContent: `<button type="button" class="revoke">Revoke</button>`
            },
        ],

    });
    newnotes.rows.add(notes_list).draw();
    $('#group_pswds').modal('hide');
    $('#share').modal("hide");
    // $('#add_psw').modal('show');
}

// Function to add new note to the list
function addnewnote(rowdata, index) {
    console.log(rowdata, index);
    var newn_table = $("#newn_table");
    const newnote = newn_table.DataTable({
        paging: true,
        lengthChange: true,
        orderable: false,
        searchable: false,
        pagingType: "simple_numbers",
        dom: '<"toolbar pt-2 d-flex flex-wrap align-items-center gap-1 justify-content-between"ftip>',
        info: true,
        initComplete: editSearchUI,
        
        columns: [
            {
                title: "Action",
                orderable: false,
                searchable: false,
                className: "dt-center",
                render: function (data, type, row) {
                    var isChecked = row.isChecked ? "checked" : "";
                    return `<input type="checkbox" ${isChecked} disabled>`;
                }
            },
            {
                title: "Notes",
                orderable: true,
                searchable: false,
                className: "dt-center",
                render: function (data, type, row) {
                    return `
                            <div class="ps-3 d-flex flex-column align-items-start justify-content-start py-3 align-items-start ">
                                <div>
                                    Title:
                                    <span id="date">${row.title}</span>
                                </div>
                                <div>
                                    Date: <span id="user">${row.date}</span>
                                </div>
                                <div>Test:
                                    <span id="password">${row.text}</span>
                                </div>
                            </div>`;
                }
            }
        ],

    });

    newnote.rows.add(pswds_list).draw();
    $('#pn_list').modal("hide");
    $('#nn_list').modal("show");
}


function confirmAdd() {
    alert("Pswd added");
    $('#add_psw').modal('hide');
    $('#share').modal("show");
}
function showNotesModal() {
    $('#share').modal("hide");
    showNotesList();
    $('#pn_list').modal("show");

}
function confirmAddNote() {
    alert("note added");
    $('#pn_list').modal("show");
    $('#nn_list').modal("hide");
}