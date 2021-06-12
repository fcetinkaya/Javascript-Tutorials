/******************New User Create*******************/
 $("#btn-signup").click(function () {
     var email = $("#email").val();
     var password = $("#password").val();
     var Cpassword = $("#confirmpassword").val();

     if (email != "" && password != "" && (Cpassword != "") != "") {
         var result = firebase
             .auth()
             .createUserWithEmailAndPassword(email, password);
         if (password == Cpassword) {
             result.catch(function (error) {
                 var errorCode = error.code;
                 var errorMessage = error.message;

                 console.log(errorCode);
                 console.log(errorMessage);

                 window.alert("Message :" + errorMessage);
             });
         } else {
             window.alert("Password does not match with the Confirm Password.");
         }
     } else {
         window.alert("Please fill out all fields.");
     }
 });