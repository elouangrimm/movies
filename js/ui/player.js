// Player UI Module
// Handles video player interface and controls

class PlayerUI {
    constructor(omdbService, storageService, sources) {
        this.omdbService = omdbService;
        this.storageService = storageService;
        this.sources = sources;
        
        this.videoPlayer = document.getElementById("video-player");
        this.sourceButtonsContainer = document.getElementById("source-buttons");
        this.seriesControls = document.getElementById("series-controls");
        this.seasonSelect = document.getElementById("season-select");
        this.episodeSelect = document.getElementById("episode-select");
        
        this.currentSourceIndex = 0;
        this.currentImdbId = null;
        this.currentType = null;
        this.currentSeason = 1;
        this.currentEpisode = 1;
    }

    async init() {
        const imdbId = Utils.getUrlParam("id");
        let type = Utils.getUrlParam("type");

        // Normalize type
        if (type === "series") {
            type = "tv";
        }

        if (!imdbId) {
            this.showError();
            return;
        }

        this.currentImdbId = imdbId;
        this.currentType = type;

        if (type === "tv") {
            this.currentSeason = parseInt(Utils.getUrlParam("season")) || 1;
            this.currentEpisode = parseInt(Utils.getUrlParam("episode")) || 1;
            
            this.seriesControls.style.display = "flex";
            await this.initializeSeriesControls();
        } else {
            await this.initializeMovie();
        }
    }

    async initializeMovie() {
        this.generateSourceButtons();
        const initialUrl = await this.getSourceUrl(this.sources[0]);
        this.play(initialUrl, 0);
    }

    async initializeSeriesControls() {
        const totalSeasons = await this.omdbService.getTotalSeasons(this.currentImdbId);
        this.populateSeasons(totalSeasons);

        this.seasonSelect.addEventListener("change", async () => {
            this.currentSeason = parseInt(this.seasonSelect.value);
            await this.populateEpisodes();
        });

        this.episodeSelect.addEventListener("change", () => {
            this.currentEpisode = parseInt(this.episodeSelect.value);
            this.updatePlayerSource();
        });

        // Set initial season and populate episodes
        this.seasonSelect.value = this.currentSeason;
        await this.populateEpisodes();
        this.episodeSelect.value = this.currentEpisode;
        
        // Initialize player
        this.updatePlayerSource();
    }

    populateSeasons(totalSeasons) {
        this.seasonSelect.innerHTML = "";
        for (let i = 1; i <= totalSeasons; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.innerText = `Season ${i}`;
            this.seasonSelect.appendChild(option);
        }
    }

    async populateEpisodes() {
        try {
            const episodes = await this.omdbService.getSeasonEpisodes(
                this.currentImdbId, 
                this.currentSeason
            );

            this.episodeSelect.innerHTML = "";
            
            if (episodes && Array.isArray(episodes)) {
                episodes.forEach(episode => {
                    const option = document.createElement("option");
                    option.value = episode.Episode;
                    const title = episode.Title && episode.Title !== "N/A" ? `: ${episode.Title}` : "";
                    option.innerText = `Episode ${episode.Episode}${title}`;
                    this.episodeSelect.appendChild(option);
                });
            }
        } catch (error) {
            console.error("Error populating episodes:", error);
        }
    }

    async updatePlayerSource() {
        this.generateSourceButtons();
        const initialUrl = await this.getSourceUrl(this.sources[0]);
        this.play(initialUrl, 0);
    }

    generateSourceButtons() {
        this.sourceButtonsContainer.innerHTML = "";
        
        this.sources.forEach((source, index) => {
            if (source[this.currentType]) {
                const button = document.createElement("button");
                button.className = "source-button";
                button.innerText = source.name;
                button.onclick = async () => {
                    const url = await this.getSourceUrl(source);
                    this.play(url, index);
                };
                this.sourceButtonsContainer.appendChild(button);
            }
        });
    }

    async getSourceUrl(source) {
        let url;
        
        if (source.is_special) {
            try {
                const fetchUrl = source[this.currentType]
                    .replace("{imdb_id}", this.currentImdbId)
                    .replace("{season}", this.currentSeason)
                    .replace("{episode}", this.currentEpisode);
                
                const response = await fetch(fetchUrl);
                const text = await response.text();
                const doc = new DOMParser().parseFromString(text, "text/html");
                url = doc.querySelector("iframe").src;
            } catch (error) {
                console.error("Error fetching special source URL:", error);
                return null;
            }
        } else {
            if (source[this.currentType]) {
                url = source[this.currentType]
                    .replace("{imdb_id}", this.currentImdbId)
                    .replace("{season}", this.currentSeason)
                    .replace("{episode}", this.currentEpisode);
            }
        }
        
        return url;
    }

    async play(url, index) {
        if (!url) {
            console.error("No URL provided for playback");
            return;
        }

        this.videoPlayer.src = url;
        this.currentSourceIndex = index;

        // Update button states
        const buttons = this.sourceButtonsContainer.querySelectorAll(".source-button");
        buttons.forEach((button, i) => {
            if (i === index) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });

        // Save to recently watched
        await this.saveToRecentlyWatched();
    }

    async saveToRecentlyWatched() {
        try {
            const details = await this.omdbService.getDetails(this.currentImdbId);
            
            this.storageService.addToRecentlyWatched({
                imdbId: this.currentImdbId,
                type: this.currentType,
                title: details.Title || "Unknown Title",
                year: details.Year,
                poster: details.Poster,
                season: this.currentType === "tv" ? this.currentSeason : undefined,
                episode: this.currentType === "tv" ? this.currentEpisode : undefined
            });
        } catch (error) {
            console.error("Error saving to recently watched:", error);
        }
    }

    showError() {
        document.body.innerHTML = `
            <div style="text-align: center; padding-top: 50px; color: white;">
                <h1>Error: No movie or TV show ID provided.</h1>
                <a href="index.html" style="color: #3498db; text-decoration: none; font-size: 1.2rem;">Back Home</a>
            </div>
        `;
    }
}

// Export the class for use in other modules
window.PlayerUI = PlayerUI;
