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

 firebase.auth().onAuthStateChanged(function (user) {
     if (user) {

         document.getElementById('formjs').innerHTML = '';
         document.getElementById('formjs').style.display = 'none';
         document.getElementById('crud').style.display = 'block';

         document.getElementById('crud').innerHTML = `
    <div class = "row mt-5" >
        <div id = "firstSection" class = "col-md-6">
        <form id = "form" class = "border p-4 mb-4">
        <div class = "form-group">
        <label>Task</label><input required type = "text" class = "form-control" id = "task" placeholder = "Enter Task">
        </div><div class = "form-group"><label>Description</label><input required type = "text" class = "form-control" id = "description" placeholder = "Description">
        </div><p style = "display: none;" id = "taskkey"></p><button type = "button" id = "button1" class = "btn-block btn btn-primary">Add Task</button><button type = "button" id = "button2" class = "btnop2 btn btn-success" style = "display:none;" onclick = "updateTask(2)">Update Task</button><button type = "button" id = "button3" class = "btnop2 btn btn-danger" style = "display:none;" onclick = "cancel()">Cancel</button></form><h2>Fatih Çetinkaya</h2><h3>Github</h3> <
        button type = "button" class = "btn-block btn mt-5 btn-danger" onclick = "firebase.auth().signOut()">Sign Out</button></div><div class = "col-md-6" id = "cardSection"></div><div class = "row" style = "position: fixed; bottom: 5%;"></div>
</div>`;
         document.getElementById("form").addEventListener("submit", (e) => {
             e.preventDefault();
             var task = document.getElementById("task").value;
             var description = document.getElementById("description").value;

             createTask(task, description);
             form.reset();
         });
         readTask();
     } else {
         document.getElementById("crud").style.display = "none";
         document.getElementById("crud").innerHTML = "";
         document.getElementById("formjs").style.display = "block";
         document.getElementById("formjs").innerHTML = `
<h1 class = "h3 mb-3 font-weight-normal">Login</h1><label for="inputEmail" class="sr-only">Email Address</label> <input type = "email" id = "inputEmail" class = "form-control mb-3" placeholder = "Email Address" required autofocus>
    <label for = "inputPassword" class = "sr-only">Password</label><input type="password" id="inputPassword" class = "form-control mb-3" placeholder = "Password" required>
    <button class = "btn btn-lg btn-primary btn-block"
type = "submit">Sign in</button><p id="errorm" class="mt-5 mb-3 text-danger"></p> <p class = "mt-5 mb-3 text-muted">&copy;
Fatih Çetinkaya < /p>`;

         const errorhtml = document.getElementById('errorm');
         document.getElementById('formjs').addEventListener('submit', (e) => {
             e.preventDefault();
             errorhtml.innerHTML = '';
             const email = document.getElementById('inputEmail');
             const email = document.getElementById('inputPassword');
             firebase.auth().signInWithEmailAndPassword(email.value, password.value)
                 .catch(function (error) {
                     errorhtml.innerHTML = `${error.message}`;
                 });
         });
     }
 });

 (() => {
     document.getElementById('formjs').style.display = 'none'
     document.getElementById('crud').style.display = 'none'
 })()

 function deleteTask(id) {
     firebase.firestore().collection('tasks').doc(id).delete();
 }

 function updateTask(option, id, name, desc) {
     if (option == 1) {
         document.getElementById('task').value = name;
         document.getElementById('description').value = desc;
         document.getElementById('taskkey').value = id;
         document.getElementById('button1').style.display = 'none';
         document.getElementById('button2').style.display = 'inline-block';
         document.getElementById('button3').style.display = 'inline-block';
         elements = document.getElementsByClassName('btnop')
         for (var i = 0; i < elements.length; i++) {
             elements[i].disabled = true;
         }
     } else {
         elements = document.getElementsByClassName('btnop2')
         for (var i = 0; i < elements.length; i++) {
             elements[i].disabled = true;
         }


         let db = firebase.firestore().collection("tasks").doc(document.getElementById('taskkey').value);
         db.set({
             task: document.getElementById('task').value,
             description: document.getElementById('description').value
         }).then(() => {
             document.getElementById('task').value = "";
             document.getElementById("description").value = "";

             cancel()
         });
     }
 }

 function cancel() {
     document.getElementById('task').value = "";
     document.getElementById('description').value = "";
     document.getElementById('taskkey').value = id;
     document.getElementById('button1').style.display = 'block';
     document.getElementById('button2').style.display = 'none';
     document.getElementById('button3').style.display = 'none';
     elements = document.getElementsByClassName('btnop')
     for (var i = 0; i < elements.length; i++) {
         elements[i].disabled = false;
     }

     elements = document.getElementsByClassName('btnop2')
     for (var i = 0; i < elements.length; i++) {
         elements[i].disabled = false;
     }
 }

 function createTask(taskName, description) {
     var task = {

         task: taskName,
         description: description
     }
     let db = firebase().firestore().collection("tasks/");
     db.add(task)
 }

 function readTask() {
    firebase.firestore().collection("tasks").onSnapshot(function(snapshot) {
        document.getElementById("cardSection").innerHTML="";
        snapshot.forEach(function(taskValue) {
            document.getElementById("cardSection").innerHTML=`
            < div class = "card mb-3"
            style = "background-color: inherit; border: 1px solid;" >
                <
                div class = "card-body" >
                <
                h5 class = "text-white card-title" >
                Task: $ {
                    taskValue.data().task
                } </h5> <p class = "card-text text-white" > Description: $ {
                    taskValue.description
                </p> <button type = "submit" class = "btnop btn btn-warning" style = "color: white;"
            onclick = "updateTask(1,'${taskValue.id}','${taskValue.data().task}','${taskValue.data().description}')" > Edit
            Task</button> <button type = "submit" class = "btnop btn btn-danger" onclick = "deleteTask('${taskValue.id}')">Delete Task</button></div></div> `;            
        });
    });
 }