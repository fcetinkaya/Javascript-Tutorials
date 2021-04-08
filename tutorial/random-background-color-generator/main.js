var button = document.getElementById('btn');
var body = document.getElementById('bodyId');
var random = Math.floor(Math.random() * 10) + 0;
var colors = ['black', 'navy', 'aqua', 'gray', 'green', 'pink', 'yellow', 'blue', 'orange', 'white'];
button.addEventListener('click', () => {
    console.log(random + '=' + colors[random]);
    body.style.backgroundColor = colors[random];
    random=Math.floor(Math.random()*10)+0;
});