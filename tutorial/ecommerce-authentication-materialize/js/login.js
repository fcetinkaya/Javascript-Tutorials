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

 var x = document.getElementById("userName");
 var p = document.getElementById("userPassword");

 document.getElementById("formLogin").addEventListener("submit", (ee) => {
     ee.preventDefault();
     console.log(x.value);
     console.log(p.value);
     firebase.auth().signInWithEmailAndPassword(x.value, p.value)
         .then(() => {
             swal.fire({
                 position: 'center',
                 icon: 'success',
                 title: 'Welcome',
                 text: 'Access Granted'
             });
             x.value = '';
             p.value = '';
             setTimeout(() => {
                 loadPage();
             }, 3000)
         })
         .catch((error) => {
             swal.fire({
                 position: 'center',
                 icon: 'error',
                 title: 'Error',
                 text: 'Access Denied'
             });
             x.value = '';
             p.value = '';
         });

     function loadPage() {
         window.location.href = "./admin/admin.html";
     }
 });