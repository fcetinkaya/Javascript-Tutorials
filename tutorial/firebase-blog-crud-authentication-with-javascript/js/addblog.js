/****************** Page Loading Effect ****************/
$(window).on('load', function () {
    $(".loader").fadeOut("slow");
});

/*********** User Controller Sign In ************/
firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
        window.location.href = "index.html";
    }
});

/****************** User Logout ****************/
$("#btn-logout").click(function () {
    firebase.auth().signOut();
});

/**************** Form Element Script **********/
var validImagetypes = ["image/gif", "image/jpeg", "image/png"];
$("#selected-image").hide();

function previewImage(image_blog) {
    if (image_blog.files && image_blog.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#selected-image").attr('src', e.target.result);
            $("#selected-image").fadeIn();
        }
        reader.readAsDataURL(image_blog.files[0]);
        $("#selected-image").show();
    }
}


$("#main-image").change(function () {
    previewImage(this);
});


$("#save-blog").click(function () {
    $("#main-desc").removeClass("is-invalid");
    $("#main-image").removeClass("is-invalid");

    var desc = $("#main-desc").val();
    var title = $("#main-title").val();
    var picture = $("#main-image").prop("files")[0];

    if (!title) {
        $("#main-title").addClass("is-invalid");
        return;
    }

    if (!desc) {
        $("#main-desc").addClass("is-invalid");
        return;
    }

    if (picture == null) {
        $("#main-image").addClass("is-invalid");
        return;
    }
    if ($.isArray(picture["type"], validImagetypes) > 0) {
        $("#main-image").addClass("is-invalid");
    }
    var databaseRef = firebase.database().ref().child("blogs");

    databaseRef.once("value").then(function (snapshot) {
        var name = picture["name"];
        var dateStr = new Date().getTime();
        var fileCompleteName = name + "_" + dateStr;

        var storageRef = firebase.storage().ref("blog_images");
        var blogStorageRef = storageRef.child(fileCompleteName);

        var uploadTask = blogStorageRef.put(picture);

        uploadTask.on(
            "stage_changed",
            function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                $("#upload-progress").html(Math.round(percentage) + "%");
                $("#upload-progress").attr("style", "width:" + percentage + "%");
            },
            function error(err) {

            },
            function complete() {
                var userName = "";
                var userID = "";
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        userID = user.uid;
                        firebase.database().ref("users-blog/" + user.uid).once("value").then(
                            function (userV) {

                                var fName = userV.val().firstName;
                                var sName = userV.val().secondName;
                                userName = fName + " " + sName;
                            });
                    };
                });

                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    var time = new Date(Date.now());

                    var options = {
                        weekday: 'long',
                        month: 'long',
                        day: '2-digit',
                        year: 'numeric'
                    };

                    var blogData = {
                        "title": title,
                        "image": downloadURL,
                        "filename": fileCompleteName,
                        "desc": desc,
                        "uid": userID,
                        "userName": userName,
                        "time": time.toLocaleString('en-US', {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true
                        }),
                        "date": time.toLocaleDateString('en-US', options)
                    };

                    var newPostRef = databaseRef.push();

                    newPostRef.set(blogData, function (err) {
                        if (err) {
                            $("#result").attr("class", "alert alert-danger");
                            $("#result").html(err.message);
                        } else {
                            $("#result").attr("class", "alert alert-success");
                            $("#result").html(
                                "Blog has been uploaded successfully.");

                            window.open("", "_self");
                        }
                        resetForm();
                    });
                });
            });
    });
});

function resetForm() {
    $("#main-form")[0].reset();
    $("#selected-image").fadeOut();
    $("#upload-progress").html("Completed");
};