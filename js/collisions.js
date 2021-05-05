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
                    && element.classList.contains('meteor-' + colors[game.color])) {

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