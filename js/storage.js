/* =========================================
   VGLIVE MYMUSIC
   LOCAL STORAGE
========================================= */


const Storage = (() => {


    const KEYS = {

        favorites:
            "vglive_mymusic_favorites",

        recent:
            "vglive_mymusic_recent",

        theme:
            "vglive_mymusic_theme",

        volume:
            "vglive_mymusic_volume"

    };


    function get(key) {

        try {

            const value =
                localStorage.getItem(key);

            return value
                ? JSON.parse(value)
                : [];

        } catch {

            return [];

        }

    }


    function set(key, value) {

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    }


    function getFavorites() {

        return get(KEYS.favorites);

    }


    function isFavorite(id) {

        return getFavorites()
            .includes(id);

    }


    function toggleFavorite(id) {

        const favorites =
            getFavorites();


        const index =
            favorites.indexOf(id);


        if (index === -1) {

            favorites.push(id);

        } else {

            favorites.splice(index, 1);

        }


        set(
            KEYS.favorites,
            favorites
        );


        return index === -1;

    }


    function addRecent(id) {

        let recent =
            get(KEYS.recent);


        recent =
            recent.filter(
                item => item !== id
            );


        recent.unshift(id);


        recent =
            recent.slice(0, 30);


        set(
            KEYS.recent,
            recent
        );

    }


    function getRecent() {

        return get(KEYS.recent);

    }


    function saveTheme(theme) {

        localStorage.setItem(
            KEYS.theme,
            theme
        );

    }


    function getTheme() {

        return localStorage.getItem(
            KEYS.theme
        );

    }


    function saveVolume(volume) {

        localStorage.setItem(
            KEYS.volume,
            volume
        );

    }


    function getVolume() {

        const value =
            localStorage.getItem(
                KEYS.volume
            );


        return value === null
            ? 0.8
            : Number(value);

    }


    return {

        getFavorites,

        isFavorite,

        toggleFavorite,

        addRecent,

        getRecent,

        saveTheme,

        getTheme,

        saveVolume,

        getVolume

    };

})();
