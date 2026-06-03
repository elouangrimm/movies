// Player UI Module
// Handles video player interface and controls for Vidking

class PlayerUI {
    constructor(omdbService, tmdbService, storageService) {
        this.omdbService = omdbService;
        this.tmdbService = tmdbService;
        this.storageService = storageService;
        
        this.videoPlayer = document.getElementById("video-player");
        
        this.currentImdbId = null;
        this.currentTmdbId = null;
        this.currentType = null;
        this.currentSeason = 1;
        this.currentEpisode = 1;
        
        this.title = "Unknown Title";
        this.poster = "N/A";
        this.year = undefined;

        this.initMessageListener();
    }

    initMessageListener() {
        window.addEventListener("message", (event) => {
            try {
                // Log what we receive if needed, but primarily handle updates
                const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
                
                // Track progress
                // Based on Vidking doc: data = {type: "PLAYER_EVENT", data: {...}}
                // Sometimes directly parsed if the provider wraps it.
                if (data && data.type === "PLAYER_EVENT" && data.data) {
                    const eventData = data.data;
                    
                    if (eventData.progress !== undefined) {
                        this.storageService.addToRecentlyWatched({
                            imdbId: this.currentImdbId,
                            type: this.currentType,
                            title: this.title,
                            year: this.year,
                            poster: this.poster,
                            season: eventData.season || this.currentSeason,
                            episode: eventData.episode || this.currentEpisode,
                            progress: eventData.progress,
                            currentTime: eventData.currentTime,
                            duration: eventData.duration
                        });
                        
                        // Update current season and episode in case they changed inside the iframe
                        if (eventData.season) this.currentSeason = eventData.season;
                        if (eventData.episode) this.currentEpisode = eventData.episode;
                    }
                }
            } catch (e) {
                // Ignore parsing errors for other messages
            }
        });
    }

    async init() {
        const imdbId = Utils.getUrlParam("id");
        let type = Utils.getUrlParam("type");
        let progressTime = Utils.getUrlParam("progress");

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

        // Try recovering progress locally if not in URL
        let existingHistory = null;
        if (!progressTime || (type === "tv" && Utils.getUrlParam("season") === "1" && Utils.getUrlParam("episode") === "1")) {
            const history = this.storageService.getRecentlyWatched();
            existingHistory = history.find(h => h.imdbId === imdbId);
            
            if (existingHistory) {
                if (!progressTime && existingHistory.currentTime && existingHistory.progress < 95) { 
                    progressTime = existingHistory.currentTime;
                }
            }
        }
        progressTime = progressTime || 0;

        if (type === "tv") {
            this.currentSeason = parseInt(Utils.getUrlParam("season")) || 1;
            this.currentEpisode = parseInt(Utils.getUrlParam("episode")) || 1;
            
            // Override with history if user clicked from search with default season=1, episode=1
            if (existingHistory && Utils.getUrlParam("season") === "1" && Utils.getUrlParam("episode") === "1") {
                if (existingHistory.season) this.currentSeason = existingHistory.season;
                if (existingHistory.episode) this.currentEpisode = existingHistory.episode;
            }
        }

        // Fetch details for storage
        try {
            const details = await this.omdbService.getDetails(this.currentImdbId);
            if (details) {
                this.title = details.Title || "Unknown Title";
                this.poster = details.Poster;
                this.year = details.Year;
            }
        } catch (e) {}

        // Fetch TMDB ID to use with Vidking
        this.currentTmdbId = await this.tmdbService.getTmdbId(this.currentImdbId, this.currentType);
        
        if (!this.currentTmdbId) {
            console.error("Could not resolve TMDB ID from IMDB ID", this.currentImdbId);
            this.showError("Could not find TMDB ID for this content.");
            return;
        }

        // Build Vidking URL
        let url = "";
        if (this.currentType === "tv") {
            url = `https://www.vidking.net/embed/tv/${this.currentTmdbId}/${this.currentSeason}/${this.currentEpisode}?autoPlay=true&episodeSelector=true&nextEpisode=true`;
        } else {
            url = `https://www.vidking.net/embed/movie/${this.currentTmdbId}?autoPlay=true`;
        }
        
        if (progressTime && progressTime > 0) {
            url += `&progress=${progressTime}`;
        }

        // Setup Player
        this.videoPlayer.src = url;
        
        // Save initial to recent list
        this.storageService.addToRecentlyWatched({
            imdbId: this.currentImdbId,
            type: this.currentType,
            title: this.title,
            year: this.year,
            poster: this.poster,
            season: this.currentSeason,
            episode: this.currentEpisode,
            progress: 0,
            currentTime: progressTime,
            duration: 0
        });
    }

    showError(msg = "Error: No movie or TV show ID provided.") {
        document.body.innerHTML = `
            <div style="text-align: center; padding-top: 50px;">
                <h1>${msg}</h1>
                <a href="../" style="font-size: 1.2rem; color: #fff;">Back Home</a>
            </div>
        `;
    }
}

// Export the class for use in other modules
window.PlayerUI = PlayerUI;
