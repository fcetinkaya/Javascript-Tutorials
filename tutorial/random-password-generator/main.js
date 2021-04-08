var x = "0123456789¡€€$^%^&^&*&()!@@#$$%$%*&(.,;'][/QWERTYUIOPASDFGHJKLZXCVBNMqwerrtyuiopasdfghjkllzxcvbnm";

function generate() {
    var password = '';
    for (let index = 0; index <= 10; index++) {
        var c = Math.floor((Math.random() * x.length) + 0);
        password += x.charAt(c);
    }
    console.log(password);
    document.getElementById('pass').innerHTML=`<h1>Password: ${password}</h1>`;
}