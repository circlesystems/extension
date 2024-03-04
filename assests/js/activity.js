var activitydata = [
  ["2024-03-01", "User logged in", "john_doe", "example.com", "Admin"],
  ["2024-03-02", "File uploaded", "jane_smith", "example.net", "Guest"],

];
document.addEventListener("DOMContentLoaded", function () {
    var activity_table = document.getElementById("activity_table");
    var distinctCheckbox = document.getElementById("distinctCheckbox");

    if (activity_table) {
        var notes = new DataTable(activity_table, {
            responsive: false,
            paging: true,
            lengthChange: true,
            pagingType: "simple_numbers",
            dom: '<"toolbar px-sm-1 px-1 px-lg-5 d-flex justify-content-lg-end justify-content-center  gap-3  flex-wrap align-items-center "ipf>',

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
                    $("#activity_table_wrapper").addClass("table");
                }
                var api = this.api();
                var pageInfo = api.page.info();
                console.log(pageInfo);
                var targetLink = $('a[aria-current="page"]');
                targetLink.text(pageInfo.page + 1 + " of " + +pageInfo.pages + 1);
            },
            language: {
                search: "Search records:",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
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
                { title: "Date" },
                { title: "Event & Message" },
                { title: "Username {login}" },
                { title: "Domain" },
                { title: "Used By" },
            ],
            // columnDefs: [
            //     { className: "f_1", targets: [0] },
            //     { className: "f_2", targets: [1] },
            // ],
        });

        notes.rows.add(activitydata).draw();
        var tableRows = document.querySelectorAll("#activity_table tbody tr");
        tableRows.forEach(function (row) {
            // row.style.width = "100% !important"; 
        });

        // Add event listener to checkbox
        distinctCheckbox.addEventListener("change", function () {
            var distinctDomains = [];
            notes.rows().every(function () {
                var rowData = this.data();
                var domain = rowData[3];
                if (!distinctDomains.includes(domain)) {
                    distinctDomains.push(domain);
                }

                return true;
            });
            // notes.search(distinctDomains.join("|"), true, false).draw();
        });
    }
});
