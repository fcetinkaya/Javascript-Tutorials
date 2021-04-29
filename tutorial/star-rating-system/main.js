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

 var stars = [false, false, false, false, false];

 function addMovie() {
     let movieName = document.getElementById('movieName');
     firebase.firestore().collection('movies').add({
         movie: movieName.value,
         rating: stars
     });

     movieName.value = '';
 }

 function color(key, star) {
     for (let index = 0; index <= star; index++) {
         document.getElementById('star' + key + (index)).style.color = "orange";
     }
 }

 function nocolor(key) {
     for (let index = 0; index < stars.length; index++) {
         document.getElementById('star' + key + (index)).style.color = "initial";
     }
 }

 function mark(name, key, star) {
     for (let index = 0; index <= star; index++) {
         stars[index] = true
     }
     firebase.firestore().collection('movies').doc(key).set({
         movie: name,
         rating: stars
     });
     stars = [false, false, false, false, false];
 }
 (() => {
         firebase.firestore().collection("movies")
             .onSnapshot(function (querySnapshot) {
                     document.getElementById('divRender').innerHTML = '';
                     querySnapshot.forEach(function (doc) {
                                 console.log(doc.id)
                                 if (doc.data().rating[0]) {
                                     document.getElementById('divRender').innerHTML += `    
                        <div class="row" id="${doc.id}">
                        <div class="col">
                        <h6>Movie Title: ${doc.data().movie}</h6>
                        <h6>Rating: </h6>
                        <div id="starsR${doc.id}"></div>
                        </div>

                        </div>
                        <hr>
                        `;
                                     for (let index = 0; index < doc.data().rating.length; index++) {
                                         if (doc.data().rating[index]) {
                                             document.getElementById('starsR' + doc.id).innerHTML += `
                         <i style="color:orange" class="fas fa-star"></i>`;
                                         } else {
                                             document.getElementById('starsR' + doc.id).innerHTML += `
                        <i style="initial" class="fas fa-star"></i>`;
                                         }
                                     }
                                 } else {
                                     document.getElementById('divRender').innerHTML += `    
                        <div class="row" id="${doc.id}">
                        <div class="col">
                        <h6>Movie Title: ${doc.data().movie}</h6>
                        <h6>Rating: </h6>

                        <i onmouseover="color('${doc.id}','0')" onclick="mark('${doc.data().movie}','${doc.id}','0')" onmouseleave="nocolor('${doc.id}')" id='${'star'+doc.id+0}' class="fas fa-star"></i>
                        <i onmouseover="color('${doc.id}','1')" onclick="mark('${doc.data().movie}','${doc.id}','1')" onmouseleave="nocolor('${doc.id}')" id='${'star'+doc.id+1}' class="fas fa-star"></i>
                        <i onmouseover="color('${doc.id}','2')" onclick="mark('${doc.data().movie}','${doc.id}','2')" onmouseleave="nocolor('${doc.id}')" id='${'star'+doc.id+2}' class="fas fa-star"></i>
                        <i onmouseover="color('${doc.id}','3')" onclick="mark('${doc.data().movie}','${doc.id}','3')" onmouseleave="nocolor('${doc.id}')" id='${'star'+doc.id+3}' class="fas fa-star"></i>
                        <i onmouseover="color('${doc.id}','4')" onclick="mark('${doc.data().movie}','${doc.id}','4')" onmouseleave="nocolor('${doc.id}')" id='${'star'+doc.id+4}' class="fas fa-star"></i>
</div>
</div>
<hr>`;
                 }
             })
         })
 })();