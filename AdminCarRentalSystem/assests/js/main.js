
function manageCars() {
    $('.main-dashboard-container>section').css({display: "none"});
    $('.cars-container').css({display: "block"});
}

function navigateTODashboard() {
    $('.main-dashboard-container>section').css({display: "none"});
    $('.admin-dashboard-container').css({display: "block"});
    $('.main').css({display: "none"});
    $('.header').css({display: "none"});

    $('.side-panel-container').css({display: "none"});
    $('.login-wrap').css({display: "block"});
}
