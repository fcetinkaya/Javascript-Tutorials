//global
var products = [];
var cartItems = [];
var cart_n = document.getElementById('cart_n');

if (localStorage.getItem9('positions')) {
    var positions = [JSON.parse(localStorage.getItem('cart_n'))];
} else {
    var positions = [];
}

//DIVS
var fruitDIV = document.getElementById('fruitDIV');
var juiceDIV = document.getElementById('juiceDIV');
var saladDIV = document.getElementById('saladDIV');

//INFORMATION
var FRUIT = [{
        id: 1,
        cart = false,
        img: 'img/fruits/fruit1.jpg',
        quantity: 1,
        total: 0,
        name: 'Strawberry',
        price: 1
    },
    {
        id: 2,
        cart = false,
        img: 'img/fruits/fruit2.jpg',
        quantity: 1,
        total: 0,
        name: 'Mango',
        price: 1
    },
    {
        id: 3,
        cart = false,
        img: 'img/fruits/fruit3.jpg',
        quantity: 1,
        total: 0,
        name: 'Apple',
        price: 1
    },
    {
        id: 4,
        cart = false,
        img: 'img/fruits/fruit4.jpg',
        quantity: 1,
        total: 0,
        name: 'Grape',
        price: 1
    },
    {
        id: 5,
        cart = false,
        img: 'img/fruits/fruit5.jpg',
        quantity: 1,
        total: 0,
        name: 'Mixed Fruits',
        price: 1
    },
    {
        id: 6,
        cart = false,
        img: 'img/fruits/fruit6.jpg',
        quantity: 1,
        total: 0,
        name: 'Kiwi',
        price: 1
    },
    {
        id: 7,
        cart = false,
        img: 'img/fruits/fruit7.jpg',
        quantity: 1,
        total: 0,
        name: 'Orange',
        price: 1
    },
    {
        id: 8,
        cart = false,
        img: 'img/fruits/fruit8.jpg',
        quantity: 1,
        total: 0,
        name: 'Mixed Fruits',
        price: 1
    }
];

var JUICE = [{
        id: 9,
        cart = false,
        img: 'img/juice/juice1.jpg',
        quantity: 1,
        total: 0,
        name: 'Juice #1',
        price: 4
    },
    {
        id: 10,
        cart = false,
        img: 'img/juice/juice2.jpg',
        quantity: 1,
        total: 0,
        name: 'Juice #2',
        price: 3
    },
    {
        id: 11,
        cart = false,
        img: 'img/juice/juice3.jpg',
        quantity: 1,
        total: 0,
        name: 'Juice #3',
        price: 2.4
    },
    {
        id: 12,
        cart = false,
        img: 'img/juice/juice4.jpg',
        quantity: 1,
        total: 0,
        name: 'Juice #4',
        price: 2
    }
];

var SALAD = [{
        id: 13,
        cart = false,
        img: 'img/salad/salad1.jpg',
        quantity: 1,
        total: 0,
        name: 'Salad #1',
        price: 6
    },
    {
        id: 14,
        cart = false,
        img: 'img/salad/salad2.jpg',
        quantity: 1,
        total: 0,
        name: 'Salad #2',
        price: 1
    },
    {
        id: 15,
        cart = false,
        img: 'img/salad/salad3.jpg',
        quantity: 1,
        total: 0,
        name: 'Salad #3',
        price: 2
    },
    {
        id: 16,
        cart = false,
        img: 'img/salad/salad1.jpg',
        quantity: 1,
        total: 0,
        name: 'Salad #4',
        price: 1.3
    }
];

//HTML
function HTMLfruitProuct(con) {
    let btn = `btnFruit${con}`;
    if (FRUIT[con - 1].cart) {
        return `
<div class="col s3 wow fadeInUp" data-wow-delay="3s" data-wow-offset="300">
<div class="card">
<div class="card-image">
<img src="${FRUIT[con-1].img}">
<a onclick="alertCart()" class="btn-floating halfway-fab waves-effect waves-light green">
<i class="material-icons">shopping_cart</i>
</a>
</div>
<div class="card-content">
<i style="color:orange;" class="fa fa-star"></i>
<i style="color:orange;" class="fa fa-star"></i>
<i style="color:orange;" class="fa fa-star"></i>
<i style="color:orange;" class="fa fa-star"></i>
<i style="color:orange;" class="fa fa-star"></i>
<span class="card-title">${FRUIT[con-1].name}</span>
<p>Price: $${FRUIT[con-1].price}</p>
    </div>
        </div>
            </div>`
    } else {




    }
}