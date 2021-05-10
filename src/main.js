var ship = document.querySelector('#ship');
var hud = document.querySelector('#hud');
var container = document.querySelector('.game-container');
var points = hud.querySelector('.hud-score');
var lifeHud = hud.querySelector('.hud-life');
var telaInicial = document.querySelector('.tela-inicial');
var tutorial = document.querySelector('.tutorial');

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


musicSound = new Audio("./audio/music1.mp3");
musicSound.loop = true;
musicSound.volume = 0.4;
musicSound.play();
 
// boss();


function boss() {

    var bossContainer = document.querySelector('.boss-container')
    var shieldContainer = container.querySelector('.boss-shield-container');
    var laserRow1 = container.querySelector('.laser-row-1');
    var laserRow2 = container.querySelector('.laser-row-2');

    bossContainer.style.display = 'flex';

    setTimeout(() => {
        shieldContainer.style.animation ='rotateBossShield 15s ease-in infinite';
        shieldContainer.classList.remove('no-lights')
        laserRow1.classList.add('laser-open-1');
        laserRow2.classList.add('laser-open-2');

        openLights = new Audio("./audio/open_lights.mp3");
        openLights.play();

        setTimeout(() => {
            openLasers = new Audio("./audio/open_lasers.mp3");
            openLasers.play();
        }, 500);

        setTimeout(() => {
            laserRow1.classList.add('laser-move-1');
            laserRow2.classList.add('laser-move-2');


        }, 7000);

    }, 10000);
    
}

function bossDestroyed() {
    var laserRow1 = container.querySelector('.laser-row-1');
    var laserRow2 = container.querySelector('.laser-row-2');
    var bossContainer = document.querySelector('.boss-container')

    bossContainer.classList.add('boss-destroyed');
    laserRow1.classList.remove('laser-move-1', 'laser-open-1')
    laserRow2.classList.remove('laser-move-2', 'laser-open-2')

    bossXplode = new Audio("./audio/boss_xplode.mp3");
    bossXplode.play();
    musicBoss.pause();


    setTimeout(() => {
        bossContainer.remove();

        setTimeout(() => {
            var modal = document.querySelector('.modal');
            var highscoreModal = modal.querySelector('.finish');
            var scoreFinal = modal.querySelector('.final-score');

            modal.style.display = 'flex';
            highscoreModal.style.display = 'flex';
            scoreFinal.textContent = game.points + 'pts'
        }, 200);
    }, 4750);
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

        var colorSound = document.createElement("audio");
        colorSound.src = "./audio/change_color.flac";
        colorSound.play();

        setTimeout(() => {
            colorSound.remove();
        }, 1000);

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

        var colorSound = document.createElement("audio");
        colorSound.src = "./audio/change_color.flac";
        colorSound.play();
        console.log('down');
        setTimeout(() => {
            colorSound.remove();
        }, 1000);

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

    // ------------------------- Colisão de tiro com meteoritos ------------------------------------- 

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

                // console.log('colidiu');

                if (shoot.classList.contains('shoot-' + colors[game.color])
                    && element.classList.contains('meteor-' + colors[game.color])
                    && !element.classList.contains('explode-meteorite')) {

                    element.classList.add('explode-meteorite');

                    var meteorSmashSound = document.createElement("audio");
                    meteorSmashSound.src = "./audio/meteor_smash.mp3";
                    meteorSmashSound.play();


                    setTimeout(() => {
                        element.remove();
                        meteorSmashSound.remove();
                    }, 900);

                    pointsUP(10);

                }



            }
        }


    });

    // ------------------------ Colisão com escudos do Boss ------------------

    var shields = document.querySelectorAll('.boss-shield');

    shields.forEach(element => {

        var shieldsCollider = element.getBoundingClientRect();
        var shootCollider = shoot.getBoundingClientRect();


        var pontos_shoot = [

            { x: shootCollider.left, y: shootCollider.top },
            { x: shootCollider.left + shootCollider.width, y: shootCollider.top },
            { x: shootCollider.left + shootCollider.width, y: shootCollider.top + shootCollider.height },
            { x: shootCollider.left, y: shootCollider.top + shootCollider.heigt }
        ]

        var pontos_shields = [

            { x: shieldsCollider.left, y: shieldsCollider.top },
            { x: shieldsCollider.left + shieldsCollider.width, y: shieldsCollider.top },
            { x: shieldsCollider.left + shieldsCollider.width, y: shieldsCollider.top + shieldsCollider.height },
            { x: shieldsCollider.left, y: shieldsCollider.top + shieldsCollider.heigt }
        ]



        for (let i = 0; i < 3; i++) {
            if ((pontos_shoot[i].x >= shieldsCollider.left &&
                pontos_shoot[i].x <= shieldsCollider.left + shieldsCollider.width &&
                pontos_shoot[i].y >= shieldsCollider.top &&
                pontos_shoot[i].y <= shieldsCollider.top + shieldsCollider.height) ||

                (pontos_shields[i].x >= shootCollider.left &&
                    pontos_shields[i].x <= shootCollider.left + shootCollider.width &&
                    pontos_shields[i].y >= shootCollider.top &&
                    pontos_shields[i].y <= shootCollider.top + shootCollider.height)) {

                // console.log('colidiu');
                var shieldsBroken = document.querySelectorAll('.shield-broken');
                ;



                if (shoot.classList.contains('shoot-' + colors[game.color])
                    && element.classList.contains('boss-shield-' + colors[game.color])
                    && !element.classList.contains('boss-damage')
                    && !element.parentNode.classList.contains('no-lights')) {

                    element.classList.add('boss-damage');
                    // bossLife.colors[game.color];
                    if (element.id > 0) {
                        element.id = element.id - 1;
                    } else {
                        element.classList.add('shield-broken');

                        setTimeout(() => {
                            element.style.display = 'none';
                        }, 400);
                    }



                    setTimeout(() => {
                        element.classList.remove('boss-damage');
                    }, 100);

                    pointsUP(1);

                }


                if (shieldsBroken.length == 4) {
                    bossDestroyed();
                }

            }
        }


    });


}
setInterval(shipCollider, 30);

