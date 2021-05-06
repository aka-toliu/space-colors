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
            if ((pontos_shoot[i].x >= meteorCollider.left &&
                pontos_shoot[i].x <= meteorCollider.left + meteorCollider.width &&
                pontos_shoot[i].y >= meteorCollider.top &&
                pontos_shoot[i].y <= meteorCollider.top + meteorCollider.height) ||

                (pontos_meteorites[i].x >= shootCollider.left &&
                    pontos_meteorites[i].x <= shootCollider.left + shootCollider.width &&
                    pontos_meteorites[i].y >= shootCollider.top &&
                    pontos_meteorites[i].y <= shootCollider.top + shootCollider.height)) {

                console.log('colidiu');

                if (shoot.classList.contains('shoot-' + colors[game.color])
                    && element.classList.contains('meteor-' + colors[game.color]) 
                    && !element.classList.contains('explode-meteorite')) {

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
setInterval(shipCollider, 30);

function shipCollider() {
    var meteorites = document.querySelectorAll('.meteorite');


    if (!ship.classList.contains('damage')) {

        meteorites.forEach(element => {

            var meteorCollider = element.getBoundingClientRect();
            var shipCollider = ship.getBoundingClientRect();


            var pontos_ship = [

                { x: shipCollider.left, y: shipCollider.top },
                { x: shipCollider.left + shipCollider.width, y: shipCollider.top },
                { x: shipCollider.left + shipCollider.width, y: shipCollider.top + shipCollider.height },
                { x: shipCollider.left, y: shipCollider.top + shipCollider.heigt }
            ]

            var pontos_meteorites = [

                { x: meteorCollider.left, y: meteorCollider.top },
                { x: meteorCollider.left + meteorCollider.width, y: meteorCollider.top },
                { x: meteorCollider.left + meteorCollider.width, y: meteorCollider.top + meteorCollider.height },
                { x: meteorCollider.left, y: meteorCollider.top + meteorCollider.heigt }
            ]


            if (!element.classList.contains('explode-meteorite')) {


                for (let i = 0; i < 3; i++) {
                    if ((pontos_ship[i].x >= meteorCollider.left &&
                        pontos_ship[i].x <= meteorCollider.left + meteorCollider.width &&
                        pontos_ship[i].y >= meteorCollider.top &&
                        pontos_ship[i].y <= meteorCollider.top + meteorCollider.height) ||

                        (pontos_meteorites[i].x >= shipCollider.left &&
                            pontos_meteorites[i].x <= shipCollider.left + shipCollider.width &&
                            pontos_meteorites[i].y >= shipCollider.top &&
                            pontos_meteorites[i].y <= shipCollider.top + shipCollider.height)
                        && !ship.classList.contains('damage')) {



                            element.classList.add('explode-meteorite');


                        ship.classList.add('damage');
                        life(-1);
                        console.log('dano');

                        setTimeout(() => {
                            ship.classList.remove('damage');
                        }, 2000);







                    }



                }
            }

        });

    }
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
    // console.log(numColor);

}

setInterval(createMeteorites, 2000);


function fallEnemies(object, time) {

    var init = 0;

    setInterval(() => {
        init += 5;

        object.style.top = init + 'vh';

    }, time);

}
 
var side = 'idle';
var move = false;
var moving;
var posX = 0;

document.addEventListener("keydown", event => {

  if(event.isTrusted == false){
    clearTimeout(moving);
  }

  if (event.key === 'ArrowRight' && event.key === 'ArrowLeft') {
    clearTimeout(moving)
  }

  if (event.key === 'ArrowRight' && event.repeat == false && side !== 'L') {

    console.log('R-down');
    ship.classList.add("turn-R");
    side = 'R';
    move = true;
    moveShip();

  }

  if (event.key === 'ArrowLeft' && event.repeat == false && side !== 'R') {
    console.log('L-down');
    ship.classList.add("turn-L");
    side = 'L';
    move = true;
    moveShip();
  }


});

document.addEventListener("keyup", event => {



  if (event.key === 'ArrowRight') {

    console.log('R-up');
    ship.classList.remove("turn-R");
    side = 'idle';
    move = false;
    clearTimeout(moving);

  }

  if (event.key === 'ArrowLeft') {

    console.log('L-up');
    ship.classList.remove("turn-L");
    side = 'idle';
    move = false;
    clearTimeout(moving);
  }

});


function moveShip() {

  
  let widthScreen = document.body.clientWidth;

  if (side == 'R' && move == true && posX < (widthScreen / 2 - 50)) {
    console.log('turning-R');
    moving = setTimeout(moveShip, 20); 7

    var newPosR = posX += 15;
    ship.style.transform = "translateX(" + newPosR + "px)";
  }else{
    ship.classList.remove("turn-R");
    
  }

  if (side == 'L' && move == true && posX > (widthScreen / 2 - 50) * -1) {
    console.log('turning-L');
    moving = setTimeout(moveShip, 20);

    var newPosL = posX += -15;
    ship.style.transform = "translateX(" + newPosL + "px)";
  }else{
    ship.classList.remove("turn-L");
  }

}

















// var updateL;
// var updateR;
// var updateMove;
// var side;
// var posX = 0;
// var move = false;



// let widthScreen = document.body.clientWidth;



// function turnShip() {
//   console.log('ta rodando');
//   if(side == "R" &&  move == true && posX < (widthScreen / 2 - 50)){
//     var newPosR = posX += 10;
//     ship.style.transform = "translateX(" + newPosR + "px)";

//   }
//   else if(side == "L" && move == true && posX > (widthScreen / 2 - 50) * -1){
//     var newPosL = posX += -10;
//     ship.style.transform = "translateX(" + newPosL + "px)";

//   }else{
//     clearInterval(updateMove);

//   }
// }


// document.addEventListener("keydown", event => {

//   // ------------ Right -------------------------------
//   if (event.key === 'ArrowRight' && event.repeat === false && !ship.classList.contains('turn-L')) {


//     ship.classList.add("turn-R");
//     console.log('R-down');
//     move = true;
//     side = "R";
//     updateMove = setInterval(turnShip, 20);


//   }

//   // ------------ Left -------------------------------
//   if (event.key === 'ArrowLeft' && event.repeat === false && !ship.classList.contains('turn-R')) {

//     ship.classList.add("turn-L");
//     console.log('L-down');
//     move = true;
//     side = "L";
//     updateMove = setInterval(turnShip, 20);


//   }

// });




// document.addEventListener("keyup", event => {

//   if (event.key === 'ArrowRight' && event.key === 'ArrowRight') {
//     clearInterval(updateMove);
//   }

//   // -------- Right ------------
//   if (event.key === 'ArrowRight') {
//     move = false;
//     ship.classList.remove("turn-R");
//     clearInterval(updateMove);

//   }

//   // -------- Left ------------
//   if (event.key === 'ArrowLeft') {
//     move = false;
//     ship.classList.remove("turn-L");
//     clearInterval(updateMove);
//   }

// });

 

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