
pointsUP(0);
var pointsForLife = 1;

function pointsUP(num) {
    game.points += num;
    points.textContent = game.points + 'pts';

    if (game.points == pointsForLife * 100) {
        createLifeUP();
        pointsForLife += 1;
    }
}


function life(num) {

    var lifePiece = lifeHud.querySelector('.hud-life-piece');
    var dangerDIV = ship.querySelector('.danger');

    game.life += num;

    if (game.life <= 1 && dangerDIV == null) {
        var danger = document.createElement('DIV')
        danger.classList.add('danger');
        ship.appendChild(danger);
    }
    if (num == -1 && game.life > 0 ) {
        lifeHud.removeChild(lifePiece)
    }

    if (game.life < 1) {
        var modal = document.querySelector('.modal');
        var deadModal = modal.querySelector('.dead');
        ship.classList.add('ship-dead');

        setTimeout(() => {
            modal.style.display = 'flex';
            deadModal.style.display = 'flex';
        }, 1000);
    }

    if (num == 1) {
        var newLife = document.createElement('DIV');
        newLife.classList.add('hud-life-piece');
        lifeHud.appendChild(newLife)
        soundLife = new Audio("./audio/life_up.wav");
        soundLife.volume = 0.3;
        soundLife.play();

        setTimeout(() => {
            soundLife.remove();
        }, 1000);

        if (game.life > 1 && dangerDIV !== null) {
            dangerDIV.remove();
        }

    }

}


function createLifeUP() {
    var posX = Math.round(Math.random() * (10 - 1)) * 10 + "%";
    var lifeUP = document.createElement('DIV');
    container.appendChild(lifeUP);
    lifeUP.classList.add('life-up');
    lifeUP.style.left = posX;

    setTimeout(() => {
        lifeUP.remove();
    }, 30000);

}