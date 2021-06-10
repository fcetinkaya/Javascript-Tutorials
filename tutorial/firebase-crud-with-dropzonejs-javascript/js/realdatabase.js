//------------------ Pageload, Loading Data---------//
window.onload = getListRD();

// ----------------- Add Record -------------------//
$("#rdBtn").click(function () {
    if ($("#newPersonForm").valid()) {
        // Button event
        $(this).val('Loading...');
        $(this).attr('disabled', 'disabled');
        $(this).parents('form').submit();

        // Action
        var userData = fillData();
        firebase.database().ref().child("student-jsCrud").push(userData, function (error) {
            if (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                swal("Error", "Message :" + errorMessage, "error");
            } else {
                swal("Insert", "Data insert successfully.", "success")
                    .then((value) => {
                        clearInputs();
                        getListRD();
                    });
            }
        });
        $(this).removeAttr('disabled');
        $(this).val('Save');
    }
});
//------------------ Update Record ----------------//
// Get Data and open modal popup
$("#rdTable").on('click', '#rdeditbtn', function () {
    u_clearInputs();
    var id = $(this).data('id');
    rdGetData(id);
    $("#rdModal").modal({
        backdrop: "static"
    });
});
// Update Data..
$('#u_rdBtn').click(function () {
    // Button event
    $(this).val('Loading...');
    $(this).attr('disabled', 'disabled');
    $(this).parents('form').submit();

    // Action
    var userData = u_fillData();
    var id = $("#u_id").val();
    firebase.database().ref("student-jsCrud/" + id).set(userData)
        .then(function () {
            swal("Update", "Updated Successfully.", "success");
            $("#rdModal").modal('hide');
            getListRD();
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            swal("Error", "Message :" + errorMessage, "error");
        });
    $(this).removeAttr('disabled');
    $(this).val('Update');
});
//------------------ Delete Record -----------------//
$("#rdTable").on('click', '#rddelbtn', function () {
    var id = $(this).data('id');
    swal({
            title: "Delete",
            text: "Are you sure to delete?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                var deleteRef = firebase.database().ref().child("student-jsCrud").child(id);
                return deleteRef.remove()
                    .then(function () {
                        swal("Delete", "Removed Successfully.", "success");
                        getListRD();
                    }).catch(function (error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorCode);
                        console.log(errorMessage);
                        swal("Error", "Message :" + errorMessage, "error");
                    });
            }
        });
});
//------------------ Select Data --------------------//
function rdGetData(key) {
    firebase.database().ref('student-jsCrud/' + key).on('value', function (snapshot) {
        if (snapshot.exists()) {
            $("#u_fnamebox").val(snapshot.val().firstname);
            $("#u_snamebox").val(snapshot.val().secondname);
            $("#u_countrybox").val(snapshot.val().country);
            $("#u_citybox").val(snapshot.val().city);
            $("#u_agebox").val(snapshot.val().age);
            $("#u_emailbox").val(snapshot.val().email);
            $("#u_phonebox").val(snapshot.val().phone);
            $("#u_adressbox").val(snapshot.val().adress);
            $("#u_id").val(key);
        } else {
            swal("Warning", "Not data found.", "warning");
        }
    });
};
//----------------- Get Real Database List -----------------//
function getListRD() {
    var dbUsers = firebase.database().ref().child("student-jsCrud").orderByChild("firstname");
    dbUsers.on("value", function (users) {
        var userHtml = "";
        if (users.exists) {
            users.forEach(function (userList) {
                userHtml += "<tr>";
                userHtml += "<td>" + userList.val().firstname + "</td>";
                userHtml += "<td>" + userList.val().secondname + "</td>";
                userHtml += "<td>" + userList.val().country + "</td>";
                userHtml += "<td>" + userList.val().city + "</td>";
                userHtml += "<td>" + userList.val().phone + "</td>";
                userHtml += "<td>" + userList.val().email + "</td>";
                userHtml += "<td>" + userList.val().adress + "</td>";
                userHtml += "<td><button id='rddelbtn' class='btn btn-danger btn-sm' data-id=" + userList.key + ">Del</button> <button id='rdeditbtn' class='btn btn-primary btn-sm' data-id=" + userList.key + ">Edit</button></td> ";
                userHtml += "</tr>";
                userHtml += "";
            });
        } else {
            userHtml += "<tr>";
            userHtml += "<td colspan='7'>";
            userHtml += "Not found data.";
            userHtml += "</td></tr>";
        }
        $("#RD_tableBody").html(userHtml);
    });
};
//------------------ Fill Input ----------------------------//
// Insert method
function fillData() {
    var firstname = $("#fnamebox").val();
    var secondname = $("#snamebox").val();
    var country = $("#countrybox").val();
    var city = $("#citybox").val();
    var phone = $("#phonebox").val();
    var email = $("#emailbox").val();
    var adress = $("#adressbox").val();

    var userData = {
        "firstname": firstname,
        "secondname": secondname,
        "country": country,
        "city": city,
        "phone": phone,
        "email": email,
        "adress": adress
    };
    return userData;
};
// Update method
function u_fillData() {
    var firstname = $("#u_fnamebox").val();
    var secondname = $("#u_snamebox").val();
    var country = $("#u_countrybox").val();
    var city = $("#u_citybox").val();
    var phone = $("#u_phonebox").val();
    var email = $("#u_emailbox").val();
    var adress = $("#u_adressbox").val();

    var userData = {
        "firstname": firstname,
        "secondname": secondname,
        "country": country,
        "city": city,
        "phone": phone,
        "email": email,
        "adress": adress
    };
    return userData;
};
//-------------------- Clear Inputs -----------------//
function clearInputs() {
    $("#fnamebox").val("");
    $("#snamebox").val("");
    $("#countrybox").val("");
    $("#citybox").val("");
    $("#agebox").val("");
    $("#phonebox").val("");
    $("#emailbox").val("");
    $("#adressbox").val("");
};

function u_clearInputs() {
    $("#u_fnamebox").val("");
    $("#u_snamebox").val("");
    $("#u_countrybox").val("");
    $("#u_citybox").val("");
    $("#u_agebox").val("");
    $("#u_phonebox").val("");
    $("#u_emailbox").val("");
    $("#u_adressbox").val("");
};