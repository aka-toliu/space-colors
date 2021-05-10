// boss();
var laserBossMove = new Audio("./audio/laser-boss2.mp3");
laserBossMove.volume = 0.4;
laserBossMove.loop = true;

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


        openLights.play();

        setTimeout(() => {

            openLasers.play();
            setTimeout(() => {
                laserBossMove.play();
            }, 5000);
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


    bossXplode.play();
    musicBoss.pause();
    laserBossMove.pause();

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