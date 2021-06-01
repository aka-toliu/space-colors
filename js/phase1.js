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
            habemusMeteorites = setInterval(createMeteorites, 1800);


            setTimeout(() => {

                clearInterval(habemusLasers);
                habemusLasers = setInterval(createLasers, 12000);
                habemusLaserRotate = setInterval(createLaserRotate, 25000);
                clearInterval(habemusMeteorites);
                habemusMeteorites = setInterval(createMeteorites, 3000);





                    setTimeout(() => {
                        clearInterval(habemusLasers);
                        clearInterval(habemusMeteorites);
                        clearInterval(habemusLaserRotate);


                        setTimeout(() => {


                            musicBoss.loop = true;
                            musicSound.pause();
                            musicBoss.play();
                            boss();
                        }, 10000);
                    }, 30000);



            }, 10000);

        }, 30000);

    }, 18000);
}