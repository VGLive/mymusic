/* =========================================
   VGLIVE MYMUSIC
   AUDIO PLAYER
========================================= */


const Player = (() => {


    let audio = null;

    let queue = [];

    let currentIndex = -1;

    let shuffle = false;

    let repeat = false;


    let callbacks = {

        onSongChange: null,

        onProgress: null,

        onPlayStateChange: null

    };


    function init(options = {}) {

        audio =
            document.getElementById(
                "audioPlayer"
            );


        callbacks = {

            ...callbacks,

            ...options

        };


        audio.volume =
            Storage.getVolume();


        audio.addEventListener(
            "timeupdate",
            handleTimeUpdate
        );


        audio.addEventListener(
            "loadedmetadata",
            handleLoadedMetadata
        );


        audio.addEventListener(
            "play",
            () => {

                if (
                    callbacks.onPlayStateChange
                ) {

                    callbacks
                        .onPlayStateChange(true);

                }

            }
        );


        audio.addEventListener(
            "pause",
            () => {

                if (
                    callbacks.onPlayStateChange
                ) {

                    callbacks
                        .onPlayStateChange(false);

                }

            }
        );


        audio.addEventListener(
            "ended",
            playNext
        );

    }


    function setQueue(songs) {

        queue =
            Array.isArray(songs)
                ? songs
                : [];

    }


    function playSong(song) {

        if (!song) {
            return;
        }


        const index =
            queue.findIndex(
                item => item.id === song.id
            );


        if (index !== -1) {

            currentIndex = index;

        } else {

            queue.push(song);

            currentIndex =
                queue.length - 1;

        }


        audio.src =
            song.audio;


        audio.load();


        audio.play()
            .catch(error => {

                console.warn(
                    "Playback could not start:",
                    error
                );

            });


        Storage.addRecent(
            song.id
        );


        if (callbacks.onSongChange) {

            callbacks.onSongChange(
                song
            );

        }

    }


    function play() {

        if (!audio.src) {

            if (queue.length) {

                playSong(
                    queue[0]
                );

            }

            return;

        }


        audio.play()
            .catch(() => {});

    }


    function pause() {

        audio.pause();

    }


    function toggle() {

        if (audio.paused) {

            play();

        } else {

            pause();

        }

    }


    function playNext() {

        if (!queue.length) {
            return;
        }


        if (repeat && currentIndex >= 0) {

            audio.currentTime = 0;

            audio.play();

            return;

        }


        let nextIndex;


        if (shuffle) {

            nextIndex =
                Math.floor(
                    Math.random()
                    * queue.length
                );

        } else {

            nextIndex =
                currentIndex + 1;


            if (
                nextIndex >=
                queue.length
            ) {

                nextIndex = 0;

            }

        }


        currentIndex =
            nextIndex;


        playSong(
            queue[currentIndex]
        );

    }


    function playPrevious() {

        if (!queue.length) {
            return;
        }


        if (
            audio.currentTime > 3
        ) {

            audio.currentTime = 0;

            return;

        }


        let previousIndex =
            currentIndex - 1;


        if (previousIndex < 0) {

            previousIndex =
                queue.length - 1;

        }


        currentIndex =
            previousIndex;


        playSong(
            queue[currentIndex]
        );

    }


    function seek(percent) {

        if (
            !audio.duration ||
            !Number.isFinite(
                audio.duration
            )
        ) {

            return;

        }


        audio.currentTime =
            (
                percent / 100
            )
            *
            audio.duration;

    }


    function setVolume(value) {

        const volume =
            Math.max(
                0,
                Math.min(
                    1,
                    Number(value)
                )
            );


        audio.volume =
            volume;


        Storage.saveVolume(
            volume
        );

    }


    function toggleShuffle() {

        shuffle =
            !shuffle;


        return shuffle;

    }


    function toggleRepeat() {

        repeat =
            !repeat;


        return repeat;

    }


    function getCurrentSong() {

        if (
            currentIndex < 0 ||
            currentIndex >= queue.length
        ) {

            return null;

        }


        return queue[
            currentIndex
        ];

    }


    function handleTimeUpdate() {

        if (
            !audio.duration ||
            !Number.isFinite(
                audio.duration
            )
        ) {

            return;

        }


        const percent =
            (
                audio.currentTime /
                audio.duration
            )
            *
            100;


        if (callbacks.onProgress) {

            callbacks.onProgress({

                current:
                    audio.currentTime,

                duration:
                    audio.duration,

                percent

            });

        }

    }


    function handleLoadedMetadata() {

        if (callbacks.onProgress) {

            callbacks.onProgress({

                current:
                    audio.currentTime,

                duration:
                    audio.duration,

                percent: 0

            });

        }

    }


    function getAudio() {

        return audio;

    }


    return {

        init,

        setQueue,

        playSong,

        play,

        pause,

        toggle,

        playNext,

        playPrevious,

        seek,

        setVolume,

        toggleShuffle,

        toggleRepeat,

        getCurrentSong,

        getAudio

    };

})();
