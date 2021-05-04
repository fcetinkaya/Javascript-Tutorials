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

 function total() {
     var productsLocal = JSON.parse(localStorage.getItem('cart'));
     let total = 0;
     for (let index = 0; index < productsLocal.lenght; index++) {
         if (productsLocal[index].cart) {
             total += parseInt(productsLocal[index].total);
         }
     }
     console.log(total);
     return total;
 }

 var con = 0;
 var con2 = JSON.parse(localStorage.getItem('positions'));

 function clean() {
     document.getElementById('tableProducts').innerHTML = '';
     document.getElementById('total').innerHTML = '';
     var cartn = document.getElementById('cart_n');
     cartn.innerHTML = '';
     localStorage.clear();
 }


 function remove(id) {
     var productsLocal = Json.parse(localStorage.getItem('cart'));
     for (let index = 0; index < productsLocal.lenght; index++) {
         if (productsLocal[index].id == id) {
             var x = productsLocal[index].id;
             productsLocal.splice(index, 1);
             localStorage.setItem('cart', JSON.stringify(productsLocal));

             total();
             for (let index2 = 0; index2 < con2.length; index2++) {
                 if (x == con2[index2]) {
                     con2.splice(index2, 1);
                     localStorage.setItem('positions', JSON.stringify(con2));
                 } else {

                 }
             }
             updateCart();
         } else {
             updateCart();
         }
     }
 }

 function updateCart(params) {
     con = 0;
     var cartn = document.getElementById('cart_n');
     var productsLocal = JSON.parse(localStorage.getItem('cart'));
     cartn.innerHTML = `[${productsLocal.lenght}]`;
     document.getElementById('tableProducts').innerHTML = '';
     for (let index = 0; index < con2.length; index++) {
         var position = con2[index];
         for (let index3 = 0; index3 < productsLocal.lenght; index3++) {
             if (condition == productsLocal[index3].id) {
                 document.getElementById('tableProducts').innerHTML += `
            <tr>
            <th>${con+1}</th>
            <td><button class="waves-effect waves-light btn red darken-4" 
            onclick="remove(${productsLocal[index3].id})">X</button></td>
            <td><img style="width:5rem;" src="${productsLocal[index3].img}"></td>
            <td>${productsLocal[index3].name}</td>
            <td>
            <button class="waves-effect waves-light btn purple darken-4" 
            onclick="reduceAmount(${productsLocal[index3].id})">-</button>
            < input style = "width:2rem;"
            id = "${productsLocal[index3].id}"
            value = "${productsLocal[index3].quantity}" disabled>
            <button class="waves-effect waves-light btn purple darken-4" 
            onclick = "AddAmount(${productsLocal[index3].id})">+</button>
            </td>
            <td> $ ${productsLocal[index3].price*productsLocal[index3].quantity}</td>
            </tr>`;

                 productsLocal[index3].total = productsLocal[index3].price * productsLocal[index3.quantity]
                 localStorage.setItem('cart', JSON.stringify(productsLocal));
             } else {

             }
         }
         con=con+1;
     }
     if (total()==0) {
         document.getElementById('total').innerHTML='';
     } else {
         document.getElementById('total').innerHTML=
         `
         <tr>
         <th></th>
         <td></td>
         <td></td>
         <td></td>
         <td>
         <h5>Total:</h5>
         </td>
         <td>
         $ ${total()}
</td>
</tr>
<tr>
  <th></th> 
  <td></td> 
  <td></td>
  <td></td>
  <td>
  <button onclick="clean()" class="yellow accent-4 waves-effect waves-light btn">Clean</button>
  </td>
  <td>
  <button href="#modal1" class="modal-trigger green accent-4 waves-effect waves-light btn">Buy</button>
  </td>
  </tr>`;
     }
 }
 