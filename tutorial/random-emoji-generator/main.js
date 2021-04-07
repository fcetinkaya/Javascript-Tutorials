var emojis = ['1F498', '1F47B', '1F383', '2620', '1F385','2661','1F525', '1F983', '1F423', '1F331'];
var box = document.getElementById('box');
var random = Math.floor((Math.random() * 10) + 0);
var emoji = String.fromCodePoint('0x' + emojis[random]);

function generate() {
    for (let index = 0; index < 10; index++) {
        box.innerHTML += `<h2 style="display:inline-block">${emoji}</h2>`;
        console.log(random + ' ' + emoji);
        random = Math.floor((Math.random() * 10) + 0);
        emoji = String.fromCodePoint('0x' + emojis[random]);
    }
}