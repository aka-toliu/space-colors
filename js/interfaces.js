function closeTelaInicial() {


    telaInicial.style.display = 'none'
    tutorial.style.display = 'flex'


    select.play();
    // shipSound.play();
    // musicSound.play();

}


function closeTutorial() {

    tutorial.style.display = 'none'
    hud.style.display = 'flex'

    startSound.play();
    phase1();
}


function retry() {
    
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