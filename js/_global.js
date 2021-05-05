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