dbUser={
    name:'Fatih',
    password:'çetinkaya'
}

var box=document.getElementById('box');
var inputUser=document.getElementById('inputUser');
var inputPassword=document.getElementById('inputPassword');
document.getElementById('userForm').addEventListener('submit',(e)=>{
    e.preventDefault();
    if (dbUser.name==inputUser.value && dbUser.password==inputPassword.value) {
        box.innerHTML=`<br><h2>Hello <b>${dbUser.name}!!, You are logged in!</h2>`
    } else {
        box.innerHTML='<br><h2>Try Again!</h2>';
    }
    console.log(inputUser.value);
    console.log(inputPassword.value);
});