


function LoadAudio(src) {

    //A hack to get around ioS audio loading restrictions
    //On the first touch of the user, we start playing the track to load the file.
    //Then we immediately pause the playback so no sound is heard
    var userAgent = window.navigator.userAgent;
    var click = document.onclick;
    if (click === undefined) {
        click = "touchstart";
    }
    else {
        var click = "click";
    }

    var audio = document.createElement('audio');
    audio.src = src;
    audio.autobuffer = true;
    audio.load();
    audio.muted = false;
    console.log("ua test 1: " + (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)));
    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
        
        $("#intro-modal").attr('style', 'display:inline');
        var pauseAudio = function () {
            audio.pause();
            audio.removeEventListener('play', pauseAudio, false);
        }

        var startLoad = function () {
            audio.play();
            document.removeEventListener(click, startLoad, false);
            $("#modal-loading-icon").attr('style', 'display:inline');
            $(".modal-footer p").attr('style', 'display:none');
        }

        var dismissModal = function () {
        $("#intro-modal").attr('style', 'display:none');
        }

        audio.addEventListener('play', pauseAudio, false);

        $("#intro-modal").bind(click, function () {
            startLoad();
        });

        audio.addEventListener('canplaythrough', dismissModal, false);
    }

    this.audio = audio;

}


var playSound = function (soundClip) {
    //Each clip must be seperated by at least one second
    try {
        var spriteData = {
            chaBoy: {
                start: 0.0,
                end: 1.0
            },
            buhDuhDuh: {
                start: 2.0,
                end: 3.2
            },
            itsAGrounder: {
                start: 4,
                end: 5
            },
            turnTwo: {
                start: 6,
                end: 7
            },

            youCrazyDevon: {
                start: 8,
                end: 9.4
            },

            codyDamnSon: {
                start: 10,
                end: 13
            },

            codyFuckWithYourBoys: {
                start: 14,
                end: 16
            },

            helloMonica: {
                start: 17,
                end: 19.4
            },

            damn: {
                start: 20,
                end: 20.4
            },

            turnDownForWhat: {
                start: 21,
                end: 22.4
            },

            trapWhatsHappening: {
                start: 24,
                end: 24.8
            },

            yourBoyJayz: {
                start: 26,
                end: 26.8
            },

            youCrazyJayz: {
                start: 28,
                end: 29.4
            },

            gunShot: {
                start: 30,
                end: 30.7
            },

            gunCock: {
                start: 31.5,
                end: 32.1
            },

            dickMarron: {
                start: 33,
                end: 35.4
            },

            woo: {
                start: 36,
                end: 38
            },

            hiJo: {
                start: 39,
                end: 40
            },

            helloMonicaAvi: {
                start: 40.5,
                end: 43.3
            },

            chea: {
                start: 44,
                end: 44.5
            }
        };
        var audioFile = this.audio;

        audioFile.currentTime = spriteData[soundClip].start;
        audioFile.play();


        var checkTime = function () {
            if ((this.currentTime >= spriteData[soundClip].end) &&
                (this.currentTime <= spriteData[soundClip].end + 0.5)) {
                this.pause();
                audioFile.removeEventListener('timeupdate', checkTime, false);
            }
        }

        audioFile.addEventListener('timeupdate', checkTime, false);
    }
    catch (err) {
        console.log(err);
    }
}

LoadAudio('sounds/trapComp.mp3')


