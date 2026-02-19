// Recently Watched UI Module
// Displays recently watched movies and TV shows

class RecentlyWatchedUI {
    constructor(storageService) {
        this.storageService = storageService;
        this.container = document.getElementById("recently-watched");
        
        this.init();
    }

    init() {
        if (!this.container) {
            console.error("Recently watched container not found");
            return;
        }

        this.render();
    }

    render() {
        const recentlyWatched = this.storageService.getRecentlyWatched();

        if (recentlyWatched.length === 0) {
            this.container.innerHTML = "";
            return;
        }

        this.container.innerHTML = "<h2>Recently Watched</h2>";
        const cards = document.createElement("div");
        cards.className = "cards-grid";
        this.container.appendChild(cards);

        recentlyWatched.forEach(item => {
            const card = document.createElement("a");
            card.className = "history-card";
            let title = `${item.title}`;
            const year = item.year ? ` (${item.year})` : "";
            
            if (item.type === "tv") {
                title += ` (Season ${item.season}, Episode ${item.episode})`;
            }

            const params = {
                id: item.imdbId,
                type: item.type
            };

            if (item.type === 'tv') {
                params.season = item.season;
                params.episode = item.episode;
            }

            const queryString = new URLSearchParams(params).toString();
            card.href = `player.html?${queryString}`;

            if (item.poster && item.poster !== "N/A") {
                const poster = document.createElement("img");
                poster.className = "history-card-poster";
                poster.src = item.poster;
                poster.alt = `${item.title} poster`;
                card.appendChild(poster);
            } else {
                const posterPlaceholder = document.createElement("div");
                posterPlaceholder.className = "history-card-poster history-card-poster-placeholder";
                posterPlaceholder.textContent = "No Poster";
                card.appendChild(posterPlaceholder);
            }

            const info = document.createElement("div");
            info.className = "history-card-info";
            const titleText = document.createElement("span");
            titleText.className = "history-card-title";
            titleText.textContent = title;
            const yearText = document.createElement("span");
            yearText.className = "history-card-year";
            yearText.textContent = year;
            info.appendChild(titleText);
            info.appendChild(yearText);
            card.appendChild(info);
            cards.appendChild(card);
        });
    }
}

// Export the class for use in other modules
window.RecentlyWatchedUI = RecentlyWatchedUI;
