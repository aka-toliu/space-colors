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
                        var damageSound = document.createElement("audio");
                        damageSound.src = "./audio/damage_ship.mp3";
                        damageSound.play();


                        ship.classList.add('damage');
                        life(-1);


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

}