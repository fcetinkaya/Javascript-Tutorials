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


 var color;
 var red = 0;
 var blue = 0;
 var yellow = 0;

 firebase.firestore().collection("VotingApp_ChartJs").doc('red')
     .onSnapshot((doc) => {
         red = doc.data().count
         myChart.data.datasets.forEach((dataset) => {
             dataset.data[0] = red
             document.getElementById('btn1').textContent = red;
         });
         myChart.update();
     });
 firebase.firestore().collection("VotingApp_ChartJs").doc('blue')
     .onSnapshot((doc) => {
         blue = doc.data().count
         myChart.data.datasets.forEach((dataset) => {
             dataset.data[1] = blue
             document.getElementById('btn2').textContent = blue;
         });
         myChart.update();
     });
 firebase.firestore().collection("VotingApp_ChartJs").doc('yellow')
     .onSnapshot((doc) => {
         yellow = doc.data().count
         myChart.data.datasets.forEach((dataset) => {
             dataset.data[2] = yellow
             document.getElementById('btn3').textContent = yellow;
         });
         myChart.update();
     });
 var ctx = document.getElementById('chart').getContext('2d');
 var myChart = new Chart(ctx, {
     type: 'bar',
     data: {
         labels: ['Red', 'Blue', 'Yellow'],
         datasets: [{
             label: '# of Votes',
             data: [red, blue, yellow],
             backgroundColor: [
                 'rgba(255,99,132,0.2)',
                 'rgba(54,162,235,0.2)',
                 'rgba(255,206,86,0.2)'
             ],
             borderColor: [
                 'rgba(255,99,132,1)',
                 'rgba(54,162,235,1)',
                 'rgba(255,206,86,1)'
             ],
             borderWidth: 1
         }]
     },
     options: {
         scales: {
             yAxes: [{
                 ticks: {
                     beginAtZero: true
                 }
             }]
         }
     }
 });

 function addData(chart, label, data) {}

 document.getElementById('btn1').addEventListener('click', () => {
     myChart.data.datasets.forEach((dataset) => {
         dataset.data[0] = dataset.data[0] + 1
         document.getElementById('btn1').textContent = dataset.data[0];
     });
     firebase.firestore().collection("VotingApp_ChartJs").doc('red').set({
         count: ++red
     })
 })
 document.getElementById('btn2').addEventListener('click', () => {
     myChart.data.datasets.forEach((dataset) => {
         dataset.data[1] = dataset.data[1] + 1
         document.getElementById('btn1').textContent = dataset.data[1];
     });
     firebase.firestore().collection("VotingApp_ChartJs").doc('blue').set({
         count: ++blue
     })
 })
 document.getElementById('btn3').addEventListener('click', () => {
     myChart.data.datasets.forEach((dataset) => {
         dataset.data[2] = dataset.data[2] + 1
         document.getElementById('btn1').textContent = dataset.data[2];
     });
     firebase.firestore().collection("VotingApp_ChartJs").doc('yellow').set({
         count: ++yellow
     })
 })