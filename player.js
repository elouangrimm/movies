const videoPlayer = document.getElementById("video-player");
const sourceButtonsContainer = document.getElementById("source-buttons");
const seriesControls = document.getElementById("series-controls");
const seasonSelect = document.getElementById("season-select");
const episodeSelect = document.getElementById("episode-select");
const nextSourceButton = document.getElementById("next-source-button");

const OMDb_BASE_URL = "https://www.omdbapi.com/";

// To change the order of preference, simply reorder the lines below.
const sources = [
    { name: "vidsrc-embed.ru", movie: "https://vidsrc-embed.ru/embed/movie?imdb={imdb_id}", tv: "https://vidsrc-embed.ru/embed/tv?imdb={imdb_id}&season={season}&episode={episode}" },
    { name: "player.videasy.net", movie: "https://player.videasy.net/embed/{imdb_id}", tv: "https://player.videasy.net/tv/{imdb_id}/{season}/{episode}" },
    { name: "2embed.cc", movie: "https://2embed.cc/embed/{imdb_id}", tv: "https://2embed.cc/embedtv/{imdb_id}&s={season}&e={episode}" },
    { name: "vidlink.pro", movie: "https://vidlink.pro/embed/{imdb_id}", tv: "https://vidlink.pro/tv/{imdb_id}/{season}/{episode}" },
    { name: "multiembed.mov", movie: "https://multiembed.mov/?video_id={imdb_id}", tv: "https://multiembed.mov/?video_id={imdb_id}&s={season}&e={episode}" },
    { name: "fsapi.xyz", movie: "https://fsapi.xyz/movie/{imdb_id}", tv: "https://fsapi.xyz/tv-imdb/{imdb_id}-{season}-{episode}" },
    { name: "gomo.to", movie: "https://gomo.to/movie/{imdb_id}", tv: null },
    { name: "vidcloud.stream", movie: "https://vidcloud.stream/{imdb_id}.html", tv: null },
    { name: "getsuperembed.link", movie: "https://getsuperembed.link/?video_id={imdb_id}", tv: "https://getsuperembed.link/?video_id={imdb_id}&season={season}&episode={episode}", is_special: true }
];

let currentSourceIndex = 0;

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const imdbId = urlParams.get("id");
    let type = urlParams.get("type");

    if (type === "series") {
        type = "tv";
    }

    if (imdbId) {
        if (type === "tv") {
            seriesControls.style.display = "flex";
            await initializeSeriesControls(imdbId);
        } else {
            const initialUrl = await getSourceUrl(sources[0], imdbId, type, 1, 1);
            play(initialUrl);
            generateSourceButtons(imdbId, type, 1, 1);
        }
    } else {
        document.body.innerHTML = `
            <div style="text-align: center; padding-top: 50px; color: white;">
                <h1>Error: No movie or TV show ID provided.</h1>
                <a href="index.html" style="color: #3498db; text-decoration: none; font-size: 1.2rem;">Back Home</a>
            </div>
        `;
    }

    nextSourceButton.addEventListener("click", () => {
        playNextSource(imdbId, type);
    });
});

async function getSourceUrl(source, imdbId, type, season, episode) {
    let url;
    if (source.is_special) {
        const response = await fetch(source[type].replace("{imdb_id}", imdbId).replace("{season}", season).replace("{episode}", episode));
        const text = await response.text();
        const doc = new DOMParser().parseFromString(text, "text/html");
        url = doc.querySelector("iframe").src;
    } else {
        if (source[type]) {
            url = source[type]
                .replace("{imdb_id}", imdbId)
                .replace("{season}", season)
                .replace("{episode}", episode);
        }
    }
    return url;
}

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
                const title = episode.Title && episode.Title !== "N/A" ? `: ${episode.Title}` : "";
                option.innerText = `Episode ${episode.Episode}${title}`;
                episodeSelect.appendChild(option);
            });
        }

        updatePlayerSource(imdbId, "tv");
    } catch (error) {
        console.error("Error fetching episodes:", error);
    }
}

async function updatePlayerSource(imdbId, type) {
    const season = seasonSelect.value;
    const episode = episodeSelect.value;
    generateSourceButtons(imdbId, type, season, episode);
    const initialUrl = await getSourceUrl(sources[0], imdbId, type, season, episode);
    play(initialUrl);
}

function generateSourceButtons(imdbId, type, season, episode) {
    sourceButtonsContainer.innerHTML = "";
    sources.forEach((source, index) => {
        if (source[type]) {
            const button = document.createElement("button");
            button.className = "source-button";
            button.innerText = source.name;
            button.onclick = async () => {
                currentSourceIndex = index;
                const url = await getSourceUrl(source, imdbId, type, season, episode);
                play(url);
            };
            sourceButtonsContainer.appendChild(button);
        }
    });
}

async function playNextSource(imdbId, type) {
    currentSourceIndex = (currentSourceIndex + 1) % sources.length;
    let source = sources[currentSourceIndex];
    while (!source[type]) {
        currentSourceIndex = (currentSourceIndex + 1) % sources.length;
        source = sources[currentSourceIndex];
    }
    const season = seasonSelect.value;
    const episode = episodeSelect.value;
    const url = await getSourceUrl(source, imdbId, type, season, episode);
    play(url);
}

function play(url) {
    if (url) {
        videoPlayer.src = url;
    }
}
