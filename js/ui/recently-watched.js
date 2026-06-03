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
            card.href = `/player/?${queryString}`;

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
            
            // Add progress if available
            if (item.progress && item.progress > 0) {
                const progressText = document.createElement("span");
                progressText.className = "history-card-progress-text";
                progressText.style.display = "block";
                progressText.style.fontSize = "0.85em";
                progressText.style.marginTop = "4px";
                progressText.style.color = "var(--stone-400)";
                
                // Format progress nicely
                let formattedProgress = Math.round(item.progress);
                progressText.textContent = `${formattedProgress}% completed`;
                
                info.appendChild(progressText);
                
                // Optional: A little progress bar
                const progressBarBg = document.createElement("div");
                progressBarBg.style.width = "100%";
                progressBarBg.style.height = "4px";
                progressBarBg.style.backgroundColor = "var(--stone-800)";
                progressBarBg.style.marginTop = "4px";
                progressBarBg.style.borderRadius = "2px";
                
                const progressBarFill = document.createElement("div");
                progressBarFill.style.width = `${Math.min(100, Math.max(0, item.progress))}%`;
                progressBarFill.style.height = "100%";
                progressBarFill.style.backgroundColor = "var(--accent)";
                progressBarFill.style.borderRadius = "2px";
                
                progressBarBg.appendChild(progressBarFill);
                info.appendChild(progressBarBg);
                
                // Pass it to the player so we can resume
                params.progress = Math.floor(item.currentTime || 0);
                const queryStringProgress = new URLSearchParams(params).toString();
                card.href = `/player/?${queryStringProgress}`;
            }
            
            card.appendChild(info);
            cards.appendChild(card);
        });
    }
}

// Export the class for use in other modules
window.RecentlyWatchedUI = RecentlyWatchedUI;
