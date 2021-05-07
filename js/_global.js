var ship = document.querySelector('#ship');
var hud = document.querySelector('#hud');
var container = document.querySelector('.game-container');
var points = hud.querySelector('.hud-score');
var lifeHud = hud.querySelector('.hud-life');

var colors = ['red', 'yellow', 'blue', 'green']

var game = {

    life: 3,
    color: -1,
    points: 0,
    powerUp: 0,
    speed: 0,
    wave: 0

}

shipSound = new Audio("./audio/ship_loop2.wav");
shipSound.loop = true;
shipSound.volume = 0.3;
shipSound.play();

// console.log(shipSound);
musicSound = new Audio("./audio/music1.mp3");
musicSound.loop = true;
musicSound.volume = 0.4;
musicSound.play();