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

                        broken.play();


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