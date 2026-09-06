/* =========================================
   VGLIVE MYMUSIC
   APPLICATION
========================================= */


const App = (() => {


    let songs = [];

    let currentSong = null;


    const elements = {};


    document.addEventListener(
        "DOMContentLoaded",
        init
    );


    async function init() {

        cacheElements();

        setupNavigation();

        setupSearch();

        setupPlayer();

        setupTheme();

        setupLibrary();

        setupButtons();

        await loadHome();

        renderLibrary();

    }


    function cacheElements() {

        elements.content =
            document.getElementById(
                "content"
            );


        elements.searchInput =
            document.getElementById(
                "searchInput"
            );


        elements.clearSearch =
            document.getElementById(
                "clearSearch"
            );


        elements.popularSongs =
            document.getElementById(
                "popularSongs"
            );


        elements.popularAlbums =
            document.getElementById(
                "popularAlbums"
            );


        elements.popularArtists =
            document.getElementById(
                "popularArtists"
            );


        elements.searchResults =
            document.getElementById(
                "searchResults"
            );


        elements.searchStatus =
            document.getElementById(
                "searchStatus"
            );


        elements.playerArtwork =
            document.getElementById(
                "playerArtwork"
            );


        elements.playerTitle =
            document.getElementById(
                "playerTitle"
            );


        elements.playerArtist =
            document.getElementById(
                "playerArtist"
            );


        elements.playerLike =
            document.getElementById(
                "playerLike"
            );


        elements.playButton =
            document.getElementById(
                "playButton"
            );


        elements.previousButton =
            document.getElementById(
                "previousButton"
            );


        elements.nextButton =
            document.getElementById(
                "nextButton"
            );


        elements.shuffleButton =
            document.getElementById(
                "shuffleButton"
            );


        elements.repeatButton =
            document.getElementById(
                "repeatButton"
            );


        elements.progressBar =
            document.getElementById(
                "progressBar"
            );


        elements.currentTime =
            document.getElementById(
                "currentTime"
            );


        elements.duration =
            document.getElementById(
                "duration"
            );


        elements.volumeBar =
            document.getElementById(
                "volumeBar"
            );


        elements.themeButton =
            document.getElementById(
                "themeButton"
            );


        elements.mobileMenu =
            document.getElementById(
                "mobileMenu"
            );


        elements.sidebar =
            document.querySelector(
                ".sidebar"
            );


        elements.heroPlayButton =
            document.getElementById(
                "heroPlayButton"
            );


        elements.toast =
            document.getElementById(
                "toast"
            );


        elements.toastMessage =
            document.getElementById(
                "toastMessage"
            );


        elements.likedSongs =
            document.getElementById(
                "likedSongs"
            );


        elements.recentSongs =
            document.getElementById(
                "recentSongs"
            );

    }


    /* =====================================
       HOME
    ===================================== */

    async function loadHome() {

        songs =
            await MusicAPI
                .getPopularSongs();


        const albums =
            await MusicAPI
                .getPopularAlbums();


        const artists =
            await MusicAPI
                .getPopularArtists();


        renderSongs(
            elements.popularSongs,
            songs
        );


        renderAlbums(
            elements.popularAlbums,
            albums
        );


        renderArtists(
            elements.popularArtists,
            artists
        );


        Player.setQueue(
            songs
        );

    }


    /* =====================================
       SONGS
    ===================================== */

    function renderSongs(
        container,
        songData
    ) {

        if (!container) {
            return;
        }


        if (!songData.length) {

            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">♫</div>
                    <h2>No songs found</h2>
                    <p>Try another search.</p>
                </div>
            `;

            return;

        }


        container.innerHTML =
            songData.map(song => `

                <article
                    class="song-card"
                    data-song-id="${song.id}"
                >

                    <img
                        class="song-art"
                        src="${song.artwork}"
                        alt="${escapeHTML(song.title)}"
                        loading="lazy"
                    >

                    <button
                        class="card-play"
                        data-play="${song.id}"
                        aria-label="Play ${escapeHTML(song.title)}"
                    >
                        ▶
                    </button>

                    <div class="song-card-info">

                        <div class="song-card-title">
                            ${escapeHTML(song.title)}
                        </div>

                        <div class="song-card-artist">
                            ${escapeHTML(song.artist)}
                        </div>

                    </div>

                </article>

            `).join("");


        container
            .querySelectorAll(
                "[data-play]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.stopPropagation();

                        const song =
                            findSong(
                                button.dataset.play
                            );


                        playSong(song);

                    }
                );

            });


        container
            .querySelectorAll(
                ".song-card"
            )
            .forEach(card => {

                card.addEventListener(
                    "click",
                    () => {

                        const song =
                            findSong(
                                card.dataset.songId
                            );


                        playSong(song);

                    }
                );

            });

    }


    function findSong(id) {

        return songs.find(
            song => song.id === id
        );

    }


    function playSong(song) {

        if (!song) {
            return;
        }


        currentSong =
            song;


        Player.playSong(
            song
        );

    }


    /* =====================================
       ALBUMS
    ===================================== */

    function renderAlbums(
        container,
        albums
    ) {

        if (!container) {
            return;
        }


        container.innerHTML =
            albums.map(album => `

                <article
                    class="album-card"
                    data-album="${album.id}"
                >

                    <img
                        class="album-art"
                        src="${album.artwork}"
                        alt="${escapeHTML(album.title)}"
                        loading="lazy"
                    >

                    <div class="album-title">
                        ${escapeHTML(album.title)}
                    </div>

                    <div class="album-artist">
                        ${escapeHTML(album.artist)}
                    </div>

                </article>

            `).join("");

    }


    /* =====================================
       ARTISTS
    ===================================== */

    function renderArtists(
        container,
        artists
    ) {

        if (!container) {
            return;
        }


        container.innerHTML =
            artists.map(artist => `

                <article
                    class="artist-card"
                >

                    <img
                        class="artist-image"
                        src="${artist.artwork}"
                        alt="${escapeHTML(artist.name)}"
                        loading="lazy"
                    >

                    <div class="artist-name">
                        ${escapeHTML(artist.name)}
                    </div>

                </article>

            `).join("");

    }


    /* =====================================
       NAVIGATION
    ===================================== */

    function setupNavigation() {

        document
            .querySelectorAll(
                ".nav-item"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const section =
                            button.dataset.section;


                        showPage(
                            section
                        );


                        document
                            .querySelectorAll(
                                ".nav-item"
                            )
                            .forEach(item => {

                                item.classList
                                    .remove(
                                        "active"
                                    );

                            });


                        button.classList
                            .add("active");


                        if (
                            elements.sidebar
                        ) {

                            elements.sidebar
                                .classList
                                .remove(
                                    "open"
                                );

                        }

                    }
                );

            });


        if (elements.mobileMenu) {

            elements.mobileMenu
                .addEventListener(
                    "click",
                    () => {

                        elements.sidebar
                            .classList
                            .toggle(
                                "open"
                            );

                    }
                );

        }

    }


    function showPage(section) {

        document
            .querySelectorAll(
                ".page"
            )
            .forEach(page => {

                page.classList
                    .remove("active");

            });


        const page =
            document.getElementById(
                `${section}Page`
            );


        if (page) {

            page.classList
                .add("active");

        }


        if (section === "liked") {

            renderLikedSongs();

        }


        if (section === "recent") {

            renderRecentSongs();

        }


        if (section === "library") {

            renderLibrary();

        }

    }


    /* =====================================
       SEARCH
    ===================================== */

    function setupSearch() {

        elements.searchInput
            .addEventListener(
                "input",
                debounce(
                    performSearch,
                    250
                )
            );


        elements.clearSearch
            .addEventListener(
                "click",
                () => {

                    elements.searchInput
                        .value = "";


                    elements.clearSearch
                        .classList
                        .add("hidden");


                    elements.searchResults
                        .innerHTML = `
                            <div class="empty-state">
                                <div class="empty-icon">⌕</div>
                                <h2>Find your music</h2>
                                <p>
                                    Search above to discover songs.
                                </p>
                            </div>
                        `;

                }
            );

    }


    async function performSearch() {

        const query =
            elements.searchInput
                .value
                .trim();


        if (!query) {

            elements.clearSearch
                .classList
                .add("hidden");


            elements.searchStatus
                .textContent =
                "Search for songs, albums or artists.";


            return;

        }


        elements.clearSearch
            .classList
            .remove("hidden");


        showPage("search");


        const results =
            await MusicAPI.search(
                query
            );


        elements.searchStatus
            .textContent =
            `${results.length} result(s) found`;


        renderSearchResults(
            results
        );

    }


    function renderSearchResults(
        results
    ) {

        if (!results.length) {

            elements.searchResults
                .innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">⌕</div>
                        <h2>No results</h2>
                        <p>
                            Try a different search.
                        </p>
                    </div>
                `;

            return;

        }


        elements.searchResults
            .innerHTML =
            results.map(song => `

                <div
                    class="search-result"
                >

                    <img
                        src="${song.artwork}"
                        alt="${escapeHTML(song.title)}"
                    >

                    <div class="result-info">

                        <div class="result-title">
                            ${escapeHTML(song.title)}
                        </div>

                        <div class="result-artist">
                            ${escapeHTML(song.artist)}
                            •
                            ${escapeHTML(song.album)}
                        </div>

                    </div>

                    <button
                        class="result-play"
                        data-search-play="${song.id}"
                    >
                        ▶
                    </button>

                </div>

            `).join("");


        elements.searchResults
            .querySelectorAll(
                "[data-search-play]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        playSong(
                            findSong(
                                button.dataset
                                    .searchPlay
                            )
                        );

                    }
                );

            });

    }


    /* =====================================
       PLAYER
    ===================================== */

    function setupPlayer() {

        Player.init({

            onSongChange:
                handleSongChange,

            onProgress:
                handleProgress,

            onPlayStateChange:
                handlePlayState

        });


        elements.playButton
            .addEventListener(
                "click",
                () => {

                    Player.toggle();

                }
            );


        elements.previousButton
            .addEventListener(
                "click",
                () => {

                    Player.playPrevious();

                }
            );


        elements.nextButton
            .addEventListener(
                "click",
                () => {

                    Player.playNext();

                }
            );


        elements.progressBar
            .addEventListener(
                "input",
                event => {

                    Player.seek(
                        Number(
                            event.target.value
                        )
                    );

                }
            );


        elements.volumeBar.value =
            Storage.getVolume();


        elements.volumeBar
            .addEventListener(
                "input",
                event => {

                    Player.setVolume(
                        event.target.value
                    );

                }
            );


        elements.shuffleButton
            .addEventListener(
                "click",
                () => {

                    const enabled =
                        Player
                            .toggleShuffle();


                    elements.shuffleButton
                        .classList
                        .toggle(
                            "active",
                            enabled
                        );

                }
            );


        elements.repeatButton
            .addEventListener(
                "click",
                () => {

                    const enabled =
                        Player
                            .toggleRepeat();


                    elements.repeatButton
                        .classList
                        .toggle(
                            "active",
                            enabled
                        );

                }
            );


        elements.playerLike
            .addEventListener(
                "click",
                toggleCurrentLike
            );

    }


    function handleSongChange(song) {

        currentSong =
            song;


        elements.playerArtwork.src =
            song.artwork;


        elements.playerTitle.textContent =
            song.title;


        elements.playerArtist.textContent =
            song.artist;


        updateLikeButton();


        showToast(
            `Playing ${song.title}`
        );

    }


    function handleProgress(data) {

        elements.progressBar.value =
            data.percent || 0;


        elements.currentTime.textContent =
            formatTime(
                data.current
            );


        elements.duration.textContent =
            formatTime(
                data.duration
            );

    }


    function handlePlayState(isPlaying) {

        elements.playButton.textContent =
            isPlaying
                ? "❚❚"
                : "▶";

    }


    function toggleCurrentLike() {

        if (!currentSong) {

            showToast(
                "Play a song first"
            );

            return;

        }


        const liked =
            Storage.toggleFavorite(
                currentSong.id
            );


        updateLikeButton();


        renderLikedSongs();


        showToast(
            liked
                ? "Added to Liked Songs"
                : "Removed from Liked Songs"
        );

    }


    function updateLikeButton() {

        if (!currentSong) {
            return;
        }


        const liked =
            Storage.isFavorite(
                currentSong.id
            );


        elements.playerLike.textContent =
            liked
                ? "♥"
                : "♡";


        elements.playerLike
            .classList
            .toggle(
                "liked",
                liked
            );

    }


    /* =====================================
       LIBRARY
    ===================================== */

    function setupLibrary() {

        document
            .querySelectorAll(
                ".library-tab"
            )
            .forEach(tab => {

                tab.addEventListener(
                    "click",
                    () => {

                        document
                            .querySelectorAll(
                                ".library-tab"
                            )
                            .forEach(item => {

                                item.classList
                                    .remove(
                                        "active"
                                    );

                            });


                        tab.classList
                            .add("active");


                        if (
                            tab.dataset.library
                            === "liked"
                        ) {

                            renderLikedSongs();

                        } else {

                            renderRecentSongs();

                        }

                    }
                );

            });

    }


    function renderLibrary() {

        renderLikedSongs();

    }


    function renderLikedSongs() {

        const ids =
            Storage.getFavorites();


        const liked =
            ids
                .map(id => findSong(id))
                .filter(Boolean);


        renderList(
            elements.likedSongs,
            liked
        );

    }


    function renderRecentSongs() {

        const ids =
            Storage.getRecent();


        const recent =
            ids
                .map(id => findSong(id))
                .filter(Boolean);


        renderList(
            elements.recentSongs,
            recent
        );

    }


    function renderList(
        container,
        list
    ) {

        if (!container) {
            return;
        }


        if (!list.length) {

            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">♫</div>
                    <h2>No songs yet</h2>
                    <p>
                        Your songs will appear here.
                    </p>
                </div>
            `;

            return;

        }


        container.innerHTML =
            list.map(
                (song, index) => `

                <div
                    class="list-song"
                >

                    <div class="list-number">
                        ${index + 1}
                    </div>

                    <img
                        class="list-art"
                        src="${song.artwork}"
                        alt="${escapeHTML(song.title)}"
                    >

                    <div class="list-info">

                        <div class="list-title">
                            ${escapeHTML(song.title)}
                        </div>

                        <div class="list-artist">
                            ${escapeHTML(song.artist)}
                        </div>

                    </div>

                    <button
                        class="list-action"
                        data-list-play="${song.id}"
                    >
                        ▶
                    </button>

                </div>

            `
            ).join("");


        container
            .querySelectorAll(
                "[data-list-play]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        playSong(
                            findSong(
                                button.dataset
                                    .listPlay
                            )
                        );

                    }
                );

            });

    }


    /* =====================================
       THEME
    ===================================== */

    function setupTheme() {

        const theme =
            Storage.getTheme();


        if (theme === "light") {

            document.body
                .classList
                .add("light");

        }


        elements.themeButton
            .addEventListener(
                "click",
                () => {

                    document.body
                        .classList
                        .toggle("light");


                    const isLight =
                        document.body
                            .classList
                            .contains(
                                "light"
                            );


                    Storage.saveTheme(
                        isLight
                            ? "light"
                            : "dark"
                    );

                }
            );

    }


    /* =====================================
       BUTTONS
    ===================================== */

    function setupButtons() {

        elements.heroPlayButton
            .addEventListener(
                "click",
                () => {

                    if (songs.length) {

                        playSong(
                            songs[0]
                        );

                    }

                }
            );


        document
            .querySelectorAll(
                ".see-all"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        if (
                            button.dataset.action
                            === "popular"
                        ) {

                            showPage(
                                "home"
                            );

                            document
                                .getElementById(
                                    "popularSongs"
                                )
                                .scrollIntoView({
                                    behavior:
                                        "smooth"
                                });

                        }

                    }
                );

            });

    }


    /* =====================================
       UTILITIES
    ===================================== */

    function formatTime(seconds) {

        if (
            !seconds ||
            !Number.isFinite(seconds)
        ) {

            return "0:00";

        }


        const minutes =
            Math.floor(
                seconds / 60
            );


        const remaining =
            Math.floor(
                seconds % 60
            );


        return `${minutes}:${String(
            remaining
        ).padStart(2, "0")}`;

    }


    function debounce(
        functionToRun,
        delay
    ) {

        let timeout;


        return function (...args) {

            clearTimeout(timeout);


            timeout =
                setTimeout(
                    () => {

                        functionToRun
                            .apply(
                                this,
                                args
                            );

                    },
                    delay
                );

        };

    }


    function escapeHTML(value) {

        return String(value)

            .replace(
                /&/g,
                "&amp;"
            )

            .replace(
                /</g,
                "&lt;"
            )

            .replace(
                />/g,
                "&gt;"
            )

            .replace(
                /"/g,
                "&quot;"
            )

            .replace(
                /'/g,
                "&#039;"
            );

    }


    function showToast(message) {

        elements.toastMessage
            .textContent =
            message;


        elements.toast
            .classList
            .add("show");


        clearTimeout(
            showToast.timer
        );


        showToast.timer =
            setTimeout(
                () => {

                    elements.toast
                        .classList
                        .remove(
                            "show"
                        );

                },
                2200
            );

    }


})();
