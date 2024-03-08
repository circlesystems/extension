var activitydata = [
    [
        ["2024-03-01", "09:00:00"],
        {
            title: "User logged in",
            desc: "clicked on a button/link to",
            conc: "Submit theform",
        },
        "hefigi4136@tospage.com",
        "id.freepikcompany.com",
        "",
    ],
    [
        ["2024-03-01", "09:00:00"],
        {
            title: "User logged in",
            desc: "clicked on a button/link to",
            conc: "Submit theform",
        },
        "hefigi4136@tospage.com",
        "id.freepikcompany.com",
        "",
    ],
    [
        ["2024-03-01", "09:00:00"],
        {
            title: "User logged in",
            desc: "clicked on a button/link to",
            conc: "Submit theform",
        },
        "hefigi4136@tospage.com",
        "id.freepikcompany.com",
        "",
    ],[
        ["2024-03-01", "09:00:00"],
        {
            title: "User logged in",
            desc: "clicked on a button/link to",
            conc: "Submit theform",
        },
        "hefigi4136@tospage.com",
        "id.freepikcompany.com",
        "",
    ],[
        ["2024-03-01", "09:00:00"],
        {
            title: "User logged in",
            desc: "clicked on a button/link to",
            conc: "Submit theform",
        },
        "hefigi4136@tospage.com",
        "id.freepikcompany.com",
        "",
    ],
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
                info: "Showing _START_ to _END_ of _TOTAL_ entries",
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
            columns: [{
                title: "Date",
                render: function (data, type, row) {
                    console.log(data);
                    var dateTime = Array.isArray(data) ? data : []; // Extract date and time from the first element of the array
                    var date = dateTime[0]; // Access date
                    var time = dateTime[1] || ""; // Access time (if available)
                    return `<div class='ps-3 pt-1'><div class='text-nowrap fs-16 fw-normal ' > ${date}  </div><div class='text-nowrap gray_color'>${time}</div></div>`; // Return HTML content
                },
            },
            {
                title: "Event & Message",
                render: function (details, type, row) {
                    const {
                        title,
                        desc,
                        conc
                    } = details;
                    return `<div class='ps-3 pt-1' ><div class='text-nowrap  fs-16 fw-normal'> ${title}  </div><div class='text-nowrap gray_color'>${desc}</div> <div class='text-nowrap gray_color'>${conc}</div></div>`; // Return HTML content
                },
            },
            {
                title: "Username (login)",
                render: function (data, type, row) {
                    return `<div class='ps-3 p-3 gray_color' >${data || "--"}</div>`; // Return HTML content
                },
            },
            {
                title: "Domain",
                render: function (data, type, row) {
                    return `<div class='ps-3 p-3 gray_color' >${data || "--"}</div>`; // Return HTML content
                },
            },
            {
                title: "Used By",
                render: function (data, type, row) {
                    return `<div class='ps-3 p-3 gray_color' >${data || "--"}</div>`; // Return HTML content
                },
            },
            ],
        });

        notes.rows.add(activitydata).draw();
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