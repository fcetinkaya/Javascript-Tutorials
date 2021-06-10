//------------------ Pageload, Loading Data---------//
const db = firebase.firestore();
window.onload = getListFS();
window.onload = getListRD();
window.onload=getImageList();

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
                userHtml += "</tr>";
            });
        } else {
            userHtml += "<tr>";
            userHtml += "<td colspan='4'>";
            userHtml += "Not found data.";
            userHtml += "</td></tr>";
        }
        $("#RD_tableBody").html(userHtml);
    });
};
//-------------------- Get Firestore List -----------------//
function getListFS() {
    db.collection("student-jsCrud")
        .get()
        .then(function (dbUsers) {
            if (!dbUsers.exists) {
                var userHtml = "";
                dbUsers.forEach(function (userList) {
                    userHtml += "<tr>";
                    userHtml += "<td>" + userList.data().firstname + "</td>";
                    userHtml += "<td>" + userList.data().secondname + "</td>";
                    userHtml += "<td>" + userList.data().country + "</td>";
                    userHtml += "<td>" + userList.data().city + "</td>";
                    userHtml += "</tr>";
                });
            } else {
                userHtml += "<tr>";
                userHtml += "<td colspan='4'>";
                userHtml += "Not found data.</td>";
                userHtml += "</tr>";
            }
            $("#FS_tableBody").html(userHtml);
        })
        .catch(function (error) {
            console.log(error);
        });
};

//------------------ Get Filestorage List -----------------//
  function getImageList() {
      $('#List').empty();
      firebase.storage().ref('firebaseCRUD/').listAll()
          .then(function (result) {
              let new_html = "";
              if (result.items.length != 0) {
                  result.items.forEach(function (imageRef) {
                      imageRef.getDownloadURL().then(function (url) {
                          new_html = "";
                          new_html += "<div class=\"col-md-3\">";
                          new_html += "<div class=\"my-3\">";
                          new_html += "<div>";
                          new_html += "<img src=\"" + url + "\" class=\"img-fluid img-thumbnail\" style=\"height: 200px; width: 200px; \"/>";
                          new_html += "</div>";
                          new_html += "<div class=\"mt-1 text-center\">";
                          new_html += "</div>";
                          new_html += "</div>";
                          new_html += "</div>";
                          $('#List').append(new_html);
                      });
                  });
              } else {
                  new_html = "";
                  new_html += "<div class=\"col-md-12 text-center\">";
                  new_html += "<div class=\"alert alert-warning\" role=\"alert\">";
                  new_html += "<h2>Not found image!</h2>";
                  new_html += "</div></div>";
                  $('#List').append(new_html);
              }
          });
  };