function shipCollider() {
    var meteorites = document.querySelectorAll('.meteorite');
    var lasers = document.querySelectorAll('.laser');
    var osbtacules = document.querySelectorAll('.ob');


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


            if (!element.classList.contains('explode-meteorite') && !ship.classList.contains('damage')) {


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
                        var damageSound = document.createElement("audio");
                        damageSound.src = "./audio/damage_ship.mp3";
                        damageSound.play();


                        ship.classList.add('damage');
                        life(-1);
            


                        setTimeout(() => {
                            ship.classList.remove('damage');
                            damageSound.remove();
                        }, 2100);







                    }



                }
            }

        });

    }

    //----------------------------------- Dano por lasers ----------------------------------

    if (!ship.classList.contains('damage')) {

        lasers.forEach(element => {

            var laserCollider = element.getBoundingClientRect();
            var shipCollider = ship.getBoundingClientRect();


            var pontos_ship = [

                { x: shipCollider.left, y: shipCollider.top },
                { x: shipCollider.left + shipCollider.width, y: shipCollider.top },
                { x: shipCollider.left + shipCollider.width, y: shipCollider.top + shipCollider.height },
                { x: shipCollider.left, y: shipCollider.top + shipCollider.heigt }
            ]

            var pontos_laser = [

                { x: laserCollider.left, y: laserCollider.top },
                { x: laserCollider.left + laserCollider.width, y: laserCollider.top },
                { x: laserCollider.left + laserCollider.width, y: laserCollider.top + laserCollider.height },
                { x: laserCollider.left, y: laserCollider.top + laserCollider.heigt }
            ]





            for (let i = 0; i < 3; i++) {
                if ((pontos_ship[i].x >= laserCollider.left &&
                    pontos_ship[i].x <= laserCollider.left + laserCollider.width &&
                    pontos_ship[i].y >= laserCollider.top &&
                    pontos_ship[i].y <= laserCollider.top + laserCollider.height) ||

                    (pontos_laser[i].x >= shipCollider.left &&
                        pontos_laser[i].x <= shipCollider.left + shipCollider.width &&
                        pontos_laser[i].y >= shipCollider.top &&
                        pontos_laser[i].y <= shipCollider.top + shipCollider.height)
                    && !ship.classList.contains('damage')) {



                    if (!element.classList.contains(colors[game.color])) {
                        ship.classList.add('damage');
                        life(-1);

                        var damageSound = document.createElement("audio");
                        damageSound.src = "./audio/damage_ship.mp3";
                        damageSound.play();

                        setTimeout(() => {
                            ship.classList.remove('damage');
                            damageSound.remove();
                        }, 2000);

                    }
                }
            }

        });

    }

    //-------------------------------------------------------------------------------------------

    if (!ship.classList.contains('damage')) {

        osbtacules.forEach(element => {

            var obCollider = element.getBoundingClientRect();
            var shipCollider = ship.getBoundingClientRect();


            var pontos_ship = [

                { x: shipCollider.left, y: shipCollider.top },
                { x: shipCollider.left + shipCollider.width, y: shipCollider.top },
                { x: shipCollider.left + shipCollider.width, y: shipCollider.top + shipCollider.height },
                { x: shipCollider.left, y: shipCollider.top + shipCollider.heigt }
            ]

            var pontos_ob = [

                { x: obCollider.left, y: obCollider.top },
                { x: obCollider.left + obCollider.width, y: obCollider.top },
                { x: obCollider.left + obCollider.width, y: obCollider.top + obCollider.height },
                { x: obCollider.left, y: obCollider.top + obCollider.heigt }
            ]





            for (let i = 0; i < 3; i++) {
                if ((pontos_ship[i].x >= obCollider.left &&
                    pontos_ship[i].x <= obCollider.left + obCollider.width &&
                    pontos_ship[i].y >= obCollider.top &&
                    pontos_ship[i].y <= obCollider.top + obCollider.height) ||

                    (pontos_ob[i].x >= shipCollider.left &&
                        pontos_ob[i].x <= shipCollider.left + shipCollider.width &&
                        pontos_ob[i].y >= shipCollider.top &&
                        pontos_ob[i].y <= shipCollider.top + shipCollider.height)
                    && !ship.classList.contains('damage')) {




                    ship.classList.add('damage');
                    life(-1);
                    var damageSound = document.createElement("audio");
                    damageSound.src = "./audio/damage_ship.mp3";
                    damageSound.play();

                    setTimeout(() => {
                        ship.classList.remove('damage');
                        damageSound.remove();
                    }, 2000);

                }
            }

        });

    }

    //-------------------------- Lasers Boss -----------------------------

    // if (!ship.classList.contains('damage')) {

    //     lasersBoss.forEach(element => {

    //         var laserCollider = element.getBoundingClientRect();
    //         var shipCollider = ship.getBoundingClientRect();


    //         var pontos_ship = [

    //             { x: shipCollider.left, y: shipCollider.top },
    //             { x: shipCollider.left + shipCollider.width, y: shipCollider.top },
    //             { x: shipCollider.left + shipCollider.width, y: shipCollider.top + shipCollider.height },
    //             { x: shipCollider.left, y: shipCollider.top + shipCollider.heigt }
    //         ]

    //         var pontos_laser = [

    //             { x: laserCollider.left, y: laserCollider.top },
    //             { x: laserCollider.left + laserCollider.width, y: laserCollider.top },
    //             { x: laserCollider.left + laserCollider.width, y: laserCollider.top + laserCollider.height },
    //             { x: laserCollider.left, y: laserCollider.top + laserCollider.heigt }
    //         ]





    //         for (let i = 0; i < 3; i++) {
    //             if ((pontos_ship[i].x >= laserCollider.left &&
    //                 pontos_ship[i].x <= laserCollider.left + laserCollider.width &&
    //                 pontos_ship[i].y >= laserCollider.top &&
    //                 pontos_ship[i].y <= laserCollider.top + laserCollider.height) ||

    //                 (pontos_laser[i].x >= shipCollider.left &&
    //                     pontos_laser[i].x <= shipCollider.left + shipCollider.width &&
    //                     pontos_laser[i].y >= shipCollider.top &&
    //                     pontos_laser[i].y <= shipCollider.top + shipCollider.height)
    //                 && !ship.classList.contains('damage')) {



    //                 if (!element.classList.contains('laser-light-' + colors[game.color])) {
    //                     ship.classList.add('damage');
    //                     life(-1);

    //                     var damageSound = document.createElement("audio");
    //                     damageSound.src = "./audio/damage_ship.mp3";
    //                     damageSound.play();

    //                     setTimeout(() => {
    //                         ship.classList.remove('damage');
    //                         damageSound.remove();
    //                     }, 2000);

    //                 }
    //             }
    //         }

    //     });

    // }


    var lifeUP = document.querySelectorAll('.life-up');

    lifeUP.forEach(element => {

        var lifeCollider = element.getBoundingClientRect();
        var shipCollider = ship.getBoundingClientRect();


        var pontos_ship = [

            { x: shipCollider.left, y: shipCollider.top },
            { x: shipCollider.left + shipCollider.width, y: shipCollider.top },
            { x: shipCollider.left + shipCollider.width, y: shipCollider.top + shipCollider.height },
            { x: shipCollider.left, y: shipCollider.top + shipCollider.heigt }
        ]

        var pontos_life = [

            { x: lifeCollider.left, y: lifeCollider.top },
            { x: lifeCollider.left + lifeCollider.width, y: lifeCollider.top },
            { x: lifeCollider.left + lifeCollider.width, y: lifeCollider.top + lifeCollider.height },
            { x: lifeCollider.left, y: lifeCollider.top + lifeCollider.heigt }
        ]



            for (let i = 0; i < 3; i++) {
                if ((pontos_ship[i].x >= lifeCollider.left &&
                    pontos_ship[i].x <= lifeCollider.left + lifeCollider.width &&
                    pontos_ship[i].y >= lifeCollider.top &&
                    pontos_ship[i].y <= lifeCollider.top + lifeCollider.height) ||

                    (pontos_life[i].x >= shipCollider.left &&
                        pontos_life[i].x <= shipCollider.left + shipCollider.width &&
                        pontos_life[i].y >= shipCollider.top &&
                        pontos_life[i].y <= shipCollider.top + shipCollider.height)) {


                  
                    element.remove();


                    setTimeout(() => {
                        life(1);
                    }, 100);







                }



            }
        

    });

}
 
