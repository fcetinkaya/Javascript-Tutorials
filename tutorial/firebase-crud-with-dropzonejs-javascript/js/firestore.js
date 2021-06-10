//------------------ Pageload, Loading Data---------//
const db = firebase.firestore();
window.onload = getListFS();

// ------------------- Firestore Add Record -------------------//
$("#fsBtn").click(function () {
    if ($("#newPersonForm").valid()) {
        // Button event
        $(this).val('Loading...');
        $(this).attr('disabled', 'disabled');
        $(this).parents('form').submit();

        // Action
        var userDataFS = fillDataFS();
        db.collection("student-jsCrud").add(userDataFS)
            .then(function () {
                swal("Insert", "Data insert successfully.", "success")
                    .then(() => {
                        clearInputs();
                        getListFS();
                    });
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                swal("Error", "Message :" + errorMessage, "error");
            });
        $(this).removeAttr('disabled');
        $(this).val('Save');
    }
});
//------------------ Update Record ----------------//
// Get Data and open modal popup
$("#fsTable").on('click', '#fseditbtn', function () {
    // Action
    u_clearInputs();
    var id = $(this).data('id');
    fsGetData(id);
    $("#fsModal").modal({
        backdrop: "static"
    });
});
// Update Data..
$('#u_fsBtn').click(function () {
    // Button event
    $(this).val('Loading...');
    $(this).attr('disabled', 'disabled');
    $(this).parents('form').submit();
    var userData = u_fillData();
    var id = $("#u_id").val();
    db.collection("student-jsCrud").doc(id).set(userData)
        .then(function () {
            swal("Update", "Updated Successfully.", "success");
            $("#fsModal").modal('hide');
            getListFS();
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
//------------------ Delete Firestore Record -----------//
$("#fsTable").on('click', '#fsdelbtn', function () {
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
                db.collection("student-jsCrud").doc(id).delete()
                    .then(function () {
                        swal("Delete", "Removed Successfully.", "success");
                        getListFS();
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
function fsGetData(key) {
    var docRef = db.collection("student-jsCrud").doc(key);
    docRef.get().then(function (snapshot) {
        if (snapshot.exists) {
            $("#u_fnamebox").val(snapshot.data().firstname);
            $("#u_snamebox").val(snapshot.data().secondname);
            $("#u_countrybox").val(snapshot.data().country);
            $("#u_citybox").val(snapshot.data().city);
            $("#u_agebox").val(snapshot.data().age);
            $("#u_emailbox").val(snapshot.data().email);
            $("#u_phonebox").val(snapshot.data().phone);
            $("#u_adressbox").val(snapshot.data().adress);
            $("#u_id").val(key);
        } else {
            swal("Warning", "Not data found.", "warning");
        }
    });
};
//-------------------- Get Firestore List -----------------//
function getListFS() {
    db.collection("student-jsCrud")
        .get()
        .then(function (doc) {
            if (!doc.exists) {
                var userHtml = "";
                doc.forEach(function (userList) {
                    userHtml += "<tr>";
                    userHtml += "<td>" + userList.data().firstname + "</td>";
                    userHtml += "<td>" + userList.data().secondname + "</td>";
                    userHtml += "<td>" + userList.data().country + "</td>";
                    userHtml += "<td>" + userList.data().city + "</td>";
                    userHtml += "<td>" + userList.data().phone + "</td>";
                    userHtml += "<td>" + userList.data().email + "</td>";
                    userHtml += "<td>" + userList.data().adress + "</td>";
                    userHtml += "<td><button id='fsdelbtn' class='btn btn-danger btn-sm' data-id='" + userList.id + "'>Del</button> <button id='fseditbtn' class='btn btn-primary btn-sm' data-id='" + userList.id + "'>Edit</button></td>";
                    userHtml += "</tr>";
                    userHtml += "";
                });
            } else {
                userHtml += "<tr>";
                userHtml += "<td colspan='7'>";
                userHtml += "Not found data.";
                userHtml += "</td></tr>";
            }
            $("#FS_tableBody").html(userHtml);
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            swal("Error", "Message :" + errorMessage, "error");
        });
};
//------------------ Fill Input ----------------------------//
// Insert method
function fillDataFS() {
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