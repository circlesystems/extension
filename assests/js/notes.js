

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
                        text: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor" />
                            </svg>
                            Create note`,
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
                    console.log((pageInfo.page + 1) + " of " + pageInfo.pages +1 )
                    var targetLink = $('a[aria-current="page"]');
                    targetLink.text( (pageInfo.page + 1) + " of " + pageInfo.pages +1);
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
                    console.log((pageInfo.page + 1) + " of " + pageInfo.pages +1 )
                    var targetLink = $('a[aria-current="page"]');               
                    targetLink.text( (pageInfo.page + 1) + " of " + pageInfo.pages +1);
                
                },
                columns: [
                    { title: "Title" },
                    { title: "Description" },
                    {
                        title: "Actions",
                        orderable: false,
                        searchable: false,
                        className: "dt-center",
                        defaultContent: `  <td class="py-3 px-3 fs-14 d-flex gap-5 text-center justify-content-center ">
                            <button type="button" class="close border-0 pe-0 pe-lg-2  bg-transparent" data-bs-toggle="modal"
                                data-bs-target="#edit">
                                <img src="./assests/images/edit.png" />
                            </button>
                            </div>
                            <button type="button" class="close border-0 pe-0 pe-lg-2    bg-transparent" data-bs-toggle="modal"
                                data-bs-target="#delete">
                                <img src="./assests/images/delete.png" />
                            </button>
                            </div>
                            <button type="button" class="close border-0  pe-0 pe-lg-2  bg-transparent" data-bs-toggle="modal"
                                data-bs-target="#share">
                                <img src="./assests/images/share.png" />
                            </button>
                            </div>
                        </td>`
                    }
                ],
                "columnDefs": [
                    { "className": "f_1", "targets": [0] },
                    { "className": "f_2", "targets": [1] } ]
            });
            var data = [
                ["Note 1 Title", "Note 1 Description"],
                ["Note 2 Title", "Note 2 Description"],
                ["Note 3 Title", "Note 3 Description"],
                ["Note 1 Title", "Note 1 Description"],
                ["Note 2 Title", "Note 2 Description"],
                ["Note 3 Title", "Note 3 Description"],
                ["Note 1 Title", "Note 1 Description"],
                ["Note 2 Title", "Note 2 Description"],
                ["Note 3 Title", "Note 3 Description"],
                ["Note 1 Title", "Note 1 Description"],
                ["Note 2 Title", "Note 2 Description"],
                ["Note 3 Title", "Note 3 Description"],
                ["Note 1 Title", "Note 1 Description"],
                ["Note 2 Title", "Note 2 Description"],
                ["Note 3 Title", "Note 3 Description"],
                ["Note 1 Title", "Note 1 Description"],
                ["Note 2 Title", "Note 2 Description"],
                ["Note 3 Title", "Note 3 Description"],
                ["Note 1 Title", "Note 1 Description"],
                ["Note 2 Title", "Note 2 Description"],
                ["Note 3 Title", "Note 3 Description"],
                ["Note 1 Title", "Note 1 Description"],
                ["Note 2 Title", "Note 2 Description"],
                ["Note 3 Title", "Note 3 Description"],


            ];
            notes.rows.add(data).draw();
            var tableRows = document.querySelectorAll('#notes_table tbody tr');
            tableRows.forEach(function (row) {

                row.style.width = '100vw !important'; // Set the desired width here
        
        });
        }
        // Group Data table for share popup
        var actions_groups_table = $('#actions_groups_table');

        if (actions_groups_table.length) {
            // Initialize DataTable for Actions and Groups
            var actions_groups = actions_groups_table.DataTable({
                paging: false,
                lengthChange: true,
                pagingType: 'simple_numbers',
                dom: '<"toolbar d-flex justify-content-between align-items-center"Bf>',
                buttons: [],
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
                columns: [
                    {
                        title: "Actions",
                        orderable: false,
                        searchable: false,
                        className: "dt-center",
                    },
                    { title: "Groups" },
                ],
                columnDefs: [
                    { className: "f_1", targets: [0] },
                    { className: "f_2", targets: [1] }
                ]
            });
    
            // Add data to the table
            var data = [
                ["<input type='checkbox'>", "Group 1"],
                ["<input type='checkbox'>", "Group 2"],
                ["<input type='checkbox'>", "Group 3"]
            ];
            actions_groups.rows.add(data).draw();
    
            // Add a button to select all checkboxes in the "Actions" column
            var selectAllButton = $('<button class="btn btn-secondary">').text('Select All');
            selectAllButton.on('click', function () {
                actions_groups_table.find('tbody tr input[type="checkbox"]').prop('checked', true);
            });
    
            // Append the button to the toolbar
            actions_groups_table.parent().find('.toolbar').append(selectAllButton);
        }
    });

