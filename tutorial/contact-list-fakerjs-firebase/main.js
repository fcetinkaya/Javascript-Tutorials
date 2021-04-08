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

 function newContact(name, companyName, title, phone, email) {
     firebase.firestore().collection('contacts').add({
         name,
         companyName,
         title,
         phone,
         email
     });
 }

 function newdata() {
     document.getElementById('fake').innerHTML = '';
     for (let index = 0; index < 3; index++) {
         let name = faker.name.findName();
         let companyName = faker.company.companyName();
         let title = faker.name.jobTitle();
         let phone = faker.phone.phoneNumber();
         let email = faker.internet.email();
         document.getElementById('fake').innerHTML += `
<div class="card mt-3" style="width:20rem;">
<div class="card-body">
<h5 class="card-title">${name}</h5>
<p class="card-text">
${companyName}
<br />
${title}
<br />
${phone}
<br />
${email}
</p>
<button onclick = "newContact('${name}','${companyName}','${title}','${phone}','${email}')"
class = "btn btn-large btn-block btn-primary mt-2" > Add to Contact List </button>
</div>
</div>
`;
     }
 }

 function deleteContact(id) {
     firebase.firestore().collection('contacts').doc(id).delete();
 }

 firebase.firestore().collection('contacts').orderBy('name').onSnapshot(function (query) {
     document.getElementById('tablec').innerHTML = '';
     query.forEach(element => {
         document.getElementById('tablec').innerHTML += `
        <tr>
        <td>${element.data().name}</td>
        <td>${element.data().companyName}</td>
        <td>${element.data().title}</td>
        <td>${element.data().phone}</td>
        <td>${element.data().email}</td>
        <td>
        <button class="btn btn-danger" onclick="deleteContact('${element.id}')">Del</button>
        </td>
        </tr>`;
     });
 });

 newdata();