// setInterval(createMeteorites, 2000);
// setInterval(createLasers, 15000);
// setInterval(createLaserRotate, 15000);



function createMeteorites() {
    var posX = Math.round(Math.random() * (10 - 1)) * 10 + "%";
    var size = Math.round(Math.random() * (6 - 3)) + 5  + "0px";

    var numColor = Math.round(Math.random() * (3 - 0));

    var meteorite = document.createElement('DIV');
    meteorite.classList.add('meteorite');
    container.appendChild(meteorite);
    meteorite.classList.add('meteor-' + colors[numColor])
    meteorite.style.left = posX;
    meteorite.style.width = size;
    meteorite.style.height = size;

    setTimeout(() => {
        meteorite.remove();
    }, 9000);
    // console.log(numColor);

}




function fallEnemies(object, time) {

    var init = 0;

    setInterval(() => {
        init += 5;

        object.style.top = init + 'vh';

    }, time);

}




function createLasers() {
    var laserContainer = document.createElement('DIV');
    var numColor = Math.round(Math.random() * (3 - 0));

    container.appendChild(laserContainer);
    laserContainer.classList.add('laser-container');
    

    var laser = document.createElement('DIV');
    laser.classList.add('laser');
    laser.classList.add(colors[numColor]);

    var position = Math.round(Math.random() * (2 - 0));
    console.log(position);

    var laserSound = document.createElement("audio");
    laserSound.src = "./audio/laser.mp3";
    laserSound.play();

    if (position == 0) {
        var ObstacleL = document.createElement('DIV');
        ObstacleL.classList.add('obstacle-30-L', 'ob');
        laserContainer.appendChild(ObstacleL);

        var laserFXR = document.createElement('DIV');
        laserFXR.classList.add('laser-fx');
        laserFXR.style.right = '0';
        var laserFXL = document.createElement('DIV');
        laserFXL.classList.add('laser-fx');
        laserFXL.style.left = '0';
        laserFXL.style.transform = 'scaleX(-1)';

        laserContainer.appendChild(laser);
        laser.appendChild(laserFXR);
        laser.appendChild(laserFXL);


        var ObstacleR = document.createElement('DIV');
        ObstacleR.classList.add('obstacle-30-R', 'ob');
        laserContainer.appendChild(ObstacleR);
    } 
    else if (position == 1) {
        var Obstacle = document.createElement('DIV');
        Obstacle.classList.add('obstacle-70', 'ob');
        laserContainer.appendChild(Obstacle);

        


        var laserFXL = document.createElement('DIV');
        laserFXL.classList.add('laser-fx');
        laserFXL.style.left = '0';
        laserFXL.style.transform = 'scaleX(-1)';

        laserContainer.appendChild(laser);
        laser.appendChild(laserFXL);

    }
    else if (position == 2) {
        var Obstacle = document.createElement('DIV');
        Obstacle.classList.add('obstacle-70', 'ob');
        laserContainer.appendChild(Obstacle);
        laserContainer.style.transform = 'scaleX(-1)';

        

        var laserFXR = document.createElement('DIV');
        laserFXR.classList.add('laser-fx');
        laserFXR.style.left = '0';
        laserFXR.style.transform = 'scaleX(-1)';

        laserContainer.appendChild(laser);
        laser.appendChild(laserFXR);
 

    }

    setTimeout(() => {
        laserContainer.remove();
        laserSound.remove();
    }, 12000);
}



