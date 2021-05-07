
pointsUP(0);


function pointsUP(num) {
    game.points += num;
    points.textContent = game.points + 'pts';
}


function life(num) {

    var lifePiece = lifeHud.querySelector('.hud-life-piece');
    var dangerDIV = ship.querySelector('.danger');

    game.life += num;
    
    if (game.life <= 1 && dangerDIV == null) {
      var danger =  document.createElement('DIV')
      danger.classList.add('danger');
        ship.appendChild(danger);
    }

    if(num == -1 && game.life > 0){
        lifeHud.removeChild(lifePiece)
    }
    
}