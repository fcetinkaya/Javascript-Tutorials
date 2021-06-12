/****************** Account Profile Info *******************/
 $("#btn-update").click(function () {
     var phone = $("#phone").val();
     var address = $("#address").val();
     var bio = $("#bio").val();
     var fname = $("#firstName").val();
     var sname = $("#secondName").val();
     var country = $("#country").val();
     var gender = $("#gender").val();

     var rootRef = firebase.database().ref().child("users-blog");
     var userID = firebase.auth().currentUser.uid;
     var userRef = rootRef.child(userID);

     if (
         fname != "" &&
         sname != "" &&
         phone != "" &&
         country != "" &&
         gender != "" &&
         address != "" &&
         bio != ""
     ) {
         var userData = {
             phone: phone,
             address: address,
             bio: bio,
             firstName: fname,
             secondName: sname,
             country: country,
             gender: gender || null
         };
         userRef.set(userData, function (error) {
             if (error) {
                 var errorCode = error.code;
                 var errorMessage = error.message;

                 console.log(errorCode);
                 console.log(errorMessage);

                 window.alert("Message :" + errorMessage);
             } else {
                 window.location.href = "MainPage.html";
             }
         });
     } else {
         window.alert("Form is incomplete. Please fill out all fields.");
     }
 });