function createLaserRotate() {
    var laserRotateContainer = document.createElement('DIV');


    container.appendChild(laserRotateContainer);
    laserRotateContainer.classList.add('rotate-laser-container');

    var laserRotateL = document.createElement('DIV');
    laserRotateL.classList.add('rotate-laser-L');
    laserRotateContainer.appendChild(laserRotateL);


    var numColor = Math.round(Math.random() * (3 - 0));
    var laser = document.createElement('DIV');
    laser.classList.add('laser', colors[numColor]);
    laserRotateContainer.appendChild(laser);
    var laserFX = document.createElement('DIV');
    laser.appendChild(laserFX);
    laser.appendChild(laserFX);

    var laserRotateR = document.createElement('DIV');
    laserRotateR.classList.add('rotate-laser-R');
    laserRotateContainer.appendChild(laserRotateR);


    setTimeout(() => {
        laserRotateContainer.remove();
    }, 25000);
}
 
function closeTelaInicial() {


    telaInicial.style.display = 'none'
    tutorial.style.display = 'flex'
}


function closeTutorial() {

    tutorial.style.display = 'none'
    hud.style.display = 'flex'

    phase1();
}


function retry() {

    document.location.reload(true);
    // container.style.display = 'none';
    
    // var meteorites = document.querySelectorAll('.meteorite')
    // var meteorites = document.querySelectorAll('.meteorite')
    // var meteorites = document.querySelectorAll('.meteorite')

    // clearInterval(habemusLasers);
    // clearInterval(habemusMeteorites);
    // clearInterval(habemusLaserRotate);

    // setTimeout(() => {
    //     container.style.display = 'flex';
    //     phase1();
    // }, 2000);
   
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
    // console.log('turning-R');
    moving = setTimeout(moveShip, 20); 7

    var newPosR = posX += 15;
    ship.style.transform = "translateX(" + newPosR + "px)";
  }else{
    ship.classList.remove("turn-R");
    
  }

  if (side == 'L' && move == true && posX > (widthScreen / 2 - 50) * -1) {
    // console.log('turning-L');
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

 
var habemusMeteorites;
var habemusLasers;
var habemusLaserRotate;


function phase1() {
    habemusMeteorites = setInterval(createMeteorites, 2000);
    

    setTimeout(() => {
        habemusLasers = setInterval(createLasers, 15000);



        setTimeout(() => {
            clearInterval(habemusLasers);
            clearInterval(habemusMeteorites);
            habemusLasers = setInterval(createLasers, 10000);
            habemusMeteorites = setInterval(createMeteorites, 1500);


            setTimeout(() => {

                habemusLaserRotate = setInterval(createLaserRotate, 25000);

                setTimeout(() => {
                    clearInterval(habemusLasers);
                    habemusLasers = setInterval(createLasers, 7000);


                    setTimeout(() => {
                        clearInterval(habemusLasers);
                        clearInterval(habemusMeteorites);
                        clearInterval(habemusLaserRotate);


                        setTimeout(() => {

                            musicBoss = new Audio("./audio/music_boss.mp3");
                            musicBoss.loop = true;
                            musicSound.pause();
                            musicBoss.play();
                            boss();
                        }, 10000);
                    }, 30000);

                }, 60000);

            }, 30000);

        }, 45000);

    }, 30000);
}
 

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
 
// shootSound = new Audio("./audio/shoot.mp3");



document.addEventListener("keydown", event => {

if (event.keyCode === 32 && event.repeat == false) {

    var shipInfo = ship.getBoundingClientRect();
    var shootPosX = shipInfo.left + 30;

    var shoot = document.createElement('DIV');
    shoot.classList.add('shoot', 'shoot-' + colors[game.color]);
    container.appendChild(shoot);
    shoot.style.transform = 'translateX(' + shootPosX + 'px)';

    shootMove(shoot);

    var shootSound = document.createElement("audio");
    shootSound.src = "./audio/shoot.mp3";
    shootSound.play();
    
    setTimeout(() => {
        shoot.remove();
        shootSound.remove();
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