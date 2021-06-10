  //------------------ Pageload, Loading Data---------//
  window.onload = getImageList();

  Dropzone.autoDiscover = false;
  $(document).ready(function () {
      var myDropzone = new Dropzone("form#demo-upload", { // Make the whole body a dropzone
          url: '/',
          addRemoveLinks: true,
          method: 'put',
          chunking: true,
          forceChunking: true,
          autoQueue: false,
          autoProcessQueue: false,
          maxFilesize: 1, //mb
          maxThumbnailFilesize: 1, //mb
          maxFiles: 15,
          parallelUploads: 15,
          acceptedFiles: ".jpeg,.png,.jpg"
      });

      // Gebruiken foreach...
      myDropzone.on("addedfile", function (file) {
          let no = myDropzone.files.length;
          no--;
          var reader = new FileReader();
          reader.onload = function (event) {
              uploadImage(event.target.result, myDropzone.files[no].name);
          };
          reader.readAsDataURL(file);
          getImageList();
      });

      myDropzone.on("removedfile", function (file) {
          firebase.storage().ref("firebaseCRUD/" + file.name)
              .delete()
              .then(function () {
                  getImageList();
              })
              .catch(function (error) {
                  console.log("Something is wrong {RemoveFile}")
                  console.log(error)
              });
      });

      function uploadImage(image, fileName) {
          firebase.storage().ref("firebaseCRUD/" + fileName)
              .putString(image, 'data_url');
      };
  });

  // Get Image List..
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
                          new_html += "<button type=\"button\" class=\"btn btn-danger btn-sm del-pic\" id=\"removePic\" onclick=\"delPicture('" + imageRef.name + "')\">Delete</button>";
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

  function delPicture(path) {
      swal({
              title: "Delete",
              text: "Are you sure to delete?",
              icon: "warning",
              buttons: true,
              dangerMode: true,
          })
          .then((willDelete) => {
              if (willDelete) {
                  firebase.storage().ref("firebaseCRUD")
                      .child(path)
                      .delete()
                      .then(function () {
                          swal("Delete", " Delete successfully.", "success")
                              .then(() => {
                                  getImageList();
                              })
                              .catch((error) => {
                                  console.log(error);
                              });
                      });
              }
          });
  }