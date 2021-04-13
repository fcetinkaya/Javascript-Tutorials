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

 firebase.auth().onAuthStateChanged(function(user) {
     if (user) {
         
document.getElementById('formjs').innerHTML='';
document.getElementById('formjs').style.display='none';
document.getElementById('crud').style.display='block';

document.getElementById('crud').innerHTML = `





`;



     }     
 })