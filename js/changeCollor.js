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


        if (game.color < ballsHud.length - 1) {
            game.color += 1;

        } else {
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

        if (game.color > 0) {
            game.color += -1;

        } else {
            game.color = ballsHud.length - 1;
        }
        clearAndChangeHud();
        changeShipColor();
        console.log(game.color);
    }

});