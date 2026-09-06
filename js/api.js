/* =========================================
   VGLIVE MYMUSIC
   API / DATA LAYER
========================================= */


/*
    STEP 1

    This file currently contains demo data.

    In a later step we will replace this
    with the actual music API integration.
*/


const MusicAPI = (() => {

    const demoSongs = [

        {
            id: "song-001",

            title: "Dreams",

            artist: "VGLive",

            album: "MyMusic Originals",

            duration: "3:42",

            artwork:
                "https://picsum.photos/500/500?random=101",

            audio:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        },


        {
            id: "song-002",

            title: "Midnight",

            artist: "VGLive",

            album: "Night Collection",

            duration: "4:02",

            artwork:
                "https://picsum.photos/500/500?random=102",

            audio:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
        },


        {
            id: "song-003",

            title: "Memories",

            artist: "VGLive",

            album: "MyMusic Originals",

            duration: "5:12",

            artwork:
                "https://picsum.photos/500/500?random=103",

            audio:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
        },


        {
            id: "song-004",

            title: "Summer Nights",

            artist: "VGLive",

            album: "Summer Collection",

            duration: "4:30",

            artwork:
                "https://picsum.photos/500/500?random=104",

            audio:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
        },


        {
            id: "song-005",

            title: "Ocean",

            artist: "VGLive",

            album: "Relax",

            duration: "3:58",

            artwork:
                "https://picsum.photos/500/500?random=105",

            audio:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
        },


        {
            id: "song-006",

            title: "Lost In Time",

            artist: "VGLive",

            album: "Memories",

            duration: "4:12",

            artwork:
                "https://picsum.photos/500/500?random=106",

            audio:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
        },


        {
            id: "song-007",

            title: "Forever",

            artist: "VGLive",

            album: "Love Songs",

            duration: "3:55",

            artwork:
                "https://picsum.photos/500/500?random=107",

            audio:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
        },


        {
            id: "song-008",

            title: "Rain",

            artist: "VGLive",

            album: "Weather",

            duration: "4:24",

            artwork:
                "https://picsum.photos/500/500?random=108",

            audio:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
        }

    ];


    const demoAlbums = [

        {
            id: "album-001",

            title: "MyMusic Originals",

            artist: "VGLive",

            artwork:
                "https://picsum.photos/500/500?random=201"
        },


        {
            id: "album-002",

            title: "Night Collection",

            artist: "VGLive",

            artwork:
                "https://picsum.photos/500/500?random=202"
        },


        {
            id: "album-003",

            title: "Summer Collection",

            artist: "VGLive",

            artwork:
                "https://picsum.photos/500/500?random=203"
        },


        {
            id: "album-004",

            title: "Love Songs",

            artist: "VGLive",

            artwork:
                "https://picsum.photos/500/500?random=204"
        }

    ];


    const demoArtists = [

        {
            id: "artist-001",

            name: "VGLive",

            artwork:
                "https://picsum.photos/400/400?random=301"
        },


        {
            id: "artist-002",

            name: "MyMusic",

            artwork:
                "https://picsum.photos/400/400?random=302"
        },


        {
            id: "artist-003",

            name: "VGLive Originals",

            artwork:
                "https://picsum.photos/400/400?random=303"
        },


        {
            id: "artist-004",

            name: "MyMusic Artists",

            artwork:
                "https://picsum.photos/400/400?random=304"
        }

    ];


    async function getPopularSongs() {

        return demoSongs;

    }


    async function getPopularAlbums() {

        return demoAlbums;

    }


    async function getPopularArtists() {

        return demoArtists;

    }


    async function getSongById(id) {

        return demoSongs.find(
            song => song.id === id
        );

    }


    async function search(query) {

        const q =
            query
                .trim()
                .toLowerCase();


        if (!q) {

            return [];

        }


        return demoSongs.filter(song =>

            song.title
                .toLowerCase()
                .includes(q)

            ||

            song.artist
                .toLowerCase()
                .includes(q)

            ||

            song.album
                .toLowerCase()
                .includes(q)

        );

    }


    return {

        getPopularSongs,

        getPopularAlbums,

        getPopularArtists,

        getSongById,

        search

    };

})();
