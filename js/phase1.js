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
            habemusMeteorites = setInterval(createMeteorites, 1500);


            setTimeout(() => {

                habemusLaserRotate = setInterval(createLaserRotate, 25000);

                setTimeout(() => {
                    clearInterval(habemusLasers);
                    habemusLasers = setInterval(createLasers, 7000);


                    setTimeout(() => {
                        clearInterval(habemusLasers);
                        clearInterval(habemusMeteorites);
                        clearInterval(habemusLaserRotate);


                        setTimeout(() => {

                            musicBoss = new Audio("./audio/music_boss.mp3");
                            musicBoss.loop = true;
                            musicSound.pause();
                            musicBoss.play();
                            boss();
                        }, 10000);
                    }, 30000);

                }, 60000);

            }, 30000);

        }, 45000);

    }, 30000);
}