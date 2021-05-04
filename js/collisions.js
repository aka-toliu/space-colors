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
