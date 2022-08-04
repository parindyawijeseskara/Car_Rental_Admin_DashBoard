//
// var userId = 0;
//
// function login() {
//     var login ={
//         userName:$("txtUserName").val(),
//         password:$("txtPassword").val(),
//         userTypeId:$("cmbUserType").val()
//     }
//
//
//     var data = $("#loginForm").serialize();
//
//     $.ajax({
//         url: "http://localhost:8080/CarRentalSystem_war_exploded/api/v1/user_registration/getUserInLogging",
//         method: "POST",
//         contentType: "application/json",
//         data:JSON.stringify(login),
//         success:function (resp) {
//             console.log(resp.data.userId);
//
//         },
//         error: function (ob) {
//             alert(ob.responseJSON.message);
//         }
//     });
//
// }