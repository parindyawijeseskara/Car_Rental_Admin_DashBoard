var baseUrl = "http://localhost:8080/CarRentalSystem_war_exploded/api/v1/car";

//Save Car Event
// $("#btnSaveCar").click(function (){
//     saveCar();
// });


loadAllViewCars();
//save car
function saveCar() {

    var model ={
        carId:0,
        registerNo:$("#txtRegistrationNo").val(),
        brand:$("#txtBrand").val(),
        type:$("#cmbType").val(),
        colour:$("#txtColor").val(),
        maintainence:$("#txtMaintainence").val(),
        createdOn:$("#txtDate").val(),
        transmissionType:$("#cmbTransmissionType").val(),
        updatedOn:null,
        updatedBy:null,
        status:$("#txtStatus").val(),
        monthlyRate:$("#txtMonthlyRate").val(),
        dailyRate:$("#txtDailyRate").val(),
        freeKmPerDay:$("#txtFreeMileagePerDay").val(),
        freeKmPerMonth:$("#txtFreeMileagePerMonth").val(),
        pricePerExtraKm:$("#txtPricePerExtraKm").val(),
        noOfPassengers:$("#cmbNoOfPassengers").val(),
        fuelType:$("#cmbFuelType").val(),
        createdBy:$("#txtCreatedBy").val(),
        damageOrNot:$("#cmbDamageOrNot").val()
    }

    var formData = new FormData();
    formData.append("file",$("#frontImg")[0].files[0]);
    formData.append("model",JSON.stringify(model));
    console.log(formData);

    console.log("--------");
    var data = $("#carForm").serialize();
    console.log(data);
    $.ajax({
        cache:false,
        url:"http://localhost:8080/CarRentalSystem_war_exploded/api/v1/car",
        enctype: 'multipart/form-data',
        contentType:false,
        processData: false,
        method:"POST",
        data:formData,
        success:function (res) {
            if(res.code == 200){
                alert("Car saved successfully..")
            }
        },
        error:function (ob) {
            alert(ob.responseJSON.message)
        }
    });
}

//Bind click events to the table rows
function bindClickEvents(){
    $("#tblViewCarDetails>tr").click(function () {
        console.log("kkkkkkkkkkk");
        let carId = $(this).children().eq(0).text();
        let registerNo = $(this).children().eq(1).text();
        let brand = $(this).children().eq(2).text();
        let type = $(this).children().eq(3).text();
        let colour = $(this).children().eq(4).text();
        let maintainence = $(this).children().eq(5).text();
        let createdOn = $(this).children().eq(6).text();
        let transmissionType = $(this).children().eq(7).text();
        let status = $(this).children().eq(8).text();
        let freeKmPerDay = $(this).children().eq(9).text();
        let freeKmPerMonth = $(this).children().eq(10).text();
        let monthlyRate = $(this).children().eq(11).text();
        let dailyRate = $(this).children().eq(12).text();
        let pricePerExtraKm = $(this).children().eq(13).text();
        let noOfPassengers = $(this).children().eq(14).text();
        let fuelType = $(this).children().eq(15).text();
        let damageOrNot = $(this).children().eq(16).text();
        let createdBy = $(this).children().eq(17).text();

        $("#txtRegistrationNo").val(registerNo);
        $("#txtBrand").val(brand);
        $("#cmbType").val(type);

        $("#txtColor").val(colour);
        $("#txtMaintainence").val(maintainence);
        $("#txtDate").val(createdOn);
        $("#cmbTransmissionType").val(transmissionType);
        $("#txtStatus").val(status)
        $("#txtFreeMileagePerDay").val(freeKmPerDay)
        $("#txtFreeMileagePerMonth").val(freeKmPerMonth)
        $("#txtMonthlyRate").val(monthlyRate)
        $("#txtDailyRate").val(dailyRate)
        $("#txtPricePerExtraKm").val(pricePerExtraKm)
        $("#cmbNoOfPassengers").val(noOfPassengers)
        $("#cmbFuelType").val(fuelType)
        $("#cmbDamageOrNot").val(damageOrNot)
        $("#txtCreatedBy").val(createdBy)
        $("#txtCarId").val(carId)
    });
}

function updateCars(){
    //creating a js object to send relevant data to which, want to send to server
    var carOb = {
        carId:$("#txtCarId").val(),
        registerNo:$("#txtRegistrationNo").val(),
        brand:$("#txtBrand").val(),
        type:$("#cmbType").val(),
        colour:$("#txtColor").val(),
        maintainence:$("#txtMaintainence").val(),
        createdOn:$("#txtDate").val(),
        transmissionType:$("#cmbTransmissionType").val(),
        status:$("#txtStatus").val(),
        freeKmPerDay:$("#txtFreeMileagePerDay").val(),
        freeKmPerMonth:$("#txtFreeMileagePerMonth").val(),
        monthlyRate:$("#txtMonthlyRate").val(),
        dailyRate:$("#txtDailyRate").val(),
        pricePerExtraKm:$("#txtPricePerExtraKm").val(),
        noOfPassengers:$("#cmbNoOfPassengers").val(),
        fuelType:$("#cmbFuelType").val(),
        damageOrNot:$("#cmbDamageOrNot").val(),
        createdBy:$("#txtCreatedBy").val()
    }

    $.ajax({
        url: "http://localhost:8080/CarRentalSystem_war_exploded/api/v1/car",
        method: "PUT",
        contentType: "application/json", //You should state request's content type using MIME types
        data: JSON.stringify(carOb), // format js object to valid json string
        success: function (res) {
            if (res.code == 200) { // process is  ok
                alert("Successfully Updated");
                loadAllViewCars();
                clearForm();
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });


}


//Load View Car Details
$("#btnGetAllCars").click(function (){
    loadAllViewCars();
 });

function loadAllViewCars() {
    $("#tblViewCarDetails").empty();
    $.ajax({
        url: "http://localhost:8080/CarRentalSystem_war_exploded/api/v1/car",
        method: "GET",
        success: function (resp) {
            for(const car of resp.data){
                let row = `<tr><td>${car.carId}</td><td>${car.registerNo}</td><td>${car.brand}</td><td>${car.type}</td><td>${car.colour}</td>
                <td>${car.maintainence}</td><td>${car.createdOn}</td><td>${car.transmissionType}</td><td>${car.status}</td><td>${car.monthlyRate}</td>
                <td>${car.dailyRate}</td><td>${car.freeKmPerDay}</td><td>${car.freeKmPerMonth}</td><td>${car.pricePerExtraKm}</td><td>${car.noOfPassengers}</td><td>${car.fuelType}</td>
                <td>${car.damageOrNot}</td><td>${car.createdBy}</td></tr>`;
                $("#tblViewCarDetails").append(row);
            }
            bindClickEvents();
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}


//Update car details
$("#btnEditCars").click(function () {
    updateCars();
});


//Delete car details
function deleteCars() {
    let carId = $("#txtCarId").val();

    $.ajax({
        url:"http://localhost:8080/CarRentalSystem_war_exploded/api/v1/car" + "?carId=" + carId,
        method:"DELETE",
        success:function (res) {
            if(res.code == 200){
                alert("Car successfully deleted...");
                loadAllViewCars();
            }
        },
        error:function (ob) {
            alert(ob.responseJSON.message)
        }
    });
}

$("#btnDeleteCars").click(function () {
    deleteCars();
});
















































