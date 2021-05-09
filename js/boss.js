boss();


function boss() {

    var shieldContainer = container.querySelector('.boss-shield-container');
    var laserRow1 = container.querySelector('.laser-row-1');
    var laserRow2 = container.querySelector('.laser-row-2');

    setTimeout(() => {
        shieldContainer.style.animation ='rotateBossShield 15s ease-in infinite';
        shieldContainer.classList.remove('no-lights')
        laserRow1.classList.add('laser-open-1');
        laserRow2.classList.add('laser-open-2');

        setTimeout(() => {
            laserRow1.classList.add('laser-move-1');
            laserRow2.classList.add('laser-move-2');
        }, 7000);

    }, 10000);
    
}

