$(document).ready(function () {
    // Display message on tab change
    $('a[data-bs-toggle="pill"]').on('shown.bs.tab', function (e) {
        const activeTab = $(e.target).text(); // Get the active tab's text
        console.log(`${activeTab} tab is now active.`);
    });
});
