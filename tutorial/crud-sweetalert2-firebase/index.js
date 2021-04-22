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

 document.getElementById('form').addEventListener("submit", (e) => {
     var task = document.getElementById("task").value;
     var description = document.getElementById("description").value;
     e.preventDefault();
     createTask(task, description);
     form.reset();
 });

 function createTask(taskName, description) {
     var task = {

         task: taskName,
         description: description
     }
     let db = firebase.firestore().collection("tasks/");
     db.add(task).then(() => {
         Swal.fire(
             'Good job!',
             'Task Added',
             'Success'
         )
         document.getElementById("cardSection").innerHTML = '';
         readTask();
     });
 }

 function readTask() {
     firebase.firestore().collection("tasks").onSnapshot(function (snapshot) {
         document.getElementById("cardSection").innerHTML = '';

         snapshot.forEach(function (taskValue) {

             document.getElementById("cardSection").innerHTML += `
            <div class = "card mb-3">
                <div class = "card-body">
                <h5 class = "card-title">${taskValue.data().task}</h5>
                <p class = "card-text">${taskValue.data().description}</p>
                <button type = "submit" style = "color: white;" class = "btn btn-warning" onclick = "updateTask('${taskValue.id}','${taskValue.data().task}','${taskValue.data().description}')" >
                <i class = "fas fa-edit"></i> Edit Task </button><button type = "submit" class = "btn btn-danger" onclick = "deleteTask('${taskValue.id}')">
                <i class = "fas fa-trash-alt"> </i> Delete Task</button></div></div>
            `;
         });
     });
 }

 function reset() {
     document.getElementById("firstSection").innerHTML = `
                <form class = "border p-4 mb-4" id = "form">

                    <div class = "form-group">
                    <label>Task</label>
                    <input type="text" id="task" class="form-control" placeholder="Enter Task">
                    </div>

                    <div class="form-group">
                    <label>Description</label>
                    <input type="text" id="description" class="form-control" placeholder="Description">
                    </div>

                    <button type = "submit" id = "button1" class = "btn btn-primary"><i class = "fas fa-plus"></i> Add Task</button>
                    <button type = "submit" id = "button2" class = "btn btn-success" style = "display: none;"><i class = "fas fa-plus"></i> Update Task</button> 
                    <button type = "submit" id = "button3" class = "btn btn-danger" style = "display: none;"><i class = "fas fa-plus"></i> Cancel</button>
                    </form>
`;

     document.getElementById("form").addEventListener("submit", (e) => {
         var task = document.getElementById("task").value;
         var description = document.getElementById("description").value;
         e.preventDefault();
         createTask(task, description);
         form.reset();
     });
 }

 function updateTask(id, name, description) {
     document.getElementById("firstSection").innerHTML = `
                <form class = "border p-4 mb-4" id = "form2">

                    <div class="form-group">
                    <label>Task</label>
                    <input type="text" id="task" class="form-control" placeholder="Enter Task">
                    </div>

                    <div class="form-group">
                    <label>Description</label>
                    <input type="text" id="description" class="form-control" placeholder="Description">
                    </div>

                    <button type = "submit" id = "button1" class = "btn btn-primary" style="display:none;"><i class = "fas fa-plus"></i> Add Task</button>
                    <button type = "submit" id = "button2" class = "btn btn-success" style = "display: inline-block;"><i class = "fas fa-plus"></i> Update Task</button> 
                    <button type = "submit" id = "button3" class = "btn btn-danger" style = "display: inline-block;"><i class = "fas fa-plus"></i> Cancel</button>
                    </form>
`;

     document.getElementById("form2").addEventListener("submit", (e) => {
         e.preventDefault();
     });

     document.getElementById("button3").addEventListener("click", (e) => {
         reset();
     });

     document.getElementById("button2").addEventListener("click", (e) => {
         updateTask2(id, document.getElementById("task").value, document.getElementById("description").value);
     });
     document.getElementById("task").value = name;
     document.getElementById("description").value = description;
 }

 function updateTask2(id, name, description) {
     var taskUpdated = {
         task: name,
         description: description
     }
     let db = firebase.firestore().collection("tasks").doc(id);
     db.set(taskUpdated).then(() => {
         Swal.fire(
             'Good job!',
             'Task Updated!',
             'success'
         )
     });
     document.getElementById("cardSection").innerHTML = '';
     readTask();
     reset();
 }

 function deleteTask(id) {
     firebase.firestore().collection("tasks").doc(id).delete().then(() => {
         Swal.fire(
             'Good job!',
             'Task Removed!',
             'success'
         )
     });
     reset();
     document.getElementById("cardSection").innerHTML = '';
     readTask();
 }