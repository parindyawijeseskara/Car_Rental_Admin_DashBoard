
function manageCars() {
    $('.main-dashboard-container>section').css({display: "none"});
    $('.cars-container').css({display: "block"});
}

function manageCustomer() {
    $('.main-dashboard-container>section').css({display: "none"});
    $('.view-customers-container').css({display: "block"});
}

function manageRentals() {
    $('.main-dashboard-container>section').css({display: "none"});
    $('.rental-container').css({display: "block"});
}

function manageIncome() {
    $('.main-dashboard-container>section').css({display: "none"});
    $('.income-container').css({display: "block"});
}

function navigateTODashboard() {
    $('.main').css({display: "none"});
    $('.header').css({display: "none"});
    $('.main-dashboard-container>section').css({display: "none"});
    $('.side-panel-container').css({display: "none"});
    $('.login-wrap').css({display: "block"});
}

function loadDashboard() {
    $('.main').css({display: "block"});
    $('.header').css({display: "block"});
    $('.main-dashboard-container>section').css({display: "block"});
    $('.side-panel-container').css({display: "block"});
    $('.login-wrap').css({display: "none"});
    $('.login-html').css({display: "none"});
    $('.cars-container').css({display: "none"});
    $('.view-customers-container').css({display: "none"});
    $('.rental-container').css({display: "none"});
    $('.income-container').css({display: "none"});
}

function selectUserRole() {
    var x = document.getElementById("type").value;
    if (x === "admin"){
        $('.admin-dashboard').css({display: "block"});
    }

    if (x === "customer"){
        $('.admin-dashboard').css({display: "none"});
    }
    console.log(x);
}

function  login() {
    $('.main').css({display: "block"});
    $('.header').css({display: "block"});
    $('.main-dashboard-container>section').css({display: "block"});
    $('.side-panel-container').css({display: "block"});
    $('.login-wrap').css({display: "none"});
    $('.login-html').css({display: "none"});
    $('.cars-container').css({display: "none"});
    $('.rental-container').css({display: "none"});

    var x = document.getElementById("type").value;
    if (x === "admin"){
        $('.admin-dashboard').css({display: "block"});
    }

    if (x === "customer"){
        $('.admin-dashboard').css({display: "none"});
        $('.side-panel-top-admin').css({display: "none"});
    }
    console.log(x);
}

function loadViewCarSection() {
    $('.view-cars').css({display: "block"});
    $('.manage-cars-option-container').css({display: "none"});
    $('.edit-cars').css({display: "none"});
}

function loadEditCarSection() {
    $('.edit-cars').css({display: "block"});
    $('.manage-cars-option-container').css({display: "none"});
    $('.view-cars').css({display: "none"});
}

function loadNewCarSection() {
    $('.view-cars').css({display: "none"});
    $('.manage-cars-option-container').css({display: "block"});
    $('.edit-cars').css({display: "none"});
}

function viewRentalRequest() {
    $('.view-rentals').css({display: "block"});
    $('.calculate-payment').css({display: "none"});
    // $('.rental-container').css({display: "none"});
}

function viewRequestsForPayment() {
    $('.view-rentals').css({display: "none"});
    // $('.rental-container').css({display: "none"});
    $('.calculate-payment').css({display: "block"});
}

function viewWeeklyIncome() {
    $('.view-week-income').css({display: "block"});
    $('.view-month-income').css({display: "none"});
}

function viewMonthlyIncome() {
    $('.view-week-income').css({display: "none"});
    $('.view-month-income').css({display: "block"});
}
