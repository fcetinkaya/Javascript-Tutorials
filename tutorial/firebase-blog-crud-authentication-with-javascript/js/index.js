/************* Retrieve and Display Data from Firebase ******************/
var dbBlogs = firebase.database().ref().child("blogs").orderByKey();
dbBlogs.on("value", function (blogs) {
    var blogHtml = "";
    if (blogs.exists()) {

        blogs.forEach(function (singleBlog) {
            blogHtml += "<h1 class=\"mt-4\">" + singleBlog.val().title + "</h1>";
            blogHtml += " <p class=\"lead\">by <strong>" + singleBlog.val().userName + "</p>";
            blogHtml += "<hr>";
            blogHtml += "<p>" + singleBlog.val().date + " at " + singleBlog.val().time + "</p>";
            blogHtml += "<hr>";
            blogHtml += " <img class=\"img-fluid rounded\" src=" + singleBlog.val().image + " alt=" + singleBlog.val().title + ">";
            blogHtml += "<hr>";
            blogHtml += "<p>" + singleBlog.val().desc + "</p>";
            blogHtml += "<hr>";
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