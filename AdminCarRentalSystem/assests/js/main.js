
var baseUrl = "http://localhost:8080/CarRentalSystem_war_exploded/api/v1";

function manageCars() {
    $('.main-dashboard-container>section').css({display: "none"});
    $('.cars-container').css({display: "block"});
}

function manageCustomer() {
    $('.main-dashboard-container>section').css({display: "none"});
    $('.view-customers-container').css({display: "block"});

    $.ajax({
        url:"http://localhost:8080/CarRentalSystem_war_exploded/api/v1/user_registration/searchByUserTypeId/2",
        method:"GET",
        success:function (resp) {
            console.log(resp.data);
            for (let i = 0; i < resp.data.length ; i++) {
                console.log(resp.data[i].userId)

                let row = `<tr><td>${resp.data[i].userId}</td><td>${resp.data[i].userName}</td><td>${resp.data[i].email}</td><td>${resp.data[i].password}</td><td>${resp.data[i].address}</td>
                <td>${resp.data[i].licenseNo}</td><td>${resp.data[i].nic}</td><td>${resp.data[i].contactNo}</td></tr>`;


                $("#tblViewCustomers").append(row);
                console.log("dddd"+resp.data)
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}

function manageRentals() {
    $('.main-dashboard-container>section').css({display: "none"});
    $('.rental-container').css({display: "block"});
    $.ajax({
        url: "http://localhost:8080/CarRentalSystem_war_exploded/api/v1/rental_request",
        method: "GET",
        success: function (resp) {
            console.log(resp.data);
            for (let i = 0; i < resp.data.length; i++) {
                console.log(resp.data[i].userId)

                let row = `<tr><td>${resp.data[i].rentalRequestId}</td><td>${resp.data[i].createdOn}</td><td>${resp.data[i].createdBy}</td><td>${resp.data[i].carNameList}</td><td>${resp.data[i].driverNameList}</td>
                <td>${resp.data[i].pickUpDate}</td><td>${resp.data[i].returnDate}</td><td>${resp.data[i].pickuptime}</td><td>${resp.data[i].returntime}</td>
                <td>${resp.data[i].rentalFee}</td><td>${resp.data[i].status}</td></tr>`;


                $("#viewRentalTable").append(row);
                console.log("dddd" + resp.data)
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}

function manageIncome() {
    $('.main-dashboard-container>section').css({display: "none"});
    $('.income-container').css({display: "block"});
    $.ajax({
        url: "http://localhost:8080/CarRentalSystem_war_exploded/api/v1/rental_payment",
        method: "GET",
        success: function (resp) {
            console.log("/////////////")
            console.log(resp.data);
            for (let i = 0; i < resp.data.length; i++) {
                console.log(resp.data[i].userId)

                let row = `<tr><td>${resp.data[i].paymentId}</td><td>${resp.data[i].rentalRequestId}</td><td>${resp.data[i].userId}</td><td>${resp.data[i].userName}</td><td>${resp.data[i].date}</td>
                <td>${resp.data[i].amount}</td><td>${resp.data[i].totalAmount}</td></tr>`;


                $("#viewIncomeTable").append(row);
                console.log("dddd" + resp.data)
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });





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
    $('.customer-manage-profile-section').css({display: "none"});
    $('.customer-manage-request-section').css({display: "none"});
    $('.customer-dashboard-container').css({display: "none"});
    $('.driver-dashboard-container').css({display: "none"});
}

function selectUserRole() {
    var x = document.getElementById("type").value;
    if (x === "admin"){
        $('.admin-dashboard').css({display: "block"});
    }

    if (x === "customer"){
        $('.admin-dashboard').css({display: "none"});
    }
}

function  login() {
    $('.main').css({display: "block"});
    $('.header').css({display: "block"});
    $('.login-wrap').css({display: "none"});
    $('.login-html').css({display: "none"});
    $('.cars-container').css({display: "none"});
    $('.rental-container').css({display: "none"});

    var x = document.getElementById("type").value;
    if (x === "admin"){
        $('.side-panel-container').css({display: "block"});
        $('.admin-dashboard').css({display: "block"});
        $('.main-dashboard-container>section').css({display: "block"});
    }

    if (x === "customer"){
        $('.side-panel-container-customer').css({display: "block"});
        $('.customer-dashboard').css({display: "block"});
        $('.customer-dashboard-container').css({display: "block"});
        $('.side-panel-container-driver').css({display: "none"});
    }

    if (x === "driver"){
        $('.side-panel-container-driver').css({display: "block"});
        $('.driver-dashboard').css({display: "block"});
        $('.driver-dashboard-container').css({display: "block"});
    }


    var userId = 0;

    function login() {
        var login ={
            userName:$("txtUserName").val(),
            password:$("txtPassword").val(),
            userTypeId:$("cmbUserType").val()
        }


        var data = $("#loginForm").serialize();

        $.ajax({
            url: "http://localhost:8080/CarRentalSystem_war_exploded/api/v1/user_registration/getUserInLogging",
            method: "POST",
            contentType: "application/json",
            data:JSON.stringify(login),
            success:function (resp) {
                console.log(resp.data.userId);

            },
            error: function (ob) {
                alert(ob.responseJSON.message);
            }
        });

    }
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
}

function viewRequestsForPayment() {
    $('.view-rentals').css({display: "none"});
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

//--------------Customer Section --------------------//
function loadCustomerDashboard() {

}

function manageRequests() {
    $('.main-dashboard-container>section').css({display: "none"});
    $('.customer-manage-request-section').css({display: "block"});
    $('.preview-rental-section').css({display: "none"});
}

function manageProfile() {
    $('.main-dashboard-container>section').css({display: "none"});
    $('.customer-manage-profile-section').css({display: "block"});
}


function loadNewRequest() {
    $('.manage-view-request').css({display: "none"});
    $('.preview-rental-section').css({display: "none"});
    $('.manage-new-rental-request').css({display: "block"});
}

function loadViewRequest() {
    $('.manage-view-request').css({display: "block"});
    $('.manage-new-rental-request').css({display: "none"});
    $('.preview-rental-section').css({display: "none"});
}


function updateProfile() {}

//----------Driver Section---------------------------//
function loadDriverDashboard() {

}

function logout() {
    $('.main').css({display: "none"});
    $('.header').css({display: "none"});
    $('.main-dashboard-container>section').css({display: "none"});
    $('.side-panel-container').css({display: "none"});
    $('.login-wrap').css({display: "block"});
}




