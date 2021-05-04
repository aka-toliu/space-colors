var ship = document.querySelector('#ship');
var hud = document.querySelector('#hud');
var container = document.querySelector('.game-container');
var points = hud.querySelector('.hud-score');

var colors = ['red', 'yellow', 'blue', 'green']

var game = {

    life: 3,
    color: -1,
    points: 0,
    powerUp: 0,
    speed: 0,
    wave: 0

}
 
var ballsHud = hud.querySelectorAll('.hud-color-ball');
// clearAndChangeHud();
// changeShipcolor();

// ----------- limpa as cores selecionadas na HUD e muda para a próxima -----
function clearAndChangeHud() {
    for (let i = 0; i < ballsHud.length; i++) {
        ballsHud[i].classList.remove('hud-color-ball--selected');
    }

    ballsHud[game.color].classList.add('hud-color-ball--selected');
}



function changeShipColor() {

    // for (let i = 0; i < ballsHud.length; i++) {
    //     // ship.classList.remove('ship-' + colors[i]);
        
        
    // }
    document.documentElement.setAttribute('color', colors[game.color]);
    // ship.classList.add('ship-' + colors[game.color]);
    
}






document.addEventListener("keydown", event => {


    // ------------ UP -------------------------------
    if (event.which === 38) {

        console.log('up');


        if(game.color < ballsHud.length - 1){
            game.color += 1;
           
        }else{
            game.color = 0;
           
        }
        clearAndChangeHud();
        changeShipColor();

        console.log(game.color);

    }

    // ------------ DOWN -------------------------------
    if (event.which === 40) {

        console.log('down');

        if(game.color > 0){
            game.color += -1;
           
        }else{
            game.color = ballsHud.length - 1;
        }
        clearAndChangeHud();
        changeShipColor();
        console.log(game.color);
    }

});
 
function shootCollider(shoot) {

    console.log(shoot);
    var meteorites = document.querySelectorAll('.meteorite');


    meteorites.forEach(element => {

        var meteorCollider = element.getBoundingClientRect();
        var shootCollider = shoot.getBoundingClientRect();


        var pontos_shoot = [

            { x: shootCollider.left, y: shootCollider.top },
            { x: shootCollider.left + shootCollider.width, y: shootCollider.top },
            { x: shootCollider.left + shootCollider.width, y: shootCollider.top + shootCollider.height },
            { x: shootCollider.left, y: shootCollider.top + shootCollider.heigt }
        ]

        var pontos_meteorites = [

            { x: meteorCollider.left, y: meteorCollider.top },
            { x: meteorCollider.left + meteorCollider.width, y: meteorCollider.top },
            { x: meteorCollider.left + meteorCollider.width, y: meteorCollider.top + meteorCollider.height },
            { x: meteorCollider.left, y: meteorCollider.top + meteorCollider.heigt }
        ]



        for (let i = 0; i < 3; i++) {
            if   ((pontos_shoot[i].x >= meteorCollider.left &&
                   pontos_shoot[i].x <= meteorCollider.left+meteorCollider.width &&
                   pontos_shoot[i].y >= meteorCollider.top &&
                   pontos_shoot[i].y <= meteorCollider.top+meteorCollider.height) ||
              
                  (pontos_meteorites[i].x >= shootCollider.left &&
                   pontos_meteorites[i].x <= shootCollider.left+shootCollider.width &&
                   pontos_meteorites[i].y >= shootCollider.top &&
                   pontos_meteorites[i].y <= shootCollider.top+shootCollider.height)){

                    console.log('colidiu');

                    if(shoot.classList.contains('shoot-' + colors[game.color]) 
                    && element.classList.contains('meteor-' + colors[game.color])){

                        element.classList.add('explode-meteorite');
                        setTimeout(() => {
                            element.remove();
                        }, 900);
                        
                        pointsUP(10);
                       
                    }
                    

                    
        }      
    }


    });



}

 
function createMeteorites() {
    var posX = Math.round(Math.random() * (10 - 1)) * 10 + "%";
    var numColor = Math.round(Math.random() * (3 - 0));

    var meteorite = document.createElement('DIV');
    meteorite.classList.add('meteorite');
    container.appendChild(meteorite);
    meteorite.classList.add('meteor-' + colors[numColor])
    meteorite.style.left = posX;

    setTimeout(() => {
        meteorite.remove();
    }, 9000);
    console.log(numColor);

}

setInterval(createMeteorites, 2000);


function fallEnemies(object, time) {

    var init = 0;

    setInterval(() => {
        init += 5;

        object.style.top = init + 'vh';

    }, time);

}
 

var updateL;
var updateR;
var posX = 0;
var move = false;



let widthScreen = document.body.clientWidth;


function turnR() {
  // console.log(posX);
  if (posX < widthScreen / 2 - 50) {
    // console.log('Turn-R');
    newPosX = posX += 7;
  }

  ship.style.transform = "translateX(" + newPosX + "px)";

}


function turnL() {
  // console.log(posX);
  if (posX > (widthScreen / 2 - 50) * -1) {
    // console.log('Turn-R');
    newPosX = posX -= 7;
  }

  ship.style.transform = "translateX(" + newPosX + "px)";

}

document.addEventListener("keydown", event => {


  // ------------ Right -------------------------------
  if (event.which === 39 && event.repeat === false && !ship.classList.contains('turn-L')) {


    ship.classList.add("turn-R");
    console.log('R-down');
    clearInterval(updateL);

    move = true;
    if (move == true) {
      updateR = setInterval(turnR, 10);
    } else {
      clearInterval(updateL);
      clearInterval(updateR);
    }

  }

  // ------------ Left -------------------------------
  if (event.keyCode === 37 && event.repeat === false && !ship.classList.contains('turn-R')) {

    ship.classList.add("turn-L");
    console.log('L-down');
    clearInterval(updateR);

    move = true;
    if (move == true) {
      updateL = setInterval(turnL, 10);
    } else {
      clearInterval(updateL);
      clearInterval(updateR);
    }

  }


});




document.addEventListener("keyup", event => {

  // -------- Right ------------
  if (event.which === 39) {

    ship.classList.remove("turn-R");
    console.log('R-up');
    move = false;
    clearInterval(updateL);
    clearInterval(updateR);
  }

  // -------- Left ------------
  if (event.keyCode === 37) {

    ship.classList.remove("turn-L");
    console.log('L-up');
    move = false;
    clearInterval(updateL);
    clearInterval(updateR);
  }

});

 

pointsUP(0);


function pointsUP(num) {
    game.points += num;
    points.textContent = game.points + 'pts';
}
 




document.addEventListener("keydown", event => {

if (event.keyCode === 32 && event.repeat == false) {

    var shipInfo = ship.getBoundingClientRect();
    var shootPosX = shipInfo.left + 30;

    var shoot = document.createElement('DIV');
    shoot.classList.add('shoot', 'shoot-' + colors[game.color]);
    container.appendChild(shoot);
    shoot.style.transform = 'translateX(' + shootPosX + 'px)';

    shootMove(shoot);

    setTimeout(() => {
        shoot.remove();
    }, 450);


  }

});



function shootMove(shoot) {

    var init = 25;

  var shootUpdate =  setInterval(() => {
        init += 5;

        shoot.style.bottom = init + 'vh';

        shootCollider(shoot);
    }, 20);

    shootUpdate;

    setTimeout(() => {
        clearInterval(shootUpdate);
    }, 450);
    
}