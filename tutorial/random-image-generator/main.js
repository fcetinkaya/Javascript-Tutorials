function generator() {
    for (let index = 0; index < 10; index++) {
        var x = Math.floor((Math.random() * 6) + 1);
        console.log(x);
        document.getElementById('divImage').innerHTML +=
         `<img src="images/picture${x}.jpg" style="width:320px; padding:2px;">`;
    }
}