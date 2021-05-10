function closeTelaInicial() {


    telaInicial.style.display = 'none'
    tutorial.style.display = 'flex'

    select = new Audio("./audio/select.mp3");
    select.play();
    shipSound.play();
    musicSound.play();

}


function closeTutorial() {

    tutorial.style.display = 'none'
    hud.style.display = 'flex'
    startSound = new Audio("./audio/start_game.mp3");
    startSound.play();
    phase1();
}


function retry() {
    select = new Audio("./audio/select.mp3");
    select.play();
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