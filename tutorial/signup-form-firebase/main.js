 // Your web app's Firebase configuration
 var firebaseConfig = {
     apiKey: "AIzaSyBKgZcE0vfkeGkEIrw-ZnqWbyF8IZIf_08",
     authDomain: "fcetinkaya-javascript-tutorial.firebaseapp.com",
     projectId: "fcetinkaya-javascript-tutorial",
     storageBucket: "fcetinkaya-javascript-tutorial.appspot.com",
     messagingSenderId: "968114376602",
     appId: "1:968114376602:web:d426bd3a89f69a28397423"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 var con = firebase.database().ref('users-suf');

 document.getElementById('form').addEventListener("submit", (e) => {
     e.preventDefault();

     var userInfo = con.push();
     userInfo.set({
         name: getId("name"),
         number: getId("number"),
         email = getId("email"),
         city = getId("city"),
         password: getId("password")
     });
     alert("Database registered");
     console.log("Database registered");
     document.getElementById("form").reset();
 });

 function getId(id) {
     return document.getElementById(id).value;
 }