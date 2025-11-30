const videoPlayer = document.getElementById("video-player");
const sourceButtonsContainer = document.getElementById("source-buttons");
const seriesControls = document.getElementById("series-controls");
const seasonSelect = document.getElementById("season-select");
const episodeSelect = document.getElementById("episode-select");

const OMDb_BASE_URL = "https://www.omdbapi.com/";

const sources = [
    { name: "Lima", movie: "https://vidsrc.me/embed/{imdb_id}", tv: "https://vidsrc.me/embed/tv/{imdb_id}/{season}/{episode}" },
    { name: "4K Astra", movie: "https://player.videasy.net/embed/{imdb_id}", tv: "https://player.videasy.net/tv/{imdb_id}/{season}/{episode}" },
    { name: "Hulu", movie: "https://vidsrc.pro/embed/{imdb_id}", tv: "https://vidsrc.pro/embed/tv/{imdb_id}/{season}/{episode}" },
    { name: "GDrive", movie: "https://2embed.cc/embed/{imdb_id}", tv: "https://2embed.cc/embedtv/{imdb_id}&s={season}&e={episode}" },
    { name: "Viper", movie: "https://vidlink.pro/embed/{imdb_id}", tv: "https://vidlink.pro/tv/{imdb_id}/{season}/{episode}" },
    { name: "Alpha", movie: "https://multiembed.mov/?video_id={imdb_id}", tv: "https://multiembed.mov/?video_id={imdb_id}&s={season}&e={episode}" }
];

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const imdbId = urlParams.get("id");
    let type = urlParams.get("type");

    if (type === "series") {
        type = "tv";
    }

    videoPlayer.setAttribute("sandbox", "allow-forms allow-pointer-lock allow-same-origin allow-scripts");

    if (imdbId) {
        if (type === "tv") {
            seriesControls.style.display = "flex";
            await initializeSeriesControls(imdbId);
        } else {
            const initialUrl = sources[0].movie.replace("{imdb_id}", imdbId);
            play(initialUrl);
            generateSourceButtons(imdbId, type, 1, 1);
        }
    } else {
        document.body.innerHTML = "<h1>Error: No movie or TV show ID provided.</h1>";
        document.body.style.color = "white";
        document.body.style.textAlign = "center";
        document.body.style.paddingTop = "50px";
    }
});

async function initializeSeriesControls(imdbId) {
    const totalSeasons = await getTotalSeasons(imdbId);
    populateSeasons(totalSeasons);

    seasonSelect.addEventListener("change", () => {
        populateEpisodes(imdbId, seasonSelect.value);
    });

    episodeSelect.addEventListener("change", () => {
        updatePlayerSource(imdbId, "tv");
    });

    await populateEpisodes(imdbId, 1);
}

async function getTotalSeasons(imdbId) {
    const url = `${OMDb_BASE_URL}?apikey=${OMDb_API_KEY}&i=${imdbId}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return parseInt(data.totalSeasons, 10);
    } catch (error) {
        console.error("Error fetching total seasons:", error);
        return 1;
    }
}

function populateSeasons(totalSeasons) {
    seasonSelect.innerHTML = "";
    for (let i = 1; i <= totalSeasons; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.innerText = `Season ${i}`;
        seasonSelect.appendChild(option);
    }
}

async function populateEpisodes(imdbId, season) {
    const url = `${OMDb_BASE_URL}?apikey=${OMDb_API_KEY}&i=${imdbId}&season=${season}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const episodes = data.Episodes;

        episodeSelect.innerHTML = "";
        if (episodes && Array.isArray(episodes)) {
            episodes.forEach(episode => {
                const option = document.createElement("option");
                option.value = episode.Episode;
                option.innerText = `Episode ${episode.Episode}: ${episode.Title}`;
                episodeSelect.appendChild(option);
            });
        }

        updatePlayerSource(imdbId, "tv");
    } catch (error) {
        console.error("Error fetching episodes:", error);
    }
}

function updatePlayerSource(imdbId, type) {
    const season = seasonSelect.value;
    const episode = episodeSelect.value;
    generateSourceButtons(imdbId, type, season, episode);
    const initialUrl = sources[0][type].replace("{imdb_id}", imdbId).replace("{season}", season).replace("{episode}", episode);
    play(initialUrl);
}

function generateSourceButtons(imdbId, type, season, episode) {
    sourceButtonsContainer.innerHTML = "";
    sources.forEach(source => {
        const button = document.createElement("button");
        button.className = "source-button";
        button.innerText = source.name;
        const url = source[type]
            .replace("{imdb_id}", imdbId)
            .replace("{season}", season)
            .replace("{episode}", episode);
        button.onclick = () => play(url);
        sourceButtonsContainer.appendChild(button);
    });
}

function play(url) {
    videoPlayer.src = url;
}
