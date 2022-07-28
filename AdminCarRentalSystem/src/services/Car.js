var baseUrl = "http://localhost:8080/CarRentalSystem_war_exploded/api/v1/car";

//Save Car Event
// $("#btnSaveCar").click(function (){
//     saveCar();
// });

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
        createdBy:$("#txtCreatedBy").val()
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
        url:baseUrl,
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

//Load View Car Details
$("#btnViewCars").click(function (){
    loadAllViewCars();
 });

function loadAllViewCars() {
    $("#tblViewCarDetails").empty();
    $.ajax({
        url: "http://localhost:8080/CarRentalSystem_war_exploded/api/v1/car",
        method: "GET",
        success: function (resp) {
            for(const car of resp.data){
                let row = `<tr><td>${car.registerNo}</td><td>${car.brand}</td><td>${car.type}</td><td>${car.colour}</td>
                <td>${car.maintainence}</td><td>${car.createdOn}</td><td>${car.transmissionType}</td><td>${car.status}</td><td>${car.monthlyRate}</td>
                <td>${car.dailyRate}</td><td>${car.freeKmPerDay}</td><td>${car.freeKmPerMonth}</td><td>${car.pricePerExtraKm}</td><td>${car.noOfPassengers}</td><td>${car.fuelType}</td>
                <td>${car.damageOrNot}</td><td>${car.createdBy}</td></tr>`;
                $("#tblViewCarDetails").append(row);
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}














