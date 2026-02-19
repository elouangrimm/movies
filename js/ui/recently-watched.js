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
        const list = document.createElement("ul");
        this.container.appendChild(list);

        recentlyWatched.forEach(item => {
            const listItem = document.createElement("li");
            let title = `${item.title}`;
            
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
            listItem.innerHTML = `<a href="player.html?${queryString}">${title}</a>`;
            list.appendChild(listItem);
        });
    }
}

// Export the class for use in other modules
window.RecentlyWatchedUI = RecentlyWatchedUI;
