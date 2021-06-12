/****************** Page Loading Effect ****************/
$(window).on('load', function () {
    $(".loader").fadeOut("slow");
});

/************** User Controller Sign In *************/
firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
        window.location.href = "index.html";
    }
});

/****************** User Logout ****************/
$("#btn-logout").click(function () {
    firebase.auth().signOut();
});


/********************** Retrieve and Display Data from Firebase *********************/
var storageRef = firebase.storage().ref("blog_images");
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var userID = firebase.auth().currentUser.uid;
        var dbBlogs = firebase.database().ref().child("blogs").orderByChild(userID);
        dbBlogs.on("value", function (blogs) {
            var blogHtml = "";
            if (blogs.exists()) {

                blogs.forEach(function (singleBlog) {
                    blogHtml += "<div class=\"jumbotron bg-light text-dark border border-dark\">";
                    blogHtml += "<div><h2>" + singleBlog.val().title + "</h2></div>";
                    blogHtml += "<div><img class\"img-fluid\" width=\"1000px\" height=\"550px\" src=\"";
                    blogHtml += singleBlog.val().image + "\"></div><br />";
                    blogHtml += "<div class=\"row\"><div class=\"col-sm-5\"><p style=\"color:grey;\"> Published by: " + singleBlog.val().userName + "</p></div>";
                    blogHtml += "<div class=\"col-sm-3\"><p style=\"color:grey;\">Time:" + singleBlog.val().time + "</p></div>";
                    blogHtml += "<div class=\"col-sm-4\"><p style =\"color:grey; margin-left:75px;\">Date: " + singleBlog.val().date + "</p></div></div><br />";
                    blogHtml += "<div style=\"text-align: justify; color:black;\">" + singleBlog.val().desc + "</div><br />";
                    blogHtml += "<div class=\"form-group\" style=\"text-align: justify; color:black;\"><button class=\"form-control btn btn-light bg-dark text-white\" onclick=\"deleteblogRecord(\
                        '" + singleBlog.key + "')\">Delete this Post</button><input type=\"hidden\" id=\"imgName\" value=" + singleBlog.val().filename + " />";;
                    blogHtml += "</div><br /></div>";
                });

            } else {
                blogHtml += "<div class=\"text-center\">";
                blogHtml += "<div class=\"alert alert-warning\" role=\"alert\">";
                blogHtml += "<h2>Not found blog!</h2>";
                blogHtml += "<br /><br />"
                blogHtml += "<a href=\"AddBlog.html\" class=\"btn btn-primary text-white\" /> Add New Blog</a>";
                blogHtml += "</div></div>";
            }
            $("#blogs").html(blogHtml);
        });
    }
});

/************** Delete Blog ******************/
function deleteblogRecord(key) {
    var imgSrc = $("#imgName").val();
    var result = confirm("Are you sure this blog delete?");
    if (result) {
        var deleteRef = firebase.database().ref().child("blogs").child(key);
        return deleteRef.remove()
            .then(function () {

                var fileDel = storageRef.child(imgSrc);
                fileDel.delete().then(function () {
                    window.alert("Removed Successfully.");
                }).catch(function () {
                    window.alert("Error Occured.");
                });
            })
            .catch(function () {
                window.alert("Error Occured.");
            });
    }
};