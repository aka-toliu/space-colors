var ship = document.querySelector('#ship');
var hud = document.querySelector('#hud');
var container = document.querySelector('.game-container');
var points = hud.querySelector('.hud-score');
var lifeHud = hud.querySelector('.hud-life');
var telaInicial = document.querySelector('.tela-inicial');
var tutorial = document.querySelector('.tutorial');

var colors = ['red', 'yellow', 'blue', 'green']

var game = {

    life: 4,
    color: -1,
    points: 0,
    powerUp: 0,
    speed: 0,
    wave: 0

}

select = new Audio("./audio/select.mp3");
select = new Audio("./audio/select.mp3");
startSound = new Audio("./audio/start_game.mp3");
openLights = new Audio("./audio/open_lights.mp3");
openLasers = new Audio("./audio/open_lasers.mp3");
bossXplode = new Audio("./audio/boss_xplode2.mp3");
broken = new Audio("./audio/broken_shield.mp3"); 7
musicBoss = new Audio("./audio/music_boss.mp3");
soundLife = new Audio("./audio/life_up.wav");
shipXplode = new Audio("./audio/ship_xplode.mp3");

shipSound = new Audio("./audio/ship_loop2.wav");
shipSound.loop = true;
shipSound.volume = 0.3;
shipSound.play();


musicSound = new Audio("./audio/music1.mp3");
musicSound.loop = true;
musicSound.volume = 0.4;
musicSound.play();

