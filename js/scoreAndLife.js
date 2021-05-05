
pointsUP(0);


function pointsUP(num) {
    game.points += num;
    points.textContent = game.points + 'pts';
}


function life(num) {

    var lifePiece = lifeHud.querySelector('.hud-life-piece');


    game.life += num;
    


    if(num == -1 && game.life > 0){
        lifeHud.removeChild(lifePiece)
    }
    
}