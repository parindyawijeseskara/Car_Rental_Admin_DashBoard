var baseUrl = "http://localhost:8080/CarRentalSystem_war_exploded/api/v1/rental_request";

var rentalFormData = null;
var carIdList=[];
var carIdValueList = [];
var totalLossDamagePayment = null;
var loassDamagePaymentList =[];
var lossDamagePayment = null;
var uploadedFileList =[];
var carPayment = [];

function selectCar(){
    $('.carTable').css({display: "block"});
    var x = document.getElementById("txtCarRegNo").value;
    console.log(x);
    var e = document.getElementById("txtCarRegNo");
    console.log(e.options[e.selectedIndex].text)
    carIdValueList.push(e.options[e.selectedIndex].value)
    console.log(carIdValueList.length)

    var carTypeDTO = {
        carId: [e.options[e.selectedIndex].value],
        pickUpDate:null,
        returnDate: null
    }

    /** Get Loss Damage Amont and Preview */
    $.ajax({
        url: baseUrl+"/getLossDamageAmount",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify(carTypeDTO), //,// if we send data with the request
        success: function (res) {
            console.log(res.data);
            lossDamagePayment = res.data;
            $("#lossDamage").val(lossDamagePayment);
            loassDamagePaymentList.push(lossDamagePayment);
            totalLossDamagePayment += lossDamagePayment;
            console.log(totalLossDamagePayment);
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}

function selectCarValue() {
    var e = document.getElementById("txtCarRegNo");
    var car = e.options[e.selectedIndex].text;
    carIdList.push(car);
    console.log(carIdList.length)

    var documents = $("#paymentreciept")[0].files[0];
    uploadedFileList.push(documents);

    var markup = "<tr><td><input type='checkbox' name='record'></td><td>" + car + "</td><td>" + lossDamagePayment + "</td><td>" + $("#paymentreciept")[0].files[0].name + "</td></tr>";
    $("table tbody").append(markup);

    var carpaymentModal = {
        carId: e.options[e.selectedIndex].value,
        lossDamagePayment: lossDamagePayment
    }

    carPayment.push(carpaymentModal);
}

function deleteCarValue() {
    console.log(carIdList)
    $("table tbody").find('input[name="record"]').each(function(){
        if($(this).is(":checked")){
            $(this).parents("tr").remove();
        }
    });

    carIdList.splice( $(this).parents("tr"),1);
    carIdValueList.splice( $(this).parents("tr"),1);
    loassDamagePaymentList.splice( $(this).parents("tr"),1);
    console.log(carIdList)
}

function addRentalRequest() {
    $('.manage-view-request').css({display: "none"});
    $('.manage-new-rental-request').css({display: "none"});
    $('.preview-rental-section').css({display: "block"});
    var data = $("#rentalRequestForm").serializeArray();
    $("#lossDamage").val(totalLossDamagePayment);

    var carTypeDTO = {
        carId: carIdValueList,
        pickUpDate: data[0].value,
        returnDate: data[1].value
    }


    /** Get Rental Fee Amont and Preview */
    $.ajax({
        url: baseUrl+"/getRentalFeeToPay",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify(carTypeDTO), //,// if we send data with the request
        success: function (res) {
            console.log(res.data);
            $("#rentalFee").val(res.data);
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });

}

function makePament() {
    var data2 = $("#rentalPayment").serializeArray();

    var data = $("#rentalRequestForm").serializeArray(); // return query string of form with name:type-value
    console.log(data);

    const data1 = new Object();
    data1.rentalRequestId = 0;
    data1.pickUpDate = data[0].value;
    data1.returnDate = data[1].value;
    data1.pickuptime = data[2].value;
    data1.returntime = data[3].value;
    data1.status = null;
    data1.damageOrNot = null;
    data1.rentalFee =   data2[0].value;
    data1.comment = null;
    data1.updatedOn = null;
    data1.updatedBy = null;
    data1.createdBy = null;

    data1.carId = carIdList;
    data1.driverId = null;
    data1.nic = data[4].value;

    var model = {
        rentalRequestId:0,
        pickUpDate: data[0].value,
        returnDate: data[1].value,
        pickuptime: data[2].value,
        returntime: data[3].value,
        status: null,
        damageOrNot: null,
        rentalFee:  data2[0].value,
        comment: null,
        updatedOn: null,
        updatedBy: null,
        createdBy: null,
        carPayment: carPayment,
        driverId: null,
        carNameList:null,
        driverNameList:null,
        nic:  data[4].value,
    }

    var formData = new FormData();

    for(var i=0;i<uploadedFileList.length;i++){
        formData.append("file", uploadedFileList[i]);
    }

    formData.append("model",JSON.stringify(model));

    console.log(formData)

    /** Create Rental Request */
    $.ajax({
        cache: false,
        url: baseUrl,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        method: "POST",
        data: formData, //,// if we send data with the request
        success: function (res) {
            console.log(res.message);
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
        }
    });
}

function checkAvailability() {

    var carSearchDTO = {
        fromDate: document.getElementById("pickupdate").value,
        toDate: document.getElementById("returnDate").value,
        type: "",
    }

    $.ajax({
        url: "http://localhost:8080/CarRentalSystem_war_exploded/api/v1/car/findAllCars",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify(carSearchDTO),
        success: function (resp) {
            var s = '<option value="-1">Please Select a Car</option>';
            for (var i = 0; i < resp.data.length; i++) {
                s += '<option value="' + resp.data[i].carId + '">' + resp.data[i].brand + '</option>';
            }
            $("#txtCarRegNo").html(s);
        }
    });
}
